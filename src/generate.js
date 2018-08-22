import { calculateControlDigit } from './pesel';

export function generatePESEL(date, gender = 'any') {
  let result = date.format('YYMMDD');

  if (date.year() > 1999) {
    result = (parseInt(result, 10) + 2000).toString();
  }

  result += '123' + generateDigitForGender(gender);
  result += calculateControlDigit(result).toString();

  return result;
}

function generateDigitForGender(gender) {
  switch(gender) {
    case 'male':
      return '1';

    case 'female':
      return '2';
  }

  return '3';
}
