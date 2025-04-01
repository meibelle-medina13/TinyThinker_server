import { get } from 'http'
import databaseInstance from '../database.js'
import md5 from 'md5'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@/_'])+/g, '')
}

function add_admin(username, password, lastname, firstname, middle_name, age, profile_url) {
    const cleanUsername = _sanitize(username)
    const cleanPassword = password.toString()
    const cleanLastname = _sanitize(lastname)
    const cleanFirstname = _sanitize(firstname)
    const cleanMiddleName = _sanitize(middle_name)
    const cleanAge = _sanitize(age)
    const profile_link = profile_url

    const hashedPass = md5(cleanPassword)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`INSERT INTO admin_accounts(username, password, lastname, firstname, middle_name, status, profile_url, age) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [cleanUsername, hashedPass, cleanLastname, cleanFirstname, cleanMiddleName, "0", profile_link, cleanAge], 
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
                            "message": "Login Successful",
                            "id": result[0].ID
                        })
                    }
                    else {
                        resolve("Login Failed! Wrong Credentials")
                    }
                }
                else {
                    resolve("Your account is waiting for approval.")
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
            databaseInstance.query(`SELECT lastname, firstname, middle_name FROM admin_accounts WHERE ID = ?`, [id], (err, results, fields) => {
            if (err) reject(err)
    
            resolve(results)
            })
        }
        })
}

function get_pending() {
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT lastname, firstname, middle_name FROM admin_accounts WHERE status = ?`, [0], (err, results, fields) => {
        if (err) reject(err)
        resolve(results)
        })
    })
}

export default {
    add_admin,
    login,
    get_admin,
    get_pending
}