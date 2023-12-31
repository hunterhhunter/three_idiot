var express = require('express');
var router = express.Router();

var ChildProcess = require("child_process")
const iconv = require('iconv-lite')
// 한글 깨짐 방지를 위한 decoder

router.get("/", (req, res) => {
    const python = ChildProcess.spawnSync('python', ['./public/python/crawling.py', "박인성", 23])
    var result = iconv.decode(python.stdout, 'euc-kr')
    // utf-8은 한글 파일 깨짐

    res.send(result)
})

module.exports = router;