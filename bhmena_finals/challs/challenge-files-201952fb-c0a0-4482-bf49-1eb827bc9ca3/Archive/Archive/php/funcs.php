#!/usr/bin/php7
<?php
$servername = getenv('DB_SERVER') ?: '127.0.0.1';
$username = getenv('DB_USERNAME') ?: 'player';
$password = getenv('DB_PASSWORD') ?: 'player';
$dbname = getenv('DB_NAME') ?: 'task'; 

$dbConnection = mysqli_connect($servername, $username, $password, $dbname);

if (!function_exists('fetchAuthKey')) {
	function fetchAuthKey($username) {
		global $dbConnection;
		$queryResult = mysqli_query($dbConnection, "SELECT _key FROM users WHERE user='" . mysqli_real_escape_string($dbConnection, $username) . "'");
		return @mysqli_fetch_assoc($queryResult)['_key'];
	}
}

if (!function_exists('generateCookie')) {
	function generateCookie($userData) {
		$secretKey = fetchAuthKey($userData['user']);
		$encryptedData = secureEncrypt($userData['user'] . "|" . $userData['password'], $secretKey);
		$hmacSignature = createHmac($encryptedData, $secretKey);
		return base64_encode($hmacSignature . "-" . $encryptedData);
	}
}

if (!function_exists('secureEncrypt')) {
	function secureEncrypt($plainText, $encryptionKey) {
		$encryptionMethod = "AES-256-CBC";
		$initialVectorLength = openssl_cipher_iv_length($encryptionMethod);
		$initialVector = openssl_random_pseudo_bytes($initialVectorLength);
		$encryptedText = openssl_encrypt($plainText, $encryptionMethod, $encryptionKey, $options=0, $initialVector);
		return trim(base64_encode($encryptedText));
	}
}

if (!function_exists('secureDecrypt')) {
	function secureDecrypt($encryptedText, $decryptionKey) {
		$decryptionMethod = "AES-256-CBC";
		$initialVectorLength = openssl_cipher_iv_length($decryptionMethod);
		$initialVector = openssl_random_pseudo_bytes($initialVectorLength);
		$decryptedText = openssl_decrypt(base64_decode($encryptedText), $decryptionMethod, $decryptionKey, $options=0, $initialVector);
		return trim($decryptedText);
	}
}

if (!function_exists('createHmac')) {
	function createHmac($data, $secretKey) {
		return hash_hmac('sha256', $data, $secretKey);
	}
}

if (!function_exists('verifyHmac')) {
	function verifyHmac($encodedBundle, $secretKey) {
		$decodedBundle = base64_decode($encodedBundle);
		$macExtracted = mb_substr($decodedBundle, 0, 64, '8bit');
		$dataMessage = mb_substr($decodedBundle, 65, null, '8bit');
		return hash_equals(
			createHmac($dataMessage, $secretKey),
			$macExtracted
		);
	}
}

if (!function_exists('checkLoginStatus')) {
	function checkLoginStatus($authToken, $userIdentifier) {
		global $dbConnection;
		$query = mysqli_query($dbConnection, "SELECT * FROM users WHERE user='" . mysqli_real_escape_string($dbConnection, $userIdentifier) . "'");
		if (mysqli_num_rows($query) !== 0) {
			$retrievedKey = fetchAuthKey($userIdentifier);
			if (verifyHmac($authToken, $retrievedKey)) {
				$decodedBundle = base64_decode($authToken);
				$encryptedMessage = mb_substr($decodedBundle, 65, null, '8bit');
				$decodedData = explode("|", secureDecrypt($encryptedMessage, $retrievedKey));
				include 'refreshSecrets.php';
				return array('OK', $qwertyuiop[$decodedData[0]]);
			}
		}
		return array('NO', '');
	}
}

if (!function_exists('validateCredentials')) {
	function validateCredentials($username, $password) {
		global $dbConnection;
		$query = mysqli_query($dbConnection, "SELECT * FROM users WHERE user='" . mysqli_real_escape_string($dbConnection, $username) . "' AND password='" . mysqli_real_escape_string($dbConnection, $password) . "'");
		if (mysqli_num_rows($query) !== 0) {
			return mysqli_fetch_array($query);
		} else {
			return false;
		}
	}
}

if (!function_exists('sendResponse')) {
	function sendResponse($response = array()) {
		die(json_encode($response));
	}
}
?>
