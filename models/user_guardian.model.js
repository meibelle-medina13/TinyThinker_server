import databaseInstance from '../database.js'
import md5 from 'md5'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(query, offset = 0, limit = 50) {
    return new Promise((resolve, reject) => {
        if (query) {
            if (/\D+/g.test(query)) {
            console.log('[ACCOUNT] Invalid Query', query)
            resolve([])
            }
    
            const id = parseInt(query, 10)
            databaseInstance.query(`SELECT * FROM users_guardian WHERE id = ?`, [id], (err, results, fields) => {
            if (err) reject(err)
    
            resolve(results)
            })
        } else {
            databaseInstance.query(`SELECT ID, email, birth_year FROM users_guardian ORDER BY id LIMIT ${limit} OFFSET ${offset}`, (err, results, fields) => {
                if (err) reject(err)
                const data = []
            
            for (let i = 0; i < results.length; i++) {
                    let date = new Date()
                    let year = date.getFullYear()
                    let age = year - results[i].birth_year
                    let guardian_ID = results[i].ID
                    let email = results[i].email
                    const user = []
                    
                    databaseInstance.query(`SELECT ID, username, guardian_ID FROM users WHERE guardian_ID = ?`, [guardian_ID], (err, results1, fields) => {
                        
                        for (let j = 0; j < results1.length; j++) {
                            user.push(results1[j].username)
                        }


                        const guardian = {
                            "email": email,
                            "age": age,
                            "number_of_users": results1.length,
                            "users": user
                        }
                        data.push(guardian)
                        if (data.length == results.length) {
                            resolve(data)
                        }
                    })
                }
            })
        }
    })
}

function add_guardian(email, password, birth_month, birth_date, birth_year) {
    const cleanEmail = _sanitize(email)
    const cleanPassword = _sanitize(password).toString()
    const cleanBirthMonth = _sanitize(birth_month)
    const cleanBirthDate = _sanitize(birth_date)
    const cleanBirthYear = _sanitize(birth_year)

    const hashedPass = md5(cleanPassword)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`INSERT INTO users_guardian(email, password, birth_month, birth_date, birth_year) VALUES(?, ?, ?, ?, ?)`,
        [cleanEmail, hashedPass, cleanBirthMonth, cleanBirthDate, cleanBirthYear], 
        (err, result) => {
            if (err) reject(err)
            resolve(result)
            }
        )
    })
}

function search_guardian(email) {
    return new Promise((resolve, reject) => {
        console.log(email)
        if (email) {
            databaseInstance.query(`SELECT ID FROM users_guardian WHERE email = ?`, [email], (err, results, fields) => {
            if (err) reject(err)
    
            resolve(results)
            })
        }
    })
}

function login(email, password) {
    password = password.toString()
    const cleanEmail = _sanitize(email)
    const cleanPassword = _sanitize(password)

    console.log(typeof(password))

    const hashedPass = md5(cleanPassword)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT password FROM users_guardian WHERE email = ?`, [cleanEmail], (err, result) => {
            if (err) reject(err)
            if (result.length > 0) {
                const result_pass = result[0].password
                if (hashedPass == result_pass) {
                    resolve("Login Successful!")
                }
                else {
                    resolve("Login Failed!")
                }
            }
            else {
                resolve("Email Not Found!")
            }
            }
        )
    })
}

function verify_birth_year(id, year) {
    const cleanID = _sanitize(id)
    const cleanYear = _sanitize(year)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT birth_year FROM users_guardian WHERE ID = ?`, [cleanID], (err, result) => {
            if (err) reject(err)
            if (result.length > 0) {
                const result_year = result[0].birth_year
                if (cleanYear == result_year) {
                    resolve("Birth year is correct")
                }
                else {
                    resolve("Birth year is incorrect")
                }
            }
        })
    })
}

export default {
    get,
    add_guardian,
    search_guardian,
    login,
    verify_birth_year
}