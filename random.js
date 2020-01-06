var products = [
  {
    name: "华为",
    percent: "0.5", // 设置商品的抽中概率，所有商品加起来最好为1
    index: 0 // index的值必须是顺时针转动的下标
  },
  {
    name: "iPhone X",
    percent: "0.071",
    index: 1
  },
  {
    name: "谢谢惠顾",
    percent: "0.071",
    index: 2
  },
  {
    name: "小熊抱枕",
    percent: "0.071",
    index: 3
  },
  {
    name: "小度音箱",
    percent: "0.071",
    index: 4
  },
  {
    name: "电风扇",
    percent: "0.071",
    index: 5
  },
  {
    name: "格力冰箱",
    percent: "0.071",
    index: 6
  },
  {
    name: "手环",
    percent: "0.071",
    index: 7
  }
];

function shuffleProducts() {
  var arr = [];
  for (var i = 0; i < products.length; i++) {
    products[i].num = Math.round(products[i].percent * 1000);
    for (var j = 0; j < products[i].num; j++) {
      arr.push(products[i]);
    }
  }
  arr.shuffle();
  console.log(arr[0]);
  return arr[0]; // 返回随机选中的数据
}

// 洗牌算法
Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};
