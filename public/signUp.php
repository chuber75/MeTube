<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
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

    /* Extra styles for the cancel button */
    .cancelbtn {
        padding: 14px 20px;
        background-color: #522D80;
    }

    /* Float cancel and signup buttons and add an equal width */
    .cancelbtn, .signupbtn {
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

    /* Change styles for cancel button and signup button on extra small screens */
    @media screen and (max-width: 300px) {
        .cancelbtn, .signupbtn {
            width: 100%;
        }
    }
</style>
<body>

<form method="post" action="signUp.php" style="border:1px solid #ccc">
    <div class="container">
       
     <?php include('./create_account.php') ?>

     <?php if ($userRegistered == FALSE): ?>

        <h1 style="text-align:center;">Sign Up</h1>
        <h2 style="text-align:center;">Please fill in this form to create a MeTube account.</h2>
        <hr>

        <label for="firstname"><b>First Name</b></label>
        <br>
	<input type="text" placeholder="Enter First Name" name="firstname" value="<?php echo $firstname; ?>" required>

        <label for="lastname"><b>Last Name</b></label>
        <br>
	<input type="text" placeholder="Enter Last Name" name="lastname" value="<?php echo $lastname; ?>" required>

        <label for="email"><b>Email</b></label>
        <br>
	<input type="text" placeholder="Enter Email" name="email" value="<?php echo $email; ?>" required>

        <label for="username"><b>Username</b></label>
        <br>
	<input type="text" placeholder="Enter Username" name="username" value="<?php echo $username; ?>" required>

        <label for="birthdate"><b>Birth Date</b></label>
        <br>
	<input type="date" placeholder="Enter Birthdate" name="birthdate" value="<?php echo $birthdate; ?>" required>

        <br>
        <br>

        <label for="password"><b>Password</b></label>
        <br>
        <input type="password" placeholder="Enter Password" name="psw" required>

        <label for="psw_repeat"><b>Repeat Password</b></label>
        <br>
        <input type="password" placeholder="Repeat Password" name="psw_repeat" required>

        <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
        </label>

        <div class="clearfix">
            <button type="button" class="cancelbtn">Cancel</button>
            <button type="submit" class="signupbtn">Sign Up</button>
	</div>
    <?php endif; ?>
</div>
</form>
</body>
</html>
