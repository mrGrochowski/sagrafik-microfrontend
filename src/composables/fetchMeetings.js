const { VITE_DATA_SOURCE, VITE_GOOGLE_SHEET_APP_KEY, VITE_DATA_SHEET } = import.meta.env
import { decrypt } from './decryptContent.js'
import cloneDeep from 'lodash/cloneDeep.js'
import { getLatLonFromCityName } from './geolocationMarks.js'
import {sortByWeekDay} from './sortShedule.js'

export let Storage = {}
//todo CHANGE THIS STORAGE ON GLOBAL STATE

export const sync = async () => {
  const res = await fetch(`${VITE_DATA_SOURCE}/values/${VITE_DATA_SHEET}!A:ZZ?key=${VITE_GOOGLE_SHEET_APP_KEY}`)
  const fetchJson = await res.json()
  Storage = fetchJson
  return fetchJson
}
const decryptResponse = () =>
  Storage.values
    .filter((element, index) => {
      //ommit heading section of table
      return index > 0
    })
    .map((row) => row.map((col) => decrypt(col)))

const changeISODateToHoursInResponse = (decryptedResponse) => {
  const regex = /\d{4}\-\d{2}\-\d{2}T/
  const responseWithTimestampsAsHHMM = decryptedResponse.map((row) =>
    cloneDeep(row).map((col) => {
      //get just hour format
      const condition = regex.test(col)
      if (condition) {
        const res = col.match(/\d\d:\d\d/)['0']
        return res
      }
      return col
    })
  )

  return responseWithTimestampsAsHHMM
}

export const prepareRows = () => {
  Storage.decryptedResponse = decryptResponse()
  Storage.responseWithFormatedDates = changeISODateToHoursInResponse(Storage.decryptedResponse)


  return Storage.responseWithFormatedDates
}

export const getRows = prepareRows
export const getHeaders = () => Storage.values && Storage.values[0]

export const getPreparedCards = () => {
  const preparedList = []
  const rows = getRows()
  const headers = getHeaders()

  rows.forEach((row, index) => {
    const obj = {}
    row.forEach((cell, index) => {
      obj[headers[index]] = cell && cell.replace(/"/g,'')
    })
    preparedList.push(obj)
  })

  return preparedList
}

export const getPreparedCardsWithLonLat = () => {
  const preparedCards = getPreparedCards()
  const result = preparedCards.map(async (ele) => {
    const tatokupa = await getLatLonFromCityName(ele.Miasto)
    return { ...ele, ...tatokupa }
  })

  return Promise.all(result)
}

export const getSortedCards = async () => await sortByWeekDay(await getPreparedCardsWithLonLat())
