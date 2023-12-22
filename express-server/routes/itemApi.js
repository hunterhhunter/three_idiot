var express = require('express');
var router = express.Router();

var db = require('../config/MysqlDB')
var conn = db.init();

// 상품 상세 조회
router.get('/items/:id', (req, res)=> {
    var sql = "select * from items where id=" + req.params.id;
    conn.query(sql, (err, result) => {
        if (err) console.log("query is not excuted : " + err);
        else res.send(result);
    })
})

router.post('/basket', (req, res) => {
    var sql = "select basket from users where id=?"
    conn.query(sql, [req.user.ID], (err, result) => {
        if(err) console.log("query is not excuted : " + err);
        else {
            var basketArray = JSON.parse(result[0]) // 배열 자료형
            basketArray[basketArray.length] = req.body.itemId 
            sql = "UPDATE users SET basket=? WHERE id=?"
            conn.query(sql, [JSON.stringify(basketArray), req.user.ID], (err, result) => {
                if(err) console.log("query is not excuted : " + err);
                else {
                    res.write(`<script>var result = confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?')</script>`);
                    res.write(`<script>if(result){window.location=\"/mypage/basket\"}else{window.location=\"/item:${req.body.itemId}\"}</script>`);
                }
            })
        }
    })
})




module.exports = router