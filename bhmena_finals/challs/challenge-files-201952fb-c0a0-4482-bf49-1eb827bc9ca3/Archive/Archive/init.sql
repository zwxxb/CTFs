CREATE DATABASE task;
CREATE USER 'player'@'%' IDENTIFIED BY 'player';
GRANT ALL PRIVILEGES ON task.* TO 'player'@'%';
FLUSH PRIVILEGES;
USE task;

CREATE TABLE users (
    user VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    `_key` VARCHAR(255) NOT NULL,
    PRIMARY KEY (user)
);

-- Insert the admin user with password 'dummy' and key 'dummy'
INSERT INTO users (user, password, `_key`) VALUES ('admin', 'admin', 'key');

-- Create the flag table
CREATE TABLE flag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flag VARCHAR(255) NOT NULL
);

-- Insert the flag into the flag table
INSERT INTO flag (flag) VALUES ('CTF{sample_flag}');
