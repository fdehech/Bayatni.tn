<?php
session_start();
require_once __DIR__ . '/../../config/config.php';

if (!$conn) {
    die("Erreur DB: " . mysqli_connect_error());
}

$token = $_GET['token'] ?? '';
$errors = [];


if (empty($token)) {
    $errors[] = "Token manquant";
    $_SESSION['reset_errors'] = $errors;
    header("Location: forgotpwd.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_password = $_POST['new_password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $token = $_POST['token'] ?? '';
    if (empty($new_password)) {
        $errors[] = "Mot de passe requis";
    } elseif (strlen($new_password) < 6) {
        $errors[] = "8 caractères minimum";
    } elseif ($new_password !== $confirm_password) {
        $errors[] = "Mots de passe différents";
    }

    if (empty($errors)) {
        $stmt = $conn->prepare("SELECT id, email FROM users WHERE reset_token = ? AND token_expire > NOW()");
        if (!$stmt) {
            die("Erreur préparation: " . $conn->error);
        }
        
        $stmt->bind_param("s", $token);
        if (!$stmt->execute()) {
            die("Erreur exécution: " . $stmt->error);
        }
        
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if ($user) {
            $hashed = password_hash($new_password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, token_expire = NULL WHERE id = ?");
            $stmt->bind_param("si", $hashed, $user['id']);
            
            if ($stmt->execute()) {
                echo '<script>
                alert("Votre mot de passe a été réinitialisé avec succès !");
                window.location.href = "signin.php";
              </script>';
              exit();
            } else {
                $errors[] = "Erreur de mise à jour DB";
            }
            $stmt->close();
        } else {
            $errors[] = "Token invalide/expiré";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Réinitialisation du mot de passe</title>
  <link rel="stylesheet" href="/production/public/css/index.css">
  <link rel="stylesheet" href="/production/public/css/pwd.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <main>
    <div id="background-container">
      <div class="bg-layer" id="bg1"></div>
      <div class="bg-layer" id="bg2"></div>
    </div>
    <section class="auth-card">
      <form class="form" method="POST">
        <h1 class="fma">Réinitialiser le mot de passe</h1>

        <?php if (!empty($errors)): ?>
          <div style="margin-top: 10px;">
            <?php foreach ($errors as $error): ?>
              <p style="color:red; font-family: Poppins, sans-serif; font-size: 0.9rem;">
                <?= htmlspecialchars($error) ?>
              </p>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

        <div class="inputForm">
          <input type="password" name="new_password" class="input" placeholder="Nouveau mot de passe" required>
        </div>

        <div class="inputForm">
          <input type="password" name="confirm_password" class="input" placeholder="Confirmer le mot de passe" required>
        </div>

        <div class="inputSubmit">
          <button type="submit" name="reset_password" class="button-submit">Réinitialiser</button>
        </div>
      </form>
    </section>
  </main>
  <script src="/production/public/js/bg.js"></script>
</body>
</html>