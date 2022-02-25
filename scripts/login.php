<?php
$con = mysqli_connect("mysql1.cs.clemson.edu", "Undrgrdt4_srao", "CPSC46206620", "Undergraduate4_9p50");

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$username = $_POST['username'];
$birthdate = $_POST['birthdate'];
$psw = $_POST['psw'];
$psw_repeat = $_POST['psw_repeat'];

$sql = "INSERT INTO `user_accounts` (`Id`, `FirstName`, `LastName`, `USER_NAME`, `USER_EMAIL`, `USER_PASS`, `USER_BIRTH`, `CREATION_DATE`) VALUES ('0', '$firstname', '$lastname', '$username', '$email', '$psw', '$birthdate', '$birthdate')";

$rs = mysqli_query($con, $sql);

if($rs)
{
    echo "Contact Records Inserted";
}

header("Location: http://http://webapp.computing.clemson.edu/~nrengie/index");