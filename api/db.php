<?php
// HOSTING
$servername = "localhost";
$username = "u334307892_php";
$password = "rVYS>cUiT&3";
$dbname = "u334307892_php";

// LOCAL
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "movies_cac";

try 
{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Configurar PDO para que lance excepciones en caso de error
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch(PDOException $e) 
{
    echo "Connection failed: " . $e->getMessage();
}
?>