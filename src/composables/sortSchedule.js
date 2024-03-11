import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjsPL from 'dayjs/locale/pl';
import { capitalize, sortBy } from 'lodash'

dayjs.locale(dayjsPL);
dayjs.extend(customParseFormat);

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


/* export const sortByClosest = (collection) => {
  const daysOfWeekPL = ['Niedziela','Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ]
  const today = dayjs().day()
  const daysOfWeekWithTodayOnFirst = [...daysOfWeekPL.slice(today ), ...daysOfWeekPL.slice(0, today)]

  
  const sortCollection = [...collection].sort((a, b) => {
    const dayOfWeekInPL_A = capitalize(a['Dzień tygodnia']).toString()
    const dayOfWeekInPLWithEveryday_A = dayOfWeekInPL_A === "Codziennie" ? daysOfWeekPL[dayjs().day()] : dayOfWeekInPL_A
    const dayOfWeekInPL_B = capitalize(b['Dzień tygodnia']).toString()
    const dayOfWeekInPLWithEveryday_B = dayOfWeekInPL_B === "Codziennie" ? daysOfWeekPL[dayjs().day()] : dayOfWeekInPL_B
    const indexOfDayOfWeek_A = daysOfWeekWithTodayOnFirst.indexOf(dayOfWeekInPLWithEveryday_A)
    const indexOfDayOfWeek_B = daysOfWeekWithTodayOnFirst.indexOf(dayOfWeekInPLWithEveryday_B)
    const hour_A = dayjs(a['Godzina rozpoczęcia'] + ':00', 'HH:mm:ss')
    const hour_B = dayjs(b['Godzina rozpoczęcia'] + ':00', 'HH:mm:ss')
    if (indexOfDayOfWeek_A > indexOfDayOfWeek_B) return 1
    if (indexOfDayOfWeek_A < indexOfDayOfWeek_B) return -1
    
    if (hour_A.isAfter(hour_B)) return 1
    if (hour_B.isAfter(hour_A)) return -1
    return 0
  })
  return sortCollection
} */


function findDayOfMonth() { 
  const currentDate = dayjs();

  const currentDayOfWeek = currentDate.day();
  const startOfWeek = currentDate.subtract(currentDayOfWeek, 'day');
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = startOfWeek.add(i, 'day');
    weekDates.push(date);
  }

  const result = weekDates.map((date) => {
    const dayName = capitalize(dayjs(date).format('dddd'));
    return {dayOfWeek:dayName,date}
  }); 
  return result
} 


export const sortByClosest = (collection) => {
  const daysOfWeekPL = findDayOfMonth()
  const today = dayjs()

  const collectionWithDates = collection.map(e => {
    const dzientygodnia = capitalize(e['Dzień tygodnia']).toString() == 'Codziennie' ? capitalize(today.format('dddd')) : capitalize(e['Dzień tygodnia']).toString();

    const hour = e['Godzina rozpoczęcia'].slice(0, 2) 
    const minute = e['Godzina rozpoczęcia'].slice(3, 5) 
    
    const dateAndTime = daysOfWeekPL.find(el => el.dayOfWeek == dzientygodnia).date
      .set('hour', hour) 
      .set('minute', minute) 
      .set('second', 0);
    return {...e,dateAndTime}
  }) 
  const sortCollection = [...collectionWithDates].sort((a, b) => {
    if (a.dateAndTime.isAfter(b.dateAndTime)) return 1
    if (b.dateAndTime.isAfter(a.dateAndTime)) return -1
    return 0
  }) 

  const differences = sortCollection.map(e => Math.abs(today.diff(e.dateAndTime, 'minute')));  
  const closestpossible = differences.indexOf(Math.min(...differences)); 
  return [...sortCollection.slice(closestpossible, sortCollection.length), ...sortCollection.slice(0, closestpossible)] 

}
