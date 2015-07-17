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
$friendID =  $request->friendID;

function isNull($obj) {
	if ($obj === null || $obj === undefined || $obj === "") {
		return true;
	}
	return false;
};

if (!isNull($id) && !isNull($pass) && !isNull($friendID)) {
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
		$add = "INSERT INTO Friend (id1, id2)
		VALUES ('$friendID', '$id')";
		$accept = "UPDATE FriendRequest
		SET respond=1
		WHERE sender='$friendID' AND receiver='$id';";

		if ($conn->query($add) === true && $conn->query($accept) === true) {
		    echo "success";
		} else {
		    echo "error";
		}
	}

	$conn->close();
} else {
	echo "Error in php://input";
}
?>