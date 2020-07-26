let balls = [0, 0, 0, 0, 0, 0]
const keyboardNum = document.querySelectorAll("[data-keyNum]")
const bollNum = document.querySelectorAll("[data-ballNum]")
console.log(bollNum)

keyboardNum.forEach((num) => {
  num.addEventListener("click", function () {
    let targetNumber = this.getAttribute("data-keyNum")
    let isExistNum = balls.find((num) => num == targetNumber)

    if (!isExistNum) {
      let targetBackgroundColor = getNumColor(targetNumber)
      let ballNum = balls.indexOf(0)
      let targetBall = document.querySelector(`[data-ballNum="${ballNum}"]`)
      changeColor(targetBall, targetBackgroundColor)
      changeColor(this, targetBackgroundColor)
      console.log(targetBall)
      targetBall.innerHTML = targetNumber
      balls[ballNum] = targetNumber
      console.log(balls)
    } else {
      deleteBall(targetNumber)
      undoKeyboard(this)
    }
  })
})

function getNumColor(num) {
  colorNum = parseInt(num / 10)
  switch (colorNum) {
    case 0:
      return "#fbc400"
      break
    case 1:
      return "#69c8f2"
      break
    case 2:
      return "#ff7272"
      break
    case 3:
      return "#aaaaaa"
      break
    case 4:
      return "#b0d840"
      break
  }
}

function changeColor(target, targetBackgroundColor) {
  target.style.backgroundColor = targetBackgroundColor
  target.style.color = "white"
  /*   target.style.border = "2px solid black" */
}

function deleteBall(targetNumber) {
  let overlap = balls.findIndex((ele) => ele == targetNumber)
  let deleteTargetBall = document.querySelector(`[data-ballNum="${overlap}"]`)
  balls[overlap] = 0
  console.log(deleteTargetBall)
  deleteTargetBall.style.backgroundColor = "white"
  deleteTargetBall.style.border = "1px soild black"
}

function undoKeyboard(div) {
  div.style.backgroundColor = "#e0e0e0"
  div.style.color = "gray"
}
