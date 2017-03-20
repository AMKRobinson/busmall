'use strict';
var imgArray = ['img/bag.jpg', 'img/banna.jpg','img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

img[0] = 'img/bag.jpg';
img[1] = 'img/banna.jpg';
img[2] = 'img/bathroom.jpg';
img[3] = 'img/boots.jpg';
img[4] = 'img/breakfast.jpg';
img[5] = 'img/bubblegum.jpg';
img[6] = 'img/chair.jpg';
img[7] = 'img/cthulhu.jpg';
img[8] = 'img/dog-duck.jpg';
img[9] = 'img/dragon.jpg';
img[10] = 'img/pen.jpg';
img[11] = 'img/pet-sweep.jpg';
img[12] = 'img/scissors.jpg';
img[13] = 'img/shark.jpg';
img[14] = 'img/sweep.png';
img[15] = 'img/tauntaun.jpg';
img[16] = 'img/unicorn.jpg';
img[17] = 'img/usb.gif';
img[18] = 'img/water-can.jpg';
img[19] = 'img/wine-glass.jpg';

function imgRandom(){
  var num = math.floor(math.random() * 19);
  return imgArray[num];
}
