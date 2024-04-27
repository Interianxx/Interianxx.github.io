<?php
    // Enviar correo de formulario de contacto
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $email_from = 'info@sweethome.icu';
    $email_subject = "New Form Submission";
    
    $email_body =   "Nombre del usuario: $name.\n".
                    "Email del usuario: $visitor_email.\n".
                    "Razón: $subject.\n".
                    "Mensaje del usuario: $message.\n";

    $to = "inf.sweethome@gmail.com";
    $headers = "From: $email_from \r\n";
    $headers .= "Reply-To: $visitor_email \r\n";
    mail($to,$email_subject,$email_body,$headers);
    header("Location: Contactanos.html");

    // Enviar correo de compra
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $userEmail = $_POST['user_email'];
        $totalPrice = $_POST['total_price'];

        $email_from = 'info@sweethome.icu';
        $email_subject = "Compra";
        $email_body =   "Correo electrónico: $userEmail\n" .
                        "Total de la compra: $totalPrice";

        $to = "info@sweethome.icu"; // Correo de sweethome.icu
        $headers = "From: $email_from \r\n";
        $headers .= "Reply-To: $userEmail \r\n";

        if (mail($to, $email_subject, $email_body, $headers)) {
            // Si el correo se envía correctamente
            mail($userEmail, $email_subject, $email_body, $headers); // Envía el correo al cliente
            http_response_code(200);
        } else {
            // Si hay un error al enviar el correo
            http_response_code(500);
        }
    }
?>
