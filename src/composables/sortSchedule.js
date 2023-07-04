import dayjs from "dayjs";
import {capitalize,sortBy} from "lodash"

/*
export const sortByWeekDay = (collection) => {
    // return dayjs(date).utcOffset(0).startOf('date').toDate();
    const daysOfWeekPL = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const today = dayjs().day()
    const daysOfWeekWithTodayOnFirst = ["Codziennie", ...daysOfWeekPL.slice(today - 1), ...daysOfWeekPL.slice(0, today - 1)];
    
    const sortCollection = [...collection].sort((a, b) => {
        const dayOfWeekInPL_A = a["Dzień tygodnia"]
        const dayOfWeekInPL_B = b["Dzień tygodnia"]
        const indexOfDayOfWeek_A = daysOfWeekPL.indexOf(dayOfWeekInPL_A)
        const indexOfDayOfWeek_B = daysOfWeekPL.indexOf(dayOfWeekInPL_B)
        if (indexOfDayOfWeek_A < indexOfDayOfWeek_B) {
            return -1;
        }
        if (indexOfDayOfWeek_A > indexOfDayOfWeek_B) {
            return 1;
        }
        
        return 0;
    })

    return sortCollection


}

*/
/* export const sortByWeekDayAndHours = (collection) => {
    const daysOfWeekPL = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const today = dayjs().day()
    const daysOfWeekWithTodayOnFirst = ["Codziennie", ...daysOfWeekPL.slice(today - 1), ...daysOfWeekPL.slice(0, today - 1)];
    
    const sortCollection = [...collection].sort((a, b) => {
        const dayOfWeekInPL_A = capitalize(a["Dzień tygodnia"])
        console.log("🚀 ~ file: sortSchedule.js:38 ~ sortCollection ~ dayOfWeekInPL_A:", dayOfWeekInPL_A)
        const dayOfWeekInPL_B = capitalize(b["Dzień tygodnia"])
        const indexOfDayOfWeek_A = daysOfWeekPL.indexOf(dayOfWeekInPL_A)
        const indexOfDayOfWeek_B = daysOfWeekPL.indexOf(dayOfWeekInPL_B)
        const hour_A = dayjs(a["Godzina rozpoczęcia"]+"00","HH:mm:ss")
        const hour_B = dayjs(b["Godzina rozpoczęcia"]+"00","HH:mm:ss")
        
        if (indexOfDayOfWeek_A < indexOfDayOfWeek_B) return -1;
        if (indexOfDayOfWeek_A > indexOfDayOfWeek_B) return 1;

       //if (hour_A.isAfter(hour_B)) return 1
       //if (hour_B.isAfter(hour_A)) return -1
       
       return 0;
    })
    console.log("🚀 ~ file: sortSchedule.js:32 ~ sortByWeekDayAndHours ~ collection:", collection)
    console.log("🚀 ~ file: sortSchedule.js:56 ~ sortByWeekDayAndHours ~ sortCollection:", sortCollection)

    return sortCollection
} */

export const sortByWeekDayAndHours = (collection) => {
    const daysOfWeekPL = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const today = dayjs().day()
    const daysOfWeekWithTodayOnFirst = ["Codziennie", ...daysOfWeekPL.slice(today - 1), ...daysOfWeekPL.slice(0, today - 1)];
    console.log("🚀 ~ file: sortSchedule.js:64 ~ sortByWeekDayAndHours ~ daysOfWeekWithTodayOnFirst:", daysOfWeekWithTodayOnFirst)
    
    const sortCollection = [...collection].sort(async (a, b) => {
        const dayOfWeekInPL_A = capitalize(a["Dzień tygodnia"]).toString()
        const dayOfWeekInPL_B = capitalize(b["Dzień tygodnia"]).toString()
        const indexOfDayOfWeek_A = daysOfWeekWithTodayOnFirst.indexOf(dayOfWeekInPL_A)
        const indexOfDayOfWeek_B = daysOfWeekWithTodayOnFirst.indexOf(dayOfWeekInPL_B)
        const hour_A = dayjs(a["Godzina rozpoczęcia"]+"00","HH:mm:ss")
        const hour_B = dayjs(b["Godzina rozpoczęcia"]+"00","HH:mm:ss")
        
        if ([indexOfDayOfWeek_A, indexOfDayOfWeek_B].includes(parseInt("-1"))) {
            console.group("")
            console.log("🚀 ~ dayOfWeekInPL_A:", dayOfWeekInPL_A)
            console.log("🚀 ~ dayOfWeekInPL_B:", dayOfWeekInPL_B)
            console.log("🚀 ~ indexOfDayOfWeek_A:", indexOfDayOfWeek_A)
            console.log("🚀 ~ indexOfDayOfWeek_B:", indexOfDayOfWeek_B)
            console.groupEnd("")
        }
        if (indexOfDayOfWeek_A < indexOfDayOfWeek_B) return 1;
        if (indexOfDayOfWeek_A > indexOfDayOfWeek_B) return -1;
/*
       if (hour_A.isAfter(hour_B)) return 1
       if (hour_B.isAfter(hour_A)) return -1 */
       return 0;
    })
    
    return sortCollection
}