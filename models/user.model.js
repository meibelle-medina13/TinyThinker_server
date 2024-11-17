import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(query, offset = 0, limit = 50) {
    return new Promise((resolve, reject) => {
        const data = [{},
            {"Age3": 0, "Age4": 0, "Age5": 0}]
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

                data[0] = results
                for (let i = 0; i < results.length; i++) {
                    if (results[i].age == 3) {
                        data[1].Age3 += 1
                    }
                    else if (results[i].age == 4) {
                        data[1].Age4 += 1
                    }
                    else if (results[i].age == 5) {
                        data[1].Age5 += 1
                    }
                }
                resolve(data)
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

function update_level(userID, current_level) {
    const cleanUserID = _sanitize(userID)
    const cleanLevel = _sanitize(current_level)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE users SET current_level = ? WHERE ID = ?`,
        [cleanLevel, cleanUserID], 
        (err, result) => {
            if (err) reject(err)
            resolve(result)
            }
        )
    })
}

export default {
    get,
    add_user,
    update_level
}