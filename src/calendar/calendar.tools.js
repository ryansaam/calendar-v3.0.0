export let fillCalendar = (month, year) => {
  if (typeof month !== "number" || typeof year !== "number") { throw new Error("fillCalendar only accepts parameters of Type Number") }
  if (month < 0 || month > 11) { throw new Error("Invalid month index: Try [0-11]") }
  let datesArray = []
  let monthStart = new Date(year,month,1).getDay()
  let yearType = false;
  let filledNodes = 0;
  // Check for leap year
  (year%4 === 0) ? 
    (year%100 === 0) ?
      (year%400) ? yearType = true : yearType = false : 
    yearType = true : 
  yearType = false
  const monthArrays = yearType ? [31,29,31,30,31,30,31,31,30,31,30,31] : [31,28,31,30,31,30,31,31,30,31,30,31]
  if (month === 0) { month = 12; }
  let leadDayStart = monthArrays[month-1] - monthStart + 1
  // Loop out lead date numbers
  for (let i = 0; i < monthStart; i++) {
    datesArray.push({date: leadDayStart, type: "leadDate", id: "leadDate" + i})
    leadDayStart++
    filledNodes++
  }
  if (month === 12) { month = 0; }
  // Loop out month's date numbers
  for (let i = 0; i < monthArrays[month]; i++) {
    datesArray.push({date: i + 1, type: "monthDate", id: "monthDate" + i})
    filledNodes++
  }
  // fill the empty remaining cells in the calendar
  let remainingNodes = 42 - filledNodes;
  for (let i = 0; i < remainingNodes; i++) {
    datesArray.push({date: i + 1, type: "postDate", id: "postDate" + i})
  }
  return datesArray
}