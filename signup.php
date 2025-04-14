<?php
session_start();
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prenom = htmlspecialchars(trim($_POST['prenom']));
    $nom = htmlspecialchars(trim($_POST['nom']));
    $fullname = $prenom . ' ' . $nom;
    $birthday = $_POST['birthday'];
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $card_number = str_replace(' ', '', $_POST['cardNumber']);
    $card_name = htmlspecialchars(trim($_POST['cardName']));
    $card_expire = $_POST['expiryDate'];
    $card_cvc = $_POST['cvv'];
    
    $errors = [];

    if (!preg_match("/^[a-zA-ZÀ-ÿ\s\-]{2,}$/", $prenom)) {
        $errors[] = "Le prénom est invalide (lettres uniquement, au moins 2 caractères).";
    }

    if (!preg_match("/^[a-zA-ZÀ-ÿ\s\-]{2,}$/", $nom)) {
        $errors[] = "Le nom est invalide (lettres uniquement, au moins 2 caractères).";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "L'adresse email est invalide.";
    }

    if (strlen($password) < 6) {
        $errors[] = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if ($password !== $confirm_password) {
        $errors[] = "Les mots de passe ne correspondent pas.";
    }

    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $birthday)) {
        $errors[] = "La date de naissance doit être au format AAAA-MM-JJ.";
    } else {
        $birthDate = new DateTime($birthday);
        $today = new DateTime();
        $age = $today->diff($birthDate)->y;
        if ($age < 13) {
            $errors[] = "Vous devez avoir au moins 13 ans pour vous inscrire.";
        }
    }

    if (!preg_match('/^\d{16}$/', $card_number)) {
        $errors[] = "Le numéro de carte doit contenir 16 chiffres.";
    }

    if (!preg_match('/^[a-zA-ZÀ-ÿ\s\-]{2,}$/', $card_name)) {
        $errors[] = "Le nom sur la carte est invalide.";
    }

    if (!preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $card_expire)) {
        $errors[] = "La date d'expiration doit être au format MM/AA.";
    }

    if (!preg_match('/^\d{3,4}$/', $card_cvc)) {
        $errors[] = "Le code CVC doit être composé de 3 ou 4 chiffres.";
    }

    if (empty($errors)) {
        try {
            $check_email = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $check_email->bind_param("s", $email);
            $check_email->execute();
            $check_email->store_result();

            if ($check_email->num_rows > 0) {
                $errors[] = "Cet email est déjà utilisé.";
            } else {
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                $stmt = $conn->prepare("INSERT INTO users (fullname, birthday, email, password, card_number, card_name, card_expire, card_cvc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssss", $fullname, $birthday, $email, $hashed_password, $card_number, $card_name, $card_expire, $card_cvc);

                if ($stmt->execute()) {
                    $_SESSION['success_message'] = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
                    header("Location: index.html");
                    exit();
                } else {
                    $errors[] = "Une erreur est survenue lors de l'enregistrement.";
                }

                $stmt->close();
            }

            $check_email->close();
        } catch (mysqli_sql_exception $e) {
            $errors[] = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
        }
    }

    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        $_SESSION['form_data'] = $_POST;
        header("Location: signup.php");
        exit();
    }
}

$conn->close();
?>

<!DOCTYPE html>
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
<body>
  <div id="background-container">
    <div class="bg-layer" id="bg1"></div>
    <div class="bg-layer" id="bg2"></div>
  </div>

  <header class="flex justify-between items-center z-10">
    <a href="index.html"><div class="text-2xl font-bold">Bayatni.tn</div></a>
      <nav class="space-x-2">
        <a href="signin.html"><button type="button" class="widget-btn">S'identifier</button></a>
      </nav>
  </header>

  <main class="flex-grow flex items-center justify-center">
    <div class="auth-card">
      <form id="signupForm" action="signup.php" method="POST">
        <div class="form">
          <div class="inputForm" id="nom-box">
            <input type="text" id="nom" name="nom" placeholder="Nom" required>
          </div>
          <div class="inputForm" id="prenom-box">
            <input type="text" id="prenom" name="prenom" placeholder="Prénom" required>
          </div>
          <div class="inputForm" id="bd-box">
            <input type="date" id="birthday" name="birthday">
          </div>               
              
          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Nationalité</option>
            <option>Tunisia</option>
            <option>Algeria</option>
            <option>Morocco</option>
            <option>Palestine</option>
          </select>

          <select id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Genre</option>
            <option value="H">Homme</option>
            <option value="F">Femme</option>
          </select>

          <div class="inputSubmit">
            <button type="button" class="button-submit">Suivant</button>
          </div>
        </div>

        <div class="form" style="display: none;">
          <div class="inputForm">
            <input type="text" id="email" name="email" placeholder="Entrez votre Adresse Email" required>
          </div>  
          <div class="inputForm">
            <input type="password" id="password" name="password" placeholder="Mot de passe" required>
          </div>
          <div class="inputForm">
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirmation de Mdp" required>
          </div>
          <div class="inputSubmit">
            <button type="button" class="button-submit">Suivant</button>
          </div>
        </div>

        <div class="form" style="display: none;">
          <div id="CC" class="flex flex-col justify-around bg-transparent p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xs mx-auto">
            <div class="flex flex-row items-center justify-between mb-3">
              <input class="w-full h-10 border-b border-white text-sm bg-transparent text-white placeholder-white caret-orange-500 pl-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_2px_10px_#fff] transition" type="text" name="cardName" id="cardName" placeholder="Full Name" required/>
              <div class="flex items-center justify-center relative w-14 h-9 border border-white border-opacity-20 rounded-md ml-2">
                <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path><path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path><path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48C20.376,15.05,18,19.245,18,24z"></path></svg>
              </div>
            </div>
            <div class="flex flex-col space-y-3">
              <input class="w-full h-10 border-b border-white text-sm bg-transparent text-white placeholder-white caret-orange-500 pl-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_2px_10px_#fff] transition" type="text" name="cardNumber" id="cardNumber" placeholder="0000 0000 0000 0000" required />
              <div class="flex flex-row space-x-2">
                <input class="w-full h-10 border-b border-white text-sm bg-transparent text-white placeholder-white caret-orange-500 pl-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_2px_10px_#fff] transition" type="text" name="expiryDate" id="expiryDate" placeholder="MM/AA" required />
                <input class="w-full h-10 border-b border-white text-sm bg-transparent text-white placeholder-white caret-orange-500 pl-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_2px_10px_#fff] transition" type="text" name="cvv" id="cvv" placeholder="CVV" required />
              </div>
            </div>
          </div>
            <div class="inputSubmit">
                <input type="submit" class="button-submit" value="Confirmer">
            </div>
        </div>


      </form>
    </div>
  </main>
  <script src="Assets/js/background.js"></script>  
  <script src="Assets/js/signup.js"></script>
</body>
</html>
