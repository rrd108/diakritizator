<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8' />
	<title>Diakritizátor 4.0</title>
	<link rel="stylesheet" media="all" href="diakritizator.css?v=130208"/>
	<script src="jquery.js"></script>
	<script src="diakritizator.js?v=130305"></script>
</head>
<body>
<?php
if($szoveg = $_REQUEST['forras']){
?>
<aside>
	<a href="https://code.google.com/p/diakritizator/issues/entry">Hibajelentés</a>
	<h2>Jelmagyarázat</h2>
	<ul>
		<li><span class="_c">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> cserélt</li>
		<li><span class="_v">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> visszaállított</li>
	</ul>
	<h3>Infók</h3>
	<p>A <span class="_c">kiemelt hátterű</span> szavakra rámutatva meg lehet nézni a szó lehetséges variációit és rákattintva lehet váltogatni az állapotukat.</p>
	<p>A nem kiemelt szavakra kattintva a teljes szöveg szerkeszthetővé válik.</p>
	<h2>Figyelmeztetés</h2>
	<p>Ez az alkalmazás <strong>NEM</strong> egy szanszkrit editori eszköz. Lehetnek <em>(és vannak is)</em> benne hibák, az átalakított szöveg nem feltétlenül helyes. Persze igyekszünk a <a href="https://code.google.com/p/diakritizator/issues/entry">visszajelzések</a> alapján javítani, fejleszteni.</p>
</aside>
<section>
<?php
}
?>
	<form method="post" action="<?php print $_SERVER['PHP_SELF']; ?>">
		Átalakítandó szöveg:<br>
		<textarea
			id="forras"
			name="forras"
			rows="15"
			cols="75"><?php print $_REQUEST['forras']; ?></textarea>
		<br>
		<input type="submit" value="diaktritizálok">
	</form>
<?php
try{
   //$dbh = new PDO('mysql:host=localhost;dbname=diakritizalo', 'root', '');
	$dbh = new PDO('mysql:host=localhost;dbname=reseller10_diak', 'reseller10_djzr', '5nU38NP6');
	$dbh->query('SET NAMES "utf8"');
	
	mb_internal_encoding('UTF-8');
	mb_regex_encoding('UTF-8');
	$szavak = array_unique(mb_split("\W", $szoveg));
	foreach($szavak as $szo){
		if(mb_strlen($szo)){
			//szerepel-e a szó a cserélendők adatbázisában?
			foreach($dbh->query('SELECT * FROM szoparok WHERE sima = "' . $szo . '"') as $row){
				//nagybetűs vagy kisbetűs
				$chr = mb_substr($szo, 0, 1, "UTF-8");
				if(ctype_upper($chr)){
					$row['diakritikus'] = mb_convert_case($row['diakritikus'], MB_CASE_TITLE, "UTF-8");
				}
				$cserelt = '<span class="c">' . $row['diakritikus'] . '</span>';
				$szoveg = preg_replace('/\b'.$szo.'\b/u', $cserelt, $szoveg);
			}
		}
	}
   $dbh = null;
}
catch(PDOException $e){
   print "Error!: " . $e->getMessage() . "<br/>";
   die();
}
print '<p contenteditable id="ujSzoveg">' . nl2br($szoveg) . '</p>';
?>
</section>
</body>
</html>
