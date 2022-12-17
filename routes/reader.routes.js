module.exports=app=>{
    const readers=require("../controllers/reader.controller")

    app.post("/readers", readers.create)

    app.get("/readers/:idUser", readers.findOne)

    app.post("/", readers.login)
}