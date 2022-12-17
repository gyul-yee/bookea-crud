const UserBook = require("../model/userbook.model")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    const userbook = new UserBook({
        isbn: req.body.isbn,
        idUser: req.body.idUser
    })

    UserBook.create(userbook, (err, data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating the UserBook."
            })
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send({message: "success"})
        }
    })
}

exports.findWish = (req, res) => {
    UserBook.findWish(req.params.idUser, (err, data)=>{
        if (err) {
            if (err.kind==="not_found") {
                res.status(404).send({
                    message: `Not found wish with id ${req.params.idUser}`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving wish with id " + req.params.idUser
                })
            }
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(data)
        }
    })
}

exports.findRead = (req, res) => {
    UserBook.findRead(req.params.idUser, (err, data)=>{
        if (err) {
            if (err.kind==="not_found") {
                res.status(404).send({
                    message: `Not found book with id ${req.params.idUser}`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving reading book with id " + req.params.idUser
                })
            }
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(data)
        }
    })
}

exports.findFinish= (req, res) => {
    UserBook.findFin(req.params.idUser, (err, data)=>{
        if (err) {
            if (err.kind==="not_found") {
                res.status(404).send({
                    message: `Not found book with id ${req.params.idUser}`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving book with id " + req.params.idUser
                })
            }
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(data)
        }
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        })
    }

    UserBook.update(new UserBook(req.body), (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found UserBook with id ${UserBook.idUser} isbn ${UserBook.isbn}`
                })
            } else {
                res.status(500).send({
                    message: `Error updating UserBook with id ${UserBook.idUser} isbn ${UserBook.isbn}`
                })
            }
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(data)
        }
    })
}

exports.delete = (req, res) => {
    UserBook.remove(new UserBook(req.body), (err, data)=>{
        if (err) {
            if (err.kind==="not_found") {
                res.status(404).send({
                    message: `Not found UserBook with id ${UserBook.idUser} isbn ${UserBook.isbn}`
                })
            } else {
                res.status(500).send({
                    message: `Could not delete UserBook with id ${UserBook.idUser} isbn ${UserBook.isbn}`
                })
            }
        } else {
            res.header("Access-Control-Allow-Origin", "*")
            res.send({message: 'UserBook was deleted successfully'})
        }
    })
}