<?php

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

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