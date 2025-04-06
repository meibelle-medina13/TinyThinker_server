import databaseInstance from '../database.js'

function get_QuarterStatus() {
    return new Promise((resolve, reject) => {
        databaseInstance.query(`SELECT theme_num, status FROM quarter_status`, 
        (err, result) => {
            if (err) reject(err)
            console.log(result)
            resolve(result)
            }
        )
    })
}

function update_QuarterStatus(theme, status) {
    if (theme && status) {
        if (/\D+/g.test(theme) && /\D+/g.test(status)) {
            console.log('[QUARTER STATUS] Invalid Query ', theme, ' and ', status)
            resolve({
                "message": '[QUARTER STATUS] Invalid Query'
            })
        }
    }

    const theme_num = parseInt(theme, 10)
    const stat = parseInt(status, 10)
    return new Promise((resolve, reject) => {
        databaseInstance.query(`UPDATE quarter_status SET status = ? WHERE theme_num = ?`, [stat, theme_num], 
        (err, result) => {
            if (err) reject(err)
            console.log(result)
            resolve()
        })
    })
}

export default {
    get_QuarterStatus,
    update_QuarterStatus
}