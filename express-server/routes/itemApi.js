var express = require('express');
var router = express.Router();

var db = require('../config/MysqlDB')
var conn = db.init();

// 상품 상세 조회
router.get('/items/:id', (req, res)=> {
    var sql = "select * from board where id=" + req.params.id;
    conn.query(sql, (err, result) => {
        if (err) console.log("query is not excuted : " + err);
        else res.send(result);
    })
})

// 상품 등록
router.post("/item", (req, res) => {
    var body = req.body;
    var sql = "insert into items (name, info, price, discount) values(?,?,?,?)";
    var params = [body.name, body.info, body.price, (!body.discount ? 0 : body.discount)];
    conn.query(sql, params, (err) => {
        if(err) console.log("query is not excuted : " + err)
        else res.sendStatus(200);
    });
})

// 상품 수정
router.post("/item/:id", (req, res) => {
    var body = req.body;
    var sql = "update items set name=?, info=?, price=?, discount=? where id=" + req.params.id;
    var params = [body.name, body.info, body.price, body.discount];
    conn.query(sql, params, (err) => {
        if(err) console.log("query is not excuted : " + err)
        else res.sendStatus(200);
    })
})

// 상품 삭제
router.delete("/item/:id", (req, res) => {
    var sql = "delete from board where id=" + req.params.id;
    conn.query(sql, (err) => {
        if(err) console.log("query is not excuted : " + err)
        else res.sendStatus(200);
    })
})

module.exports = router