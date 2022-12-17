const mysql = require('mysql')
const dbConfig = require("../config/db.config")

const mysqlConnection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
})
    
mysqlConnection.connect(err=> {
    if(err) {
        console.log("MySQL 연결 실패:", err)
    } else {
        console.log("MySQL Connected!!")
    }
})
    

module.exports = mysqlConnection