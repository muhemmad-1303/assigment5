<?php
include "database.php";
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true); 
$id=$data['id'];    
$statement=$pdo->prepare("DELETE FROM task  WHERE id ='$id' ");
$statement->execute();
   
function val($data){
    $data=trim($data);
    $data=stripslashes($data);
    $data=htmlspecialchars($data);
    return $data;
 }

 $response = "success";
 header('Content-Type: application/json');
 echo json_encode($response);