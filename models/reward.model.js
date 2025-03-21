import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get_reward(user_ID) {
    return new Promise((resolve, reject) => {
        
        if (user_ID) {
            if (/\D+/g.test(user_ID)) {
            console.log('[REWARD COLLECTION] Invalid Query', user_ID)
            resolve([])
            }

            const userID = parseInt(user_ID, 10)
            databaseInstance.query(`SELECT reward_type_ID FROM reward_collection WHERE user_ID = ?`, [userID], (err, results, fields) => {
            if (err) reject(err)
    
            console.log(results.length)
            resolve(results)
            })
        }
    })
}

function add_reward(userID, reward_type) {
    if (userID && reward_type) {
        if (/\D+/g.test(userID) && /\D+/g.test(reward_type)) {
        console.log('[REWARD COLLECTION] Invalid Query ', userID, ' and ', reward_type)
        resolve([])
        }
    }

    const user_ID = parseInt(userID, 10)
    const reward_type_ID = parseInt(reward_type, 10)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT * FROM reward_collection WHERE user_ID = ? AND reward_type_ID = ?`, [user_ID, reward_type_ID], (err, results, fields) => {
            if (err) reject(err)
    
            console.log(results.length)
            if (results.length == 0) {
                databaseInstance.query(`INSERT INTO reward_collection (user_ID, reward_type_ID) VALUES(?, ?)`,
                [user_ID, reward_type_ID], 
                (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                    }
                )
            }
            else {
                resolve([])
            }
            })
    })
}

export default {
    add_reward,
    get_reward
}