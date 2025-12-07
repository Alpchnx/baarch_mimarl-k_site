<?php
session_start();

// Oturumu tamamen sonlandır
session_unset();
session_destroy();

// Tarayıcıda kalan session cookie'yi sil
setcookie(session_name(), '', time() - 3600, '/');

// Admin giriş ekranına yönlendir
header("Location: /api/admin.php");
exit;
?>