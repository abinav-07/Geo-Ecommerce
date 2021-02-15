const mysql=require("mysql");
const dotenv=require("dotenv");
dotenv.config();
//Create Pool to run multiple queries
const pool=mysql.createPool({
    host:process.env.MY_SQL_HOST,
    port:process.env.MY_SQL_PORT,
    user:process.env.MY_SQL_USERNAME,
    password:process.env.MY_SQL_PASSWORD,
    database:process.env.MY_SQL_DB_NAME
})
module.exports=pool
