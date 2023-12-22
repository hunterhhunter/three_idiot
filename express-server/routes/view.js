var express = require('express');
var router = express.Router();

// db 연결
var db = require('../config/MysqlDB')
var conn = db.init();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("home", {
    user_id : req.user ? req.user.ID : ""
  })
})

router.get("/login", (req, res) => {
  res.render("login");
})

router.get("/signup", (req, res) => {
  res.render('signup')
})

// 상품 전체 조회 페이지
router.get("/items", (req, res) => {
  var sql = "select * from items";
  conn.query(sql, (err, result) => {
    if (err) {
      console.log("query is not excuted : " + err);
      res.send("Error occured : Please confirm the console message!")
    }
    else {
      console.log(result);
      res.render('showItems', {
        items : JSON.parse(JSON.stringify(result)),
        user_id : req.user ? req.user.ID : ""
      })
    }
  })
})

// 상품 상세 조회 페이지
router.get("/item/:id", (req, res) => {
  var sql = "select * from items where id=?";
  conn.query(sql, [req.params.id], (err, result) => {
      if (err) {
        console.log("query is not excuted : " + err);
        res.send("Error occured : Please confirm the console message!")
      }
      else {
        console.log(result)
        res.render('showItem',{
          item : result[0],
          user_id : req.user ? req.user.ID : ""
        })
      }
  })
})

// 상품 추가 페이지
router.get("/item/info", (req, res) => {
  res.render("addOrUpdateItem", {

  })
})

// 상품 수정 페이지
router.get("/item/info/:id", (req, res) => {
  var sql = "SELECT * FROM ITEMS where=?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("query is not excuted : " + err);
      res.send("Error occured : Please confirm the console message!")
    } else {
      res.render("addOrUpdateItem", {
        item : result,
        user_id : req.user ? req.user.ID : ""
      })
    }
  })
})

module.exports = router;

// https://hasumang.tistory.com/56
// https://hanwitjus.tistory.com/60
// https://naltatis.github.io/jade-syntax-docs/#for
// https://junspapa-itdev.tistory.com/9