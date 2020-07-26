const express = require("express")
const router = express.Router()

const lottoData = require("../lottoData")
const { resolve } = require("path")

let isMatched = 0

router.post("/api/checkLotto", (req, res) => {
  isMatched = 0
  inputData = req.body.inputData
  inputNumData = []
  inputData.forEach((element) => {
    inputNumData.push(parseInt(element))
  })
  checkLottoNum(inputNumData)
  return res.send({ isMatched })
})

//

function checkLottoNum(inputNumData) {
  for (i = 0; i < lottoData.length; i++) {
    if (isMatched) {
      break
    }
    compareArr(inputNumData, lottoData[i])
  }
}

function compareArr(arr1, arr2) {
  isMatched = 0
  input1 = arr1.sort()
  input2 = arr2.sort()

  if (JSON.stringify(input1) === JSON.stringify(input2)) {
    console.log("---------------Matched")
    isMatched = 1
  } else {
    isMatched = 0
  }
}

//
module.exports = router
