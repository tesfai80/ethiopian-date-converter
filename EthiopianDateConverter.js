function getEthiopianDate(gregorianDate) {
    // Constants for calculating the Ethiopian New Year in Gregorian dates
    const offsetYears = 7;
    const newYearMonth = 9; // Ethiopian New Year is in September
    let newYearDay = isGregorianLeapYear(gregorianDate.getFullYear() - 1) ? 12 : 11;
    // Determine the Ethiopian year
    let ethiopianYear = gregorianDate.getFullYear() - offsetYears;
    // Adjusting Ethiopian year based on whether the date is before or after the Ethiopian New Year
    if (gregorianDate.getMonth() + 1 < newYearMonth || 
       (gregorianDate.getMonth() + 1 === newYearMonth && gregorianDate.getDate() < newYearDay)) {
        ethiopianYear -= 1;
    }

    // Calculate the difference in days from the Ethiopian New Year
    let ethiopianNewYear = new Date(gregorianDate.getFullYear(), newYearMonth - 1, newYearDay);
    if (gregorianDate < ethiopianNewYear) {
        ethiopianNewYear.setFullYear(ethiopianNewYear.getFullYear() - 1);
    }
    const differenceInDays = Math.floor((gregorianDate - ethiopianNewYear) / (1000 * 60 * 60 * 24));
    let totalDaysSinceNewYear = differenceInDays ; // Including the current day

   // Convert the difference into Ethiopian months and days
   const ethiopianMonth = Math.floor(totalDaysSinceNewYear / 30) + 1;
   const ethiopianDay = (totalDaysSinceNewYear % 30) === 0 ? 30 : totalDaysSinceNewYear % 30;

   return { ethiopianYear, ethiopianMonth, ethiopianDay };
}
function convertFromEthiopianToGregorian(ethiopianYear, ethiopianMonth, ethiopianDay) {
    const offsetYears = 8;
    const newYearMonth = 9; // Ethiopian New Year in Gregorian Calendar is September
    const baseGregorianYear = ethiopianYear + offsetYears;
    let gregorianNewYearDay = isGregorianLeapYear(baseGregorianYear) ? 12 : 11;
    
    // Calculate the Gregorian date for Meskerem 1 (Ethiopian New Year)
    let gregorianNewYear = new Date(baseGregorianYear, newYearMonth - 1, gregorianNewYearDay);
    
    // Ethiopian months have 30 days each. Pagumē (the 13th month) is not accounted for in this calculation.
    let daysFromEthiopianNewYear = (ethiopianMonth - 1) * 30 + (ethiopianDay - 1);
    gregorianNewYear.setDate(gregorianNewYear.getDate() + daysFromEthiopianNewYear);
    
    return gregorianNewYear;
}
function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
function toGeezNumber(number) {
    const geezDigits = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
    const geezTens = ["፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];
    const geezHundreds = ["፻"];
    const geezThousands = ["፲፻", "፪፻", "፫፻", "፬፻", "፭፻", "፮፻", "፯፻", "፰፻", "፱፻"];

    if (number === 0) return "ዜሮ";
    
    let result = "";

    // Thousands
    if (number >= 1000) {
        let thousands = Math.floor(number / 1000);
        result += (thousands === 1 ? "" : geezDigits[thousands - 1]) + "፻፻"; // 1,000 is represented as ፻፻ in Ge'ez
        number %= 1000;
    }

    // Hundreds
    if (number >= 100) {
        let hundreds = Math.floor(number / 100);
        result += (hundreds === 1 ? "" : geezDigits[hundreds - 1]) + geezHundreds[0];
        number %= 100;
    }

    // Tens
    if (number >= 10) {
        let tens = Math.floor(number / 10);
        result += (tens === 1 ? "" : geezTens[tens - 1]);
        number %= 10;
    }

    // Units
    if (number > 0) {
        result += geezDigits[number - 1];
    }

    return result;
}

function convertToEthiopianLongWithGeez(gregorianDate) {
    const ethiopianMonths = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚይዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(gregorianDate);

    const dayInGeez = toGeezNumber(ethiopianDay);
    const yearInGeez = toGeezNumber(ethiopianYear);
    const monthName = ethiopianMonths[ethiopianMonth - 1];

    return `${dayInGeez} ${monthName} ${yearInGeez}`;
}

function convertToEthiopianShort(gregorianDate) {
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(gregorianDate);
    return `${ethiopianDay}/${ethiopianMonth}/${ethiopianYear}`;
}

function convertToEthiopianLong(gregorianDate) {
    const ethiopianMonths = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚይዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
    const ethiopianDays = ["እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሁድ"]; // Note: The week starts on Sunday
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(gregorianDate);

    // Determine the day of the week for the given Gregorian date
    const dayOfWeek = gregorianDate.getDay();
    // Ethiopian day name is selected based on the Gregorian day of the week
    const dayName = ethiopianDays[dayOfWeek % ethiopianDays.length];

    // Select the Ethiopian month name based on the calculated month
    const monthName = ethiopianMonths[ethiopianMonth - 1];
    return `${dayName}, ${ethiopianDay} ${monthName} ${ethiopianYear}`;
}

export { convertToEthiopianShort, convertToEthiopianLong ,convertToEthiopianLongWithGeez,convertFromEthiopianToGregorian};
