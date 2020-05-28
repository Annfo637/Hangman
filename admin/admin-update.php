<?php

require_once '../db.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $id = htmlspecialchars($_POST['wordid']);
  $word = htmlspecialchars($_POST['wordinput']);
  
  $sql = "UPDATE hangman_wordlist
          SET word = :word
          WHERE id = :id";

  $stmt = $db->prepare($sql);

  $stmt->bindParam(':id' , $id );
  $stmt->bindParam(':word' , $word );
  $stmt->execute();

  header('Location:admin-home.php');
}

