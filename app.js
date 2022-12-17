const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const port = 3100
const dbConfig=require('./config/db.config')
var session=require('express-session')
var MySQLStore=require('express-mysql-session')(session)

var options={
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
}

var sessionStore = new MySQLStore(options)

app.use(session({
    secret: 'my key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => res.send('Hello JY World!'))
require("./routes/reader.routes")(app)
require("./routes/book.routes")(app)
require("./routes/userbook.routes")(app)
require("./routes/review.routes")(app)
app.listen(port, () => console.log('Server Running. . .'))
//모든 도메인
app.use(cors());

