'use strict';

var nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productNamesJpg = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productNamesPng = ['sweep'];
var productNamesGif = ['usb'];
var products = [];
var totalClicks = 0;

function Product(name, location){
  this.name = name;
  this.location = location;
  this.numTimesShown = 0;
  this.numTimesClicked = 0;
}

function initProductData(productArray, ext){
  var returnArray = [];
  for (var i = 0; i < productArray.length; i++) {
    var productName = productArray[i];
    var filePath = 'img/' + productName + ext;
    var temp = new Product(productName, filePath);
    returnArray.push(temp);
  }
  return returnArray;
}

var jpgProducts = initProductData(productNamesJpg, '.jpg');
var pngProducts = initProductData(productNamesPng, '.png');
var gifProducts = initProductData(productNamesGif, '.gif');
products = [].concat(jpgProducts, pngProducts, gifProducts);

var randomImages = document.getElementById('displayImages');

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

var img1 = document.getElementById('left');
var img2 = document.getElementById('center');
var img3 = document.getElementById('right');

var lastProductSetIndices = [];
function createUniqueProductSet(lastSet) {
  var numProductsShown = 3;
  var uniqueProductSetArray = [];
  var lastIndicesForSet = lastSet;
  var currentProductIndices = [];
  for (var i = 0; i < numProductsShown; i++) {
    var currentandLastProductIndices = [].concat(currentProductIndices, lastIndicesForSet);
    var productIndex = getUniqueRandom(currentandLastProductIndices);
    currentProductIndices.push(productIndex);
    // pulls unique prduct from products array.
    var uniqueProduct = products[productIndex];
    uniqueProduct.numTimesShown++;
    uniqueProductSetArray.push(uniqueProduct);
  }
  lastProductSetIndices = currentProductIndices;
  return uniqueProductSetArray;
}

function setProductImages(productSet) {
  img1.src = productSet[0].location;
  img2.src = productSet[1].location;
  img3.src = productSet[2].location;
  console.log(productSet);
  img1.alt = productSet[0].name;
  img2.alt = productSet[1].name;
  img3.alt = productSet[2].name;

  img1.width = 250;
  img2.width = 250;
  img3.width = 250;
}

function getIndexFromProductName(productName) {
  var index = -1;
  for (var i = 0; i < products.length; i++) {
    if (productName === products[i].name) {
      index = i;
    }
  }
  return index;
}

if (localStorage.whatever) {
  var storageArray = JSON.parse(localStorage.whatever);
  for (var i = 0; i < storageArray.length; i++) {
    products[i].numTimesClicked += storageArray[i].numTimesClicked;
  }
}

var clickLimit = 5;
var totalClicks = 0;
var lastProductSet = [];
function handleImageClick(event) {
  totalClicks++;
  localStorage.whatever = JSON.stringify(products);
  var clickedImageName = this.alt; // or event.target.alt
  var clickedImageIndex = getIndexFromProductName(clickedImageName);
  products[clickedImageIndex].numTimesClicked++;
  if (totalClicks === clickLimit) {
    return displayResults();
  }
  var currentlyDisplayedProducts = createUniqueProductSet(lastProductSetIndices);
  setProductImages(currentlyDisplayedProducts);
}

img1.addEventListener('click', handleImageClick);
img2.addEventListener('click', handleImageClick);
img3.addEventListener('click', handleImageClick);

var voteTotals = [];
function displayResults() {
  img1.removeEventListener('click', handleImageClick);
  img2.removeEventListener('click', handleImageClick);
  img3.removeEventListener('click', handleImageClick);
  productClicks();
  for (var i = 0; i < products.length; i++) {
    voteTotals.push(products[i].numTimesClicked);
  }
}

var voteTotals = [];
function productClicks() {
  for (var i = 0; i < products.length; i++) {
    voteTotals.push(products[i].numTimesClicked);
  }

  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');

  var data = {
    labels: nameArray,
    datasets: [{
      label: 'Product Name',
      data: voteTotals,
      backgroundColor: 'orange'
    }]
  };

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
var currentlyDisplayedProducts = createUniqueProductSet(lastProductSetIndices);
setProductImages(currentlyDisplayedProducts);
