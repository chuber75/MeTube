<?php
if(isset($_GET['accountcreated']))
{
	$parameter = $_GET['accountcreated'];
	if($parameter == 'true')
	{
		echo "<h2 style = 'color:red;'> Account Created </h2>";
	}
}
?>
<!DOCTYPE html>
<html>
<style>
    body {font-family: Arial, Helvetica, sans-serif;}
    * {box-sizing: border-box}

    /* Full-width input fields */
    input[type=text], input[type=password] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    input[type=text]:focus, input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    hr {
        border: 1px solid #f1f1f1;
        margin-bottom: 25px;
    }

    /* Set a style for all buttons */
    button {
        background-color: #F56600;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
    }

    button:hover {
        opacity:1;
    }


    /* Float login button and add an equal width */
    .loginbtn {
        float: left;
        width: 50%;
    }

    /* Add padding to container elements */
    .container {
        padding: 16px;
    }

    /* Clear floats */
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }

    /* Change styles for login button on extra small screens */
    @media screen and (max-width: 300px) {
        .loginbtn {
            width: 50%;
        }
    }
</style>
<body>

<form action="/action_page.php" style="border:1px solid #ccc">
    <div class="container">
        <h1 style="text-align: center;">Login</h1>
        <h2 style="text-align:center;"> Please fill in this form to sign in to your MeTube account.</h2>
        <hr>

        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" required>

        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>

        <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
        </label>

        <div class="clearfix">
            <button type="submit" class="loginbtn">Login</button>
        </div>
        <p class="message">Not registered? <a href="./signUp.html">Create an account</a></p>
    </div>
</form>

</body>
</html>
