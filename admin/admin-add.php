<?php
/*Filen lägger till ett ord i databasen*/
require_once '../db.php';

if (isset($_POST['submitword'])) :
   
    // Hantera data som skickas via formuläret
    if($_SERVER['REQUEST_METHOD'] === 'POST') :
        $sql = "INSERT INTO hangman_wordlist (word)
                VALUES (:word)";
        $stmt = $db->prepare($sql);
        $word = htmlspecialchars($_POST['addWordInput']);

        //Kolla om ordet redan finns i databasen - ej klar
        
        $stmt->bindParam(':word', $word);
        $stmt->execute();
        header("Location: admin-home.php");
    endif;
endif;


?>