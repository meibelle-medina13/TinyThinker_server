import mysql from 'mysql2'

const DATABASE_HOST = 'mysql-17d6ea4e-tinythinker.f.aivencloud.com'
const DATABASE_USERNAME = 'avnadmin'
const DATABASE_PASSWORD = 'AVNS_2c14i9EDNnLxLr2d2A3'
const DATABASE_NAME = 'tinythinker'
const PORT = 17267

const databaseInstance = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: PORT
})

export default databaseInstance