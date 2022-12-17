const sql = require('./mysql')

const UserBook = function (userbook) {
    this.isbn = userbook.isbn
    this.idUser = userbook.idUser
    this.readStatus = userbook.readStatus
    this.endTime = userbook.endTime
    this.startTime = userbook.startTime
}

UserBook.create =  (newUserBook, result) => {
    sql.query(`insert into USERBOOK(isbn, idUser) values('${newUserBook.isbn}', ${newUserBook.idUser})`,(err, res)=>{
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        }
        console.log("Created UserBook: ", {newUserBook})
        result(null, {readStatus: 0, ...newUserBook})
    })
}

UserBook.findWish = (idUser, result) => {
    sql.query('select USERBOOK.*,BOOK.thumnail from USERBOOK join BOOK on USERBOOK.isbn = BOOK.isbn where idUser=? and readStatus=0',idUser,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found wish: ", res);
            result(null, {res});
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    })
}

UserBook.findRead = (idUser, result) => {
    sql.query('select USERBOOK.*,BOOK.thumnail from USERBOOK join BOOK on USERBOOK.isbn = BOOK.isbn where idUser=? and readStatus=1',idUser,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found book: ", res);
            result(null, {res});
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    })
}

UserBook.findFin = (idUser, result) => {
    sql.query('select USERBOOK.*,BOOK.thumnail,BOOK.title from USERBOOK join BOOK on USERBOOK.isbn = BOOK.isbn where idUser=? and readStatus=2',idUser,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found book: ", res);
            result(null, {res});
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    })
}

UserBook.update = (userbook, result) => {
    if (userbook.startTime) {
        sql.query(`update USERBOOK set readStatus=?, startTime=? where idUser=? and isbn=?`,
        [userbook.readStatus+1, userbook.startTime,userbook.idUser, userbook.isbn], (err, res)=> {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.affectedRows==0) {
            result({kind: "not_found"}, null)
            return
        }

        console.log("update userbook: ", {userbook});
        result(null, {message: 'status change'});
        })
    } else {
        sql.query(`update USERBOOK set readStatus=?, endTime=? where idUser=? and isbn=?`,
        [userbook.readStatus+1, userbook.endTime,userbook.idUser, userbook.isbn], (err, res)=> {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.affectedRows==0) {
            result({kind: "not_found"}, null)
            return
        }

        console.log("update userbook: ", {userbook});
        result(null, {message: 'status change'});
        })
    }
    
}

UserBook.remove = (userbook, result) => {
    sql.query('delete from USERBOOK where idUser=? and isbn=?',
    [userbook.idUser, userbook.isbn], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.affectedRows==0) {
            result({kind: "not_found"}, null)
            return
        }

        console.log("delete userbook with id and isbn: ", {userbook});
        result(null, res);
    })
}

module.exports = UserBook