const { VITE_DATA_SOURCE, VITE_APP_KEY } = import.meta.env
import { decrypt } from './decryptContent.js';
import cloneDeep from 'lodash/cloneDeep.js';

export let Storage = {}

export const sync = async () => {
  const res = await fetch(`${VITE_DATA_SOURCE}/values/protected!A:ZZ?key=${VITE_APP_KEY}`)
  const fetchJson = await res.json()
  Storage = fetchJson
  return fetchJson
}

export const prepareRows = () => {
  
  const decryptedResponse = Storage.values.filter((element, index) => {
    //ommit heading section of table
    return index > 0
  }).map(row => row.map(col => decrypt(col)))
  
  const cloneDecryptedResponse = cloneDeep(decryptedResponse);
  
  const regex = /\d{4}\-\d{2}\-\d{2}T/
    //const regex = new RegExp('\\d{4}\\-\\d{2}\\-\\d{2}T','i');
  const responseWithTimestampsAsHHMM = cloneDecryptedResponse 
    .map(row =>
      cloneDeep(row).map((col) => {
        //get just hour format
        const condition = regex.test(col);
        console.log(`${col} ${condition}`);

        if (condition) {
            //regex.test(col);
            const res =  col.match(/\d\d:\d\d/)["0"];
            return res
        }
        return col
      })
  )
  
  return responseWithTimestampsAsHHMM;
}

export const getRows = prepareRows; 
export const getHeaders = () => Storage.values && Storage.values[0]

export const getPreparedCards = () => {
  const preparedList = []
  const rows = prepareRows()
  const headers = getHeaders()

  rows.forEach((row, index) => {
    const obj = {}
    row.forEach((cell, index) => {
      obj[headers[index]] = cell
    })
    preparedList.push(obj)
  })

  return preparedList
}
