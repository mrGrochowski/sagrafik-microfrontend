import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
import { capitalize, sortBy } from 'lodash'

export const sortByWeekDayAndHours = (collection) => {
  const daysOfWeekPL = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
  const today = dayjs().day()
  const daysOfWeekWithTodayOnFirst = ['Codziennie',...daysOfWeekPL.slice(today - 1), ...daysOfWeekPL.slice(0, today - 1)]

  const sortCollection = [...collection].sort((a, b) => {
    const dayOfWeekInPL_A = capitalize(a['Dzień tygodnia']).toString()
    const dayOfWeekInPL_B = capitalize(b['Dzień tygodnia']).toString()
    const indexOfDayOfWeek_A = daysOfWeekWithTodayOnFirst.indexOf(dayOfWeekInPL_A)
    const indexOfDayOfWeek_B = daysOfWeekWithTodayOnFirst.indexOf(dayOfWeekInPL_B)
    const hour_A = dayjs(a['Godzina rozpoczęcia'] + ':00', 'HH:mm:ss')
    const hour_B = dayjs(b['Godzina rozpoczęcia'] + ':00', 'HH:mm:ss')
    if (indexOfDayOfWeek_A > indexOfDayOfWeek_B) return 1
    if (indexOfDayOfWeek_A < indexOfDayOfWeek_B) return -1
    
    if (hour_A.isAfter(hour_B)) return 1
    if (hour_B.isAfter(hour_A)) return -1
    return 0
  })
  return sortCollection
}


function findDayOfMonth(dayOfWeek) {
  const today = dayjs();
  let currentDate = today.clone();

  for (let i = 0; i < 7; i++) {
    currentDate = currentDate.add(1, 'day');
    if (currentDate.day() === dayOfWeek) {
      return currentDate;
    }
  }

  return -1; // If no occurrence found within the next 7 days
}

const prepareDate = (a) => {
  const daysOfWeekPL = ['Niedziela','Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
  const dayOfWeekInPL = capitalize(a['Dzień tygodnia']).toString()
  const dayOfWeekInPLWithEveryday = dayOfWeekInPL === "Codziennie" ? daysOfWeekPL[dayjs().day()] : dayOfWeekInPL

  const closestDate = findDayOfMonth(daysOfWeekPL.indexOf(dayOfWeekInPLWithEveryday))

  const hour = a['Godzina rozpoczęcia'].slice(0, 2)
  const minute = a['Godzina rozpoczęcia'].slice(3, 5)
  const closesDateAndTime = closestDate
    .set('hour', hour)
    .set('minute', minute)
    .set('second', 0);
    
  return closesDateAndTime
}

export const sortByClosest = (collection) => {

  const today = dayjs()
  const preparedCollection = collection.map(e=> ({...e,closestData:prepareDate(e)}))
  const sortCollection = [...preparedCollection].sort((a, b) => {
    const closesDateAndTime_A = a.closestData
    const closesDateAndTime_B = b.closestData
    
    if (closesDateAndTime_A.isAfter(closesDateAndTime_B)) return 1
    if (closesDateAndTime_B.isAfter(closesDateAndTime_A)) return -1
    return 0
  })

// TODO no nie moży być codzinny meeting jako punkt przełamania ,ale na razie nie umiem lepiej
  //const closestpossible = sortCollection.findIndex(e=>e.closestData.day() == today.day())
  const differences = sortCollection.map(date => Math.abs(today.diff(date.closestData, 'milliseconds')));
  console.log("🚀 ~ file: sortSchedule.js:77 ~ sortByClosest ~ differences:", differences)

  const closestpossible = differences.indexOf(Math.min(...differences));
  console.log("🚀 ~ file: sortSchedule.js:81 ~ sortByClosest ~ closestpossible:", closestpossible)
  return [...sortCollection.slice(closestpossible, sortCollection.length), ...sortCollection.slice(0, closestpossible)]

}