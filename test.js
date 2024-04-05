import { convertToEthiopianShort, convertToEthiopianLong } from './EthiopianDateConverter.js';
const today = new Date();
console.log("Short Format:", convertToEthiopianShort(today));
console.log("Long Format:", convertToEthiopianLong(today));