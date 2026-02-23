<?php
header('Content-Type: text/html; charset=UTF-8');
mb_internal_encoding("UTF-8");

// Настройки
$to = "emailto";  
$from = "info@domen.ru";
$fromName = "Новая заявка"; 

$fields = [
    'name'          => 'Имя',
    'email'         => 'Email',
    'phone'         => 'Телефон',
    'connect_email' => 'Связь по Email',
    'connect_phone' => 'Связь по телефону'
];

$message = "Новая заявка с сайта:\r\n\r\n";

foreach ($fields as $key => $label) {
    if (!empty($_POST[$key])) {
        $value = ($key === 'connect_email' || $key === 'connect_phone')
            ? 'Да'
            : htmlspecialchars(trim($_POST[$key]), ENT_QUOTES, 'UTF-8');

        $message .= "$label: $value\r\n";
    }
}

$page = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'Сайт';
$subject = "Новая заявка ($page)";
$subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

$headers = "From: " . mb_encode_mimeheader($fromName, "UTF-8") . " <$from>\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Ваше сообщение отправлено, спасибо!";
} else {
    echo "Ошибка при отправке письма.";
}

?>
