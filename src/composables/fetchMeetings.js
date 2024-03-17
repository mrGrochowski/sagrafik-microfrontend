const { VITE_DATA_SOURCE, VITE_GOOGLE_SHEET_APP_KEY, VITE_DATA_SHEET } = import.meta.env
import { decrypt } from './decryptContent.js'
import cloneDeep from 'lodash/cloneDeep.js'
import uniqueId from 'lodash/uniqueId.js'
import { getLatLonFromCityName } from './geolocationMarks.js'
import { sortByWeekDayAndHours, sortByClosest } from './sortSchedule.js'
import { useGlobalState } from '../composables/globalState.js'

export let { Storage , cards } = useGlobalState()
//todo CHANGE THIS STORAGE ON GLOBAL STATE

export const sync = async () => {
  const res = await fetch(`${VITE_DATA_SOURCE}/values/${VITE_DATA_SHEET}!A:ZZ?key=${VITE_GOOGLE_SHEET_APP_KEY}`)
  const fetchJson = await res.json()
  Storage.value = fetchJson
  //return fetchJson
}

const decryptResponse = () =>
  Storage.value.values
    /* .filter((element, index) => {
      //ommit heading section of table
      return index > 0
    }) */
    .map((row) => row.map((col) => decrypt(col)))


const changeISODateToHoursInResponse = (decryptedResponse) => {
  const regex = /\d{4}\-\d{2}\-\d{2}T/
  const responseWithTimestampsAsHHMM = decryptedResponse.map((row) => {
    return cloneDeep(row).map((col,index) => {
      	//get just hour format
      	const condition = regex.test(col)
      	if (condition && index > 0) {
        	const res = col.match(/\d\d:\d\d/)['0']
        	return res
      	}
        if (index == 0) {
          const res = ""+Math.floor(new Date(col.replace(/"/g, '')).getTime() / 1000)
          
          return res
        }
      	return col
    	})
  })

  return responseWithTimestampsAsHHMM
}


export const prepareRows = () => {

  Storage.decryptedResponse = decryptResponse()
  Storage.responseWithFormatedDates = changeISODateToHoursInResponse(Storage.decryptedResponse)


  return Storage.responseWithFormatedDates
}

export const getRows = prepareRows
export const getHeaders = () => Storage.decryptedResponse[0]

export const getPreparedCards = () => {
  const preparedList = []
  const rows = getRows().slice(1);
  const headers = getHeaders().map(e=> e.replace(/"/g, '').replace(/\s$/,''))

  rows.forEach((row, index) => {
    const obj = {}
    row.forEach((cell, index) => {
      obj[headers[index]] = cell && cell.replace(/"/g, '').replace(/\s$/,'')
    })
    preparedList.push(obj)
  })
  
  return preparedList
}

export const getPreparedCardsWithLonLat = () => {
  const preparedCards = getPreparedCards()
  const result = preparedCards.map(async (ele) => {
    const rest = await getLatLonFromCityName(ele.Miasto)
    return { ...ele, ...rest }
  })

  return Promise.all(result)
}

export const getPreparedMiniCards = () => {
  const preparedCards = getPreparedCards()
  const minifyedCards = preparedCards.map(
    element => {
      const allowedFields = [
        'Nazwa Meetingu',
        'Godzina rozpoczęcia',
        'Dzień tygodnia',
        'Miasto',
        'Numer telefonu',
        'Id spotkania',
        'Numer pin',
        'Link',
        'Dodatkowy opis',
        'Sygnatura czasowa'
      ]
      const result = allowedFields.reduce((acc, field) => {
        return { ...acc, ...(element[field] !== '' && {[field]: element[field]} )  }
      }, {}) 
      return result
    }
  )

  return minifyedCards
}

export const miniCardsWithUUID = () => {
   const uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16));
  }

  const obj = getPreparedMiniCards()
  
  const result = obj.map((object) => {
    return { id: uniqueId() ,...object }
  })
  return result
}

export const getSmoothSortedMiniCards = async () => await sortByClosest(await getPreparedMiniCards()) 

export const setCardsToStore = async () => {
  cards.value = sortByClosest(await getPreparedMiniCards())
}