// Importing CryptoJS Module for hashing/encryption/decryption

import CryptoJS from "crypto-js";

const encrypt = (data) => {
    if (typeof data == "string" || typeof data == "number") {
        var ciphertext = CryptoJS.AES.encrypt(
            data,
            process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        return ciphertext;
    } else {
        var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        return ciphertext;
    }
}

export { encrypt };