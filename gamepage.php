<?php 
  require_once 'db.php';

  $sql = "SELECT word FROM hangman_wordlist"; 
  $stmt = $db->prepare($sql);
  $stmt->execute();
  $wordlist = [];

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $word = htmlspecialchars( $row['word']);
    $wordlist[] = $word;
  }
  $jsonWords = json_encode($wordlist, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); 
?>  
<main class="gamepage">
      <a href="admin/admin-home.php"
        ><button class="button__standard">
          ADMIN
          <img
            class="settings-img"
            src="images/settings_icon.png"
            alt="admin"
          /></button
      ></a>
      <section id="game__container" class="gamepage__container">
        <div id="game__word" class="container gamepage__word">
          <div id="word"></div>
        </div>
        <div id="game__graphics" class="container gamepage__graphics">
          <div id="graphicsWrapper" class="img-wrapper">
            <img id="graphicsImage" class="graphics-img" 
            src="" alt="flower image">
          </div>        
        </div>
        <div id="game__alphabet" 
        class="container gamepage__alphabet"></div>
      </section>
      <button id="randomWord" class="button__standard">NYTT ORD</button>
      <button id="helpBtn" class="button__standard">VISA/DÖLJ INSTRUKTIONER</button>
      <div id="instructions" class="container hide">
        <ul class="helplist">
          <li>Spelet slumpar ett ord ur ordlistan och varje bokstav visas som ett svart streck</li>
          <li>Gissa om en bokstav finns i ordet genom att klicka på den</li>
          <li>Gissar du rätt visas alla förekomster av bokstaven i ordet, gissar du fel så tappar blomman ett kronblad</li>
          <li>Spelet är över när du gissat hela ordet eller när blomman tappat alla kronblad</li>
          <li>Du kan slumpa fram ett nytt ord genom att trycka på knappen "NYTT ORD"</li>
          <li>Om du trycker på ADMIN-knappen kan du modifiera den aktuella ordlistan, du kan i adminpanelen lägga till, 
            uppdatera eller ta bort ord. Du kan även tömma hela ordlistan.</li>
        </ul>
      </div>
    </main>

    <script type="text/javascript">let myWords =<?php echo $jsonWords; ?>;</script>