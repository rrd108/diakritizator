<?php
try{
   //$dbh = new PDO('mysql:host=localhost;dbname=diakritizalo', 'root', '');
	$dbh = new PDO('mysql:host=localhost;dbname=reseller10_diak', 'reseller10_djzr', '5nU38NP6');
	$dbh->query('SET NAMES "utf8"');
	
	mb_internal_encoding('UTF-8');
	mb_regex_encoding('UTF-8');

	$szoveg = $_REQUEST['forras'];

	$szavak = array_unique(mb_split("\W", $szoveg));
	foreach($szavak as $szo){
		if(mb_strlen($szo)){
			//szerepel-e a szó a cserélendők adatbázisában?
			foreach($dbh->query('SELECT * FROM szoparok WHERE sima = "' . $szo . '"') as $row){
				
				$dbh->query('UPDATE szoparok SET lekerve = (lekerve + 1) WHERE sima = "'.$szo.'"');
				
				//nagybetűs vagy kisbetűs
				$chr = mb_substr($szo, 0, 1, "UTF-8");
				if(ctype_upper($chr)){
					$row['diakritikus'] = mb_convert_case($row['diakritikus'], MB_CASE_TITLE, "UTF-8");
				}
				//$cserelt = '<span class="c">' . $row['diakritikus'] . '</span>';
				$title = '<ul>';
				$title .= '<li>' .  $szo . '</li>';
				$szavak = explode('|', $row['diakritikus']);
				foreach($szavak as $_szo){
					$title .= '<li>' . $_szo . '</li>';
				}
				$title .= '</ul>';
				$cserelt = '<span class="c tooltip" title="'.$title.'">' . $szavak[0] . '</span>';
				$szoveg = preg_replace('/\b'.$szo.'\b/u', $cserelt, $szoveg);
			}
		}
	}
}
catch(PDOException $e){
   print "Error!: " . $e->getMessage() . "<br/>";
   die();
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8' />
	<title>Diakritizátor 1.6</title>
	<link rel="stylesheet" media="all" href="diakritizator.css?v=130208"/>
	<link rel="stylesheet" href="tooltipster.css" type="text/css" media="all" title="Screen">
	<script src="jquery.js"></script>
	<script src="jquery.tooltipster.js"></script>
	<script src="diakritizator.js?v=130305"></script>
</head>
<body>
<aside>
	
	<h2>Top 10</h2>
	<ol>
	<?php
	try{
		foreach($dbh->query('SELECT diakritikus FROM szoparok ORDER BY lekerve DESC, sima ASC LIMIT 10') as $row){
			if($pipePos = strpos($row['diakritikus'],'|')){
				$szo = substr($row['diakritikus'], 0, $pipePos);
			}
			else{
				$szo = $row['diakritikus'];
			}
			print '<li>'.$szo.'</li>';
		}
		$dbh = null;
	}
	catch(PDOException $e){
	   print "Error!: " . $e->getMessage() . "<br/>";
	   die();
	}
	?>
	</ol>
	
	<?php
	if($szoveg){
	?>
		<a href="https://code.google.com/p/diakritizator/issues/entry">Hibajelentés</a>
		<h2>Jelmagyarázat</h2>
		<ul>
			<li><span class="_c">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> cserélhető szó</li>
		</ul>
		<h3>Infók</h3>
		<p>A <span class="_c">kiemelt hátterű</span> szavakra rámutatva meg lehet nézni a szó lehetséges variációit és rákattintva lehet váltogatni az állapotukat.</p>
		<p>A nem kiemelt szavakra kattintva a teljes szöveg szerkeszthetővé válik.</p>
		<h2>Figyelmeztetés</h2>
		<p>Ez az alkalmazás <strong>NEM</strong> egy szanszkrit editori eszköz. Lehetnek <em>(és vannak is)</em> benne hibák, az átalakított szöveg nem feltétlenül helyes. Persze igyekszünk a <a href="https://code.google.com/p/diakritizator/issues/entry">visszajelzések</a> alapján javítani, fejleszteni.</p>
	<?php
	}
	?>
</aside>
<section>
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
print '<p contenteditable id="ujSzoveg">' . nl2br($szoveg) . '</p>';
?>
</section>
</body>
</html>
