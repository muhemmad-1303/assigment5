<?php
$host='localhost';
$user='root';
$password='';
$dbname='todo';

$conn=new mysqli($host,$user,$password,$dbname);

if($conn->connect_error){
    die("connection error");
}
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true); 
$task=$data['task'];

    
$sql="INSERT INTO task (task)VALUES('$task')";
$conn->query($sql);

    
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