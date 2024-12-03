const CryptoJS = require("crypto-js");

// Hardcoded encryption key
const Ud = "S4NT4_S3CR3T_K3Y_T0_ENCRYPT_DATA";

// Function to encrypt data using AES
function encryptData(data) {
    const serializedData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(serializedData, Ud).toString();
}

// Function to generate checksum and salt
function generateChecksum(playerName, score) {
    const salt = Math.floor(Math.random() * 9) + 1; // Random salt between 1 and 9
    const stringToHash = `${playerName}-${score}-${salt}`;
    const checksum = CryptoJS.SHA256(stringToHash).toString();
    return { checksum, salt };
}

// Function to generate encrypted payload
function generateEncryptedPayload(playerName, score) {
    const { checksum, salt } = generateChecksum(playerName, score);
    const payload = {
        playerName,
        score,
        checksum,
        salt,
    };

    return encryptData(payload);
}

// Usage Example
const playerName = "azerty"; // Replace with the player's name
const newScore = 10000000; // The score to encrypt

const encryptedPayload = generateEncryptedPayload(playerName, newScore);
console.log("Encrypted Payload:", encryptedPayload);
