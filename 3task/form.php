<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/html; charset=UTF-8');

// если GET — просто показываем форму
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!empty($_GET['save'])) {
        print('Спасибо, результаты сохранены.
');
    }
    include('index.php');
    exit();
}

// если POST — обрабатываем форму
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $pdo = new PDO('mysql:host=localhost;dbname=u82815', 'u82815', 'ТВОЙ_ПАРОЛЬ');

    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO applications (name, phone, email) VALUES (?, ?, ?)");
    $stmt->execute([$name, $phone, $email]);

    // редирект обратно
    header('Location: form.php?save=1');
    exit();
}
?>
