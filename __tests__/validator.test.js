const validator = require('../lib/validator.js');
// const CastError = require('../lib/Errors.js');

describe('validator module', () => {
  
  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const func = () => {};
  const bool = false;
  const date = new Date();

  describe('performs basic validation of', () => {

    it('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeFalsy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeFalsy();
      expect(validator.isString(date)).toBeFalsy();

    });

    it('numbers', () => {
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
      expect(validator.isNumber(date)).toBeFalsy();
    });

    it('arrays', () => {
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();
      expect(validator.isArray(date)).toBeFalsy();
      
    });

    it('objects', () => {
      expect(validator.isObject(obj)).toBeTruthy();
      expect(validator.isObject(str)).toBeFalsy();
      expect(validator.isObject(num)).toBeFalsy();
      expect(validator.isObject(arr)).toBeFalsy();
      expect(validator.isObject(func)).toBeFalsy();
      expect(validator.isObject(bool)).toBeFalsy();
      expect(validator.isObject(date)).toBeTruthy();

    });

    it('dates', () => {
      expect(validator.isDate(date)).toBeTruthy();
      expect(validator.isDate(str)).toBeFalsy();
      expect(validator.isDate(num)).toBeFalsy();
      expect(validator.isDate(arr)).toBeFalsy();
      expect(validator.isDate(obj)).toBeFalsy();
      expect(validator.isDate(func)).toBeFalsy();

    });

    it('booleans', () => {
      expect(validator.isBoolean(bool)).toBeTruthy();
      expect(validator.isBoolean(str)).toBeFalsy();
      expect(validator.isBoolean(num)).toBeFalsy();
      expect(validator.isBoolean(arr)).toBeFalsy();
      expect(validator.isBoolean(obj)).toBeFalsy();
      expect(validator.isBoolean(func)).toBeFalsy();
      expect(validator.isBoolean(date)).toBeFalsy();

    });

    it('functions', () => {
      expect(validator.isFunction(func)).toBeTruthy();
      expect(validator.isFunction(str)).toBeFalsy();
      expect(validator.isFunction(num)).toBeFalsy();
      expect(validator.isFunction(arr)).toBeFalsy();
      expect(validator.isFunction(obj)).toBeFalsy();
      expect(validator.isFunction(bool)).toBeFalsy();
      expect(validator.isFunction(date)).toBeFalsy();
      
    });
    
  });

  describe('performs array validation of', () => {

    const arrayOfStrings = ['a', 'b', 'c'];
    const arrayOfNumbers = [1, 2, 3];
    const arrayOfObjects = [{}, {}, {}];
    const arrayOfBooleans = [true, false, true];

    it('strings', () => {
      expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
      expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
      expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();

    });

    it('objects', () => {
      expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
      expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();

    });

    it('booleans', () => {
      expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
      expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();

    });
  });

  describe('get validator for', () => {

    it('strings', () => {
      expect(validator.getValidator('string')).toBe(validator.isString);
    });
    
    it('numbers', () => {
      expect(validator.getValidator('number')).toBe(validator.isNumber);
    });

    it('arrays', () => {
      expect(validator.getValidator('array')).toBe(validator.isArray);

    });

    it('objects', () => {
      expect(validator.getValidator('object')).toBe(validator.isObject);

    });

    it('booleans', () => {
      expect(validator.getValidator('boolean')).toBe(validator.isBoolean);
    });

    it('dates', () => {
      expect(validator.getValidator('date')).toBe(validator.isDate);
    });

    it('functions', () => {
      expect(validator.getValidator('function')).toBe(validator.isFunction);
    });

    it('array of strings', () => {
      expect(validator.getValidator('strings')).toBe(validator.isArrayOfStrings);
    });

    it('array of numbers', () => {
      expect(validator.getValidator('numbers')).toBe(validator.isArrayOfNumbers);
    });

    it('array of objects', () => {
      expect(validator.getValidator('objects')).toBe(validator.isArrayOfObjects);
    });

    it('array of booleans', () => {
      expect(validator.getValidator('booleans')).toBe(validator.isArrayOfBooleans);

    });

  });

  describe('performs casic casting of', () => {
    const str = 'tacos';
    const number = 1974;
    const boolean = true;
    const date = new Date();
    const numStr = '1977';
    const trueStr = 'true';
    const falseStr = 'false';
    const zero = 0;
    const one = 1;
    const obj = {};
    const arr = [];

    it('strings', () => {
      expect(validator.toString(str)).toBe('tacos');
      expect(validator.toString(number)).toBe('1974');
      expect(validator.toString(boolean)).toBe('true');
      expect(() => validator.toString(arr)).toThrow(validator.CastError);
      expect(() => validator.toString(obj)).toThrow(validator.CastError);
      expect(() => validator.toString(date)).toThrow(validator.CastError);
    });

    it('numbers', () => {
      expect(validator.toNumber(number)).toBe(1974);
      expect(validator.toNumber(numStr)).toBe(1977);
      expect(() => validator.toNumber(arr)).toThrow(validator.CastError);
      expect(() => validator.toNumber(obj)).toThrow(validator.CastError);
      expect(() => validator.toNumber(date)).toThrow(validator.CastError);
    });

    it('boolean', () => {
      expect(validator.toBoolean(boolean)).toBe(true);
      expect(validator.toBoolean(trueStr)).toBe(true);
      expect(validator.toBoolean(falseStr)).toBe(false);
      expect(validator.toBoolean(zero)).toBe(false);
      expect(validator.toBoolean(one)).toBe(true);
      expect(() => validator.toBoolean(arr)).toThrow(validator.CastError);
      expect(() => validator.toBoolean(obj)).toThrow(validator.CastError);
      expect(() => validator.toBoolean(date)).toThrow(validator.CastError);
    });

    it('date', () => {
      expect(validator.toDate(date)).toEqual(String(new Date()));
      expect(() => validator.toDate(str)).toThrow(validator.CastError);
      expect(() => validator.toDate(number)).toThrow(validator.CastError);
      expect(() => validator.toDate(boolean)).toThrow(validator.CastError);
      expect(() => validator.toDate(arr)).toThrow(validator.CastError);
      expect(() => validator.toDate(obj)).toThrow(validator.CastError);
  
    });
  
  });

  describe('get Caster for', () => {

    it('strings', () => {
      expect(validator.getCaster('string')).toBe(validator.toString);
    });
    
    it('numbers', () => {
      expect(validator.getCaster('number')).toBe(validator.toNumber);
    });

    it('booleans', () => {
      expect(validator.getCaster('boolean')).toBe(validator.toBoolean);
    });

    it('date', () => {
      expect(validator.getCaster('date')).toBe(validator.toDate);
    });

  });

});