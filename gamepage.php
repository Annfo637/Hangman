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
          ADMIN<img
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
            <img id="graphicsImage" class="graphics-img" src="images/flower-init.png" alt="full flower">
          </div>        
        </div>
        <div id="game__alphabet" class="container gamepage__alphabet"></div>
      </section>
      <button id="randomWord" class="button__standard">NYTT ORD</button>
      <button class="button__standard">INSTRUKTIONER</button>
    </main>

    <script type="text/javascript">let myWords =<?php echo $jsonWords; ?>;</script>