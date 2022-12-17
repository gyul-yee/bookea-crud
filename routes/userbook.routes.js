module.exports=app=>{
   const userbooks = require("../controllers/userbook.controller")
    
   app.post("/userbooks", userbooks.create) 

   app.get("/userbooks/wish/:idUser", userbooks.findWish)

   app.get("/userbooks/reading/:idUser", userbooks.findRead)

   app.get("/userbooks/fin/:idUser", userbooks.findFinish)

   app.put("/userbooks", userbooks.update)

   app.delete("/userbooks", userbooks.delete)
}
