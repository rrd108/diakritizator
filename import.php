<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8' />
	<title>Diakritizátor import</title>
</head>
<body>
<?php
$mysql = mysql_connect('localhost', 'root', '');
if(!$mysql) {
   die('Could not connect: ' . mysql_error());
}
$db_selected = mysql_select_db('diakritizalo', $mysql);
if (!$db_selected) {
   die ('Can\'t use foo : ' . mysql_error());
}
mysql_query('SET NAMES "utf8"');

$file = '/home/rrd/adatok2013/fejlesztes/diakritizator/';
//$file .= 'diacritics.purports.txt';
//$file .= 'diacritics.allsanskrit.txt';
//$file .= 'diacritics.krsna.txt';

$imported = 0;
$fp = fopen($file, 'r');
if($fp) {
   while(($buffer = fgets($fp, 4096)) !== false) {
      $szopar = explode('=', $buffer);
		$szopar[1] = trim($szopar[1]);
		$sql = 'INSERT INTO `szoparok` (`sima`, `diakritikus`) VALUES ("'.$szopar[0].'","'.$szopar[1].'");';
		//print $sql . '<br>';
		$result = mysql_query($sql);
		if (!$result){
			print 'Invalid query: ' . $sql . mysql_error() . '<br>';
		}
		else{
			$imported++;
			if(($imported % 10) == 0)
				print '.';
		}
   }
   if (!feof($fp)) {
      echo "Error: unexpected fgets() fail\n";
   }
   fclose($fp);
}
?>
</body>
</html>
<?php
mysql_close($mysql);
?>