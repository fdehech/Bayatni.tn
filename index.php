<?php
session_start();
$isLoggedIn = isset($_SESSION['user_name']);
?>

<html lang="en">
<head>

    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Bayatni.tn</title>

    <link rel="stylesheet" href="<?= $isLoggedIn ? 'Assets/css/index_user.css' : 'Assets/css/index_guest.css' ?>">

    <!-- TAILWIND CDN -->
    <script src="https://cdn.tailwindcss.com"></script> 
    <!-- Bootstrap CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous"> 
    <!-- Google Fonts CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- Leaflet Maps CDN -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

</head>
<body>
    <div id="background-container">
        <div class="bg-layer" id="bg1"></div>
        <div class="bg-layer" id="bg2"></div>
    </div>

    <header class="flex justify-between items-center relative z-50">
        <a href="index.php"><div id="domain">Bayatni.tn</div></a>
        
        <?php if ($isLoggedIn): ?>
        <nav class="nav">
            <div class="dropdown">
                <button class="btn dropdown-toggle d-flex align-items-center gap-1 text-white fw-semibold border-0 bg-transparent shadow-none" type="button" id="menuButton" data-bs-toggle="dropdown" aria-expanded="false" style="font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 18px; text-transform: capitalize;">
                    <?= htmlspecialchars($_SESSION['user_name']) ?>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" style="position: absolute; z-index: 9999;">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="logout.php">Logout</a></li>
                </ul>
            </div>
        </nav>
        <?php else: ?>
            <nav class="space-x-2">
                <a href="signup.php"><button type="button" class="nav-btn-inverse">S'inscrire</button></a>
                <a href="signin.php"><button type="button" class="nav-btn">S'identifier</button></a>
            </nav>
        <?php endif; ?>
    </header>

    <main>
        <div class="intro">
            <?php if ($isLoggedIn): ?>

                
            <?php endif; ?>
        </div>

        <?php if (!$isLoggedIn): ?>
            <h1 class="title">Bayatni</h1>
            <p class="bio">Bayatni.tn est une plateforme tunisienne dédiée à la réservation d’hôtels.</br> Nous facilitons vos démarches en ligne pour vous offrir une expérience simple, rapide et adaptée à vos besoins,</br> où que vous soyez en Tunisie ou en dehors !</br></p>
            <a href="booking.html"><button class="main-btn">Réserver Maintenant</button></a>
        <?php endif; ?>
    </main>

    <div id=map> 
        <div class="loader">
            <span></span>
        </div>
    </div>
    <script src="Assets/js/bg.js"></script>
    <script src="Assets/js/map.js"></script>
</body>
</html>
