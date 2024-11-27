<?php (empty($_GET["env"])) ? highlight_file(__FILE__) : putenv($_GET["env"]) && system('echo hfctf2022');?>

// Nginx-fastcgi cache files
// Long link window period to bypass file detection