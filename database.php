<?php
  
  $host='localhost';
  $user='root';
  $password='';
  $dbname='todo';
  
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);


?>