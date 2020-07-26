const axios = require("axios")
const fs = require("fs")
const { resolve } = require("path")
const { rejects } = require("assert")

let drwNo = 1
let writer = fs.createWriteStream("big.txt")
let result = []
let result2 = []

/* async function saveLottoData() {
  for (var i = 1; i < 3; i++) {
    await getData(i).then((data) => {
      result.push(data)
    })
  }
  console.log(result)
  fs.writeFileSync("sample.txt", JSON.stringify(result), "utf8")
}
 */

async function saveLottoData() {
  for (var i = 1; i < 3; i++) {
    await getData(i).then((data) => {
      result[i - 1] = [data.drwNo, data.drwtNo1]
    })
  }
  console.log(result)
  fs.writeFileSync("sample.txt", JSON.stringify(result), "utf8")
}

function getData(num) {
  return new Promise(function (resolve, reject) {
    const lottoData = axios.get(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${num}`).then((data) => {
      if (data.data.drwNo) {
        resolve(data.data)
      } else {
        reject("error")
      }
    })
  })
}

saveLottoData()
/* for (let drwNo = 1; drwNo < 10; drwNo++) {
  const lottoData = axios
    .get(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`)
    .then((data) => {
      result.push(data.data)
    })
    .catch((err) => {
      console.log(err)
    })
    .then(() => console.log(result))
    .catch((err) => {
      console.log(err)
    })
} */
/* for (let drwNo = 1; drwNo < 10; drwNo++) {
  const lottoData = axios
    .get(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`)
    .then((data) => {
      console.log(data.data.drwNo)
      result.push(data.data.drwNo)
    })
    .catch((err) => {
      console.log(err)
    })
}
console.log(result) */
/* fs.writeFileSync("big.txt", result, "utf8") */
/* for (let i = 0; i < 50; i++) {
  fs.writeFileSync("target.txt", JSON.stringify(data.data), "utf8")
} */
