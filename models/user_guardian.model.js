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
        console.log(query)
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
            databaseInstance.query(`SELECT * FROM users_guardian ORDER BY id LIMIT ${limit} OFFSET ${offset}`, (err, results, fields) => {
                if (err) reject(err)

                resolve(results)
            })
        }
    })
}

function add_guardian(email, password, birth_month, birth_date, birth_year) {
    const cleanEmail = _sanitize(email)
    const cleanPassword = _sanitize(password)
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








export default {
    get,
    add_guardian,
    search_guardian
}