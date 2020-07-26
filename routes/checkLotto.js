const express = require("express")

const router = express.Router()

router.post("/api/checkLotto", (req, res) => {
  inputData = req.body.inputData
  inputNumData = []
  inputData.forEach((element) => {
    inputNumData.push(parseInt(element))
  })
  console.log(inputNumData)
  checkLottoNum(inputNumData)
  return res.send({ result: isMatched })
})

//

const data2 = require("../sample")
const { resolve } = require("path")
let isMatched = 0
function checkLottoNum(inputData) {
  for (i = 0; i < data2.length; i++) {
    if (isMatched) {
      break
    }
    compareArr(inputData, data2[i])
  }
}

function compareArr(arr1, arr2) {
  input1 = arr1.sort()
  input2 = arr2.sort()

  if (JSON.stringify(input1) === JSON.stringify(input2)) {
    console.log("---------------Matched")
    isMatched = 1
  } else {
    console.log("---------------FAIL")
  }
}

//
module.exports = router
