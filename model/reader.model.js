const sql = require("./mysql")

const Reader = function (reader) {
    this.username = reader.username
    this.pwd = reader.pwd
}

Reader.create = (newReader, result) => {
    sql.query(`insert into READER (username, pwd) values ('${newReader.username}', '${newReader.pwd}')`, (err, res)=>{
        if(err){
            console.log("error", err)
            result(err, null)
            return
        }
        console.log("Created reader:", {id: res.insertId, ...newReader})
        result(null, {id: res.insertId, ...newReader})
    })
}

Reader.login = (newReader, result) => {
    sql.query(`select * from READER where username='${newReader.username}' and pwd='${newReader.pwd}'`, (err, res)=>{
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        }
        if (res.length) {
            console.log("login", {idUser: res[0].idUser})
            result(null, {message: 'login', idUser: res[0].idUser})
        } else {
            result(null, {message: 'loginfalse'})
        }
    })
}

Reader.findByID = (readerId, result)=> {
    sql.query('SELECT * FROM READER WHERE idUser=?', readerId, (err, res)=>{
        if(err){
            console.log("error", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("found reader", res[0])
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}

module.exports = Reader