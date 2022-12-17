const Reader = require("../model/reader.model")

exports.create = (req, res)=> {
    if (!req.body) {
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    const reader = new Reader({
        username: req.body.username,
        pwd: req.body.pwd
    })
    
    Reader.create(reader, (err, data)=> {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Reader."
            })
        } else {
            res.send({message: "success"})
        }
    })
}

exports.login = (req, res)=>{
    if (!req.body) {
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    const reader = new Reader({
        username: req.body.username,
        pwd: req.body.pwd
    })
    
    Reader.login(reader, (err,data)=> {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while login."
            })
        } else {
            console.log(data.message)
            if (data.message ==="login") {
                console.log(data)
                res.send(data)
            } else res.send({message: "fail"})
            
        }
    })
}


exports.findOne = (req, res)=>{
    Reader.findByID(req.params.idUser, (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.idUser}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.idUser
                })
            }
        } else res.send(data)
    })
}