import {convertFromEthiopianToGregorian} from '../EthiopianDateConverter';

describe('Ethiopian to Gregorian Date Conversion', () => {
    test('converts Ethiopian date to Gregorian date accurately', () => {
      // Example: Converting 23rd day of Megabit (6th month), 2012 in the Ethiopian calendar
      // Expected corresponding Gregorian date: March 2, 2020
      const ethiopianYear = 2012;
      const ethiopianMonth = 6; // Megabit
      const ethiopianDay = 23;
      
      // Convert the Ethiopian date to Gregorian
      const result = convertFromEthiopianToGregorian(ethiopianYear, ethiopianMonth, ethiopianDay);
      
      // Normalize result to UTC for comparison
      result.setUTCHours(0, 0, 0, 0);
  
      // Create the expected Gregorian date in UTC
      // Note: JavaScript months are 0-based, so March is month 2
      const expectedGregorianDate = new Date(Date.UTC(2020, 2, 2));
  
      // Compare the result with the expected date
      expect(result).toEqual(expectedGregorianDate);
    });
  });