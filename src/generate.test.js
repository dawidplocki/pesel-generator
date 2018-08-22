import moment from 'moment';
import { generatePESEL } from './generate';
import { checkPESEL, characterToDigit } from './pesel';

it('generated PESEL should have eleven digits', () => {
  expect(generatePESEL(moment("20111031")).length).toBe(11);
});

it('generated PESEL from data range 1900 - 1999 should start with does number', () => {
  expect(generatePESEL(moment("19001031")).substring(0, 6)).toBe('001031');
  expect(generatePESEL(moment("19740112")).substring(0, 6)).toBe('740112');
  expect(generatePESEL(moment("19990412")).substring(0, 6)).toBe('990412');
});

it('generated PESEL from data range 2000 - 2099 should have 20 added to month number', () => {
  expect(generatePESEL(moment("20111031")).substring(0, 6)).toBe('113031');
  expect(generatePESEL(moment("20740112")).substring(0, 6)).toBe('742112');
  expect(generatePESEL(moment("20991212")).substring(0, 6)).toBe('993212');
});

it('generated PESEL should be valid one', () => {
  const pesel = generatePESEL(moment("20130412"));

  expect(checkPESEL(pesel)).toBe(true);
});

it('generated PESEL should have proper gender encoded', () => {
  function get10thDigithOfGeneratedPESEL(date, gender) {
    const _10thDigit = generatePESEL(moment(date), gender).substring(10, 0);

    return characterToDigit(_10thDigit);
  }

  expect(get10thDigithOfGeneratedPESEL('19230212', 'male') % 2).toBe(1);
  expect(get10thDigithOfGeneratedPESEL('19230212', 'female') % 2).toBe(0);
});
