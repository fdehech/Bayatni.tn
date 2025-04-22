<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$isLoggedIn = isset($_SESSION['user_id']) || isset($_SESSION['user_name']);
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - Bayatni.tn' : 'Bayatni.tn'; ?></title>

    <!-- CSS Files -->
    <link rel="stylesheet" href="Assets/css/index.css">
    <?php if (isset($customCss)): ?>
    <link rel="stylesheet" href="<?php echo $customCss; ?>">
    <?php endif; ?>
    
    <!-- TAILWIND CDN -->
    <script src="https://cdn.tailwindcss.com"></script> 
    
    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous"> 
    
    <!-- Google Fonts CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Additional head content -->
    <?php if (isset($additionalHead)) echo $additionalHead; ?>
    
    <style>
        .domain{
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 24px;
            color: #fff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div id="background-container">
        <div class="bg-layer" id="bg1"></div>
        <div class="bg-layer" id="bg2"></div>
    </div>
