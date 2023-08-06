<?php
$host='localhost';
$user='root';
$password='';
$dbname='todo';

$conn=new mysqli($host,$user,$password,$dbname);

if($conn->connect_error){
    die("connection error");
}

$sql='SELECT *
FROM task
ORDER BY complete ASC;';
$result=$conn->query($sql);

$data=array();
while($row=$result->fetch_assoc()){
     $data[]=$row;
}
$conn->close();
header('Content-Type: application/json');
echo json_encode($data);