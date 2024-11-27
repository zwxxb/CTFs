<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Flag</title>
</head>
<body>
    
<?php


function isRateLimited($limitTime = 1) {
    $ipAddress=$_SERVER['REMOTE_ADDR'];
    $filename = sys_get_temp_dir() . "/rate_limit_" . md5($ipAddress);
    $lastRequestTime = @file_get_contents($filename);
    
    if ($lastRequestTime !== false && (time() - $lastRequestTime) < $limitTime) {
        return true;
    }

    file_put_contents($filename, time());
    return false;
}


    if(isset($_POST['file']))
    {
        if(isRateLimited())
        {
            die("Limited 1 req per second");
        }
        $file = $_POST['file'];
        if(substr(file_get_contents($file),0,5) !== "<?php" && substr(file_get_contents($file),0,5) !== "<html") # i will let you only read my source haha
        {
            die("catched");
        }
        else
        {
            echo file_get_contents($file);
        }
    }

?>
</body>
</html>
