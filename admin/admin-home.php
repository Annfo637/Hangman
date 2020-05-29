<?php

require_once 'header-admin.php';
require_once '../db.php';
require_once 'admin-add.php';
require_once 'admin-empty-list.php';


$sql = "SELECT * FROM hangman_wordlist"; 
$stmt = $db->prepare($sql);
$stmt->execute();
$wordlist = [];

?>

<main class="adminpage">
  <a href="../index.php">
  <button class="button__standard">TILLBAKA TILL SPELET</button>
  </a>
  <a href="admin-empty-list.php?action=emptylist">
  <button id="emptyWordlist" class="button__standard"
  onclick="return confirm('Är du säker på att du vill rensa HELA ordlistan?')">
    RENSA ORDLISTAN
  </button>
  </a>
  <p class="adminpage__text">
    Klicka på ett ord för att uppdatera eller ta bort det.
  </p>
  <section>
    <div id="wordlistContainer" class="container">

<?php
if($stmt->rowCount() === 0) {
  echo '<h3>Ordlistan är tom, lägg till ord nedan.</h3>';
  $jsonWords = json_encode($wordlist, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); 
}
else {  
  $showWords = '<div class="adminpage__wordlist">';

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $id = htmlspecialchars( $row['id']);
    $word = htmlspecialchars( $row['word']);
    $wordlist[] = $word;
   
    $showWords .= "<a href='admin-edit.php?id=$id' class='adminpage__word'>" . $word . "</a>";
  }
  $showWords .= '</div>';
  echo $showWords;
  $jsonWords = json_encode($wordlist, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); 
}
?>
    </div>
  </section>
  <section>
    <br>
    <form id="submitWord" action="admin-add.php" method="POST">
      <label for="addWordInput" class="adminpage__text">
        Vill du lägga till ett nytt ord?</label>
      <br />
      <input
        type="text"
        name="addWordInput"
        id="addWordInput"
        class="text-input"
        placeholder=""/>
      <input type="submit" name ="submitword" id="addWord" class="button--inactive" value="LÄGG TILL">
      <br>
      <span class="validationText"></span>
    </form>
  </section>
</main>

<script type="text/javascript">let myWords =<?php echo $jsonWords; ?>;</script>
<?php

require_once 'footer-admin.php';