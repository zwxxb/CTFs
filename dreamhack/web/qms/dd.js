// First, decode the secrets from base64url
const secretsBase64 = "W3siX2lkIjoiNjc0MGFjMTAwMDNhYmJmYzZlOTY2MTQzIiwibmFtZSI6IkRhdDFQaGl0IiwiX192IjowLCJzZWNyZXQiOiI0MjYxODVkN2IwYzQ1N2FiNjNlNTQ2MTg5OTZjMTdiMGYwNDUxM2U5ZDg1NWI5Y2YwYThhMDBmMjkwNTA0MDdjIn0seyJfaWQiOiI2NzQwYWMxMDAwM2FiYmZjNmU5NjYxNDUiLCJuYW1lIjoiRGF0MlBoaXQiLCJfX3YiOjAsInNlY3JldCI6IjI4YjIyMjlmOWRkNWQyMDM5Yjc3NzMxYjQwNWJlYzUwNjNiNGU1NzEzNDJkM2UyNGYyOWNhNzM2MjdhOGJjOGYifSx7Il9pZCI6IjY3NDBhYzEwMDAzYWJiZmM2ZTk2NjE0NyIsIm5hbWUiOiJEYXQzUGhpdCIsIl9fdiI6MCwic2VjcmV0IjoiOWQ2NzU5Mjg2ZmZmMWYyOGFkM2VlOGZjYjllYzQwYzQ3NjNhYzQ4OTYxZmQ3N2JiNTZhZTIzYjZmZDY5NDYzMSJ9LHsiX2lkIjoiNjc0MGFjMTAwMDNhYmJmYzZlOTY2MTQ5IiwibmFtZSI6IkRhdDRQaGl0IiwiX192IjowLCJzZWNyZXQiOiIwY2EwZDQ3NWY0YTc5M2IxMjVhOGUxMTRkN2NiYjhlYWNjNjQ2OGFkNTU4MDE2YTYzN2RkNDY3MTA3NDBjZWFjIn0seyJfaWQiOiI2NzQwYWMxMDAwM2FiYmZjNmU5NjYxNGIiLCJuYW1lIjoiRGF0NVBoaXQiLCJfX3YiOjAsInNlY3JldCI6ImQzMTZmM2MxYjdmNTYwNjhhNDk1MWVlZGM2ZmI3OGJlOTU5MzhmMGJiOWU2MWJjZGU1NDkzNGYzYmFjNzRiOTEifSx7Il9pZCI6IjY3NDBhYzEwMDAzYWJiZmM2ZTk2NjE0ZCIsIm5hbWUiOiJEYXQ2UGhpdCIsIl9fdiI6MCwic2VjcmV0IjoiZTEyYjllNGY0MjUzMTFlNmEyNzcwNWQ0Nzc1YmY5MjFmZjg0ZjQ2MjA1M2M2OWMzNTM0ZWVkMjMxZjM0OTFlOSJ9LHsiX2lkIjoiNjc0MGFjMTAwMDNhYmJmYzZlOTY2MTRmIiwibmFtZSI6IkRhdDdQaGl0IiwiX192IjowLCJzZWNyZXQiOiI5MTJjM2NkMDMxYTYwYmQ1YmI3ZTk3MGQwMzdlYzQ4OTA5OGU1NWNmZDU5NGUxZjRhYjRkM2FlM2I5NDNjZjJhIn1d"
const encryptedFlag = "Dyb9_sJ-IDpaaHhTjQ"

// Function to decode base64url
function base64urlDecode(str) {
    return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

// Function to XOR two buffers
function xorBuffers(buf1, buf2) {
    const result = Buffer.alloc(buf1.length);
    for (let i = 0; i < buf1.length; i++) {
        result[i] = buf1[i] ^ buf2[i % buf2.length];
    }
    return result;
}

// Decode secrets
const secrets = JSON.parse(Buffer.from(secretsBase64, 'base64').toString());
const encryptedFlagBuffer = base64urlDecode(encryptedFlag);

// Try each secret
for (const doc of secrets) {
    const key = Buffer.from(doc.secret, 'hex');
    const decrypted = xorBuffers(encryptedFlagBuffer, key);
    console.log(`Trying ${doc.name}: ${decrypted.toString()}`);
}