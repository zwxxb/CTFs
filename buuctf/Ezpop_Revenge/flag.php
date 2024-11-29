<?php
if(!isset($_SESSION)) session_start();
if($_SERVER['REMOTE_ADDR']==="127.0.0.1"){
   $_SESSION['flag']= "MRCTF{******}";
}else echo "我扌your problem?\nonly localhost can get flag!";
?>