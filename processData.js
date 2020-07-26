const fs = require("fs")

const data2 = require("./sample")
const { resolve } = require("path")

array1 = [14, 27, 30, 31, 40, 42, 2]

function checkLottoNum() {
  for (i = 0; i < data2.length; i++) {
    compareArr(array1, data2[i])
  }
}

function compareArr(arr1, arr2) {
  arr1.sort()
  arr2.sort()

  if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    console.log("ok")
  } else {
    console.log("no")
  }
}

checkLottoNum()
