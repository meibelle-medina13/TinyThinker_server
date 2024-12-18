import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(theme_number, offset = 0, limit = 50) {
    return new Promise((resolve, reject) => {
        
        if (theme_number) {
            if (/\D+/g.test(theme_number)) {
            console.log('[ACCOUNT] Invalid Query', theme_number)
            resolve([])
            }
    
            const theme = parseInt(theme_number, 10)
            databaseInstance.query(`SELECT level_num, scores FROM scores WHERE theme_num = ?`, [theme], (err, results, fields) => {
            if (err) reject(err)
    
            console.log(results.length)
            const summary_of_scores = []
            let level_score = {}
            for (let i = 0; i < results.length; i++) {
                if (level_score[results[i].level_num] == null) {
                    level_score[results[i].level_num] = results[i].scores
                    const level = {}
                    level["level_num"] = results[i].level_num
                    level["score"] = results[i].scores
                    level["num_of_users"] = 1
                    summary_of_scores.push(level)
                } else {
                    level_score[results[i].level_num] += results[i].scores
                    for (let j = 0; j < summary_of_scores.length; j++) {
                        if (summary_of_scores[j]["level_num"] == results[i].level_num) {
                            summary_of_scores[j]["score"] += results[i].scores
                            summary_of_scores[j]["num_of_users"] += 1
                        }
                    }
                }
            }
            
            for (let k = 0; k < summary_of_scores.length; k++) {
                const ave = summary_of_scores[k]["score"] / summary_of_scores[k]["num_of_users"]
                summary_of_scores[k]["score_average"] = ave
            }
            resolve(summary_of_scores)
            })
        }
    })
}

function update_Levelscore(userID, theme, level, score) {
    const cleanUserID = _sanitize(userID)
    const cleanScore = _sanitize(score)
    const cleanLevel = _sanitize(level)
    const cleanTheme = _sanitize(theme)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE scores SET scores = ? WHERE user_ID = ? AND theme_num = ? AND level_num = ?`,
        [cleanScore, cleanUserID, cleanTheme, cleanLevel], 
        (err, result) => {
            if (err) reject(err)
            if (result.affectedRows == 0) {
                databaseInstance.query(`INSERT INTO scores (user_ID, theme_num, level_num, scores) VALUES(?, ?, ?, ?)`, [cleanUserID, cleanTheme, cleanLevel, cleanScore], (err, insertResult) => {
                    resolve(insertResult)
                })
            }
            else {
                resolve(result)
            }
            }
        )
    })
}

export default {
    get,
    update_Levelscore
}