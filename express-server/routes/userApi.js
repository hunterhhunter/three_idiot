var express = require('express');
var router = express.Router();
const passport = require("passport")

var db = require('../config/MysqlDB')
var conn = db.init();

// 로그인 api, form태그로 post 요청시 실행
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true})
)
// authenticate 함수에서 첫 번째 파라미터는 strategy = local(ID/PW에 의한 로그인)
// failureFlash는 fail 메세지를 출력할지 않할지

// 로그아웃 api
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err)
        res.redirect('/')
    });
})

// 회원가입 api
router.post('/signup', (req, res) => {
    var sql = "INSERT INTO users (email, passwd, created_at, modified_at) VALUES (?, ?, NOW(), NOW())";
    conn.query(sql, [req.body.email, req.body.password], (err) => {
        if(err) {
            console.log("query is not excuted : " + err)
            res.redirect('/signup')
        }
        else {
            console.log('SignUp Success')
            res.redirect('/')
        }
    })
})

// 비밀번호 찾기 api
router.post('/forget', (req, res) => {
    var sql = "SELECT * FROM USERS where email=?"
    conn.query(sql, [req.body.email], (err, result) => {
        if(err) {
            console.log("query is not excuted : " + err)
            res.redirect('/signup')
        } else {
            console.log('result : ' + result)
        }
    })
})

// 비밀번호 수정 api
router.post('modify', (req, res) => {
    var sql = "UPDATE users SET passwd=?, modified_at=NOW() where email=?"
    conn.query(sql, [req.body.password, req.body.email], (err) => {
        if(err) {
            console.log("query is not excuted : " + err)
            res.redirect('/signup')
        }
    })
})

module.exports = router;