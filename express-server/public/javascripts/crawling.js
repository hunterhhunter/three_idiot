const axios = require("axios");
const cheerio = require("cheerio");

function getProduct(url) {
  return axios.get(url, {
    headers: {
      'User-agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  }).then((html) => {
    return(html.data)
  })
}
module.exports = { getProduct };


// 실패















// const axios = require("axios")
// const cheerio = require("cheerio")
// axios.default.timeout = 5 * 1000

// // div.search-content ul li

// let html = "";

// const getHtml = async (search_word) => {
//     try {
//         return await axios.get(`https://www.coupang.com`, {
//             headers: {
//                 Cookie: "MARKETID=3128625959814574611334; PCID=3128625959814574611334; _abck=B2B459FA01F5C718274B74244B497DB8~-1~YAAQdg3VF8K1/HOMAQAA0kjruQt3fY3tTaCCJVCcnwLN++HQms82A9bD56xHFcKRcos2Kfu3nYErO+oGmBm87YXIef35mL58exd6vYE+n8b21tWJxIkxijwRy4IZvQgd/N19JZDEZfI7m4+gzJsDM/2VgypHkHoe4ta1Nna8ZbvxaBpjx+fWfORJgdXDqW2EpqLZGPGuz+cF7lFaur2nDAw2kyw2moMNVhqzYIekCE32j35IG+IEyWzr6ux5SI3aV1n8vGVkbM2RVuisuSwYuFM0y3h4FcWQcmsXxjntta0hhMV4Ohal1GSMLcu+iN6bRGCLVKMuETfx/ObLVLtmIuIxx2uCppl/b/NDeS3E8dHW/dNA7fM2mLrg5YxA9Ee2rAJbtQLouvM5FO0fBNDXjuj03PyjpS/0I1JbckSUSPq2EHYZMA0evA==~-1~-1~-1; ak_bmsc=0478F021FCB4E904DB09EC5E882CBB41~000000000000000000000000000000~YAAQdg3VF8O1/HOMAQAA0kjruRY37mc3vAjqSvIdDQfW1kD+7L6mf25lfPQEP+Vl0CGICIjwYU+ZEZm95Pkd395/Bgat7XOBpmX5LDKGUFq/HfYXuRZTqqZ5hN4HI0Cnj+ED8upr85lilnxozq88Tli2xaiyDd44mcarYqyRBhprG6dVuXydhUyFVOZmj/3wAvnh7aKGqHX0Qtg9F3/1MjLbcJIVyyZ3rKnxoJ6vsp8pcFk/3cvMVT5kKPmgdseiCxFuhv0GCJvOg7VirVrwtcLw6gMhsNBmMWokqX/5scWFbQaZLYQh7NEr/0qXYysYi2zp9Ood7BG5h9idyX8rkJKXq1+6bFijYwZaW+9NXY+zy/ZQgfUK9L+7hbk=; bm_mi=DB99F14774D1C4AE84D0CE102E92436A~YAAQZQ3VFyP4f3OMAQAAfPlOuhbNz/8fC9q6ifOdvwip2t49WsnwPb8WpMW+tUCZoMn6togaLgINb8b9UQGJSxV2U3KfOAQ/KwI16EhePsTyPvdYJ8wJL1V36xIVjCar/H3FIf6kRfpdsJxjZZ6G2kTytkwkT5GjPFdwHo2nSD3oQD5NY6j4mGbSGmWHsjhBxt1UHSHR7wK8CFA11clgzzYUtywQ671KuM2A4TZ6CMXTANmyT7Jw54Eo21r6L4VtLf91HIBr5tlupM3pcyYjNKvO9OGUU+BKR+HHsx6UU0b9e7iCRMjxxM21MS2qg+SqltWOyDbajg==~1; bm_sv=3F318860FAB42F569552D4E4DC21A3F1~YAAQZQ3VFyT4f3OMAQAAfPlOuhaUDxNFR8RJrZTZN7aYryG8ES49an+02QTXUHLzuihJhURKy4WPZyHP++Ez21wNeHy+9H3FU9LFTUgNfyIMrOhVaUFWHZ3GutfW7/9oq2DO6DIOAauJbVePhaq925bkeOsYH6o4xTQcsSJLTz3c24XoZRo/pIQxhoV82rifyYyy7bvSztuZg2N++LTyI8bCoWGvXHweNXILXS3iA3nkcGswsfwie+AdQQQSo9Hwug==~1; bm_sz=301F48CD9A726E684813D544300E38E0~YAAQdg3VF8W1/HOMAQAA0kjruRYNdA9oPK/Ma27PeDgbBxpYM5tb2pYQUL2Q0IQ94JhT7dwgTqt06ncss3ffUWDth5Qv3j9CdL0+PhS+AOFiBaL76/VjkZnxPCLx20jw2nIt285kXZ42ycaRpKYRtvhkqQLR5KKy7k/u0ooFN47kMWckrARtaXtx3VYQeimzRCYk4bWbNT1RO0dk+DC8eiHXQ92XnvBPEQmk6QcD0Q5/24EtO5c2HMVtQQcRNkFEk0/bWCgvjRSB+zP1+Di+ddQ5LjG+tc7iB3PmjKt/ZB5dq3xAcPcGhtCg3ONf8cTY7EhGOQ==~3684676~4404276; overrideAbTestGroup=%5B%5D; sid=e7f7adfc441c43a7a93f2f559c38a8c9088400d7; x-coupang-accept-language=ko-KR; x-coupang-target-market=KR"
//             }
//         })
//     } catch (error) {
//         console.error(error)
//     }
// }

// const getProduct = async (search_word) => {
//     if(!html) {
//         html = await getHtml(search_word);
//     }

//     let ulList = [];
//     const $ = cheerio.load(html.data);
//     console.log(html.data)
    
//     $("div.search-content ul.search-product-list").children("li")
//     .each(async (i, ele) => {
//         ulList[i] = {
//             product_id : $(ele).attr("data-product-id"),
//             product_url : $(ele).find('a.search-product-link').attr('href'),
//             image_url : $(ele).find('a.search-product-link').find("dl").find("dt").find("img").attr('src'),
//             image_alt : $(ele).find('a.search-product-link').find("dl").find("dt").find("img").attr('alt'),
//             product_name : $(ele).find('a.search-product-link').find("dl").find("dd").find("div").find("div.name").text(),
//             // product_sale : {
//             //     rate : $(ele).find('a.search-product-link dl dd div div.price-area div div.price span span.instant-discount-rate').text(),
//             //     base_price : $(ele).find('a.search-product-link dl dd div div.price-area div div.price span del.base-price').text(),
//             // },
//             // product_value : $(ele).find('a.search-product-link dl dd div div.price-area div div.price em strong').text(),
//             // used_product_value : $(ele).find('a.search-product-link dl dd div div.price-area div.used-product-info').children('strong')[1].text()
//             // 3가지 종류 : advertisement, searching-result, used-product
//             // 광고 혹은 검색 상품 인 경우 used_product_value가 null
//             // 중고 상품 인 경우 product_value가 null
//         }
//         console.log(ulList[i])
//     })

//     return html.data
// }

// module.exports = getProduct;

// 코드를 설명 드리자면 getHtml 함수는 axios.get 함수를 이용하여 비동기로 스포츠 뉴스의 html 파일을 가져옵니다. 그 후 반환되는 Promise 객체에 cheerio를 이용하여 데이터를 가공합니다.

// getHtml함수의 then 메서드의 내부 동작을 설명하기 전에 cheerio의 함수들의 기능들을 설명하겠습니다.

// load : 인자로 html 문자열을 받아 cheerio 객체를 반환합니다.
// children : 인자로 html selector를 문자열로 받아 cheerio 객체에서 선택된 html 문자열에서 해당하는 모든 태그들의 배열을 반환합니다.
// each : 인자로 콜백 함수를 받아 태그들의 배열을 순회 하면서 콜백함수를 실행합니다.
// find : 인자로 html selector 를 문자열로 받아 해당하는 태그를 반환합니다.
// 저는 이 cheerio의 함수들을 사용하여 뉴스의 html 페이지에서 제가 필요로 하는 뉴스 목록만을 반환 받아 log 함수로 출력하였습니다.