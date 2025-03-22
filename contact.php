<?php
// Cek apakah form disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil data form
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Cek apakah data valid
    if (empty($name) || empty($message) || empty($subject) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set kode respons 400 (bad request)
        http_response_code(400);
        echo "Mohon lengkapi form dan coba lagi.";
        exit;
    }

    // Email penerima (ganti dengan email Anda)
    $recipient = "email@example.com";

    // Membuat header email
    $headers = "From: $name <$email>";

    // Mengirim email
    if (mail($recipient, $subject, $message, $headers)) {
        // Set kode respons 200 (OK)
        http_response_code(200);
        echo "Terima kasih! Pesan Anda telah dikirim.";
    } else {
        // Set kode respons 500 (internal server error)
        http_response_code(500);
        echo "Oops! Terjadi kesalahan saat mengirim pesan.";
    }
} else {
    // Bukan metode POST
    http_response_code(403);
    echo "Terjadi kesalahan saat memproses permintaan Anda.";
}
?>