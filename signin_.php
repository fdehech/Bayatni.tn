<?php

session_start();
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];    
    $errors = [];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "L'adresse email est invalide.";
    }

    if (strlen($password) < 6) {
        $errors[] = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (empty($errors)) {
        try {
       
            $stmt = $conn->prepare("SELECT id, fullname, password FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows == 1) {
                $user = $result->fetch_assoc();
             
                if (password_verify($password, $user['password'])) {
               
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_name'] = $user['fullname'];
                    $_SESSION['loggedin'] = true;
                    
                    header("Location: index.html"); 
                    exit();
                } else {
                    $errors[] = "Mot de passe incorrect.";
                }
            } else {
                $errors[] = "Aucun compte trouvé avec cet email.";
            }
            
            $stmt->close();
        } catch (mysqli_sql_exception $e) {
            $errors[] = "Une erreur est survenue lors de la connexion. Veuillez réessayer.";
        }
    }

    if (!empty($errors)) {
        $_SESSION['login_errors'] = $errors;
        header("Location: index.html");
        exit();
    }
}

$conn->close();
?>