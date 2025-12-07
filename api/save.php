<?php
header("Content-Type: application/json");

// Güvenlik: sadece POST kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "POST request required"]);
    exit;
}

// Gönderilen veriyi al
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid data"]);
    exit;
}

// Kayıt dosyası
$file = __DIR__ . "/results.json";

// Dosya mevcutsa yükle, yoksa oluştur
if (!file_exists($file)) {
    file_put_contents($file, "[]");
}

$current = json_decode(file_get_contents($file), true);

// Yeni kayıt ekle
$current[] = [
    "timestamp" => date("Y-m-d H:i:s"),
    "contact" => $data["contact"],
    "answers" => $data["answers"],
    "detectedStyle" => $data["detectedStyle"]
];

// JSON dosyasına yaz
file_put_contents($file, json_encode($current, JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
?>

