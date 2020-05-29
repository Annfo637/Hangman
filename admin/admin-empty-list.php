<?php

require_once '../db.php';

if(isset($_GET['action'])){

  $sql = "DELETE FROM hangman_wordlist";
  $stmt = $db->prepare($sql);
  $stmt->execute();

  header('Location:admin-home.php');
}

