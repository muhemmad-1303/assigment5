<?php
include "database.php";


$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true); 
$id=$data['id'];
$stage=$data['stage'];


if($stage=='complete'){   

    $statement=$pdo->prepare("UPDATE task SET  complete='1' WHERE id ='$id' ");
    $statement->execute();

  
}
else{
    $statement=$pdo->prepare("UPDATE task SET  complete='0' WHERE id ='$id' ");
    $statement->execute();
    
}    
function val($data){
    $data=trim($data);
    $data=stripslashes($data);
    $data=htmlspecialchars($data);
    return $data;
 }

$response="success";
 header('Content-Type: application/json');
 echo json_encode('$response');
