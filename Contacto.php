<?php
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];


    $email_from = 'info@sweethome.icu';

    $email_subject = "New Form Submission";
    
    $email_body =   "Nombre del usuario: $name.\n".
                    "Email del usuario: $visitor_email.\n".
                    "Razon: $subject.\n".
                    "Mensaje del usuario: $message.\n";


    $to = "inf.sweethome@gmail.com";

    $headers = "From: $email_from \r\n";

    $headers .= "Reply-To: $visitor_email \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: Contactanos.html");


?>