<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@ichem.kz"; // замените на свой email
    $subject = "Contact Form Message";

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $recaptcha_secret = "6LcANTQrAAAAAHBQGPx6p4zbTsGHIkU-3wRh6KpX";
    $recaptcha_response = $_POST['g-recaptcha-response'];

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret&response=$recaptcha_response");
    $captcha_success = json_decode($verify);

    if (!$captcha_success->success) {
        echo "reCAPTCHA verification failed. Please try again.";
        exit;
    }

    $body = "Name: $name\nEmail: $email\nMessage:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Sorry, something went wrong. Please try again.";
    }
}
?>