'use strict';
var currentProductArray = [];
var lastProductArray = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productNamesPng = ['sweep'];
var productNamesGif = ['usb'];
var products = [];

function initProductData(productArray, ext){
  var returnArray = [];
  for (var i = 0; i < productArray.length; i++) {
    var productName = productArray[i];
    var filePath = 'img/' + productName + ext;
    var temp = new product (productName, filePath);
    returnArray.push(temp);
  }
  return returnArray;
}

var bag = new product ('bag', 'img/bag.jpg');
var banana = new product ('banana', 'img/banana.jpg');
var bathroom = new product ('bathroom', 'img/bathroom.jpg');
var boots = new product ('boots', 'img/boots.jpg');
var breakfast = new product ('breakfast', 'img/breakfast.jpg');
var bubblegum = new product ('bubblegum', 'img/bubblegum.jpg');
var chair = new product ('chair', 'img/chair.jpg');
var cthulhu = new product ('cthulhu', 'img/cthulhu.jpg');
var dogduck = new product ('dog-duck', 'img/dog-duck.jpg');
var dragon = new product ('dragon', 'img/dragon.jpg');
var pen = new product ('pen', 'img/pen.jpg');
var petsweep = new product ('pet-sweep', 'img/pet-sweep.jpg');
var scissors = new product ('scissors', 'img/scissors.jpg');
var shark = new product ('shark', 'img/shark.jpg');
var tauntaun = new product ('tauntaun', 'img/tauntaun.jpg');
var unicorn = new product ('unicorn', 'img/unicorn.jpg');
var watercan = new product ('water-can', 'img/water-can.jpg');
var wineglass = new product ('wine-glass', 'img/wine-glass.jpg');

var sweep = new product ('sweep', 'img/sweep.png');
var usb = new product ('usb', 'img/usb.gif');


function product(name, location){
  this.name = name;
  this.location = location;
  this.numTimesShown = 0;
  this.numTimesClicked = 0;
  this.id = this.name;
  // var num = Math.floor(Math.random() * imgArray.length);
  // console.log(num);
  // imgArray[num];
}
