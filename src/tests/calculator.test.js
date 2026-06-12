const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('addition with floats', () => {
    expect(add(2.5, 0.5)).toBeCloseTo(3.0);
  });

  test('subtraction negative result', () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test('multiplication by zero', () => {
    expect(multiply(12345, 0)).toBe(0);
  });

  test('division by zero should throw', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  test('large numbers', () => {
    expect(add(1e12, 1e12)).toBe(2e12);
  });
});

describe('Calculator extended operations', () => {
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('modulo by zero should throw', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero');
  });

  test('squareRoot of negative should throw', () => {
    expect(() => squareRoot(-9)).toThrow('Square root of negative number');
  });

  test('power with zero exponent', () => {
    expect(power(5, 0)).toBe(1);
  });

  test('power with negative exponent', () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });
});
