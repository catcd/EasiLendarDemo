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
		class idOnly {
			public $id = "";
		}
		class result {
			public $fRequest = array();
			public $requested = array();
			public $accepted = array();
		}
		$output = new result();
		$oFRequest = array();
		$oRequested = array();
		$oAccepted = array();

		// fetch friend request
		$sql = "SELECT FriendRequest.sender, UserData.name, UserData.avatar
		FROM UserData
		INNER JOIN FriendRequest
		ON FriendRequest.sender=UserData.id
		WHERE FriendRequest.receiver='$id'
		ORDER BY UserData.id;";
		$result = $conn->query($sql);
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$oFRequest[$row["sender"]] = new fullInfo();
			$oFRequest[$row["sender"]]->id = $row["sender"];
			$oFRequest[$row["sender"]]->name = $row["name"];
			$oFRequest[$row["sender"]]->avatar = $row["avatar"];
		}

		// fetch requested friend and accepted
		$sql = "SELECT receiver, respond
		FROM FriendRequest
		WHERE sender='$id'
		ORDER BY receiver;";
		$result = $conn->query($sql);
		// output data of each row
		while($row = $result->fetch_assoc()) {
			if ($row["receiver"] == 0) {
				$oRequested[$row["receiver"]] = new idOnly();
				$oRequested[$row["receiver"]]->id = $row["receiver"];
			} else {
				$oAccepted[$row["receiver"]] = new idOnly();
				$oAccepted[$row["receiver"]]->id = $row["receiver"];
			}
		}

		$output->fRequest = $oFRequest;
		$output->requested = $oRequested;
		$output->accepted = $oAccepted;

		echo json_encode($output);
	}
	$conn->close();
} else {
	echo "Error in php://input";
}
?>