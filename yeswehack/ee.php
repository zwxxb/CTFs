<?php 

ini_get_all();
error_log("test");

$paylaod = base64_encode("http:\\localhost/../../../../../etc/passwd");

$url = base64_decode($paylaod.")");

var_dump(parse_url($url));

file_get_contents($url);

?>