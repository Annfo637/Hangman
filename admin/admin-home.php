<?php

require_once 'header-admin.php';
require_once '../db.php';
require_once 'admin-add.php';
require_once 'admin-empty-list.php';


$sql = "SELECT * FROM hangman_wordlist"; 
$stmt = $db->prepare($sql);
$stmt->execute();

?>

<main class="adminpage">
  <a href="../index.php">
  <button class="button__standard">TILLBAKA TILL SPELET</button>
  </a>
  <button id="emptyWordlist" class="button__standard"
  onclick="return confirm('Är du säker på att du vill rensa HELA ordlistan?')">
    RENSA ORDLISTAN
  </button>
  <p class="adminpage__text">
    Klicka på ett ord för att uppdatera eller ta bort det.
  </p>
  <section>
    <div id="wordlistContainer" class="container">

<?php
if($stmt->rowCount() === 0) {
  echo '<h3>Ordlistan är tom, lägg till ord nedan.</h3>';
}
else {  
  $myWords = '<div class="adminpage__wordlist">';

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $id = htmlspecialchars( $row['id']);
    $word = htmlspecialchars( $row['word']);
   
    $myWords .= "<a href='admin-edit.php?id=$id' class='adminpage__word'>" . $word . "</a>";
  }
  $myWords .= '</div>';
  echo $myWords;
}
?>

    </div>
  </section>
  <section>
    <form id="submitWord" action="admin-add.php" method="POST">
      <label for="addWordInput" class="input-label">
        Vill du lägga till ett nytt ord?</label>
      <br />
      <input
        type="text"
        name="addWordInput"
        id="addWordInput"
        class="text-input"
        placeholder=""/>
      <input type="submit" name ="submitword" id="addWord" class="button__standard" value="LÄGG TILL">
      
    </form>
  </section>
  <!--<section id="edit" class="edit">
    <input type="text" id="editWordInput" class="text-input" />
    <button id="updateBtn" class="button__standard">UPPDATERA</button>
    <button id="deleteBtn" class="button__standard">TA BORT</button>
  </section>-->
</main>

<?php

require_once 'footer-admin.php';