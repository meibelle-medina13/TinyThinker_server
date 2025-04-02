import { get } from 'http'
import databaseInstance from '../database.js'
import md5 from 'md5'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .,@/_'])+/g, '')
}

function add_admin(username, password, lastname, firstname, middle_name) {
    const cleanUsername = _sanitize(username)
    const cleanPassword = password.toString()
    const cleanLastname = _sanitize(lastname)
    const cleanFirstname = _sanitize(firstname)
    const cleanMiddleName = _sanitize(middle_name)

    const hashedPass = md5(cleanPassword)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`INSERT INTO admin_accounts(username, password, lastname, firstname, middle_name, status, profile_url, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [cleanUsername, hashedPass, cleanLastname, cleanFirstname, cleanMiddleName, "0", "", ""], 
        (err, result) => {
            if (err) reject(err)
            resolve({
                "message": "Your account is waiting for approval."
            })
            }
        )
    })
}

function login(username, password) {
    password = password.toString()
    const cleanUsername = _sanitize(username)
    const cleanPassword = password.toString()

    const hashedPass = md5(cleanPassword)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT ID, password, status FROM admin_accounts WHERE username = ?`, [cleanUsername], (err, result) => {
            if (err) reject(err)
            if (result.length == 1) {
                if (result[0].status == 1) {
                    const result_pass = result[0].password
                    if (hashedPass == result_pass) {
                        resolve({
                            "status": result[0].status,
                            "message": "Login Successful",
                            "id": result[0].ID
                        })
                    }
                    else {
                        resolve("Login Failed! Wrong Credentials")
                    }
                }
                else {
                    resolve({
                        "status": result[0].status,
                        "message": "Your account is waiting for approval."
                    })
                }
            }
            else {
                resolve("Username Not Found!")
            }
            }
        )
    })
}

function get_admin(adminID) {
    return new Promise((resolve, reject) => {
        if (adminID) {
            if (/\D+/g.test(adminID)) {
            console.log('[ADMIN] Invalid Query', adminID)
            resolve([])
            }
    
            const id = parseInt(adminID, 10)
            databaseInstance.query(`SELECT username, lastname, firstname, middle_name, profile_url, age, address FROM admin_accounts WHERE ID = ?`, [id], (err, results, fields) => {
            if (err) reject(err)
    
            resolve(results)
            })
        }
        })
}

function get_pending() {
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT ID, lastname, firstname, middle_name FROM admin_accounts WHERE status = ?`, [0], (err, results, fields) => {
        if (err) reject(err)
        // resolve(results)
        let newResult = []
        for (let i = 0; i < results.length; i++) {
            let temp = {}
            temp["id"] = results[i].ID,
            temp["lastname"] = results[i].lastname,
            temp["firstname"] = results[i].firstname,
            temp["middle_name"] = results[i].middle_name
            newResult.push(temp)
        }
        resolve(newResult)
        })
    })
}

function update_adminAccount(adminID, username, lastname, firstname, middle_name, age, address, profile_url) {
    const cleanUsername = _sanitize(username)
    const cleanLastname = _sanitize(lastname)
    const cleanFirstname = _sanitize(firstname)
    const cleanMiddleName = _sanitize(middle_name)
    const cleanAge = _sanitize(age)
    const cleanAddress = _sanitize(address)
    const profile_link = profile_url
    
    const admin = parseInt(adminID, 10)

    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE admin_accounts SET username = ?, lastname = ?, firstname = ?, middle_name = ?, profile_url = ?, age = ?, address = ? WHERE ID = ?`,
        [cleanUsername, cleanLastname, cleanFirstname, cleanMiddleName, profile_link, cleanAge, cleanAddress, admin], 
        (err, result) => {
            if (err) reject(err)
            resolve({
                "message": "Profile Updated Successful."
            })
            }
        )
    })
}

function approve_request(adminID) {
    if (adminID) {
        if (/\D+/g.test(adminID)) {
        console.log('[ADMIN ACCOUNT] Invalid Query ', adminID)
        resolve([])
        }
    }
    const admin = parseInt(adminID, 10)
    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE admin_accounts SET status = ? WHERE ID = ?`,
        [1, admin], 
        (err, result) => {
            if (err) reject(err)
            console.log(result)
            resolve("Account Approved!")
            }
        )
    })
}

function decline_request(adminID) {
    if (adminID) {
        if (/\D+/g.test(adminID)) {
        console.log('[ADMIN ACCOUNT] Invalid Query ', adminID)
        resolve([])
        }
    }
    const admin = parseInt(adminID, 10)
    return new Promise((resolve, reject) => {
        databaseInstance.query(`DELETE FROM admin_accounts WHERE ID = ?`,
        [admin], 
        (err, result) => {
            if (err) reject(err)
            console.log(result)
            resolve("Account Declined!")
            }
        )
    })
}

export default {
    add_admin,
    login,
    get_admin,
    get_pending,
    update_adminAccount,
    approve_request,
    decline_request
}