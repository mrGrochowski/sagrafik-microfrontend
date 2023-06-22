import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import { useGlobalState } from './globalState.js';


export const decrypt = text => {
    const state = useGlobalState()
    const getPIN = state.password.value; 
    console.log("🚀 ~ file: decryptContent.js:8 ~ getPIN:", getPIN)
   return CryptoJS.enc.Utf8.stringify(AES.decrypt(text, getPIN));
}    