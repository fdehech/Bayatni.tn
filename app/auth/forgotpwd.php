<?php
session_start();
require_once __DIR__ . '/../../config/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../includes/PHPMailer-master/src/Exception.php';
require __DIR__ . '/../../includes/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/../../includes/PHPMailer-master/src/SMTP.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['recover']) && !empty($_POST['email'])) {
        $email = trim($_POST['email']);
        
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if ($user) {
            $token = bin2hex(random_bytes(32));
            $expiry = date("Y-m-d H:i:s", strtotime('+1 hour'));

            $stmt = $conn->prepare("UPDATE users SET reset_token = ?, token_expire = ? WHERE email = ?");
            $stmt->bind_param("sss", $token, $expiry, $email);
            $stmt->execute();
            $stmt->close();

            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'contact.bayatni@gmail.com';
                $mail->Password = 'dsqhfhkedctrixnj'; 
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                $mail->setFrom('contact.bayatni@gmail.com', 'Bayatni');
                $mail->addAddress($email);

                $resetLink = 'http://localhost/production/app/auth/resetpwd.php?token=' . urlencode($token);

                $mail->isHTML(true);
                $mail->Subject = 'Réinitialisation du mot de passe';
                $mail->Body = "
                    Bonjour,<br><br>
                    Pour réinitialiser votre mot de passe, cliquez sur le lien suivant :<br>
                    <a href=\"$resetLink\">Réinitialiser mon mot de passe</a><br><br>
                    Ce lien expirera dans une heure.
                ";

                $mail->send();
                $_SESSION['success'] = "Un lien a été envoyé à votre adresse e-mail.";
            } catch (Exception $e) {
                $errors[] = "Erreur lors de l'envoi de l'e-mail : " . $mail->ErrorInfo;
            }
        } else {
            $errors[] = "Adresse e-mail inconnue.";
        }
    } else {
        $errors[] = "Veuillez entrer une adresse e-mail.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Réinitialisation - Bayatni</title>
  <link rel="stylesheet" href="/production/public/css/index.css">
  <link rel="stylesheet" href="/production/public/css/pwd.css"> 
  <script src="https://cdn.tailwindcss.com"></script> 
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="overflow: hidden;">
  <div id="background-container">
    <div class="bg-layer" id="bg1"></div>
    <div class="bg-layer" id="bg2"></div>
  </div>

  <main>
    <section class="auth-card">
      <form class="form" method="POST" action="">
        <h1 class="fma" style="position: absolute; top: 40px;">Réinitialisation du mot de passe</h1>
        
        <div class="inputForm" style="padding-left:15px;"> 
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><path d="..."/></svg>
          <input type="email" class="input" name="email" placeholder="Entrez votre adresse e-mail" required>
        </div>

        <!-- Messages d'erreur -->
        <?php if (!empty($errors)): ?>
          <div id="errors">
            <?php foreach ($errors as $error): ?>
              <p style="color: red; font-size: 0.9rem; font-family: 'Poppins', sans-serif;">
                <?= htmlspecialchars($error) ?>
              </p>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <!-- Message de succès -->
        <?php if (!empty($_SESSION['success'])): ?>
          <p style="color: green; font-size: 0.9rem; font-family: 'Poppins', sans-serif;">
            <?= $_SESSION['success']; unset($_SESSION['success']); ?>
          </p>
        <?php endif; ?>

        <div class="inputSubmit">
          <button class="button-submit" type="submit" name="recover">Envoyer le lien de réinitialisation</button>
        </div>

        <p class="p" style="margin-top:20px;">
          Vous n'avez pas encore de compte ? 
          <a href="signup.php"><span class="span">Inscrivez-vous</span></a>
        </p>
      </form>
    </section>
  </main>

  <script src="/production/public/js/bg.js"></script>
</body>
</html>
