import databaseInstance from '../database.js'

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
            databaseInstance.query(`SELECT * FROM users WHERE guardian_ID = ?`, [id], (err, results, fields) => {
            if (err) reject(err)
    
            resolve(results)
            })
        } else {
            databaseInstance.query(`SELECT * FROM users ORDER BY id LIMIT ${limit} OFFSET ${offset}`, (err, results, fields) => {
                if (err) reject(err)

                resolve(results)
            })
        }
    })
}

function add_user(username, age, gender, avatar_filename, current_theme, current_level, relation_to_guardian, guardian_ID) {
    const cleanUsername = _sanitize(username)
    const cleanAge = _sanitize(age)
    const cleanGender = _sanitize(gender)
    const cleanAvatar = _sanitize(avatar_filename)
    const cleanTheme = _sanitize(current_theme)
    const cleanLevel = _sanitize(current_level)
    const cleanRelation = _sanitize(relation_to_guardian)
    const cleanGuardian = _sanitize(guardian_ID)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`INSERT INTO users (username, age, gender, avatar_filename, current_theme, current_level, relation_to_guardian, guardian_ID) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [cleanUsername, cleanAge, cleanGender, cleanAvatar, cleanTheme, cleanLevel, cleanRelation, cleanGuardian], 
        (err, result) => {
            if (err) reject(err)
            resolve(result)
            }
        )
    })
}

export default {
    get,
    add_user
}