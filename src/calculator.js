#!/usr/bin/env node
/**
 * src/calculator.js - Node.js CLI calculator
 *
 * Supported operations:
 *  - addition (+, add)
 *  - subtraction (-, sub)
 *  - multiplication (*, mul, x)
 *  - division (/, div)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js "2 + 3"
 *   node src/calculator.js 4 / 2
 */

'use strict';

// Core operation implementations
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Exported for tests or require() use
module.exports = { add, subtract, multiply, divide };

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);

  function printHelp() {
    console.log('Usage:');
    console.log('  node src/calculator.js add 2 3');
    console.log('  node src/calculator.js "2 + 3"');
    console.log('  node src/calculator.js 4 / 2');
    console.log('\nSupported operations: +, -, *, / (also: add, sub, mul, div)');
    process.exit(0);
  }

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
  }

  // Helper: parse a numeric token
  function toNumber(tok) {
    const n = Number(tok);
    if (Number.isNaN(n)) {
      console.error(`Invalid number: ${tok}`);
      process.exitCode = 1;
      throw new Error('Invalid number');
    }
    return n;
  }

  try {
    let op = null;
    let a = null;
    let b = null;

    if (args.length === 1) {
      // Possibly an expression string like "2 + 3"
      const expr = args[0].trim();
      // Match: number operator number (allow spaces)
      const m = expr.match(/^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)\s*([+\-*/xX])\s*([+-]?\d*\.?\d+(?:e[+-]?\d+)?)$/i);
      if (!m) {
        console.error('Could not parse expression. Use: "2 + 3" or operands and operator separately.');
        process.exit(1);
      }
      a = toNumber(m[1]);
      const sym = m[2];
      b = toNumber(m[3]);
      if (sym === '+' ) op = 'add';
      else if (sym === '-') op = 'sub';
      else if (sym === '*' ) op = 'mul';
      else if (sym === '/' ) op = 'div';
      else if (sym === 'x' || sym === 'X') op = 'mul';
    } else if (args.length >= 2) {
      // Form: <op> <a> <b>
      const maybeOp = args[0].toLowerCase();
      const opMap = {
        '+': 'add',
        'add': 'add',
        '-': 'sub',
        'sub': 'sub',
        '*': 'mul',
        'x': 'mul',
        'mul': 'mul',
        '/': 'div',
        'div': 'div'
      };
      if (opMap[maybeOp]) {
        op = opMap[maybeOp];
        a = toNumber(args[1]);
        if (args.length < 3) {
          console.error('Missing second operand');
          process.exit(1);
        }
        b = toNumber(args[2]);
      } else {
        // Maybe form: <a> <op> <b>
        a = toNumber(args[0]);
        const sym = args[1];
        b = toNumber(args[2]);
        const symLower = sym.toLowerCase();
        if (symLower === '+' ) op = 'add';
        else if (symLower === '-') op = 'sub';
        else if (symLower === '*' || symLower === 'x') op = 'mul';
        else if (symLower === '/') op = 'div';
        else if (symLower === 'add') op = 'add';
        else if (symLower === 'sub') op = 'sub';
        else if (symLower === 'mul') op = 'mul';
        else if (symLower === 'div') op = 'div';
        else {
          console.error(`Unknown operator: ${sym}`);
          process.exit(1);
        }
      }
    }

    if (!op) {
      console.error('Operator not recognized. Use +, -, *, / or add, sub, mul, div');
      process.exit(1);
    }

    let result;
    switch (op) {
      case 'add':
        result = add(a, b);
        break;
      case 'sub':
        result = subtract(a, b);
        break;
      case 'mul':
        result = multiply(a, b);
        break;
      case 'div':
        result = divide(a, b);
        break;
      default:
        throw new Error('Unsupported operation');
    }

    // Print result
    // Use full precision but trim trailing zeros for readability
    const out = (Number.isFinite(result) ? String(result) : String(result));
    console.log(out);
    process.exit(0);
  } catch (err) {
    if (err && err.message === 'Division by zero') {
      console.error('Error: Division by zero');
      process.exit(2);
    }
    // If error already printed, just exit with non-zero
    process.exit(process.exitCode || 1);
  }
}
