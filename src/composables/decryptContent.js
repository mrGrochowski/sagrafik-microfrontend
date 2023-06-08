import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

const getPIN = window.prompt("PODAJ STANDARDOWE HASŁO"); 

export const decrypt = (text) => {
    //console.log("🚀 ~ file: decryptContent.js:4 ~ decrypt ~ text:", text)
    const decrypt = CryptoJS.enc.Utf8.stringify(AES.decrypt(text, getPIN));
    console.log("🚀 ~ file: decryptContent.js:6 ~ decrypt ~ decrypt:", decrypt)
    return decrypt
}