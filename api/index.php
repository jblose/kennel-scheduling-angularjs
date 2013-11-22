<?php

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/clientidfetch', function () use ($app, $db) {
 $sql = "select max(id)+1 as clientid from rsak.client";
    try{
    $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $clientid = $stmt->fetchObject();
        $db = null;
        echo json_encode($clientid);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
});

$app->get('/clientsearch/:param', function ($param) use ($app, $db) {
 $sql = "select last_name,first_name,email from rsak.client where lower(last_name) like lower('%:param%')";
    try{
    $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("param",$param);
        $stmt->execute();
        $clients = $stmt->fetchObject();
        $db = null;
        echo '{"clients" : ' . json_encode($clients) . .'}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
});

$app->post('/clientinsert', function () use ($app,$db) {
    $reqbody = json_decode($app->request()->getBody());
    var_dump($reqbody);
    $sql = "insert into rsak.client(id,last_name, first_name,email,phone,emergency_name,emergency_phone,media_reception) values (:id,:last_name,:first_name,:email,:phone,:emergency_name,:emergency_phone,:media_reception)";
   	try {
   		$db = getConnection();
   		$stmt = $db->prepare($sql);
   		$stmt->bindParam("id",$reqbody->{'clientid'});
        $stmt->bindParam("last_name",$reqbody->{'last_name'});
        $stmt->bindParam("first_name",$reqbody->{'first_name'});
        $stmt->bindParam("email",$reqbody->{'email'});
        $stmt->bindParam("phone",$reqbody->{'phone'});
        $stmt->bindParam("emergency_name",$reqbody->{'emergency_name'});
        $stmt->bindParam("emergency_phone",$reqbody->{'emergency_phone'});
        $stmt->bindParam("media_reception",$reqbody->{'media_reception'});
   		$stmt->execute();
   		$db = null;
   		echo json_encode($reqbody);
   	} catch(PDOException $e) {
   		echo '{"error":{"text":'. $e->getMessage() .'}}';
   	}
});

$app->run();

function getConnection() {
	$dbhost="rsak.db.11594131.hostedresource.com";
	$dbuser="rsak";
	$dbpass="Rsak!330";
	$dbname="rsak";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>