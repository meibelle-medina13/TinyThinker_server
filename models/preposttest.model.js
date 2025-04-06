import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(theme_number, test_type) {
    return new Promise((resolve, reject) => {
        if (theme_number && test_type) {
            if (/\D+/g.test(theme_number) || /\D+/g.test(test_type)) {
                console.log('[PRETEST AND POSTTEST SCORES] Invalid Query ', theme_number, ' and ', test_type)
                resolve({
                    "message": '[PRETEST AND POSTTEST SCORES] Invalid Query'
                })
            }
    
            const theme = parseInt(theme_number, 10)
            const test = parseInt(test_type, 10)
            databaseInstance.query(`SELECT DISTINCT user_ID, scores FROM prepost_test WHERE theme_num = ? AND test_type = ?`, [theme, test], 
            (err, results, fields) => {
                if (err) reject(err)
                let scores = []
                let total = 0
                for (let i = 0; i < results.length; i++) {
                    total += results[i]['scores']
                    scores.push(results[i]['scores'])
                }
                let average = total/results.length
                const data = []
                data.push({'scores': scores})
                data.push({'no_of_users': results.length ,'total_score': total, 'average_test_score': average})
                resolve(data)
            })
        }
    })
}

function update_PrePostTestscore(userID, theme, testType, score) {
    const cleanUserID = _sanitize(userID)
    const cleanScore = _sanitize(score)
    const cleanTest = _sanitize(testType)
    const cleanTheme = _sanitize(theme)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE prepost_test SET scores = ? WHERE user_ID = ? AND theme_num = ? AND test_type = ?`,
        [cleanScore, cleanUserID, cleanTheme, cleanTest], 
        (err, result) => {
            if (err) reject(err)
                if (result.affectedRows == 0) {
                    databaseInstance.query(`INSERT INTO prepost_test (user_ID, theme_num, test_type, scores) VALUES(?, ?, ?, ?)`, [cleanUserID, cleanTheme, cleanTest, cleanScore], 
                    (err, insertResult) => {
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
    update_PrePostTestscore
}