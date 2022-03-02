<?php

// Validate input

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$userMessages = "";
$userRegistered = FALSE;

if ($_SERVER["REQUEST_METHOD"] == "POST") 
  {
	$firstname = $_POST['firstname'];
        $firstname = test_input($firstname);
	echo "<!-- " . $firstname . "-->";

    	if (empty($firstname)) {
       	  $userMessages = $userMessages . "First name is required<br>";
	} 
	else {
	  // check if name only contains letters
   	  if(!ctype_alpha($firstname))
	   { 
       	     $userMessages = $userMessages . "Invalid first name<br>";
	   }
        }

	$lastname = $_POST['lastname'];
        $lastname = test_input($lastname);
    	if (empty($lastname)) {
       	  $userMessages = $userMessages . "Last name is required<br>";
	} 
	else {
	  // check if name only contains letters
   	  if(!ctype_alpha($lastname))
	   { 
       	     $userMessages = $userMessages . "Invalid last name<br>";
	   }
        }

	$email = $_POST['email'];
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$userMessages = $userMessages .  "Invalid email format<br>";
	}

	$username = $_POST['username'];
	if(!preg_match('/^\w{5,}$/', $username)) { // \w equals "[0-9A-Za-z_]"
	        $userMessages = $userMessages .	"Invalid username, alphanumeric & longer than or equals 5 chars<br>";
	}
	$currDate = date("Y-m-d");
	$minAgeDate = Date('Y-m-d', strtotime($currDate . '-13 years'));
	$birthdate = $_POST['birthdate'];
	if ($birthdate > $minAgeDate) {
		$userMessages = $userMessages . "Users must be at least 13 years old to register on MeTube<br>";
	}

	//Validate for users over 13 only
	$psw = $_POST['psw'];
	if( strlen($psw ) < 8 ) {
		$userMessages = $userMessages . "Password too short.<br>";
	}
	$psw_repeat = $_POST['psw_repeat'];
	if($_POST["psw"] != $_POST["psw_repeat"])
	{
		$userMessages = $userMessages . "Passwords don't match!<br>";
	}
	// If no errors in input
	if (empty($userMessages))
	{
		// Insert into the database the user
		// hashing password
		$hashed_password = password_hash($psw, PASSWORD_DEFAULT);
		$con = mysqli_connect("mysql1.cs.clemson.edu", "Undrgrdt4_srao", "CPSC46206620", "Undergraduate4_9p50");
		$sql_insert = "INSERT INTO `user_accounts` (`Id`, `FirstName`, `LastName`, `USER_NAME`, `USER_EMAIL`, `USER_PASS`, `USER_BIRTH`, `CREATION_DATE`) VALUES ('0', '$firstname', '$lastname', '$username', '$email', '$hashed_password', '$birthdate', '$currDate')";

		$select_user = mysqli_query($con, "SELECT * FROM `user_accounts` WHERE (`USER_NAME`) = ('$username')");
		$select_email = mysqli_query($con, "SELECT * FROM `user_accounts` WHERE (`USER_NAME`) = ('$email')");

		if(mysqli_num_rows($select_user) || mysqli_num_rows($select_email))
		{
			$userMessages = $userMessages. "User name or email already exists.<br>";
			$userRegistered = FALSE;
		}
		else
		{
			$rs = mysqli_query($con, $sql_insert);
			if($rs)
			{
		    		$userMessages = $userMessages .  "Congratulations! You have now registered to MeTube.<br>";
				$userRegistered = TRUE;
				header('Location: ./login.php?accountcreated=true');
			}
			else
			{
		    		$userMessages = $userMessages . "A database error has occured rs =" . $rs . "<br>" . $sql_insert . "<br>";
			}
		}
	}

	// In all cases show the userMessages
	echo "<font color=red><h2>" . $userMessages . "</h2></font>";
  }
else
  {
	 $firstname = "";
	 $lastname = "";
	 $email = "";
	 $username = "";
  }

