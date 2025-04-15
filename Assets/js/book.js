 // Données des hôtels
 const hotelsData = [
    {
        id: 1,
        title: "Hôtel La Marsa Resort & Spa",
        location: "La Marsa, Tunis",
        price: 350,
        rating: 5,
        reviews: 324,
        region: "tunis",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "restaurant", "spa"]
    },
    {
        id: 2,
        title: "Hammamet Palace",
        location: "Yasmine Hammamet",
        price: 290,
        rating: 4,
        reviews: 187,
        region: "hammamet",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "restaurant"]
    },
    {
        id: 3,
        title: "Sousse Marhaba Beach",
        location: "Sousse",
        price: 180,
        rating: 3,
        reviews: 215,
        region: "sousse",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage"]
    },
    {
        id: 4,
        title: "Djerba Luxury Resort",
        location: "Houmt Souk, Djerba",
        price: 420,
        rating: 5,
        reviews: 412,
        region: "djerba",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "spa"]
    },
    {
        id: 5,
        title: "Monastir Bay",
        location: "Monastir",
        price: 270,
        rating: 4,
        reviews: 178,
        region: "sousse",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "restaurant"]
    },
    {
        id: 6,
        title: "Sidi Bou Said Maison Bleue",
        location: "Sidi Bou Said, Tunis",
        price: 320,
        rating: 4,
        reviews: 95,
        region: "tunis",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        features: ["restaurant", "vue mer"]
    },
    {
        id: 7,
        title: "Royal Azur Thalasso",
        location: "Hammamet",
        price: 390,
        rating: 5,
        reviews: 453,
        region: "hammamet",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "restaurant", "spa"]
    },
    {
        id: 8,
        title: "Tabarka Beach Resort",
        location: "Tabarka",
        price: 220,
        rating: 3,
        reviews: 128,
        region: "tabarka",
        image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b2e?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "forêt"]
    },
    {
        id: 9,
        title: "Radisson Blu Palace Djerba",
        location: "Djerba",
        price: 450,
        rating: 5,
        reviews: 374,
        region: "djerba",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "restaurant", "spa"]
    },
    {
        id: 10,
        title: "Hôtel du Lac",
        location: "Berges du Lac, Tunis",
        price: 175,
        rating: 3,
        reviews: 142,
        region: "tunis",
        image: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=800&q=80",
        features: ["restaurant", "vue lac"]
    },
    {
        id: 11,
        title: "Mediterranée Thalasso",
        location: "Yasmine Hammamet",
        price: 310,
        rating: 4,
        reviews: 231,
        region: "hammamet",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "restaurant"]
    },
    {
        id: 12,
        title: "El Mouradi Palace",
        location: "Port El Kantaoui",
        price: 280,
        rating: 4,
        reviews: 198,
        region: "sousse",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        features: ["piscine", "plage", "spa"]
    }
];

// Fonction pour générer les cartes d'hôtel
function generateHotelCards(hotels) {
    const hotelGrid = document.getElementById('hotel-grid');
    hotelGrid.innerHTML = '';
    
    if (hotels.length === 0) {
        hotelGrid.innerHTML = '<p class="text-center py-4">Aucun hôtel ne correspond à vos critères de recherche.</p>';
        return;
    }
    
    hotels.forEach(hotel => {
        const stars = '★'.repeat(hotel.rating) + '☆'.repeat(5 - hotel.rating);
        
        const card = document.createElement('div');
        card.className = 'hotel-card';
        card.dataset.price = hotel.price;
        card.dataset.rating = hotel.rating;
        card.dataset.region = hotel.region;
        card.dataset.features = hotel.features.join(',');
        
        card.innerHTML = `
            <div class="hotel-image" style="background-image: url('${hotel.image}')"></div>
            <div class="hotel-info">
                <h3 class="hotel-title">${hotel.title}</h3>
                <div class="hotel-location">
                    <i class="bi bi-geo-alt"></i> ${hotel.location}
                </div>
                <div class="rating">
                    <div class="stars">${stars}</div>
                    <div class="reviews">(${hotel.reviews} avis)</div>
                </div>
                <div class="hotel-features">
                    ${hotel.features.map(feature => {
                        const icons = {
                            'piscine': '🏊',
                            'plage': '🏖️',
                            'restaurant': '🍽️',
                            'spa': '🧖',
                            'vue mer': '🌅',
                            'vue lac': '🌃',
                            'forêt': '🌲'
                        };
                        return `<span class="feature-badge">${icons[feature] || ''} ${feature}</span>`;
                    }).join('')}
                </div>
                <div class="hotel-price">${hotel.price} DT / nuit</div>
            </div>
        `;
        
        hotelGrid.appendChild(card);
    });
}

// Fonction pour filtrer les hôtels
function filterHotels() {
    const destination = document.getElementById('destination').value;
    const priceMax = parseInt(document.getElementById('price-range').value);
    const searchTerm = document.getElementById('hotel-search').value.toLowerCase();
    
    const filteredHotels = hotelsData.filter(hotel => {
        const matchesDestination = !destination || hotel.region === destination;
        const matchesPrice = hotel.price <= priceMax;
        const matchesSearch = !searchTerm || 
                             hotel.title.toLowerCase().includes(searchTerm) || 
                             hotel.location.toLowerCase().includes(searchTerm);
        
        return matchesDestination && matchesPrice && matchesSearch;
    });
    
    // Trier les hôtels
    const sortBy = document.getElementById('sort-by').value;
    filteredHotels.sort((a, b) => {
        switch(sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            default: return (b.rating * 100 - b.price) - (a.rating * 100 - a.price);
        }
    });
    
    // Mettre à jour le compteur de résultats
    document.getElementById('results-count').textContent = 
        `${filteredHotels.length} hôtel${filteredHotels.length !== 1 ? 's' : ''} disponible${filteredHotels.length !== 1 ? 's' : ''}`;
    
    // Générer les cartes filtrées
    generateHotelCards(filteredHotels);
}

// Initialisation de la page
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier l'état de connexion
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        document.getElementById('loggedOutNav').style.display = 'none';
        document.getElementById('loggedInNav').style.display = 'block';
        
        const userName = localStorage.getItem('userName') || 'Utilisateur';
        const userEmail = localStorage.getItem('userEmail') || 'email@exemple.com';
        
        document.getElementById('userName').textContent = userName;
        document.getElementById('userEmail').textContent = userEmail;
        document.getElementById('userInitial').textContent = userName.charAt(0).toUpperCase();
    }
    
    // Gestion de la déconnexion
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    });
    
    // Gestion du slider de prix
    const priceSlider = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    priceSlider.addEventListener('input', function() {
        priceValue.textContent = `${this.value} DT`;
        filterHotels();
    });
    
    // Gestion des filtres
    const filterInputs = ['destination', 'check-in', 'check-out', 'guests', 'sort-by', 'hotel-search'];
    filterInputs.forEach(id => {
        document.getElementById(id)?.addEventListener('change', filterHotels);
    });
    
    document.getElementById('hotel-search')?.addEventListener('keyup', filterHotels);
    
    // Définir les dates par défaut
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('check-in').valueAsDate = today;
    document.getElementById('check-out').valueAsDate = tomorrow;
    
    document.getElementById('check-in').min = today.toISOString().split('T')[0];
    document.getElementById('check-out').min = tomorrow.toISOString().split('T')[0];
    
    // Gestion des dates
    document.getElementById('check-in').addEventListener('change', function() {
        const checkOut = document.getElementById('check-out');
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        checkOut.min = nextDay.toISOString().split('T')[0];
        
        if (new Date(checkOut.value) < nextDay) {
            checkOut.value = nextDay.toISOString().split('T')[0];
        }
    });
    
    // Générer les cartes initiales
    generateHotelCards(hotelsData);
});


document.addEventListener('DOMContentLoaded', function() {
    // Handle fixed header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Add scroll to top button to HTML
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(scrollTopBtn);
    
    // Enhance hotel cards with animation on scroll
    const hotelCards = document.querySelectorAll('.hotel-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    hotelCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Add animation to reservation button
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    reserveBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});