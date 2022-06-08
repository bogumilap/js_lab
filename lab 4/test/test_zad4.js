/*
  Mocha allows you to use any assertion library you wish. In this example, we are using the built-in module called 'Assert'.
  If you prefer the 'Chai' library (https://www.chaijs.com/) then you have to install it yourself: 'npm install chai --save-dev',
  and then you need to uncomment the lines below.
*/

//----------------------------------------
// Mocha tests with CommonJS style imports
//----------------------------------------

// var expect = require('chai').expect;
// var assert = require('assert');
// const Operation = require('../module.js');

// describe('The sum() method', function () {
//   it('Returns 4 for 2+2', function () {
//     var op = new Operation(2, 2);
//     assert.strictEqual(op.sum(), 4)
//     // expect(op.sum()).to.equal(4);
//   });
//   it('Returns 0 for -2+2', function () {
//     var op = new Operation(-2, 2);
//     assert.strictEqual(op.sum(), 0)
//     // expect(op.sum()).to.equal(0);
//   });
// });

//-----------------------------------
// Mocha tests with ES6 style imports
//-----------------------------------

/*
- You must install the 'esm' module (https://www.npmjs.com/package/esm) — npm install esm --save-dev
- You must run tests as follows: npx mocha --require esm
Source: https://stackoverflow.com/questions/57004631/mocha-tests-with-es6-style-imports
*/
import { Path } from "../zad4/fsmodule.mjs";
import assert from 'assert';

describe('The checkType() method', function () {
  it('Returns "folder" for "node_modules"', function () {
    let p = new Path("node_modules");
    assert.strictEqual(p.checkType(), "folder")
  });
  it('Returns "file" for "package.json"', function () {
    let p = new Path("package.json");
    assert.strictEqual(p.checkType(), "file")
  });
});

describe('The printFile() method', function() {
    it('Returns "abcdef" for "test1.txt"', function () {
        let p = new Path("./zad4/test1.txt");
        assert.strictEqual(p.printFile(), "abcdef")
    });
});
