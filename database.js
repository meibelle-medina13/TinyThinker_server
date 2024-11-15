import mysql from 'mysql2'

const DATABASE_HOST = 'localhost'
const DATABASE_USERNAME = 'root'
const DATABASE_PASSWORD = ''
const DATABASE_NAME = 'tinythinker'

const databaseInstance = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME
})

export default databaseInstance