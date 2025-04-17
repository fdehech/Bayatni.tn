<?php
session_start();
require_once 'config.php';

$conn->close();
?>


<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Bayatni.tn</title>
    <link rel="stylesheet" href="Assets/css/index.css">
    <link rel="stylesheet" href="Assets/css/forms.css"> 
    <!-- TAILWIND CDN -->
    <script src="https://cdn.tailwindcss.com"></script> 
    <!-- Bootstrap CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous"> 
    <!-- Google Fonts CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>

<body style="overflow: hidden;">
  <div id="background-container">
    <div class="bg-layer" id="bg1"></div>
    <div class="bg-layer" id="bg2"></div>
  </div>

  <header class="flex justify-between items-center z-10">
    <a href="index.php"><div id="domain">Bayatni.tn</div></a>
    <nav class="space-x-2">
        <a href="signup.php"><button type="button" class="nav-btn-inverse">S'inscrire</button></a>
    </nav>
  </header>
  <main>
    <section class="auth-card">
      <form class="form" method="POST" action="">
        <h1 class="fma" style="margin-bottom:25px;">Find my account</h1>
          <div class="inputForm" style="padding-left:15px;"> 
            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
            <input type="text" class="input" name="email"  placeholder="Enter your Email">
          </div>
          <div id="errors" style="display:none;">
            <?php if (!empty($errors)): ?>
                <?php foreach ($errors as $error): ?>
                    <p style="color: red;  margin: 0.25rem 0; font-size: 0.9rem; font-weight: 500; font-family: 'Poppins', sans-serif; font-weight: 400; font-style: normal;"><?= htmlspecialchars($error) ?></p>
                <?php endforeach; ?>
            <?php endif; ?>
          </div>  
            <div class="inputSubmit">
              <button class="button-submit">Recover my account</button>
            </div>            
          <p class="p" style="margin-top:20px;">Can't find it ? <a href="signup.php"><span class="span">Sign Up</span></p></a>
      </form>
    </section>
  </main>
  <script src="Assets/js/bg.js"></script>
</body>
</html>

