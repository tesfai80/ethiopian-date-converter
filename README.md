# Ethiopian Date Converter

## Description

Welcome to the Ethiopian Date Converter library! This library is designed to help developers convert dates from the Gregorian calendar to the Ethiopian calendar, providing both long and short format conversions. It includes support for Geez numerals and is suitable for applications requiring detailed Ethiopian date representations.

## Features

- **Convert to Geez Long Format**: Converts Gregorian dates to a long Ethiopian format with day names, using Geez numerals for day and year.
- **Convert to Short Format**: Provides a simple day/month/year format for Ethiopian dates.
- **Support for Leap Years**: Accurately handles conversions around Ethiopian and Gregorian leap years.
- **Localization Ready**: Designed to be easily integrated into internationalized applications.

## Installation

This library is available through npm. To install, run the following command in your project directory:

```bash
npm install ethiopian-date-converter
```

## Usage

### Importing the Library

Before using the conversion functions, import them into your project:

```javascript
import { toEthiopianGeezLongDate, toEthiopianShortDate } from 'ethiopian-date-converter';
```

### Converting Dates to Ethiopian Calendar

#### Long Format with Geez Numerals

Convert a Gregorian date to the Ethiopian calendar in a detailed format that includes the day of the week, the day in Geez numerals, the month name, and the year in Geez numerals.

```javascript
const gregorianDate = new Date(Date.UTC(2024, 3, 22));  // April 22, 2024
const ethiopianGeezLong = toEthiopianGeezLongDate(gregorianDate);
console.log(ethiopianGeezLong);  // Example Output: "ረቡዕ, ፲፬ ሚይዚያ ፳፻፲፰"
```

#### Short Numeric Format

For simpler applications, convert a Gregorian date to a short Ethiopian date format showing just the day, month, and year.

```javascript
const ethiopianShort = toEthiopianShortDate(gregorianDate);
console.log(ethiopianShort);  // Outputs: "14/8/2016"
```

## Configuration

No additional configuration is required to start using this library. However, you can customize the logger or error handling as needed to fit your application's architecture.

## Contributing

Contributions to the Ethiopian Date Converter are welcome! Please refer to the contributing guidelines in the repository for more details on submitting pull requests, reporting bugs, or requesting new features.

## Support and Contact

For support requests, feature suggestions, or any queries, please contact [tesfaytadesse80@gmail.com] or raise an issue in the repository on GitHub.

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
