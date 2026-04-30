<?php
// cPanel-də yaratdığınız MySQL bazası məlumatlarını bura yazın
define('DB_HOST', 'localhost');
define('DB_NAME', 'pmtehvpxcp_gms_erp');
define('DB_USER', 'pmtehvpxcp_gms_erp');
define('DB_PASS', 'Salam1996#!');

function get_db_connection() {
    try {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Bağlantı xətası: ' . $e->getMessage()]);
        exit;
    }
}
