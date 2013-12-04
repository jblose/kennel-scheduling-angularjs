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
    $sql = "select id,last_name,first_name,email from rsak.client where lower(last_name) like lower(:param) order by first_name";
    $param = '%'.$param.'%';
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("param",$param);

        $stmt->execute();
        $clients = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"clients" : ' . json_encode($clients) .'}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/clientselect/:id', function($id) use ($app,$db) {
   $sql = "select * from rsak.client where id = :id";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id",$id);

        $stmt->execute();
        $client = $stmt->fetchObject();
        $db = null;
        echo json_encode($client);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/clientdogs/:id', function($id) use ($app,$db) {
   $sql = "select d.* from rsak.client_dog_x cdx join rsak.dog d on (cdx.dog_id = d.id) where cdx.client_id = :id";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id",$id);

        $stmt->execute();
        $clientdogs = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        echo json_encode($clientdogs);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});


$app->post('/clientinsert', function () use ($app,$db) {
    $reqbody = json_decode($app->request()->getBody());
    var_dump($reqbody);
    $sql = "insert into rsak.client(id,last_name, first_name,email,phone,emergency_name,emergency_phone,media_reception) values (:id,:last_name,:first_name,:email,:phone,:emergency_name,:emergency_phone,:media_reception)";

    $frmt_phone = '('.substr($reqbody->{'phone'},0,3).') '.substr($reqbody->{'phone'},3,3).'-'.substr($reqbody->{'phone'},6);
    $frmt_emergency_phone = '('.substr($reqbody->{'emergency_phone'},0,3).') '.substr($reqbody->{'emergency_phone'},3,3).'-'.substr($reqbody->{'emergency_phone'},6);

   	try {
   		$db = getConnection();
   		$stmt = $db->prepare($sql);
   		$stmt->bindParam("id",$reqbody->{'clientid'});
        $stmt->bindParam("last_name",$reqbody->{'last_name'});
        $stmt->bindParam("first_name",$reqbody->{'first_name'});
        $stmt->bindParam("email",$reqbody->{'email'});
        $stmt->bindParam("phone",$frmt_phone);
        $stmt->bindParam("emergency_name",$reqbody->{'emergency_name'});
        $stmt->bindParam("emergency_phone",$frmt_emergency_phone);
        $stmt->bindParam("media_reception",$reqbody->{'media_reception'});
   		$stmt->execute();
   		$db = null;
   		echo '{"success":{"clientid":'. $reqbody->{'clientid'} .'}}';
   	} catch(PDOException $e) {
   		echo '{"error":{"text":'. $e->getMessage() .'}}';
   	}
});

$app->post('/doginsert', function () use ($app, $db) {
    $reqbody = json_decode($app->request()->getBody());
    $sql = "insert into rsak.dog (id,name,breed,sex,color,spayed_neutered,behavior,existing_health_conditions,allergies,release_command) VALUES ( :id,:name,:breed,:sex,:color,:spayed_neutered,:behavior,:existing_health_conditions,:allergies,:release_command)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id",$reqbody->{'dogid'});
        $stmt->bindParam("name",$reqbody->{'name'});
        $stmt->bindParam("breed",$reqbody->{'breed'});
        $stmt->bindParam("sex",$reqbody->{'sex'});
        $stmt->bindParam("color",$reqbody->{'color'});
        $stmt->bindParam("spayed_neutered",$reqbody->{'spayed_neutered'});
        $stmt->bindParam("behavior",$reqbody->{'behavior'});
        $stmt->bindParam("existing_health_conditions",$reqbody->{'existing_health_conditions'});
        $stmt->bindParam("allergies",$reqbody->{'allergies'});
        $stmt->bindParam("release_command",$reqbody->{'release_command'});
        $stmt->execute();
        $db = null;
        echo '{"success":{"dogid":'. $reqbody->{'dogid'} .'}}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->post('/clientdogassign/:clientid/:dogid', function ($clientid,$dogid) use ($app, $db) {
    $sql = "insert into rsak.client_dog_x (dog_id,client_id) VALUES (:dogid, :clientid)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("dogid",$dogid);
        $stmt->bindParam("clientid",$clientid);
        $stmt->execute();
        $db = null;
        echo '{"success":{"clientid":' . $clientid . ',"dogid":' . $dogid . '}}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->post('/removedog/:clientid/:dogid', function ($clientid,$dogid) use ($app, $db) {
    try {
        $db = getConnection();
        $sql = "delete from rsak.dog where id = :dogid";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("dogid",$dogid);
        $stmt->execute();

        $sql = "delete from rsak.client_dog_x where client_id = :clientid and dog_id = :dogid";
        $stmt = $db->prepare($sql);

        $stmt->bindParam("dogid",$dogid);
        $stmt->bindParam("clientid",$clientid);
        $stmt->execute();

        $db = null;
        echo '{"success":{"clientid":' . $clientid . ',"dogid":' . $dogid . '}}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/dogidfetch', function () use ($app, $db) {
 $sql = "select max(id)+1 as dogid from rsak.dog";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $dogid = $stmt->fetchObject();
        $db = null;
        echo json_encode($dogid);
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