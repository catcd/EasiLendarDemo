<?php
header("Access-Control-Allow-Origin: *");
$servername = "mysql.hostinger.vn";
$username = "u731182635_texas";
$password = "cancat36800";
$dbname = "u731182635_esle";

$data = file_get_contents("php://input");
$request = json_decode($data);
$id = $request->id;
$pass = $request->pass;
$name =  $request->name;
$birthday =  $request->birthday;
$gender =  $request->gender;
$phone =  $request->phone;
$address =  $request->address;

function isNull($obj) {
	if ($obj === null || $obj === undefined || $obj === "") {
		return true;
	}
	return false;
};

if (!isNull($id) && !isNull($pass)) {
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	// select id to check
	$sql = "SELECT pass FROM UserData WHERE id='$id'";
	$result = $conn->query($sql);
	$fetchData = $result->fetch_assoc();

	if($fetchData["pass"] != $pass) {
		echo "wrong pass";
	} else {
		$sql = "UPDATE UserData
		SET name='$name',birthday='$birthday',gender='$gender',phone='$phone',address='$address'
		WHERE id='$id'";
	}

	if ($conn->query($sql) === TRUE) {
	    echo "success";
	} else {
	    echo "error";
	}

	$conn->close();
} else {
	echo "Error in php://input";
}
?>