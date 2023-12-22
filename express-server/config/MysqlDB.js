const mysql = require('mysql2')
require('dotenv').config()
// .env 가져오기
let db_info = {
    host : `${process.env.MYSQL_HOST}`,
    port : `${process.env.MYSQL_PORT}`,
    user : `${process.env.MYSQL_USERNAME}`,
    password : `${process.env.MYSQL_PASSWORD}`,
    database : 'nodejs'
}

module.exports = {
    init: () => {
        return mysql.createConnection(db_info);
    },
    connect: (conn) => {
        conn.connect((err) => {
            if (err) console.error("mysql connection error : " + err);
            else console.log("mysql is connected succesfully!");
        })
    }
}