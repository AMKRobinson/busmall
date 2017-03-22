'use strict';

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

var clickLimit = 25;
function setProductImages(productSet) {
  img1.src = productSet[0].location;
  img2.src = productSet[1].location;
  img3.src = productSet[2].location;

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

var totalClicks = 0;
var lastProductSet = [];
function handleImageClick(event) {
  totalClicks++;
  var clickedImageName = this.alt; // or event.target.alt
  console.log('Image clicked: ', clickedImageName);
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

function displayResults() {
  console.log('results');
  img1.removeEventListener('click', handleImageClick);
  img2.removeEventListener('click', handleImageClick);
  img3.removeEventListener('click', handleImageClick);
  var content = document.getElementById('displayImages');
  var ul = document.createElement('ul');
  content.innerHTML = '';
  var title = document.createElement('h1');
  title.innerText = 'Results';
  content.appendChild(title);
  content.appendChild(ul);
  var list = [];
  for (var i = 0; i < products.length; i++) {
    var li = document.createElement('li');
    var textContent = products[i].numTimesClicked + ' votes for ' + products[i].name;
    li.innerText = textContent;
    ul.appendChild(li);
  }
}
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Number of Clicks',
            data: this.numTimesClicked,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
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

var currentlyDisplayedProducts = createUniqueProductSet(lastProductSetIndices);
setProductImages(currentlyDisplayedProducts);
