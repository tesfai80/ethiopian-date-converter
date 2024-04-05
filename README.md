# Ethiopian Date Converter

## Description

The Ethiopian Date Converter is a Javascript Libarary designed to convert dates from the Gregorian calendar to the Ethiopian calendar. It provides accurate conversions by considering leap years and the specific start of the Ethiopian New Year. The application offers functionalities to convert dates into both short and long Ethiopian date formats.

## Features

- Convert Gregorian dates to Ethiopian dates.
- Convert Ethiopian dates to Gregorian dates.
- Support Geez formats.
- Support for short (dd/MM/yyyy) and long date formats, including day names and month names.
- Consideration of leap years in both calendars for accurate date conversion.

## Usage

To use the Ethiopian Date Converter, include the `EthiopianDateConverter.cs` class in your C# project. You can convert dates using the following methods:

- `ConvertToEthiopianShort(DateTime gregorianDate)` for short date format.
- `ConvertToEthiopianLong(DateTime gregorianDate)` for long date format with month and day names.
- `convertToEthiopianLongWithGeez(DateTime gregorianDate)`for Geez format including years
- `convertFromEthiopianToGregorian(DateTime ethiopianDate)` for converting Georgian Calendar to Ethiopian Calendar

Example:
```javascript
const today = new Date();
console.log("Short Format:", convertToEthiopianShort(today));
console.log("Long Format:", convertToEthiopianLong(today));
console.log("Geez Format:", convertToEthiopianLongWithGeez(today));
console.log("Convert Dates between Georgian to Ethiopian Calendar:", convertFromEthiopianToGregorian(today));

## License

MIT License

Copyright (c) 2024 Tesfay Tadesse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
