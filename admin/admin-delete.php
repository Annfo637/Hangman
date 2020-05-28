<?php

require_once '../db.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $id = htmlspecialchars($_POST['wordid']);
  
  $sql = "DELETE FROM hangman_wordlist
          WHERE id = :id";

  $stmt = $db->prepare($sql);

  $stmt->bindParam(':id' , $id );
  $stmt->execute();

  header('Location:admin-home.php');
}



