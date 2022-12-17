module.exports=app=>{
    const reviews=require("../controllers/review.controller")

    app.post("/reviews", reviews.create)

    app.post("/reviews/find", reviews.findReview)
}