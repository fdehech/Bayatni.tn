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
    $card_cvc = $_POST['card_cvc'];

    


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

    // Vérification date de naissance (âge minimum 13 ans)
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
        header("Location: signup.html");
        exit();
    }
}

$conn->close();
?>
