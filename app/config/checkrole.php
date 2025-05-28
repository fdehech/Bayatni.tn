<?php
    if (isset($_SESSION['user_role'])){
        if ($_SESSION['user_role'] == 'admin') {
            session_destroy();
            header('Location: /bayatni/public/index.php');
            exit();
        }
    }
?>