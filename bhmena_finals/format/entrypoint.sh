#!/bin/sh

echo $FLAG > /flag
unset FLAG
mkdir -p /run/mysqld
chown -R mysql:mysql /run/mysqld
mysql_install_db --user=mysql --ldata=/var/lib/mysql
mysqld --bind-address=127.0.0.1 --port=3306 --user=mysql --console --skip-networking=0 &
# Wait for mysql to start
while ! mysqladmin ping -h'localhost' --silent; do echo 'not up' && sleep .2; done

sed -i "s/PLACEHOLDER_PASSWORD/${MYSQL_PASSWORD}/g" db.sql
cat db.sql
mysql -u root < db.sql

exec /usr/bin/supervisord -c /etc/supervisord.conf