const axios = require("axios");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");

let drwNo = 1;
let result = [];
let result2 = [];

async function saveLottoData() {
  for (var i = 1; i < 920; i++) {
    await getData(i).then((data) => {
      result[i - 1] = [
        data.drwtNo1,
        data.drwtNo2,
        data.drwtNo3,
        data.drwtNo4,
        data.drwtNo5,
        data.drwtNo6,
        data.bnusNo,
        data.drwNo,
        data.firstWinamnt,
      ];
    });
  }

  fs.writeFileSync("lottoData.txt", JSON.stringify(result), "utf8");
}

function getData(num) {
  return new Promise(function (resolve, reject) {
    const lottoData = axios.get(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${num}`).then((data) => {
      if (data.data.drwNo) {
        resolve(data.data);
      } else {
        reject("error");
      }
    });
  });
}

saveLottoData();
