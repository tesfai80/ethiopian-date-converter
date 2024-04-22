function getEthiopianDate(gregorianYear, gregorianMonth, gregorianDay) {
    const offsetYears = 8; // Typically, Ethiopian year is 7 or 8 years behind the Gregorian year, depending on the current date.
    const newYearMonth = 9; // Ethiopian New Year starts in September.
    const newYearDay = isGregorianLeapYear(gregorianYear - 1) ? 12 : 11; // Ethiopian New Year falls on September 12 if the previous Gregorian year was a leap year, otherwise on September 11.

    // Create a Gregorian date object for the input date.
    let gregorianDate = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay));

    // Determine the Gregorian date for the start of the current Ethiopian year.
    let currentEthiopianNewYear = new Date(Date.UTC(gregorianYear, newYearMonth - 1, newYearDay));

    // Start calculating the Ethiopian year.
    let ethiopianYear = gregorianYear - offsetYears;

    // If today's date is before this year's Ethiopian New Year, subtract one year.
    if (gregorianDate < currentEthiopianNewYear&& gregorianMonth <= newYearMonth && gregorianDay < newYearDay) {
        ethiopianYear -= 1;
    }

    // Calculate the difference in days from the last Ethiopian New Year.
    let lastEthiopianNewYear = new Date(Date.UTC(gregorianYear - 1, newYearMonth - 1, newYearDay));
    const differenceInDays = Math.floor((gregorianDate - lastEthiopianNewYear) / (1000 * 60 * 60 * 24));

    // Calculate the Ethiopian month and day.
    let ethiopianMonth = Math.floor(differenceInDays / 30) + 1;
    // let ethiopianDay = differenceInDays % 30 + 1;
    let ethiopianDay = differenceInDays % 30 ;

    return { ethiopianYear, ethiopianMonth, ethiopianDay };
}

function convertEthiopianToGregorian(ethiopianYear, ethiopianMonth, ethiopianDay) {
    const offsetYears = 8;  // Offset between the Ethiopian and Gregorian calendars
    const newYearMonth = 9;  // Ethiopian New Year starts in September
    let gregorianYear = ethiopianYear + offsetYears;  // Initial conversion of year

    // Check if the provided Ethiopian date is before the New Year in September
    if (ethiopianMonth < newYearMonth || (ethiopianMonth === newYearMonth && ethiopianDay < 11)) {
        // If the date is before September 11, adjust the Gregorian year by subtracting one
        gregorianYear--;
    }

    // Determine if the starting year is a Gregorian leap year to set the correct New Year day
    let newYearDay = isGregorianLeapYear(gregorianYear) ? 12 : 11;

    // Calculate the start of the Ethiopian New Year in Gregorian dates
    let gregorianNewYearDate = new Date(Date.UTC(gregorianYear, newYearMonth - 1, newYearDay));

    // Calculate days from the start of the Ethiopian year
    //let daysFromNewYear = ((ethiopianMonth - 1) * 30 + ethiopianDay-1 );
    let daysFromNewYear = ((ethiopianMonth - 1) * 30 + ethiopianDay );

    // Adding the total number of days to the Gregorian New Year date
    gregorianNewYearDate.setUTCDate(gregorianNewYearDate.getUTCDate() + daysFromNewYear);

    return gregorianNewYearDate;
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

    // Handle thousands
    if (number >= 1000) {
        let thousands = Math.floor(number / 1000);
        result += (thousands === 1 ? "" : geezDigits[thousands - 1]) + "፻፻"; // 1,000 is represented as "፻፻" in Ge'ez
        number %= 1000;
    }

    // Handle hundreds
    if (number >= 100) {
        let hundreds = Math.floor(number / 100);
        result += (hundreds === 1 ? "" : geezDigits[hundreds - 1]) + "፻";
        number %= 100;
    }

    // Handle tens
    if (number >= 10) {
        let tens = Math.floor(number / 10);
        result += geezTens[tens - 1]; // Corrected to use the index directly for tens
        number %= 10;
    }

    // Handle units
    if (number > 0) {
        result += geezDigits[number - 1];
    }

    return result;
}

function toEthiopianGeezLong(gregorianYear, gregorianMonth, gregorianDay) {
    const ethiopianMonths = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚይዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(gregorianYear, gregorianMonth, gregorianDay);

    const day = ethiopianDay;
    const year = ethiopianYear;
    const monthName = ethiopianMonths[ethiopianMonth-1];

    return `${day} ${monthName} ${year}`;
}

function toEthiopianShortDate(ethYear, ethMonth, ethnDay) {
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(ethYear, ethMonth, ethnDay);
    return `${ethiopianDay}/${ethiopianMonth}/${ethiopianYear}`;
}

function toGeezDate(gregorianYear, gregorianMonth, gregorianDay) {
    const ethiopianMonths = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚይዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
    const ethiopianDays = ["እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሁድ"]; // Note: The week starts on Sunday
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(ethYear, ethMonth, ethnDay);

    // Determine the day of the week for the given Gregorian date
    const dayOfWeek = gregorianDate.getDay();
    // Ethiopian day name is selected based on the Gregorian day of the week
    const dayName = ethiopianDays[dayOfWeek % ethiopianDays.length];

    // Select the Ethiopian month name based on the calculated month
    const monthName = ethiopianMonths[ethiopianMonth - 1];
    return `${dayName}, ${ethiopianDay} ${monthName} ${ethiopianYear}`;
}

export { toEthiopianShortDate, toGeezDate ,toEthiopianGeezLong,convertEthiopianToGregorian,toGeezNumber,getEthiopianDate};
