let balls = [0, 0, 0, 0, 0, 0];
const keyboardNum = document.querySelectorAll("[data-keyNum]");
const bollNum = document.querySelectorAll("[data-ballNum]");

keyboardNum.forEach((num) => {
  num.addEventListener("click", function () {
    let ballNum = balls.indexOf(0);
    let targetNumber = this.getAttribute("data-keyNum");
    let isExistNum = balls.find((num) => num == targetNumber);
    let hasZero = balls.includes(0);
    let ZeroNum = balls.filter((ball) => ball == 0).length;
    /*   console.log(ballNum) */
    if (!isExistNum) {
      let targetBackgroundColor = getNumColor(targetNumber);
      let targetBall = document.querySelector(`[data-ballNum="${ballNum}"]`);

      if (hasZero) {
        changeColor(targetBall, targetBackgroundColor);
        changeColor(this, targetBackgroundColor);
        targetBall.innerHTML = targetNumber;
        balls[ballNum] = targetNumber;
      }
      if (ZeroNum == 1) {
        showResult();
      }
    } else {
      deleteBall(targetNumber);
      undoKeyboard(this);
    }
  });
});

function getNumColor(num) {
  colorNum = parseInt(num / 10);
  switch (colorNum) {
    case 0:
      return "#fbc400";
      break;
    case 1:
      return "#69c8f2";
      break;
    case 2:
      return "#ff7272";
      break;
    case 3:
      return "#aaaaaa";
      break;
    case 4:
      return "#b0d840";
      break;
  }
}

function changeColor(target, targetBackgroundColor) {
  target.style.backgroundColor = targetBackgroundColor;
  target.style.color = "white";
  /*   target.style.border = "2px solid black" */
}

function deleteBall(targetNumber) {
  let overlap = balls.findIndex((ele) => ele == targetNumber);
  let deleteTargetBall = document.querySelector(`[data-ballNum="${overlap}"]`);
  balls[overlap] = 0;
  /*  console.log(deleteTargetBall) */
  deleteTargetBall.style.backgroundColor = "white";
  deleteTargetBall.style.border = "1px soild black";
}

function undoKeyboard(div) {
  div.style.backgroundColor = "#e0e0e0";
  div.style.color = "gray";
}

function showResult() {
  $.ajax({
    type: "post",
    url: "/api/checkLotto",
    data: { inputData: balls },
    success: function (data) {
      console.log(data);
      if (data.isMatched) {
        console.log("당첨됨");
        showPrize(data.order, data.drwNo, data.prizeNum);
      } else {
        showAlert();
      }
    },
  });
}

function showAlert() {
  console.log("showalert");
  Swal.fire("아쉽습니다", "해당 번호는 역대 로또 1~4등 당첨번호에 없습니다", "error");
}

function showPrize(order, drwNo, prizeNum) {
  document.getElementById("prize").style.display = "block";
  document.getElementById("keyboard").style.display = "none";
  document.querySelector(".prize__drwNo").innerHTML = drwNo + "회차";

  switch (order) {
    case 4:
      prizeNum = 50000;
      break;
    case 3:
      prizeNum = generateRandom(1000000, 200000);
      break;
    case 2:
      prizeNum = generateRandom(40000000, 60000000);
      break;
    case 1:
      if (prizeNum == 0) {
        prizeNum = generateRandom(900000000, 120000000);
      }
      prizeNum = prizeNum;
      break;
  }
  prizeNumWithComma = addComma(prizeNum);
  document.querySelector(".prize__prizeNum").innerHTML = "당첨금 : " + prizeNumWithComma + "원";
  document.querySelector(".prize__order").innerHTML = order + "등";
}
function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};
