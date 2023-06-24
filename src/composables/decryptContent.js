import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import { useGlobalState } from './globalState.js';
import isUndefined from 'lodash/isUndefined'


    const {Storage,passwordGuard} = useGlobalState() 

export const decrypt = text => {
    const state = useGlobalState()
    const getPIN = state.password.value; 
    const decryptResult = AES.decrypt(text, getPIN)
    const utfMamboJumbo = CryptoJS.enc.Utf8.stringify(decryptResult)  
    if (isUndefined(utfMamboJumbo) || utfMamboJumbo=='' ) {
        return false
    }
    return utfMamboJumbo    
}    

export const checkPasswordCorrect = async () => {
    const check = await decrypt(Storage.value.values[1][0])
    if (check) {
        passwordGuard.value=true
        return true
    }
    passwordGuard.value=false
    return false
}