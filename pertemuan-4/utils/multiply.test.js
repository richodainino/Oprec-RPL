const { expect } = require('@jest/globals');
const multiply = require('./multiply');

describe('Multiply function', () => { 
  test('3 * 2 should return 6', () => {
    const result = multiply(3, 2);
    expect(result).toEqual(6);
  });
  
  test('4 * 2 should return 8', () => {
    const result = multiply(4, 2);
    expect(result).toEqual(8);
  });
 });