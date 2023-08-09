<?php
include 'database.php';
$statement = $pdo->prepare('SELECT *FROM task ORDER BY complete ASC;');
$statement->execute();
$result=$statement->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $key){
    $data[]=$key;
}
$response=$data;


header('Content-Type: application/json');
echo json_encode($response);
