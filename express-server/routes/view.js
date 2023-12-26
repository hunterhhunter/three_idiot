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

router.post("/item/search/:name" , (req, res) => {
  const CoupangRequest = new XMLHttpRequest();
  const url = `https://www.coupang.com/np/search?component=&q=${req.params.name}&channel=user`
  // 요청 시 요청 헤더가 포함되어야 함.
  var header = {
    Accept : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    Cookie : "sid=e7f7adfc441c43a7a93f2f559c38a8c9088400d7; PCID=26761768747758425000008; MARKETID=26761768747758425000008; x-coupang-accept-language=ko-KR; x-coupang-target-market=KR; _fbp=fb.1.1703577610611.1793400352; searchKeyword=%EC%95%88%EB%85%95; searchKeywordType=%7B%22%EC%95%88%EB%85%95%22%3A0%7D; bm_sz=76528B8F93E037E1414A255491FB9A16~YAAQZA3VF/zsDJ2MAQAAfSBlphYjMLOI6kKat6uL28H0VuBv4NxtdA43XfA+NH2z0ej5FDJ12qukXwipCc2EymjI7hpiaVlOQUfFFQFB5BmEsLnpATEnfldra+Ha7I1LenOMCDlvpXmHFFu0GL7Iiu1OzEUXc854R5CfyUOw4FONjV1Yrcat0BPJQXLMJSuZ5cOVVPGoxyHr2NX5/+sX+U1oDEeptThrewr4EgFn5LNsRgsFrctn4ibn8RJqZxG0wNHt1j9CUvVNagktHC8UPJMgtMDXLpbbtzMlzRzzEF8u/vq4yBXmTR2l4f9p/auFlV+t+x7qYQ+kk+E17g==~3225136~3485746; overrideAbTestGroup=%5B%5D; ak_bmsc=C4C0C11EE8282DB3744FA550DAC1E4A7~000000000000000000000000000000~YAAQdQ3VF7puG26MAQAA/U/jphZvUOKcwgdUBpmiKDEVOoNkQmUSj/QOLTCEn7yst3hvp4BsGWsF0BHNwkZApUu26ZdV8kJ7Rmpd7R0qK7zhHi0wokllpcSYRda3Nc/2pj8DzcLosvazty1zvTm8qv7v7ixAW6AxsmLmfVgKEjXfvQ8QC2kSYxelfOnqgNYXsGtDjWW1wizeRAUNxQ9LHVhTrKHRZoJPFX7xgcBp+IiO5Zzw46S/y6zcwqpNrkBJtsY51SNyb4kRLIifHojnJUgxHgVDAXL5sBTw0LbbG4yjl1HxEdw3l0R0Q089wphcMkkg6tmQxawXKpjlK7uF4CpvBevvKHkvcjygkT16/W524wBaN90SFLLt/SnOawiKWgOjbxiYADvLq/abSyY92J45nsAaWT8gcEu7nnZv7UMLTGzZM+64TgEZNcGfZvMHzq/inyHxHg8b49OcoOsi0xo31Bm11Z/W0Od4ULG+wkUjE+83Wpyo14sfy3ltSo0=; _abck=B2B459FA01F5C718274B74244B497DB8~0~YAAQdQ3VF2WFG26MAQAArpnjpgu9hdMVn9Vw1XqepNq+yFPU3PNn95GrU3DN8vhWHRlnPnNkkS3wZkfraO+32l+dhjSnSxgd0SPewYiIEZYrZR9oUYXMO+snSCsUv9fEJko/VFBsaVl64rENGrHms7aC+TEIxJVf9eCvh5jwHkzX+4JMtwIr3O8E6c6DC/JNK6jCEhkNxdpBBYhSfoA4LG6d9M3zP5fUyO7ERUsiDMDhkuoO9vCO8eJHzqhW8iBKenyqR0yWWUzNhv/hKQMinlHtI8GGoUuh8nZ/Gbkplz+x0KgUQS1I/JEP2ruBFlh3aC8YYczB2UBJZZVO9dqSTtdLEiCH419PWDWYTRttdEX8qWasgQYtIbDmM2oKmoBeAFIEphy1s3ps5DbTlfo6FiwaGeeyLmju8y5bT/f0iVqDqE1yAFv3~-1~-1~-1; cto_bundle=7lDqh19zUk5wWDBJOFhLYjh2bFF0T0NGS21IZ3phJTJCdktJYWdRYlV3dmF1c2drYko3d1JzTWVYJTJCSEhiZU5RT3Y4dEFQcGtxbXJpVXN1b3V1aVh5S1NRQks2NUUlMkZIWGFyMWlubmtxcFglMkJhOXJhcHhianBVNXd0RUN3QlhXMHphMW1JUkpZSFkyNllNSUdOTTU1MmdpS1laME1kUXNwYlBGdk1yMWxGYkp5dFFuSk9GZjltRVp4OTNjRVZJR3ZtdE1hSiUyQlFIWHNUaWFSZlNQUnFJUHR1VWY5eThjWHZyMzYyWlFIaW1IMkl4WTB5NmxhTVlKOG5TdWxCQ2pmaGVNVWJpYWElMkZuOTFkTm5aZThPNEFHNEo3cXdLcVJYWFZZZG04JTJGSFdmd3klMkZNTDJsWUpKYktVVlZHVThEOGZ6dUJWQjR6dkJiTm0; bm_sv=12AE842FE546C0286511FD89B83A7B84~YAAQdw3VFyCF9XSMAQAAszL0phYcJIjmIsze8bCUfdwXKkFaE84THCaJoAmIQ2VtLdOVl8o1NQUYZsffzCJaYPUzYdHXsXDzv7PD3Qb5QTXwVoCufCv6ncbuPDbeCC/eR7jhiBAa4CEuNrLzWpmXEmKB3wSfBiWBAqImzDXVyIG+GIWd4gEqTGIpLdsjNOheWoXyH5JjQxfIfLamz+shYdNHXP9xRRBppbX+aUraRTlSUFR9sjv3qQ9/F3+fXq02YYQ=~1; baby-isWide=small"
  }
  // 이 두개만 있어도 되더라, 요청은 GET으로 나머지는 POSTMan으로 실행
  CoupangRequest.open("GET", url, true);
  CoupangRequest.onload = () => {
    var htmlText = CoupangRequest.responseText;
    // coupang 검색을 결과를 text로 가져옴


    // html text에서 product_id를 기준으로 text spilt
    // 의문점 2번째 이후의 페이지에 대해서는 어떻게 처리해야 되는가
    
    // 처리 이후 json으로 데이터 가공, 가공한 것들 res.render로 보내주기 
  }
})

module.exports = router;

// https://hasumang.tistory.com/56
// https://hanwitjus.tistory.com/60
// https://naltatis.github.io/jade-syntax-docs/#for
// https://junspapa-itdev.tistory.com/9

