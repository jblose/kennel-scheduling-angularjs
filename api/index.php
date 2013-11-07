<?php

/* Database Routing goes here */

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/route', 'functionToCall()');
$app->get('/route/:param',	'otherFunctionToCall');

$app->run();

function functionToCall() {
	$sql = "select * FROM <table> ORDER BY <elem>";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$outbound = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($outbound);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function otherFunctionToCall($param) {
	$sql = "SELECT * FROM <table> WHERE id=:param";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("param", $param);
		$stmt->execute();
		$outbounds = $stmt->fetchObject();  
		$db = null;
		echo json_encode($outbounds); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="dbName";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>