import{getEthiopianDate} from '../EthiopianDateConverter';

test('converts Gregorian date to Ethiopian date', () => {
  const inputDate = new Date('March 2, 2020');
  const expectedEthiopianDate = { ethiopianYear: 2012, ethiopianMonth: 6, ethiopianDay: 23 };
  expect(getEthiopianDate(inputDate)).toEqual(expectedEthiopianDate);
});
