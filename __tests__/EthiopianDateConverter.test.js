// EthiopianDateConverter.test.js
import { getEthiopianDate, convertEthiopianToGregorian ,toGeezNumber} from '../EthiopianDateConverter';

describe('Gregorian to Ethiopian Date Conversion', () => {
    test('converts Gregorian date to Ethiopian date accurately', () => {
        // Define the Gregorian date
        const gregorianYear = 2024;
        const gregorianMonth = 4; // April (note: JavaScript Date month is zero-based, April is 3 but function expects 1-based)
        const gregorianDay = 22;

        // Perform the conversion
        const ethiopianDate = getEthiopianDate(gregorianYear, gregorianMonth, gregorianDay);

        // Define the expected Ethiopian date
        const expectedEthiopianDate = {
            ethiopianYear: 2016,
            ethiopianMonth: 8,
            ethiopianDay: 14
        };

        // Assert the result matches the expected Ethiopian date
        expect(ethiopianDate).toEqual(expectedEthiopianDate);
    });


    test('converts Ethiopian date to Gregorian date accurately', () => {
        const ethiopianYear = 2016;
        const ethiopianMonth = 8;
        const ethiopianDay = 14;
        const result = convertEthiopianToGregorian(ethiopianYear, ethiopianMonth, ethiopianDay);
        result.setUTCHours(0, 0, 0, 0);
        const expectedGregorianDate = new Date(Date.UTC(2024, 3, 22)); // April 22, 2024
        expect(result).toEqual(expectedGregorianDate);
    });
    test('converts number to Ge\'ez numeral', () => {
        expect(toGeezNumber(1)).toBe('፩');
        expect(toGeezNumber(10)).toBe('፲');
        expect(toGeezNumber(100)).toBe('፻');
      });
});
