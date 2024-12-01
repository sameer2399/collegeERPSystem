import crypto from "crypto";

const iv = "@@@@&&&&####$$$$";
class PaytmChecksum {
  constructor(key) {
    this.key = key;
  }
  encrypt(input, key) {
    var cipher = crypto.createCipheriv("AES-128-CBC", key, iv);
    var encrypted = cipher.update(input, "binary", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }
  decrypt(encrypted, key) {
    var decipher = crypto.createDecipheriv("AES-128-CBC", key, iv);
    var decrypted = decipher.update(encrypted, "base64", "binary");
    try {
      decrypted += decipher.final("binary");
    } catch (e) {
      console.log(e);
    }
    return decrypted;
  }
  async generateSignature(params, key, cb) {
    if (typeof params !== "object" && typeof params !== "string") {
      var error = "string or object expected, " + typeof params + " given.";
      return Promise.reject(error);
    }
    if (typeof params !== "string") {
      params = this.getStringByParams(params);
    }
    // console.log("params: " + params);
    const encrypted = await this.generateSignatureByString(params, key);
    cb(undefined, encrypted);
  }

  verifySignature(params, key, checksum) {
    if (typeof params !== "object" && typeof params !== "string") {
      var error = "string or object expected, " + typeof params + " given.";
      return Promise.reject(error);
    }
    if (params.hasOwnProperty("CHECKSUMHASH")) {
      delete params.CHECKSUMHASH;
    }
    if (typeof params !== "string") {
      params = this.getStringByParams(params);
    }
    return this.verifySignatureByString(params, key, checksum);
  }

  async generateSignatureByString(params, key) {
    // console.log("generateSignatureByString", params);
    var salt = await this.generateRandomString(4);
    var checksum = this.calculateChecksum(params, key, salt);
    return checksum;
  }

  verifySignatureByString(params, key, checksum) {
    var paytm_hash = this.decrypt(checksum, key);
    var salt = paytm_hash.substr(paytm_hash.length - 4);
    return paytm_hash === this.calculateHash(params, salt);
  }

  generateRandomString(length) {
    return new Promise(function (resolve, reject) {
      crypto.randomBytes((length * 3.0) / 4.0, function (err, buf) {
        if (!err) {
          var salt = buf.toString("base64");
          resolve(salt);
        } else {
          console.log("error occurred in generateRandomString: " + err);
          reject(err);
        }
      });
    });
  }

  getStringByParams(params) {
    var data = {};
    Object.keys(params)
      .sort()
      .forEach(function (key, value) {
        data[key] =
          params[key] !== null && params[key].toLowerCase() !== "null"
            ? params[key]
            : "";
      });
    return Object.values(data).join("|");
  }

  calculateHash(params, salt) {
    var finalString = params + "|" + salt;
    return crypto.createHash("sha256").update(finalString).digest("hex") + salt;
  }
  calculateChecksum(params, key, salt) {
    var hashString = this.calculateHash(params, salt);
    return this.encrypt(hashString, key);
  }
}
// module.exports = PaytmChecksum;
export default new PaytmChecksum();
