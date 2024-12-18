import databaseInstance from '../database.js'

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function update_PrePostTestscore(userID, theme, testType, score) {
    const cleanUserID = _sanitize(userID)
    const cleanScore = _sanitize(score)
    const cleanTest = _sanitize(testType)
    const cleanTheme = _sanitize(theme)
  
    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE prepost_test_scores SET scores = ? WHERE user_ID = ? AND theme_num = ? AND test_type = ?`,
        [cleanScore, cleanUserID, cleanTheme, cleanTest], 
        (err, result) => {
            if (err) reject(err)
            if (result.affectedRows == 0) {
                databaseInstance.query(`INSERT INTO prepost_test_scores (user_ID, theme_num, test_type, scores) VALUES(?, ?, ?, ?)`, [cleanUserID, cleanTheme, cleanTest, cleanScore], (err, insertResult) => {
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
    update_PrePostTestscore
}