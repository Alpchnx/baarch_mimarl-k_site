<?php
session_start();

$ADMIN_PASSWORD = "sifre_giriniz"; // 

// ---- LOGIN EKRANI ----
if (!isset($_SESSION["logged"]) || $_SESSION["logged"] !== true) {

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
        if ($_POST['password'] === $ADMIN_PASSWORD) {
            $_SESSION["logged"] = true;
            header("Location: admin.php");
            exit;
        } else {
            $error = "Hatalı şifre!";
        }
    }

    ?>
    <form method="POST" style="margin: 100px auto; width: 300px;">
        <h2>Admin Giriş</h2>
        <input type="password" name="password" placeholder="Şifre" required>
        <button type="submit">Giriş</button>
        <?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>
    </form>
    <?php
    exit();
}

// ---- GİRİŞ YAPILDI ----

$file = __DIR__ . "/results.json";

if (!file_exists($file)) {
    echo "Henüz kayıt yok.";
    exit;
}

$data = json_decode(file_get_contents($file), true);
?>
<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
        background: #f5f5f5;
        padding: 30px;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    th {
        background: #8B0000;
        color: white;
        padding: 14px;
        font-size: 16px;
        text-align: left;
    }

    td {
        padding: 14px;
        border-bottom: 1px solid #eee;
        vertical-align: top;
    }

    tr:hover td {
        background: #fafafa;
    }

    pre {
        white-space: pre-wrap;
        background: #f0f0f0;
        padding: 10px;
        border-radius: 6px;
        font-size: 14px;
    }

    .logout {
        display: inline-block;
        margin-top: 20px;
        background: #8B0000;
        padding: 10px 18px;
        color: white;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
    }

    .logout:hover {
        background: #660000;
    }
</style>

<h1>Anket Sonuçları</h1>

<table border="1" cellpadding="8" cellspacing="0">
    <tr>
        <th>Tarih</th>
        <th>İletişim</th>
        <th>Cevaplar</th>
        <th>Tespit Edilen Stil</th>
    </tr>

    <?php foreach ($data as $row): ?>
        <tr>
            <td><?= $row["timestamp"] ?></td>
            <td>
                Ad: <?= htmlspecialchars($row["contact"]["name"]) ?><br>
                Tel: <?= htmlspecialchars($row["contact"]["phone"]) ?><br>
                Email: <?= htmlspecialchars($row["contact"]["email"]) ?>
            </td>
           <td>
    <?php foreach ($row["answers"] as $item): ?>
        <div style="margin-bottom: 10px;">
            <strong style="color:#8B0000;"><?= htmlspecialchars($item["question"]) ?></strong><br>
            <span style="color:#333;">→ <?= htmlspecialchars($item["answer"]) ?></span>
        </div>
    <?php endforeach; ?>
</td>

            <td><?= htmlspecialchars($row["detectedStyle"]) ?></td>
        </tr>
    <?php endforeach; ?>
</table>

<br>
<a href="logout.php">Çıkış Yap</a>

