import requests
import sys
from bs4 import BeautifulSoup as bs
import json

headers = {
    'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    'Accept-Language' : "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3"
}

def getPageString(url) :
    productList = []
    data = requests.get(url, headers= headers)
    if data.status_code == 200 :
        soup = bs(data.content, "html.parser")

        ul = soup.select_one('ul#productList')

        ids = ul.select('li.search-product') # li.attrs('data-product-id')
        names = ul.select('li.search-product > a > dl > dt > img') # img.attrs('alt')
        hrefs = ul.select('li.search-product > a') # domain + a.attrs('href')
        images = ul.select('li.search-product > a > dl > dt > img') # img.attr('src')

        for i in range(len(ids)):
            price_info = ids[i].select_one('li.search-product > a > dl > dd > div > div.price-area')
            productList.append({
                "product_id" : ids[i]['data-product-id'],
                "product_name" : names[i]['alt'],
                "product_href" : "https://coupang.com" + (hrefs[i]['data-link'] if hrefs[i].get('data-product-link') == None else hrefs[i]['data-product-link']),
                "product_image" : images[i]['src'],

                "product_base_price" : (None if price_info.select_one('div > div > span > del') == None else price_info.select_one('div > div > span > del').get_text()),
                "product_discount" : (None if price_info.find(class_="instant-discount-rate") == None else price_info.find(class_="instant-discount-rate").get_text()),
                "product_price" : price_info.select_one('div > div > em.sale > strong').get_text(),
                "used_product_price" : (None if price_info.select_one('div > strong:nth-of-type(2)') == None else price_info.select_one('div > strong:nth-of-type(2)').get_text()),
                "soldout_state" : (None if price_info.select_one('div.out-of-stock') == None else price_info.select_one('div.out-of-stock').get_text())
            })
            i+=1
            
        print(productList)
    else :
        print("error : System Inner prob")


# 파이썬을 직접 실행하면 내부 변수 __name__에 __main__값이 할당된다. 따라서 if 함수가 실행됨
if __name__ == '__main__': 
    getPageString(sys.argv[1])