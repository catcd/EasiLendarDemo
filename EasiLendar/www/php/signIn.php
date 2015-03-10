/*
  starter: Nguyen Minh Trang
  owner: Nguyen Minh Trang
  last update: 09/03/2015
  type: PHP file
*/

<?php
	$data = file_get_contents("php://input");
	$request = json_decode($data);
	$id = $request->ID;
	$pass = $request->pass;
	
	$conn = new mysqli("mysql.hostinger.vn", "u128446344_easi", "justin13easi", "u128446344_easi");
	$result = $conn->query("SELECT password FROM Users WHERE ID = '$id'");
	
	if ($result == false) echo "NO";
	else {
		$rs = $result->fetch_array(MYSQLI_ASSOC);
		if ($pass == $rs["password"]) {
			echo "YES";
		} else {
			echo "NO";
		}
	}
	$result->free();
	$conn->close();
?>
