<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8' />
	<title>Diakritizátor import</title>
</head>
<body>
<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
try{
   $dbh = new PDO('mysql:host=localhost;dbname=diakritizalo', 'root', '');
	//$dbh = new PDO('mysql:host=localhost;dbname=reseller10_diak', 'reseller10_djzr', '5nU38NP6');
	$dbh->query('SET NAMES "utf8"');

	$file = '/home/rrd/adatok2013/fejlesztes/diakritizator/';
	$file .= 'diacritics_vrn.txt';
	
	$updated = $imported = 0;
	$fp = fopen($file, 'r');
	if($fp) {
		while(($buffer = fgets($fp, 4096)) !== false){
			$szopar = explode('=', $buffer);
			$szopar[1] = trim($szopar[1]);
			
			$e = $dbh->query('SELECT * FROM szoparok WHERE sima = "' . $szopar[0] . '"');
			if($e->rowCount()){
				$sql = 'UPDATE `szoparok` SET `sima` = "'.$szopar[0].'", `diakritikus` = "'.$szopar[1].'" WHERE id = '.$e->fetchColumn().');';
				$updated++;
			}
			else{
				$sql = 'INSERT INTO `szoparok` (`sima`, `diakritikus`) VALUES ("'.$szopar[0].'","'.$szopar[1].'");';
				$imported++;
			}
			$e = $dbh->exec($sql);

			if((($imported + $updated) % 100) == 0){
				print '. ';
			}
		}
		if (!feof($fp)) {
			echo "Error: unexpected fgets() fail\n";
		}
		fclose($fp);
	}
	$dbh = null;
	print '<hr>';
	print 'Imported: ' . $imported . ', updated: ' . $updated;
}
catch(PDOException $e){
   print "Error!: " . $e->getMessage() . "<br/>";
   die();
}

?>
</body>
</html>