-- Create the database
CREATE DATABASE IF NOT EXISTS flights;

USE flights;

-- Create the database tables
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS flight (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    flight_number VARCHAR(50) UNIQUE NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS booking (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    flight_id INTEGER NOT NULL,
    booking_date DATETIME NOT NULL,
    payment_status BOOLEAN DEFAULT FALSE,
    price DECIMAL(10, 2) DEFAULT 1337.00,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (flight_id) REFERENCES flight (id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    booking_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (booking_id) REFERENCES booking (id)
);

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_register(
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password_hash TEXT,
    IN p_role VARCHAR(50)
)
BEGIN
    INSERT INTO user (username, email, password_hash, role)
    VALUES (p_username, p_email, p_password_hash, p_role);
END //

CREATE PROCEDURE IF NOT EXISTS sp_book_flight(
    IN p_user_id INTEGER,
    IN p_flight_id INTEGER
)
BEGIN
    INSERT INTO booking (user_id, flight_id, booking_date)
    VALUES (p_user_id, p_flight_id, CURRENT_TIMESTAMP);
END//

CREATE PROCEDURE IF NOT EXISTS sp_cancel_booking(
    IN p_user_id INTEGER,
    IN p_booking_id INTEGER
)
BEGIN
    DELETE FROM booking
    WHERE id = p_booking_id AND user_id = p_user_id;
    
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking not found or user is not authorized to cancel this booking';
    END IF;
END//

CREATE PROCEDURE IF NOT EXISTS sp_process_payment(
    IN p_user_id INTEGER,
    IN p_booking_id INTEGER
)
BEGIN
    UPDATE booking
    SET payment_status = TRUE
    WHERE id = p_booking_id AND user_id = p_user_id;
    
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking not found or user is not authorized to process payment for this booking';
    END IF;
END//

CREATE PROCEDURE IF NOT EXISTS sp_add_transaction(
    IN p_user_id INTEGER,
    IN p_booking_id INTEGER
)
BEGIN
    DECLARE v_booking_price DECIMAL(10, 2);
    DECLARE v_user_balance DECIMAL(10, 2);

    SELECT price INTO v_booking_price
    FROM booking
    WHERE id = p_booking_id;

    IF v_booking_price IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking not found';
    END IF;

    SELECT balance INTO v_user_balance
    FROM user
    WHERE id = p_user_id;

    IF v_user_balance IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User not found';
    END IF;

    IF v_user_balance < v_booking_price THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient funds';
    END IF;

    UPDATE user
    SET balance = balance - v_booking_price
    WHERE id = p_user_id;

    INSERT INTO transactions (user_id, booking_id, amount, transaction_date)
    VALUES (p_user_id, p_booking_id, v_booking_price, NOW());

    UPDATE booking SET payment_status = TRUE WHERE id = p_booking_id;
END//

DELIMITER ;

INSERT INTO flight (flight_number, origin, destination, departure_time, price)
VALUES
('FL123', 'New York', 'Los Angeles', '2024-10-10 08:00:00', 299.99),
('FL456', 'San Francisco', 'Chicago', '2024-10-11 12:30:00', 199.99),
('FL789', 'London', 'Tokyo', '2024-10-15 22:00:00', 999.99),
('FL101', 'Paris', 'Dubai', '2024-11-01 09:00:00', 599.99),
('FL102', 'Sydney', 'Singapore', '2024-11-05 13:00:00', 349.99);

-- Create a new MySQL user with proper privileges
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'PLACEHOLDER_PASSWORD';

-- Grant the user EXECUTE privileges on stored procedures within the `flights` database
GRANT EXECUTE ON flights.* TO 'user'@'localhost';

-- Grant SELECT and INSERT privileges on the `flights` database tables
GRANT SELECT, INSERT ON flights.* TO 'user'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;