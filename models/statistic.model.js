import databaseInstance from '../database.js'

function get(user_ID, theme_number, offset = 0, limit = 50) {
    return new Promise((resolve, reject) => {
        if (user_ID && theme_number) {
            if (/\D+/g.test(theme_number)) {
                console.log('[GET STATISTICS] Invalid Query', theme_number)
                resolve({
                    "message": '[GET STATISTICS] Invalid Query'
                })
            }
    
            const theme = parseInt(theme_number, 10)
            const userID = parseInt(user_ID, 10)
            databaseInstance.query(`SELECT level_num, scores FROM scores WHERE theme_num = ? AND user_ID = ?`, [theme, userID], 
            (err, results, fields) => {
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