const { VITE_DATA_SOURCE, VITE_APP_KEY } = import.meta.env
import { decrypt } from './decryptContent.js';

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
  }).map(e => e.map(f => decrypt(f)))
  
  
  const regex = /\d{4}\-\d{2}\-\d{2}T/g;
  console.log("🚀 ~ file: fetchMeetings.js:35 ~ prepareRows ~ decryptedResponse:", decryptedResponse)
  const responseWithTimestampsAsHHMM = decryptedResponse 
    .map(e =>
      e.map((f , index) => {
        //get just hour format        
        if (regex.test(f) && index>0) {
            const res =  f.match(/\d\d:\d\d/)["0"];
            console.log("🚀 ~ file: fetchMeetings.js:31 ~ e.map ~ regex.test(f):", regex.test(f))
            console.log("🚀 ~ file: fetchMeetings.js:33 ~ e.map ~ res:", typeof res);
            return res
        }
        return f
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
