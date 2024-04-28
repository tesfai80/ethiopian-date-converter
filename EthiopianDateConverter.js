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

    if (number < 0 || number >= 100000) {
        return "እባክዎ ቁጥር ከዜሮ እስከ 99999 መሆን አለበት።"; 
    }
    if (number === 0) return "ዜሮ";
    
    let result = "";

    // Process thousands
    while (number >= 10000) {
        let thousands = Math.floor(number / 10000);
        result += (thousands === 1 ? "" : geezDigits[thousands - 1]) + "፼"; // 10,000 is represented as "፼" in Ge'ez
        number %= 10000;
    }

    // Thousands
    if (number >= 1000) {
        let thousands = Math.floor(number / 1000);
        result += (thousands === 1 ? "" : geezDigits[thousands - 1]) + geezThousands[0];
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
    const { ethiopianYear, ethiopianMonth, ethiopianDay } = getEthiopianDate(gregorianYear, gregorianMonth, gregorianDay);

    // Determine the day of the week for the given Gregorian date
    const dayOfWeek = gregorianDay;
    // Ethiopian day name is selected based on the Gregorian day of the week
    const dayName = ethiopianDays[dayOfWeek % 7];

    // Select the Ethiopian month name based on the calculated month
    const monthName = ethiopianMonths[ethiopianMonth - 1];
    return `${dayName}, ${ethiopianDay} ${monthName} ${ethiopianYear}`;
}


const ethiopianCalendar = {
    getMonthsInGeez: () => {
        // Return an array of months in Geez
      return [
        "መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ",
        "ጥር", "የካቲት", "መጋቢት", "ሚይዚያ",
        "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
      ];
    },
    getDaysInGeez: (month) => {
        // Return an array of days in Geez for the given month
      const daysInMonth = (month === "ጳጉሜ") ? [1, 2, 3, 4, 5, 6] : Array.from({ length: 30 }, (_, i) => i + 1);
      // Convert these numbers to Geez
      return daysInMonth.map((day) => toGeezNumber(day));
    },
    getYearsInGeez: () => {
        const offsetYears = 8; // Ethiopian year is 7 or 8 years behind the Gregorian year
      const currentYear = new Date().getFullYear();
      const range = 10; // example: 10 years range
      const years = Array.from({ length: range }, (_, i) => currentYear - offsetYears - i);
      return years.map((year) => toGeezNumber(year));
    },
  };
  

  function getNextEthiopianHoliday(today) {
    // Format today's date as "DD-MMM" for easier comparison (leading zeros are important).
    const todayFormatted = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
    }).replace(' ', '-');

    const ethiopianHolidays = [
        { date: '02-Mar', englishName: 'Adwa Victory Day', amharicName: 'የዓድዋ ድል በዓል', notes: 'Commemorates Ethiopians victory over Italy at Battle of Adwa in 1896.' },
        { date: '01-May', englishName: 'International Workers Day', amharicName: 'ዓለም አቀፍ የሠራተኞች ቀን', notes: '' },
        { date: '05-May', englishName: 'Ethiopian Patriots Victory Day', amharicName: 'የአርበኞች ቀን', notes: 'Commemorates the 1941 entering of Emperor Haile Selassie into Addis Ababa amidst Second World War.' },
        { date: '28-May', englishName: 'Downfall of the Derg', amharicName: 'ደርግ የወደቀበት ቀን', notes: 'Commemorates the end of the Derg junta in 1991.' },
        { date: '11-Sep', englishName: 'Enkutatash', amharicName: 'እንቁጣጣሽ', notes: 'New Year of Ethiopia and Eritrea' },
        { date: '26-Oct', englishName: 'Defense Day', amharicName: 'የመከላከያ ቀን', notes: 'Commemorating the formation of the Ethiopian National Defense Force in 1907' },
        { date: '07-Jan', englishName: 'Ethiopian Christmas', amharicName: 'ገና', notes: '' },
        { date: '19-Jan', englishName: 'Epiphany', amharicName: 'ብርሐነ ጥምቀት', notes: 'Celebrated on January 19th, marks the Ethiopian Orthodox Epiphany.' },
        { date: '27-Sep', englishName: 'Meskel', amharicName: 'መስቀል', notes: '' },
        { date: '05-May', englishName: 'Easter', amharicName: 'ፋሲካ', notes: 'Commemorating the resurrection of Jesus Christ.' },
    ];

    // Convert all holidays to Date objects including the current year to handle year transition.
    const holidaysWithDateObjects = ethiopianHolidays.map(holiday => {
        const [day, month] = holiday.date.split('-');
        const monthIndex = new Date(`${month} 1, 2022`).getMonth(); // To convert month name to month index
        const dateThisYear = new Date(today.getFullYear(), monthIndex, day);
        if (dateThisYear < today) {
            dateThisYear.setFullYear(today.getFullYear() + 1); // If it's past this year, set it for the next year
        }
        return {...holiday, date: dateThisYear};
    });

    // Find the next closest holiday
    const nextHoliday = holidaysWithDateObjects.reduce((next, current) => {
        return current.date < next.date ? current : next;
    });

    return {
        englishName: nextHoliday.englishName,
        amharicName: nextHoliday.amharicName,
        notes: nextHoliday.notes,
        date: nextHoliday.date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(' ', '-')
    };
}

function fromGeezNumber(geezNumber) {
    const geezToDigit = {
        '፩': 1, '፪': 2, '፫': 3, '፬': 4,
        '፭': 5, '፮': 6, '፯': 7, '፰': 8, '፱': 9,
        '፲': 10, '፳': 20, '፴': 30, '፵': 40,
        '፶': 50, '፷': 60, '፸': 70, '፹': 80, '፺': 90,
        '፻': 100, '፼': 10000
    };

    let result = 0;
    let temp = 0; // Temporary number storage for values before '፻' or '፼'
    
    // Iterate through each character from left to right
    geezNumber.split('').forEach(char => {
        if (char in geezToDigit) {
            if (geezToDigit[char] < 100) {
                temp += geezToDigit[char];
            } else if (geezToDigit[char] === 100) {
                temp *= geezToDigit[char];
            } else if (geezToDigit[char] === 10000) {
                result += temp * geezToDigit[char];
                temp = 0;
            }
        }
    });

    return result + temp;
}

export {ethiopianCalendar,fromGeezNumber, toEthiopianShortDate, toGeezDate ,toEthiopianGeezLong,convertEthiopianToGregorian,toGeezNumber,getEthiopianDate,getNextEthiopianHoliday}