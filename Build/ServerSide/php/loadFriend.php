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
		class fullInfo {
			public $id = "";
			public $name = "";
			public $avatar = "";
		}
		$output =  array();

		// fetch friend request
		$sql = "SELECT Friend.id1, UserData.name, UserData.avatar
		FROM UserData
		INNER JOIN Friend
		ON Friend.id1=UserData.id
		WHERE Friend.id2='$id';";
		$result = $conn->query($sql);

		// output data of each row
		while($row = $result->fetch_assoc()) {
			$output[$row["id1"]] = new fullInfo();
			$output[$row["id1"]]->id = $row["id1"];
			$output[$row["id1"]]->name = $row["name"];
			$output[$row["id1"]]->avatar = $row["avatar"];
		}

		// fetch friend request
		$sql = "SELECT Friend.id2, UserData.name, UserData.avatar
		FROM UserData
		INNER JOIN Friend
		ON Friend.id2=UserData.id
		WHERE Friend.id1='$id';";
		$result = $conn->query($sql);

		// output data of each row
		while($row = $result->fetch_assoc()) {
			$output[$row["id2"]] = new fullInfo();
			$output[$row["id2"]]->id = $row["id2"];
			$output[$row["id2"]]->name = $row["name"];
			$output[$row["id2"]]->avatar = $row["avatar"];
		}

		echo json_encode($output);
	}
	$conn->close();
} else {
	echo "Error in php://input";
}
?>