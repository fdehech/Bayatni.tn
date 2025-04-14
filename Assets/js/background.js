const images = [
  'Assets/src/Bg1.jpg',
  'Assets/src/Bg2.jpg',
  'Assets/src/Bg3.jpg',
  'Assets/src/Bg4.jpg',
  'Assets/src/Bg5.jpg',
  'Assets/src/Bg6.jpg',
  'Assets/src/Bg7.jpg',
  'Assets/src/Bg8.jpg',
  'Assets/src/Bg9.jpg'
];

let current = 0;
let showingBg1 = true;

const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

bg1.style.backgroundImage = `url(${images[current]})`;
bg1.classList.add('visible');

setInterval(() => {
  current = (current + 1) % images.length;
  const nextImage = images[current];

  const incoming = showingBg1 ? bg2 : bg1;
  const outgoing = showingBg1 ? bg1 : bg2;

  incoming.style.backgroundImage = `url(${nextImage})`;
  
  incoming.classList.remove('visible');
  void incoming.offsetWidth; 
  incoming.classList.add('visible');
  
  outgoing.classList.remove('visible');

  showingBg1 = !showingBg1;
}, 15000);



document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        console.log("Latitude:", lat, "Longitude:", lon);
  
        var map = L.map('map').setView([lat, lon], 7);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
      });
    }
  });


