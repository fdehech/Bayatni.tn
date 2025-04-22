<?php
require_once 'config.php';


?>

<h2>Mot de passe oublié</h2>
<form method="POST" action="forgot_password.php">
    <input type="email" name="email" placeholder="Votre email" required>
    <button type="submit">Envoyer le lien</button>
</form>
