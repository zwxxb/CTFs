document.addEventListener('DOMContentLoaded', function () {
    // Encryption Elements
    const encryptForm = document.getElementById('encrypt-form');
    const encryptResultDiv = document.getElementById('encrypt-result');

    // Decryption Elements
    const decryptForm = document.getElementById('decrypt-form');
    const decryptResultDiv = document.getElementById('decrypt-result');

    // Handle Encryption
    encryptForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from submitting traditionally

        // Retrieve form values
        const title = document.getElementById('title').value.trim();
        const data = document.getElementById('data').value.trim();
        const password = document.getElementById('password').value;

        // Basic validation
        if (!title || !data || !password) {
            displayMessage(encryptResultDiv, 'All fields are required.', 'error');
            return;
        }

        try {
            // Encrypt the data using CryptoJS AES encryption
            const ciphertext = CryptoJS.AES.encrypt(data, password).toString();

            // Prepare the object to store
            const encryptedData = {
                title: title,
                ciphertext: ciphertext,
                timestamp: new Date().toISOString()
            };

            // Retrieve existing data from localStorage
            let storedData = JSON.parse(localStorage.getItem('encryptedData')) || [];

            // Check if the title already exists to prevent duplicates
            const existingEntryIndex = storedData.findIndex(entry => entry.title === title);
            if (existingEntryIndex !== -1) {
                if (!confirm('An entry with this title already exists. Do you want to overwrite it?')) {
                    displayMessage(encryptResultDiv, 'Encryption canceled by user.', 'info');
                    return;
                }
                // Overwrite existing entry
                storedData[existingEntryIndex] = encryptedData;
            } else {
                // Add the new encrypted data
                storedData.push(encryptedData);
            }

            // Store back to localStorage
            localStorage.setItem('encryptedData', JSON.stringify(storedData));

            // Clear the form
            encryptForm.reset();

            // Display success message
            displayMessage(encryptResultDiv, 'Data encrypted and stored successfully!', 'success');
        } catch (error) {
            console.error('Encryption error:', error);
            displayMessage(encryptResultDiv, 'An error occurred during encryption.', 'error');
        }
    });

    // Handle Decryption
    decryptForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from submitting traditionally

        // Retrieve form values
        const decryptTitle = document.getElementById('decrypt-title').value.trim();
        const decryptPassword = document.getElementById('decrypt-password').value;

        // Basic validation
        if (!decryptTitle || !decryptPassword) {
            displayMessage(decryptResultDiv, 'Both title and password are required.', 'error');
            return;
        }

        try {
            // Retrieve existing data from localStorage
            let storedData = JSON.parse(localStorage.getItem('encryptedData')) || [];

            // Find the entry with the matching title
            const entry = storedData.find(item => item.title === decryptTitle);
            if (!entry) {
                displayMessage(decryptResultDiv, 'No data found for the provided title.', 'error');
                return;
            }

            // Decrypt the data using CryptoJS AES decryption
            const bytes = CryptoJS.AES.decrypt(entry.ciphertext, decryptPassword);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedData) {
                displayMessage(decryptResultDiv, 'Incorrect password or corrupted data.', 'error');
                return;
            }

            // Display the decrypted data
            decryptResultDiv.textContent= decryptedData;
        } catch (error) {
            console.error('Decryption error:', error);
            displayMessage(decryptResultDiv, 'An error occurred during decryption.', 'error');
        }
    });

    // Function to display messages
    function displayMessage(container, message, type) {
        container.innerHTML = `<div class="flash ${type}">${message}</div>`;
    }

});
