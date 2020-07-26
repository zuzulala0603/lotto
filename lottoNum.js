const axios = require("axios")

const test = axios.get("https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=902")

test.then((test) => console.log(test.data))
