import {toGeezNumber} from '../EthiopianDateConverter';

test('converts number to Ge\'ez numeral', () => {
  expect(toGeezNumber(1)).toBe('፩');
  expect(toGeezNumber(10)).toBe('፲');
  expect(toGeezNumber(100)).toBe('፻');
  // Add more tests as necessary
});
