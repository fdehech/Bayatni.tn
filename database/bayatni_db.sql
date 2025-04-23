-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2025 at 12:03 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bayatni_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests` int(2) NOT NULL,
  `room_type` varchar(30) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `booking_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('confirmed','pending','cancelled','completed','no_show') NOT NULL DEFAULT 'confirmed',
  `payment_method` varchar(25) NOT NULL,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `hotel_id`, `check_in`, `check_out`, `guests`, `room_type`, `total_price`, `booking_date`, `status`, `payment_method`, `completed_at`) VALUES
(2, 3, 1, '2025-04-21', '2025-04-23', 2, '', 700.00, '2025-04-20 22:42:43', 'cancelled', '', NULL),
(3, 3, 1, '2025-04-22', '2025-04-24', 2, '', 700.00, '2025-04-21 23:50:39', 'cancelled', '', NULL),
(4, 3, 1, '2025-04-22', '2025-04-24', 2, '', 700.00, '2025-04-21 23:50:46', 'pending', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` int(1) NOT NULL,
  `reviews_count` int(11) NOT NULL DEFAULT 0,
  `region` enum('tunis','hammamet','sousse','djerba','tabarka') NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `features` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `title`, `location`, `price`, `rating`, `reviews_count`, `region`, `image_url`, `features`, `created_at`) VALUES
(1, 'Hôtel La Marsa Resort & Spa', 'La Marsa, Tunis', 350.00, 5, 325, 'tunis', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 'piscine,restaurant,spa', '2025-04-20 16:15:53'),
(3, 'Sousse Marhaba Beach', 'Sousse', 180.00, 3, 215, 'sousse', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', 'piscine,plage', '2025-04-20 16:15:53'),
(6, 'Sidi Bou Said Maison Bleue', 'Sidi Bou Said, Tunis', 320.00, 4, 95, 'tunis', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', 'restaurant,vue mer', '2025-04-20 16:15:53'),
(10, 'Riadh Palms Resort & Spa', 'RJRH+8M Sousse', 186.00, 3, 0, 'sousse', 'https://lh3.googleusercontent.com/p/AF1QipNKMh8br5zDd4RQk52dQgBxQXRmWTePYY2nbo0w=s1360-w1360-h1020', 'piscine,plage,restaurant,spa', '2025-04-22 20:45:45'),
(11, 'Hôtel Marhaba Palace', 'VHWV+JC Hammam Sousse', 242.00, 4, 0, 'sousse', 'https://lh3.googleusercontent.com/p/AF1QipOvko8sKKUTYL5OoEYpa_DIA-Ts21E3I9ud3397=s1360-w1360-h1020', 'piscine,plage,restaurant,spa,wifi', '2025-04-22 20:50:40'),
(12, 'Mövenpick Hotel du Lac Tunis', 'R6PX+59 Tunis', 138.00, 4, 0, 'tunis', 'https://lh3.googleusercontent.com/p/AF1QipOb7Sa9X6kYk0EAPxH_NzRep8Kcnm_nEZ-jYNIa=s1360-w1360-h1020', 'piscine,restaurant,wifi', '2025-04-22 20:55:43'),
(13, 'Cap Bon Kelibia Beach Hotel & Spa', 'V44G+JC Kelibia', 293.00, 4, 0, 'tunis', 'https://lh3.googleusercontent.com/p/AF1QipOdZyei5JMkJhdwd4w-QHLvmad1RvS0Xf24ZbHE=s1360-w1360-h1020', 'piscine,plage,restaurant,wifi', '2025-04-22 20:59:58'),
(14, 'Radisson Blu Resort & Thalasso, Hammamet', 'CJ2Q+WG Hammamet', 414.00, 4, 0, 'hammamet', 'https://lh3.googleusercontent.com/p/AF1QipPawVc0aFZYwaBl8AR14KNH2rZQc6Y7N-To7NCS=s1360-w1360-h1020', 'piscine,plage,restaurant,spa,wifi', '2025-04-22 21:04:55'),
(15, 'Golden Tulip President Hammamet', 'CMFF+64 Hammamet', 246.00, 3, 0, 'hammamet', 'https://lh3.googleusercontent.com/p/AF1QipP4OKq22CIff11LUyPF_Fvmm-0ZjmGwa9XpF4Co=s1360-w1360-h1020', 'piscine,restaurant,wifi', '2025-04-22 21:07:42'),
(16, 'Marina Palace', '9GGR+HW Hammamet', 120.00, 4, 0, 'hammamet', 'https://lh3.googleusercontent.com/p/AF1QipOk6q2aQPu32rf3DH9QTG0gHl2Bqf65iF60eaZ4=s1360-w1360-h1020', 'piscine,restaurant,wifi', '2025-04-22 21:12:41'),
(17, 'Résidence Royal - Deluxe', 'CH3H+CW Hammamet', 92.00, 4, 0, 'hammamet', 'https://lh3.googleusercontent.com/p/AF1QipOxxIz9ofJaDJ0uU6kdQtIZxESr6VTpPuU1Df6S=s1360-w1360-h1020', 'piscine,restaurant,spa,wifi', '2025-04-22 21:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `hotels_coordinates`
--

CREATE TABLE `hotels_coordinates` (
  `id` int(11) NOT NULL,
  `x` decimal(9,6) NOT NULL,
  `y` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels_coordinates`
--

INSERT INTO `hotels_coordinates` (`id`, `x`, `y`) VALUES
(1, 35.369828, 10.847062),
(3, 35.848310, 10.623020),
(6, 33.855221, 10.694081),
(10, 35.841747, 10.628713),
(11, 35.899838, 10.594444),
(12, 36.841779, 10.247541),
(13, 36.931578, 11.121286),
(14, 36.405711, 10.636754),
(15, 36.425189, 10.675034),
(16, 36.378765, 10.544400),
(17, 36.406461, 10.580318);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `rating` int(1) NOT NULL,
  `comment` text DEFAULT NULL,
  `review_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `hotel_id`, `booking_id`, `rating`, `comment`, `review_date`) VALUES
(2, 4, 1, NULL, 5, 'ss', '2025-04-22 02:53:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` enum('active','suspended') NOT NULL,
  `password` varchar(255) NOT NULL,
  `card_number` varchar(16) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `card_expire` varchar(5) NOT NULL,
  `card_cvc` varchar(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `fullname`, `birthday`, `email`, `status`, `password`, `card_number`, `card_name`, `card_expire`, `card_cvc`, `created_at`) VALUES
(3, 'Furat', 'Dehech', 'Furat Dehech', '2005-01-04', 'fdehech@outlook.com', 'active', '$2y$10$TShLClXBKU01Pql4psXrxuIerBuM.rA4rKqeFdQZT3sh1HEV3f7nG', '0000000000000000', 'Furat', '12/25', '123', '2025-04-20 22:42:07'),
(4, 'Dahesh', 'Furat', 'Dahesh Furat', '2005-05-05', '123@gmail.com', 'active', '$2y$10$ni0oBD1n2wdsyfWqZHdHWu1DOQPcz7AkZW4tRxycgbnbmfuJW2xwG', '0000000000000000', 'Furat', '11/22', '123', '2025-04-20 23:17:53'),
(5, 'Furat', 'Dehech', 'Furat Dehech', '2006-01-01', '1234@gmail.com', 'active', '$2y$10$sJGaztlDCQ4zVSLQK5NeYeTNYT45DOD1GD4t0HOsratMQG50a26o2', '0000000000000000', 'dd', '11/22', '123', '2025-04-20 23:25:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels_coordinates`
--
ALTER TABLE `hotels_coordinates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Constraints for table `hotels_coordinates`
--
ALTER TABLE `hotels_coordinates`
  ADD CONSTRAINT `hotels_coordinates_ibfk_1` FOREIGN KEY (`id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
