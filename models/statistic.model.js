import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(user_ID, theme_number, offset = 0, limit = 50) {
    return new Promise((resolve, reject) => {
        
        if (user_ID && theme_number) {
            if (/\D+/g.test(theme_number)) {
            console.log('[ACCOUNT] Invalid Query', theme_number)
            resolve([])
            }
    
            const theme = parseInt(theme_number, 10)
            const userID = parseInt(user_ID, 10)
            databaseInstance.query(`SELECT level_num, scores FROM scores WHERE theme_num = ? AND user_ID = ?`, [theme, userID], (err, results, fields) => {
            if (err) reject(err)
    
            console.log(results.length)
            resolve(results)
            })
        }
    })
}

export default {
    get
}