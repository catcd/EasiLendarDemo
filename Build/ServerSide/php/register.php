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
$mail =  $request->mail;
$name =  $request->name;

function isNull($obj) {
	if ($obj === null || $obj === undefined || $obj === "") {
		return true;
	}
	return false;
};

if (!isNull($id) && !isNull($pass) && !isNull($mail) && !isNull($name)) {
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	// select id to check
	$sql = "SELECT id FROM UserData WHERE id='$id'";
	$result = $conn->query($sql);

	if($result->num_rows > 0) {
		// num_rows > 0 means id is existed
		echo "exist id";
	} else {
		// select gmail to check
		$sql = "SELECT gmail FROM UserData WHERE gmail='$mail'";
		$result = $conn->query($sql);

		if($result->num_rows > 0) {
			// num_rows > 0 means gmail is existed
			echo "exist gmail";
		} else {
			// do register
			$sql = "INSERT INTO UserData (id, pass, gmail, name)
			VALUES ('$id', '$pass', '$mail', '$name')";
			$conn->query($sql);

			// create calendar table
			$tableName = $id . 'cal';
			$sql = "CREATE TABLE $tableName (
			id varchar(255) NOT NULL PRIMARY KEY,
			summary varchar(255) NOT NULL,
			mStart varchar(14) NOT NULL,
			mEnd varchar(14) NOT NULL,
			location varchar(255) NOT NULL,
			colorID int(3) NOT NULL DEFAULT 8,
			position int NOT NULL,
			src varchar(255) NOT NULL,
			status bit(1),
			reg_date TIMESTAMP
			)";
			$conn->query($sql);

			echo "success";
		}
	}
	$conn->close();
} else {
	echo "Error in php://input";
}
?>