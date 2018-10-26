import { filterMerge } from './filterMerge';

const dateFilterModule = require('./dateFilter');
const oldYearFilterModule = require('./oldYearFilter');

let dateFilterSpy = null;
let oldYearFilterSpy = null;

beforeEach(() => {
  dateFilterSpy = jest.spyOn(dateFilterModule, 'dateFilter');
  oldYearFilterSpy = jest.spyOn(oldYearFilterModule, 'oldYearFilter');
});

afterEach(() => {
  dateFilterSpy.mockRestore();
  oldYearFilterSpy.mockRestore();
});

it ('User enter two digit or less, year old filter should called', () => {
  var result = filterMerge('12');

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).toHaveBeenCalled();
  expect(result).not.toBeNull();
});

it ('User enter more than characters than two, date filter should be called', () => {
  var result = filterMerge('1983');

  expect(dateFilterSpy).toHaveBeenCalled();
  expect(oldYearFilterSpy).not.toHaveBeenCalled();
  expect(result).not.toBeNull();
});

it ('User did not provide any input, none of the filters should be called', () => {
  var result = filterMerge(null);

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).not.toHaveBeenCalled();
  expect(result).not.toBeNull();
});
