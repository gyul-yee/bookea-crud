const Review = require("../model/review.model")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }
    
    const review = new Review({
        content: req.body.content,
        quote: req.body.quote,
        startPage: req.body.startPage,
        endPage: req.body.endPage,
        createdDate: req.body.createdDate,
        isbn: req.body.isbn,
        idUser: req.body.idUser
    })

    Review.create(review, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Review."
            })
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send({message: "success"})
        }
    })
}

exports.findReview = (req, res) => {
    Review.getReview(new Review(req.body), (err, data)=> {
        if (err) {
            if (err.kind==="not_found") {
                res.status(404).send({
                    message: `Not found wish with id ${Review.idUser} isbn ${Review.isbn}`
                })
            } else {
                res.status(500).send({
                    message: `Error retrieving wish with id ${UserBook.idUser} isbn ${UserBook.isbn}`
                })
            }
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(data)
        }
    })
}