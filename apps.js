'use strict';
var currentProductArray = [];
var lastProductArray = [];
var productNamesJpg = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productNamesPng = ['sweep'];
var productNamesGif = ['usb'];
var products = [];
var randomImages = document.getElementById('displayImages');

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

var jpgProducts = initProductData(productNamesJpg, '.jpg');
var pngProducts = initProductData(productNamesPng, '.png');
var gifProducts = initProductData(productNamesGif, '.gif');

products = [].concat(jpgProducts, pngProducts, gifProducts);

// \n is the escape character for a newline
console.log('Products: ', products);

function createProductImage(product) {
  var randomImg = document.createElement('img');
  randomImg.src = product.location;
  randomImg.id = product.name;
  randomImg.width = 300;
  randomImg.addEventListener('click', function (event){
    console.log('imageclick: ', event.target.id);
  });
  return randomImg;
  // randomImages.appendChild(randomImg);
}

function randomProductIndex () {
  return Math.floor(Math.random() * products.length);
}

function getUniqueRandom (previousNumbers) {
  var newRand = randomProductIndex();
  var uniqueRandFound = false;
  while (!uniqueRandFound) {
    if (previousNumbers.indexOf(newRand) === -1) {
      uniqueRandFound = true;
    } else {
      newRand = randomProductIndex();
    }
  }
  return newRand;
}

function createProductSet (lastSet) {
  var numProductsShown = 3;
  while (randomImages.firstChild) {
    randomImages.removeChild(randomImages.firstChild);
  }
  // console.log(products.length);
  var usedRandomIndicesForSet = lastSet || [];
  for (var i = 0; i < numProductsShown; i++) {
    // console.log('i: ', i);
    var prodIndex = getUniqueRandom(usedRandomIndicesForSet);
    // console.log('prodIndex: ', prodIndex);
    usedRandomIndicesForSet.push(prodIndex);
    console.log('usedRandomIndicesForSet: ', usedRandomIndicesForSet);
    var randomProduct = products[prodIndex];
    randomProduct.numTimesShown++;
    console.log('product being used: ', randomProduct);
    var randomProductImage = createProductImage(randomProduct);
    randomImages.appendChild(randomProductImage);
  }
  return usedRandomIndicesForSet;
}

var lastProductSet = [];
document.getElementById('newSet').addEventListener('click', handleNewSetClick);

function handleNewSetClick(event) {
  console.log('event: ', event.target.id);
  console.log('newSet, lastProductSet: ', lastProductSet);
  if (lastProductSet.length === 6) lastProductSet = [];
  lastProductSet = createProductSet(lastProductSet);
}
