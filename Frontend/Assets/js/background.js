const backgrounds = [
    'Assets/src/Bg1.jpg',
    'Assets/src/Bg2.jpg',
    'Assets/src/Bg3.jpg',
    'Assets/src/Bg4.jpg',
    'Assets/src/Bg5.jpg',
    'Assets/src/Bg6.jpg'
];

const main = document.querySelector('main');
let current = 0;

current = (current + 1) % backgrounds.length;
document.body.style.backgroundImage = `url(${backgrounds[current]})`;

setInterval(() => {
    console.log("Hey");
    current = (current + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url(${backgrounds[current]})`;
    }, 15000);