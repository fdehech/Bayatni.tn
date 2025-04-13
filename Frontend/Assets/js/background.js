
const backgrounds = [
    'Assets/src/Bg1.jpg',
    'Assets/src/Bg2.jpg',
    'Assets/src/Bg3.jpg',
    'Assets/src/Bg4.jpg',
    'Assets/src/Bg5.jpg',
    'Assets/src/Bg6.jpg'
];

const main = document.querySelector('main');

function getRandomIndex(excludeIndex) {
    let index;
    do {
        index = Math.floor(Math.random() * backgrounds.length);
    } while (index === excludeIndex);
    return index;
}

let current = -1;
function setRandomBackground() {
    current = getRandomIndex(current);
    document.body.style.backgroundImage = `url(${backgrounds[current]})`;
}

setRandomBackground();

setInterval(() => {
    console.log("Changing background");
    setRandomBackground();
}, 10000);


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("Latitude:", lat, "Longitude:", lon);

        var map = L.map('map').setView([lat , lon], 9);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

      }
    )
};


