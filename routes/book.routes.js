module.exports=app=>{
    const books = require("../controllers/book.controller")

    app.post("/books", books.create)
    
    app.get("/books", books.bestBook)
}