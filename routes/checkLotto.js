const express = require("express");
const router = express.Router();

const lottoData = require("../lottoData");
const { resolve } = require("path");

let isFist = 0;
let isSecond = 0;
let isThrid = 0;
let isFourth = 0;
let howManyMatched = 0;
let drwNo;
let prizeNum;
let winLotto = [];
router.post("/api/checkLotto", (req, res) => {
  isFist = 0;
  isSecond = 0;
  isThrid = 0;
  isFourth = 0;
  drwNo = 0;
  prizeNum = 0;
  inputData = req.body.inputData;
  inputNumData = [];
  inputData.forEach((element) => {
    inputNumData.push(parseInt(element));
  });
  checkLottoNum(inputNumData);
  console.log("---------------END-----------------");
  if (isFist) {
    return res.send({ isMatched: 1, order: 1, drwNo, prizeNum });
  } else if (isSecond) {
    return res.send({ isMatched: 1, order: 2, drwNo, prizeNum });
  } else if (isThrid) {
    return res.send({ isMatched: 1, order: 3, drwNo, prizeNum });
  } else if (isFourth) {
    return res.send({ isMatched: 1, order: 4, drwNo, prizeNum });
  }

  return res.send({ isMatched: 0, order: 0 });
});

//

function checkLottoNum(inputNumData) {
  winLotto = [];
  inputNumData = inputNumData.sort();
  for (i = 0; i < lottoData.length; i++) {
    comparedData = lottoData[i].slice(0, 6).sort();
    if (isFist) {
      break;
    }

    howManyMatched = 0;
    for (k = 0; k < 6; k++) {
      if (k == 2) {
        if (howManyMatched == 0) {
          break;
        }
      }

      for (j = 0; j < 6; j++) {
        if (inputNumData[k] == comparedData[j]) {
          howManyMatched = howManyMatched + 1;
        }
      }
      if (howManyMatched == 6) {
        isFist = 1;
        drwNo = lottoData[i][7];
        prizeNum = lottoData[i][8];
      } else if (howManyMatched == 5) {
        isThrid = 1;
        for (m = 0; m < 6; m++) {
          if (inputNumData[m] == lottoData[i][6]) {
            isSecond = 1;
            drwNo = lottoData[i][7];
            prizeNum = lottoData[i][8];
            break;
          } else {
            drwNo = lottoData[i][7];
            prizeNum = lottoData[i][8];
            isSecond = 0;
          }
        }
      } else if (howManyMatched == 4) {
        isFourth = 1;
        drwNo = lottoData[i][7];
        prizeNum = lottoData[i][8];
      }
    }
  }
}

//
module.exports = router;
