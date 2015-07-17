<?php
header("Access-Control-Allow-Origin: *");
$servername = "mysql.hostinger.vn";
$username = "u731182635_texas";
$password = "cancat36800";
$dbname = "u731182635_esle";

$data = file_get_contents("php://input");
$request = json_decode($data);
$input =  $request->input;

function isNull($obj) {
	if ($obj === null || $obj === undefined || $obj === "") {
		return true;
	}
	return false;
};

if (!isNull($input)) {
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$wildcard = '%' . $input . '%';
	$sql = "SELECT id,name,avatar FROM UserData WHERE id LIKE '$wildcard' OR name LIKE '$wildcard' OR gmail LIKE '$wildcard'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		class friend {
			public $id = "";
			public $name = "";
			public $avatar = "";
		}
		$output = array();
		$index = 0;

		// output data of each row
		while($row = $result->fetch_assoc()) {
			$output[$index] = new friend();
			$output[$index]->id = $row["id"];
			$output[$index]->name = $row["name"];
			$output[$index]->avatar = $row["avatar"];

			$index++;
		}

		echo json_encode($output);
	} else {
		echo "empty";
	}
	$conn->close();
} else {
	echo "Error in php://input";
}
?>