<?php
session_start();
session_destroy();
header("Location: /bayatni/public/index.php");
exit;