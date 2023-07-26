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
