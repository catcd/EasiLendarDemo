<?php
header("Access-Control-Allow-Origin: *");
$servername = "mysql.hostinger.vn";
$username = "u731182635_texas";
$password = "cancat36800";
$dbname = "u731182635_esle";

$data = file_get_contents("php://input");
$request = json_decode($data);
$id = $request->id;
$pass =  $request->pass;

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
		echo "wrong";
	} else {
		// defined json class to return data
		class event {
			public $x = 1;
			public $y = 2;
		}
		class result {
			public $name = "";
			public $avatar = "";
			public $gmail  = "";
			public $vip = 0;
			public $gender = null;
			public $birthday = "";
			public $phone = "";
			public $address = "";
			public $confirm = 0;
			public $event = array();
		}

		// select user data
		$sql = "SELECT * FROM UserData WHERE id='$id'";
		$result = $conn->query($sql);
		$fetchData = $result->fetch_assoc();

		$output = new result();
		$output->name = $fetchData["name"];
		$output->avatar = $fetchData["avatar"];
		$output->gmail = $fetchData["gmail"];
		$output->vip = $fetchData["vip"];
		$output->gender = $fetchData["gender"];
		$output->birthday = $fetchData["birthday"];
		$output->phone = $fetchData["phone"];
		$output->address = $fetchData["address"];
		$output->confirm = $fetchData["confirm"];

		// // select event
		// $tableName = $id . 'cal';
		// $sql = "SELECT * FROM $tableName";
		// $result = $conn->query($sql);

		for ($i=0; $i < 5; $i++) {
			array_push($output->event, new event());
		}

		echo json_encode($output);
	}
	$conn->close();
} else {
	echo "Error in php://input";
}
?>