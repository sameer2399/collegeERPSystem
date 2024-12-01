import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const decryptObject = async (data) => {
    var bytes = CryptoJS.AES.decrypt(data, process.env.JWT_SECRET);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};

const decrypt = async (data) => {
    var bytes = CryptoJS.AES.decrypt(data, process.env.JWT_SECRET);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

export { decryptObject, decrypt };