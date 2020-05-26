<?php

require_once 'header-admin.php';
require_once '../db.php';

$sql = "SELECT * FROM hangman_wordlist"; 
$stmt = $db->prepare($sql);
$stmt->execute();
//$wordsToLS = [];

?>

<main class="adminpage">
      <a href="../index.php">
        <button class="button__standard">TILLBAKA TILL SPELET</button>
      </a>
      <button id="emptyWordlist" class="button__standard">
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
    $id = htmlspecialchars( $row['wordID']);
    $word = htmlspecialchars( $row['word']);
    //$wordsToLS[] = $word;

    $myWords .= "<a href='admin-edit.php?id=$id' class='adminpage__word'>" . $word . "</a>";
  }
  $myWords .= '</div>';
  echo $myWords;
  
  //$jsonWords = json_encode($wordsToLS, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); 
  //echo($jsonWords);

  //print_r($wordsToLS);
}
?>

        </div>
        <form id="submitWord" action="#">
          <label for="addWordInput" class="input-label"
            >Vill du lägga till ett nytt ord?</label
          >
          <br />
          <input
            type="text"
            name="addWordInput"
            id="addWordInput"
            class="text-input"
            placeholder=""
          />
          <button id="addWord" class="button__standard">LÄGG TILL</button>
        </form>
      </section>
      <section id="edit" class="edit">
        <input type="text" id="editWordInput" class="text-input" />
        <button id="updateBtn" class="button__standard">UPPDATERA</button>
        <button id="deleteBtn" class="button__standard">TA BORT</button>
      </section>
    </main>

<?php

require_once 'footer-admin.php';