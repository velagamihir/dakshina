const { Pool } = require('pg')
require('dotenv').config()
const pool = new Pool({
    port: process.env.PPORT,
    password: process.env.PPASSWORD,
    user: process.env.PUSER,
    host: process.env.PHOST,
    database: process.env.PDATABASE,
})
module.exports = {
    query: (text,params)=>pool.query(text,params)
}