import percentile from 'percentile'
import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(theme_number, offset = 0, limit = 0) {
    return new Promise((resolve, reject) => {
        if (theme_number) {
            if (/\D+/g.test(theme_number)) {
                console.log('[GET LEVEL SCORES] Invalid Query', theme_number)
                resolve({
                    "message": '[GET LEVEL SCORES] Invalid Query'
                })
            }
    
            const theme = parseInt(theme_number, 10)
            databaseInstance.query(`SELECT level_num, scores FROM scores WHERE theme_num = ? ORDER BY level_num`, [theme], 
            (err, results, fields) => {
                if (err) reject(err)
                let scoresPerLevel = {}
                for (let i = 0; i < results.length; i++) {
                    if (i == 0 || scoresPerLevel[results[i]['level_num']] == null) {
                        scoresPerLevel[results[i]['level_num']] =  [results[i]['scores']]
                    }
                    else {
                        scoresPerLevel[results[i]['level_num']].push(results[i]['scores'])
                    }
                }

                for (let level_num in scoresPerLevel) {
                    scoresPerLevel[level_num] = scoresPerLevel[level_num].sort(function(a, b){return a - b})
                }
                
                const data = []
                let stars = 0

                for (let level_num in scoresPerLevel) {
                    let temp = {}
                    temp['level_num'] = level_num
                    let sortedData = scoresPerLevel[level_num]
                    let twentyFive = percentile(25, scoresPerLevel[level_num])
                    let fifty = percentile(50, scoresPerLevel[level_num])
                    let seventyFive = percentile(75, scoresPerLevel[level_num])
                    let hundred = percentile(90, scoresPerLevel[level_num])
                    let count25 = 0
                    let count50 = 0
                    let count75 = 0
                    let count100 = 0

                    for (let i = 0; i < sortedData.length; i++) {
                        if (twentyFive >= sortedData[i]) {
                            count25++
                        }
                        else if (fifty >= sortedData[i]) {
                            count50++
                        }
                        else if (seventyFive >= sortedData[i]) {
                            count75++
                        }
                        else if (hundred >= sortedData[i]) {
                            count100++
                        }

                        if (sortedData[i] >= 33.33 && sortedData[i] < 66.66) {
                            stars += 1
                        }
                        else if (sortedData[i] >= 66.66 && sortedData[i] < 100) {
                            stars += 2
                        }
                        else if (sortedData[i] == 100) {
                            stars += 3
                        }
                    }
                    temp['sorted_scores'] = sortedData
                    temp['0-25%'] = {"percentile_score": twentyFive, "no_of_users": count25, "user_percentage": (count25/sortedData.length)*100 + '%'}
                    temp['25%-50%'] = {"percentile_score": fifty, "no_of_users": count50, "user_percentage": (count50/sortedData.length)*100 + '%'}
                    temp['50%-75%'] = {"percentile_score": seventyFive, "no_of_users": count75, "user_percentage": (count75/sortedData.length)*100 + '%'}
                    temp['75%-100%'] = {"percentile_score": hundred, "no_of_users": count100, "user_percentage": (count100/sortedData.length)*100 + '%'}
                    data.push(temp)
                }
                data.push({'total_stars_per_theme': stars})
                resolve(data)
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
        })
    })
}

export default {
    get,
    update_Levelscore
}