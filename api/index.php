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
    //TODO: MySQL Function for the group_concat is not working as intended.
    //$sql = "select c.id,c.last_name,c.first_name,c.email,group_concat( d.name separator ', ')  as dognames from rsak.client c join rsak.client_dog_x cdx on (c.id = cdx.client_id) join rsak.dog d on (cdx.dog_id = d.id) where lower(c.last_name) like lower(:last_name) order by c.last_name,c.first_name";
    $sql = "select c.id,c.last_name,c.first_name,c.email from rsak.client c where lower(c.last_name) like lower(:last_name) order by c.last_name,c.first_name";
    $param = '%'.$param.'%';
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("last_name",$param);

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
    $sql = "insert into rsak.client(id,last_name, first_name,email,phone,emergency_name,emergency_phone,media_reception, boarding_agreement) values (:id,:last_name,:first_name,:email,:phone,:emergency_name,:emergency_phone,:media_reception,:boarding_agreement)";

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
   		$stmt->bindParam("boarding_agreement",$reqbody->{'boarding_agreement'});
   		$stmt->execute();
   		$db = null;
   		echo '{"success":{"clientid":'. $reqbody->{'clientid'} .'}}';
   	} catch(PDOException $e) {
   		echo '{"error":{"text":'. $e->getMessage() .'}}';
   	}
});

$app->post('/doginsert', function () use ($app, $db) {
    $reqbody = json_decode($app->request()->getBody());
    $sql = "insert into rsak.dog (id,name,age,breed,sex,color,kennel_size,spayed_neutered,behavior,existing_health_conditions,allergies,release_command,notes,rabies_exp,distemper_exp,parvo_exp,bordetella_exp) VALUES ( :id,:name,:age,:breed,:sex,:color,:kennel_size,:spayed_neutered,:behavior,:existing_health_conditions,:allergies,:release_command,:notes,:rabies_exp,:distemper_exp,:parvo_exp,:bordetella_exp)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id",$reqbody->{'dogid'});
        $stmt->bindParam("name",$reqbody->{'name'});
        $stmt->bindParam("age",$reqbody->{'age'});
        $stmt->bindParam("breed",$reqbody->{'breed'});
        $stmt->bindParam("sex",$reqbody->{'sex'});
        $stmt->bindParam("color",$reqbody->{'color'});
        $stmt->bindParam("kennel_size",$reqbody->{'kennel_size'});
        $stmt->bindParam("spayed_neutered",$reqbody->{'spayed_neutered'});
        $stmt->bindParam("behavior",$reqbody->{'behavior'});
        $stmt->bindParam("existing_health_conditions",$reqbody->{'existing_health_conditions'});
        $stmt->bindParam("allergies",$reqbody->{'allergies'});
        $stmt->bindParam("release_command",$reqbody->{'release_command'});
        $stmt->bindParam("notes",$reqbody->{'notes'});
        $stmt->bindParam("rabies_exp", $reqbody->{'rabies'});
        $stmt->bindParam("distemper_exp",$reqbody->{'distemper'});
        $stmt->bindParam("parvo_exp",$reqbody->{'parvo'});
        $stmt->bindParam("bordetella_exp",$reqbody->{'bordetella'});
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

$app->get('/reservfetchclient/:resid', function ($resid) use ($app, $db) {
   $sql = "select r.check_in, r.check_out, r.status, c.first_name, c.last_name,c.phone, c.emergency_name,c.emergency_phone FROM rsak.reservation_id_x rix " .
           "join rsak.reservation r on (rix.reservation_id = r.reservation_id) " .
           "join rsak.client c on (r.client_id = c.id) " .
           "where master_id = :master_id limit 1";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("master_id",$resid);

        $stmt->execute();
        $reservation = $stmt->fetchObject();

        $db = null;
        echo json_encode($reservation);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/reservfetchdog/:resid', function ($resid) use ($app, $db) {
   $sql = "select d.name, d.sex, d.color, d.behavior,r.training,r.training_amt FROM rsak.reservation_id_x rix " .
           "join rsak.reservation r on (rix.reservation_id = r.reservation_id) " .
           "join rsak.dog d on (r.dog_id = d.id) where master_id = :master_id";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("master_id",$resid);

        $stmt->execute();
        $reservation = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        echo json_encode($reservation);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/availkennels', function () use ($app, $db) {
    //TODO: Will eventually need a where clause based on availabiltiy.
    //TODO: Drop Down Search Kennels available by size increasing
    $reqbody = json_decode($app->request()->getBody());
    $sql= "select k.kennel_id, k.name, k.size from rsak.kennel k " .
           "join rsak.kennel_attr ka on (k.size = ka.size_name) " .
           "join rsak.reservation r on (k.kennel_id = r.kennel_id) " .
           "and ka.size_val >= (select size_val from rsak.kennel_attr where size_name = :req_size)";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("req_size",$reqbody->{'kennel_size'});
        $stmt->execute();
        $avkens = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($avkens);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/fetchclients', function () use ($app, $db) {
    $sql = "select c.id, concat(c.last_name,', ',c.first_name, ' - ', group_concat( d.name separator ', ')) as full_name " .
            "from rsak.client c " .
            "join rsak.client_dog_x cdx on (c.id = cdx.client_id) " .
            "join rsak.dog d on (cdx.dog_id = d.id) " .
            "where c.id > 0 " .
            "group by c.id " .
            "order by concat(c.last_name,', ',c.first_name)";
     try{
         $db = getConnection();
         $stmt = $db->prepare($sql);

         $stmt->execute();
         $clients = $stmt->fetchAll(PDO::FETCH_OBJ);
         $db = null;
         echo json_encode($clients);
     } catch(PDOException $e) {
         echo '{"error":{"text":'. $e->getMessage() .'}}';
     }
});


$app->get('/fetchclientdog/:clientid', function ($clientid) use ($app, $db) {
    $sql = "select d.* from rsak.dog d join rsak.client_dog_x cdx on (d.id = cdx.dog_id) where cdx.client_id = :clientid";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("clientid",$clientid);
        $stmt->execute();
        $dogs = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($dogs);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->get('/masterresid', function () use ($app, $db) {
    $sql = "select max(master_id)+1 as masterReservationId from rsak.reservation_id_x";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $masterReservationId = $stmt->fetchObject();
        $db = null;
        echo json_encode($masterReservationId);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});



$app->get('/clientresid', function () use ($app, $db) {
    $sql = "select max(reservation_id)+1 as reservationId from rsak.reservation";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $reservationId = $stmt->fetchObject();
        $db = null;
        echo json_encode($reservationId);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->post('/reserveinsert', function () use ($app, $db) {
    $reqbody = json_decode($app->request()->getBody());
    var_dump($reqbody);
    $sql =  "insert into rsak.reservation_id_x (master_id, reservation_id) values (:master_id,:reservation_id)";
     try {
             $db = getConnection();
             $stmt = $db->prepare($sql);
             $stmt->bindParam("master_id",$reqbody->{'master_reservation_id'});
             $stmt->bindParam("reservation_id",$reqbody->{'reservation_id'});
             $stmt->execute();
             $db = null;
         } catch(PDOException $e) {
             echo '{"error":{"text":'. $e->getMessage() .'}}';
         }

    $sql = "insert into rsak.reservation (reservation_id, client_id, dog_id, kennel_id, check_in, check_out, status, title, url, cost, training, training_amt, notes, medication) values (:reservation_id, :client_id, :dog_id, :kennel_id, :check_in, :check_out, :status, :title, :url, :cost, :training, :training_amt, :notes, :medication)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("reservation_id",$reqbody->{'reservation_id'});
        $stmt->bindParam("client_id",$reqbody->{'client_id'});
        $stmt->bindParam("dog_id",$reqbody->{'dog_id'});
        $stmt->bindParam("kennel_id",$reqbody->{'kennel_id'});
        $stmt->bindParam("check_in",$reqbody->{'check_in'});
        $stmt->bindParam("check_out",$reqbody->{'check_out'});
        $stmt->bindParam("status",$reqbody->{'status'});
        $stmt->bindParam("title",$reqbody->{'title'});
        $stmt->bindParam("url",$reqbody->{'url'});
        $stmt->bindParam("cost",$reqbody->{'cost'});
        $stmt->bindParam("training",$reqbody->{'training'});
        $stmt->bindParam("training_amt",$reqbody->{'training_amt'});
        $stmt->bindParam("notes",$reqbody->{'notes'});
        $stmt->bindParam("medication",$reqbody->{'medication'});
        $stmt->execute();
        $db = null;
        echo '{"success":{"dog_id":'. $reqbody->{'dog_id'} .',"client_id":'. $reqbody->{'client_id'} . ',"kennel_id":'. $reqbody->{'kennel_id'} . '}}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
});

$app->post('/reserveremove', function () use ($app, $db) {
    $reqbody = json_decode($app->request()->getBody());
    $sql =  "delete from rsak.reservation_id_x where reservation_id = :reservation_id";
     try {
             $db = getConnection();
             $stmt = $db->prepare($sql);
             $stmt->bindParam("reservation_id",$reqbody->{'reservation_id'});
             $stmt->execute();
             $db = null;
         } catch(PDOException $e) {
             echo '{"error":{"text":'. $e->getMessage() .'}}';
         }
    $sql =  "delete from rsak.reservation where reservation_id = :reservation_id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("reservation_id",$reqbody->{'reservation_id'});
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    $sql = "select d.* from rsak.dog d " .
            "join rsak.client_dog_x cdx on (d.id = cdx.dog_id) " .
            "where cdx.client_id = :clientid " .
            "and d.id not in ( " .
            "select d.id from rsak.dog d " .
            "join rsak.client_dog_x cdx on (d.id = cdx.dog_id) " .
            "join rsak.reservation r on (r.dog_id = d.id) " .
            "join rsak.reservation_id_x rix on (rix.reservation_id = r.reservation_id) " .
            "where cdx.client_id = :clientid " .
            "and rix.master_id = :masterid)";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("clientid",$reqbody->{'client_id'});
        $stmt->bindParam("masterid",$reqbody->{'master_id'});

        $stmt->execute();
        $dogs = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($dogs);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

});


$app->get('/fetchresconfirm/:masterid', function ($masterid) use ($app, $db) {
    $sql = "select r.reservation_id as reservation_id, rix.master_id as master_id, d.name as dog_name, k.name as kennel_name, concat(r.training,' : ', r.training_amt) as training, r.medication as medication, r.notes as notes from rsak.reservation_id_x rix " .
        "join rsak.reservation r on (rix.reservation_id = r.reservation_id) " .
        "join rsak.dog d on (r.dog_id = d.id) " .
        "join rsak.kennel k on (r.kennel_id = k.kennel_id) " .
        "where rix.master_id = :master_id";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("master_id",$masterid);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($result);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() . '}}';
    }
});

$app->get('/fetchreservelist/:size', function ($size) use ($app, $db) {
    $sql =  "select ifnull(reservation_id,0) as id, ifnull(title,'vacant') as title, ifnull(url,'nullurl') as url ,ifnull(status,'event-vacant') as class, ifnull(check_in,(1368723600 *1000)) as start, ifnull(check_out,(1400259600*1000)) as end  " .
            "from rsak.kennel k " .
            "join rsak.reservation r on (k.kennel_id = r.kennel_id) " .
            "where k.size = :size";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("size",$size);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"success": 1,"result":' . json_encode($result) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() . '}}';
    }
});

$app->post('/updateDB', function () use ($app, $db) {
    $reqbody = json_decode($app->request()->getBody());

    $sql = "update rsak.".$reqbody->{'table'}." set ".$reqbody->{'column'}."= :value where ".$reqbody->{'key'}." = :id";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("value",$reqbody->{'value'});
        $stmt->bindParam("id",$reqbody->{'id'});

        $stmt->execute();
        $db = null;
        echo '{"success": 1}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() . '}}';
    }
});

$app->post('/updatedog', function () use ($app, $db) {
    $reqbody = json_decode($app->request()->getBody());


    $sql = "update rsak.dog set name = :name, breed = :breed, age = :age, sex = :sex, color = :color, " .
            "kennel_size = :kennel_size, spayed_neutered = :spayed_neutered, behavior = :behavior, " .
            "existing_health_conditions = :existing_health_conditions, allergies = :allergies, " .
            "release_command = :release_command, notes = :notes, rabies_exp = :rabies_exp, " .
            "distemper_exp = :distemper_exp, parvo_exp = :parvo_exp, bordetella_exp = :bordetella_exp where id = :id";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id",$reqbody->{'id'});

        $stmt->bindParam("name",$reqbody->{'name'});
        $stmt->bindParam("breed",$reqbody->{'breed'});
        $stmt->bindParam("age",$reqbody->{'age'});
        $stmt->bindParam("sex",$reqbody->{'sex'});
        $stmt->bindParam("color",$reqbody->{'color'});
        $stmt->bindParam("kennel_size",$reqbody->{'kennel_size'});
        $stmt->bindParam("spayed_neutered",$reqbody->{'spayed_neutered'});
        $stmt->bindParam("behavior",$reqbody->{'behavior'});
        $stmt->bindParam("existing_health_conditions",$reqbody->{'existing_health_conditions'});
        $stmt->bindParam("allergies",$reqbody->{'allergies'});
        $stmt->bindParam("release_command",$reqbody->{'release_command'});
        $stmt->bindParam("notes",$reqbody->{'notes'});
        $stmt->bindParam("rabies_exp",$reqbody->{'rabies_exp'});
        $stmt->bindParam("distemper_exp",$reqbody->{'distemper_exp'});
        $stmt->bindParam("parvo_exp",$reqbody->{'parvo_exp'});
        $stmt->bindParam("bordetella_exp",$reqbody->{'bordetella_exp'});

        $stmt->execute();
        $db = null;
        echo '{"success": 1}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() . '}}';
    }
});

$app->get('/fetchdog/:dog_id', function ($dog_id) use ($app, $db) {
    $sql =  "select d.* from rsak.dog d where id = :id;";
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("id",$dog_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($result);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() . '}}';
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