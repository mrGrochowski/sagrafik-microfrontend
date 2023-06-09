import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

const getPIN = window.prompt("PODAJ STANDARDOWE HASŁO"); 

export const decrypt = text => CryptoJS.enc.Utf8.stringify(AES.decrypt(text, getPIN));