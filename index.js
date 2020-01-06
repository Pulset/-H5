var startBtn = document.getElementById("start"); // 开始按钮
var activeDiv = document.querySelector(".active"); // 移动光标
var start = false; // 是否已经开始抽奖
startBtn.addEventListener("click", () => {
  if (!start) {
    // 避免重复点击
    start = true;
    startBtn.style.backgroundColor = "rgba(239,239,235,0.8)";

    activeDiv.style.animation = "mymove1 1s 1";
    var selectProduct = shuffleProducts(); // 产生随机抽奖结果

    // 根据产生的抽奖结果，生成最后一圈的css动画帧
    var lastFrames = createLastFrames(selectProduct);

    // 把最后一圈的动画插入到文档中
    insertKeyFrames(lastFrames);
  }
});

activeDiv.addEventListener("animationend", function(e) {
  switch (this.style.animationName) {
    case "mymove1":
      activeDiv.style.animation = "mymove2 0.8s 2";
      break;
    case "mymove2":
      activeDiv.style.animation = "mymove3 0.5s 5";
      break;
    case "mymove3":
      activeDiv.style.animation = "mymove4 1s 2";
      break;
    case "mymove4":
      activeDiv.style.animation = "mymove5 1s 1";
      activeDiv.style.animationFillMode = "forwards"; // 保持最后一帧
      break;
    case "mymove5":
      startBtn.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
      start = false;
      break;
    default:
      break;
  }
});

// 把css动画插入到文档中
function insertKeyFrames(lastFrames) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML =
    "@keyframes mymove5 " +
    JSON.stringify(lastFrames)
      .replace(/"/g, "")
      .replace(/},/g, "}\n")
      .replace(/,/g, ";")
      .replace(/%:/g, "% "); // 根据正则生成正确的css语法
  document.getElementsByTagName("head")[0].appendChild(style);
}

function createLastFrames(selectProduct) {
  // 转一圈的完整动画的数据
  var posArr = [
    { top: "0px", left: "0px" },
    { top: "0px", left: "100px" },
    { top: "0px", left: "200px" },
    { top: "100px", left: "200px" },
    { top: "200px", left: "200px" },
    { top: "200px", left: "100px" },
    { top: "200px", left: "0px" },
    { top: "100px", left: "0px" }
  ];
  var index = selectProduct.index;
  posArr.splice(index + 1, posArr.length - index - 1);

  var lastFrames = {}; // 生成最后一圈的动画数据
  var step = Math.round(100 / (posArr.length - 1));
  lastFrames["0%"] = posArr[0];
  for (var i = 1; i < posArr.length - 1; i++) {
    lastFrames[step * i + "%"] = posArr[i];
  }
  lastFrames["100%"] = posArr[posArr.length - 1];

  return lastFrames;
}
