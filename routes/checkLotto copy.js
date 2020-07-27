const express = require("express")
const router = express.Router()

const lottoData = require("../lottoData")
const { resolve } = require("path")

let isFist = 0
let isSecond = 0
let isThrid = 0
let howManyMatched = 0
let winLotto = []
router.post("/api/checkLotto", (req, res) => {
  isFist = 0
  isSecond = 0
  inputData = req.body.inputData
  inputNumData = []
  inputData.forEach((element) => {
    inputNumData.push(parseInt(element))
  })
  checkLottoNum(inputNumData)
  console.log("---------------END-----------------")
  if (isFist) {
    return res.send("1등")
  } else if (isSecond) {
    return res.send("2등")
  }
})

//

function checkLottoNum(inputNumData) {
  winLotto = []
  inputNumData = inputNumData.sort()
  for (i = 0; i < lottoData.length; i++) {
    comparedData = lottoData[i].slice(0, 6).sort()
    if (isFist) {
      break
    }

    console.log("check for문이 실행됨")
    howManyMatched = 0
    for (k = 0; k < 6; k++) {
      if (k == 2) {
        if (howManyMatched == 0) {
          break
        }
      }

      for (j = 0; j < 6; j++) {
        if (inputNumData[k] == comparedData[j]) {
          howManyMatched = howManyMatched + 1
        }
      }
      if (howManyMatched == 6) {
        console.log("shitttt is matCHeD!")
        isFist = 1
      } else if (howManyMatched == 5) {
        isSecond = 1
      }
    }
  }
}

function compareArr(arr1, arr2) {
  /*   isFist = 0 */
  input1 = arr1.sort()
  input2 = arr2.sort()
  return new Promise((resolve, reject) => {
    for (k = 0; k < 6; k++) {
      for (j = 0; j < 6; j++) {
        if (input1[k] == input2[j]) {
          howManyMatched = howManyMatched + 1
        }
      }
    }
    resolve(howManyMatched)
  })
}

//
module.exports = router
