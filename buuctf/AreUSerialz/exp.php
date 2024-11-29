<?php

include("flag.php");

//highlight_file(__FILE__);

class FileHandler {

    public $op;
    public $filename;
    public $content;

    function __construct() {

        $this->op = 1;
        $this->filename = "flag.php";
        $this->content = "Hello World!";
        echo serialize($this);
        die();
        $this->process();
    }

    public function process() {
        if($this->op == "1") {
            $this->write();
        } else if($this->op == "2") {
            $res = $this->read();
            $this->output($res);
        } else {
            $this->output("Bad Hacker!");
        }
    }

    private function write() {
        if(isset($this->filename) && isset($this->content)) {
            if(strlen((string)$this->content) > 100) {
                $this->output("Too long!");
                die();
            }
            $res = file_put_contents($this->filename, $this->content);
            if($res) $this->output("Successful!");
            else $this->output("Failed!");
        } else {
            $this->output("Failed!");
        }
    }

    private function read() {
        $res = "";
        if(isset($this->filename)) {
            $res = file_get_contents($this->filename);
        }
        return $res;
    }

    private function output($s) {
        echo "[Result]: <br>";
        echo $s;
    }

    function __destruct() {
        //echo(serialize($this));
        //if($this->op === "2")
        //    $this->op = "1";
        //$this->content = "";
        //$this->process();
    }

}
new FileHandler();
//$res='O:11:"FileHandler":3:{s:2:"op";i:2;s:8:"filename";s:8:"flag.php";s:7:"content";s:1:"r";}';
?>
