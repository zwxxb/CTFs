#!/bin/bash
echo "$DYN_FLAG" > /flag.txt
unset DYN_FLAG
source /etc/apache2/envvars
export APACHE_LOG_DIR=/tmp
(&>/dev/null /usr/local/bin/apache2-foreground)&
socat - TCP:127.0.0.1:9000,forever
