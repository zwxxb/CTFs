#!/usr/bin/php7
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Sqlops</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			background: linear-gradient(to right, #6a11cb, #2575fc);
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			margin: 0;
		}
		.container {
			background: rgba(255, 255, 255, 0.1);
			padding: 20px;
			border-radius: 10px;
			box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
			width: 300px;
			text-align: center;
		}
		h1 {
			margin-bottom: 20px;
		}
		input {
			width: 100%;
			padding: 10px;
			margin: 10px 0;
			border: none;
			border-radius: 5px;
		}
		button {
			background-color: #2575fc;
			color: #fff;
			padding: 10px;
			border: none;
			border-radius: 5px;
			width: 100%;
			cursor: pointer;
			transition: background-color 0.3s;
		}
		button:hover {
			background-color: #6a11cb;
		}
		.error {
			color: #ff4d4d;
			margin-top: 10px;
		}
	</style>
	<script>
		async function handleSubmit(event) {
			event.preventDefault();
			const user = document.getElementById('user').value;
			const pass = document.getElementById('pass').value;
			const errorElement = document.getElementById('error');
			errorElement.textContent = '';

			const response = await fetch('', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ user, pass })
			});
			const result = await response.json();
			if (result[0] === 'Login failed, try again') {
				errorElement.textContent = result[0];
			} else {
				alert(result[0]);
			}
		}
	</script>
</head>
<body>
	<div class="container">
		<h1>Login</h1>
		<form onsubmit="handleSubmit(event)">
			<input type="text" id="user" name="user" placeholder="Username" required>
			<input type="password" id="pass" name="pass" placeholder="Password" required>
			<button type="submit">Login</button>
		</form>
		<p id="error" class="error"></p>
	</div>
</body>
</html>
<?php
include 'funcs.php';
if (@$_POST['user'] && @$_POST['pass']) {
	if ($authData = validateCredentials($_POST['user'], $_POST['pass'])) {
		$message = 'Welcome to the jungle! the king is not always a lion, kudos to the real king behind this, grab your flag and see!';
		$authCookie = generateCookie($authData);
		sendResponse(array(
			$message, $authCookie, $authData['user']
		));
	} else {
		$message = 'Login failed, try again';
		sendResponse(array($message));
	}
}

if (@$_POST['Auth'] && @$_POST['User']) {
	sendResponse(checkLoginStatus($_POST['Auth'], $_POST['User']));
}
?>

