import dayjs from "dayjs";


export const sortByWeekDay = (collection) => {
    // return dayjs(date).utcOffset(0).startOf('date').toDate();
    const daysOfWeekPL = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const today = dayjs().day()
    const daysOfWeekWithTodayOnFirst = ["Codziennie", ...daysOfWeekPL.slice(today - 1), ...daysOfWeekPL.slice(0, today - 1)];
    const sortCollection = [...collection].sort((a, b) => {
        const dayOfWeekAInPL = a["Dzień tygodnia"]
        const dayOfWeekBInPL = b["Dzień tygodnia"]
        const dzienTygodniaA = daysOfWeekPL.indexOf(dayOfWeekAInPL)
        const dzienTygodniaB = daysOfWeekPL.indexOf(dayOfWeekBInPL)
        if (dzienTygodniaA < dzienTygodniaB) {
            return -1;
        }
        if (dzienTygodniaA > dzienTygodniaB) {
            return 1;
        }
        
        return 0;
    })

    return sortCollection


}

export const sortByWeekDayAndHours = (collection) => {
    const sortedByDayOfWeek = sortByWeekDay(collection);
    
}