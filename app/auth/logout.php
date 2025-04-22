<?php
session_start();
session_destroy();
header("Location: /production/public/index.php");
exit;