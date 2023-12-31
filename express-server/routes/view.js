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

// 로그인 페이지
router.get("/login", (req, res) => {
  res.render("login");
})

// 회원가입 페이지
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

// 쿠팡 아이템 검색 기능
router.get("/item/search" , async (req, res) => {
  try {
    const response = await fetch('https://coupang.com/');

    if(!response.ok) throw new Error(`Error! status: ${response.status}`)

    const headers = await response.headers
    console.log(headers)
    res.render("home")
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;

// https://hasumang.tistory.com/56
// https://hanwitjus.tistory.com/60
// https://naltatis.github.io/jade-syntax-docs/#for
// https://junspapa-itdev.tistory.com/9

// const CoupangSearchRequest = new XMLHttpRequest();
// const searchUrl = `https://www.coupang.com/np/search?component=&q=${req.params.name}&channel=user`
// // 요청 시 요청 헤더가 포함되어야 함.
// var header = {
//   Accept : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//   Cookie : ""
//   // cookie = 
//   // sid, PCID, MARKETID, x-coupang-accept-language=ko-KR; x-coupang-target-market, _fbp,
//   // searchKeyword, bm_sz
//   // overrideAbTestGroup, ak_bmsc, _abck, cto_bundle, bm_sv, baby-isWide

//   // _fbp, searchKeyword, searchKeywordType, cto_bundle, baby-isWide coupang.com 접속시 없는 쿠키들
//   // searchKeywordType = {" "}
// }
// // 이 두개만 있어도 되더라, 요청은 GET으로 나머지는 POSTMan으로 실행
// CoupangSearchRequest.open("GET", url, true);
// CoupangSearchRequest.onload = () => {
//   var htmlText = CoupangSearchRequest.responseText;
//   // coupang 검색을 결과를 text로 가져옴


//   // html text에서 product_id를 기준으로 text spilt
//   // 의문점 2번째 이후의 페이지에 대해서는 어떻게 처리해야 되는가
  
//   // 처리 이후 json으로 데이터 가공, 가공한 것들 res.render로 보내주기 
// }