-- Création de la base de données
CREATE DATABASE IF NOT EXISTS bayatni_db;
USE bayatni_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `card_number` varchar(16) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `card_expire` varchar(5) NOT NULL,
  `card_cvc` varchar(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table des hôtels
CREATE TABLE IF NOT EXISTS hotels (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` int(1) NOT NULL,
  `reviews_count` int(11) NOT NULL DEFAULT 0,
  `region` enum('tunis','hammamet','sousse','djerba','tabarka') NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `features` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS hotels_coordinates (
  `id` int(11) NOT NULL,
  `x` decimal(9,6) NOT NULL,
  `y` decimal(9,6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES hotels(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table des réservations
CREATE TABLE IF NOT EXISTS bookings (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests` int(2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `booking_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('confirmed','pending','cancelled','completed','no_show') NOT NULL DEFAULT 'confirmed',
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  FOREIGN KEY (`hotel_id`) REFERENCES hotels(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table des avis
CREATE TABLE IF NOT EXISTS reviews (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `rating` int(1) NOT NULL,
  `comment` text DEFAULT NULL,
  `review_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `hotel_id` (`hotel_id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des données d'hôtels (depuis le front-end book.js)
INSERT INTO hotels (title, location, price, rating, reviews_count, region, image_url, features) VALUES
('Hôtel La Marsa Resort & Spa', 'La Marsa, Tunis', 350.00, 5, 324, 'tunis', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 'piscine,restaurant,spa'),
('Hammamet Palace', 'Yasmine Hammamet', 290.00, 4, 187, 'hammamet', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80', 'piscine,plage,restaurant'),
('Sousse Marhaba Beach', 'Sousse', 180.00, 3, 215, 'sousse', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', 'piscine,plage'),
('Djerba Luxury Resort', 'Houmt Souk, Djerba', 420.00, 5, 412, 'djerba', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80', 'piscine,plage,spa'),
('Monastir Bay', 'Monastir', 270.00, 4, 178, 'sousse', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 'piscine,plage,restaurant'),
('Sidi Bou Said Maison Bleue', 'Sidi Bou Said, Tunis', 320.00, 4, 95, 'tunis', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', 'restaurant,vue mer'),


INSERT INTO hotels_coordinates (id, x, y) VALUES
(1, 35.369828, 10.847062),  -- Hôtel La Marsa Resort & Spa
(2, 36.519280, 7.777134),   -- Hammamet Palace
(3, 33.234005, 7.966615),   -- Sousse Marhaba Beach
(4, 34.894405, 7.614956),   -- Djerba Luxury Resort
(5, 36.604676, 9.986617),   -- Monastir Bay
(6, 33.855221, 10.694081);  -- Sidi Bou Said Maison Bleue
