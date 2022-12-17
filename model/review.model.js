const sql = require('./mysql')

const Review = function (review) {
    this.content = review.content
    this.quote = review.quote
    this.startPage = review.startPage
    this.endPage = review.endPage
    this.createdDate = review.createdDate
    this.isbn = review.isbn
    this.idUser = review.idUser
}

Review.create = (newReview, result) => {
    sql.query("insert into REVIEW set ?", newReview, (err, res) => {
        if(err){
            console.log("error", err)
            result(err, null)
            return
        }
        console.log("Created review:", {id: res.insertId, ...newReview})
        result(null, {id: res.insertId, ...newReview})
    })
}

Review.getReview = (review, result) => {
    sql.query(`select REVIEW.*, BOOK.title from REVIEW join BOOK on REVIEW.isbn = BOOK.isbn where REVIEW.isbn=? and
    idUser=? order by createdDate asc`,
    [review.isbn, review.idUser], (err, res)=> {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found review: ", res);
            result(null, {res});
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    })
} 

module.exports = Review