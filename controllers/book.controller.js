const Book = require("../model/book.model")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    const book = new Book({
        isbn: req.body.isbn,
        thumnail: req.body.thumnail,
        title : req.body.title,
        publisher : req.body.publisher,
        authors : req.body.authors,
        publishDate : req.body.publishDate
    })

    Book.create(book, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Book."
            })
        } else {
            res.send({message: "success"})
        }
    })
}

exports.bestBook = (req, res) => {
    Book.best((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving best books."
            })
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(data)
        }
    })
}