<?php
require_once 'header-admin.php';
require_once '../db.php';

//Hämta ordet från databasen för att lägga i textfältet
if(isset($_GET['id'])){
    $id = htmlspecialchars($_GET['id']);
    $sql = "SELECT * FROM hangman_wordlist WHERE id =:id"; 
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
}

while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $word = htmlspecialchars($row['word']);
}

?>

<main class="editpage">

    <section id="edit" class="edit">
    <a href="admin-home.php">
    <button id="deleteBtn" 
            class="button__standard">
            TILLBAKA TILL ORDLISTAN</button>
    </a>
    <br>
    <form method="POST">
        <input type="text" 
                name="wordinput" 
                class="text-input" 
                value="<?php echo $word; ?>"/>
        <input type="hidden" 
                name="wordid" 
                class="text-input" 
                value="<?php echo $id; ?>"/>
        <button class="button__standard" 
                type="submit" 
                name="updateword" 
                formaction="admin-update.php">UPPDATERA</button>
        <button class="button__standard" 
                type="submit" 
                name="deleteword" 
                formaction="admin-delete.php">TA BORT</button>
    </form>
  </section>

</main>

<?php
require_once 'footer-admin.php';