<?php
include "database.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true); 
$task=$data['task'];

    
$statement=$pdo->prepare("INSERT INTO task (task)VALUES('$task')");
$statement->execute();

    
function val($data){
    $data=trim($data);
    $data=stripslashes($data);
    $data=htmlspecialchars($data);
    return $data;
 }
// Decode JSON data as an associative array
 
 // Now you can use $data to access the sent data
 
 
 // Process the data and send a response
 $response = array(
   'message' => 'post'
 );
 
 // Send JSON response
 header('Content-Type: application/json');
 echo json_encode($response);



?>