import { toEthiopianGeezLong, toGeezDate } from '../EthiopianDateConverter';

describe('Ethiopian Geez Long Date Conversion', () => {
    test('converts Gregorian date to Ethiopian Geez long date format correctly', () => {
        // Expected date is based on known conversion
        expect(toEthiopianGeezLong(2024, 4, 22)).toEqual("14 ሚይዚያ 2016"); // "14 Miyaziya 2016" in Geez numerals
    });
 
});
