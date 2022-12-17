const sql = require('./mysql')

const Book = function (book) {
    this.isbn = book.isbn
    this.thumnail = book.thumnail
    this.title = book.title
    this.publisher = book.publisher
    this.authors = JSON.stringify(book.authors)
    this.publishDate = book.publishDate
}

Book.create = (newBook, result) => {
    sql.query(`insert into BOOK set ?`, newBook, (err,res)=>{
        if(err){
            console.log("error", err)
            result(err, null)
            return
        }
        console.log("Created book:", {newBook})
        result(null, {newBook})
    })
}

Book.best = (result) => {
    sql.query('select BOOK.* from BOOK join USERBOOK on BOOK.isbn = USERBOOK.isbn group by USERBOOK.isbn order by count(*) desc limit 15', (err,res)=> {
        if (err) {
            console.log('error:', err)
            result(err, null)
            return
        }

        console.log("bset book:", res)
        result(null, {res})
    })
}

module.exports=Book