"use strict";
let text_field = document.getElementById('mocha');
let total_sum = 0;
const digits = "0123456789";

// let pr = '';
// while (pr != null) {
//     pr = window.prompt("Wpisz ciąg cyfr i/lub liter:");
//     text_field.innerHTML += pr + "<br>";
//     text_field.innerHTML += "\t" + cyfry(pr) +"\t" + litery(pr) +"\t" + suma(pr) + "<br>";
// }

function cyfry(napis) {   // returns sum of digits in a string (counts until reaches char that isn't a digit)
    let sum_digits = 0;
    for (let i=0; i<napis.length; i++) {
        if (digits.includes(napis.charAt(i))) {
            sum_digits += parseInt(napis.slice(i, i+1), 10);
        } 
    }
    return sum_digits;
};

function litery(napis) {  // returns number of letters in a string
    let count_letters = 0;
    for (let i=0; i<napis.length; i++) {
        if (! (digits.includes(napis.charAt(i)))) {
            count_letters++;
        }
    }
    return count_letters;
};

function suma(napis) {  // cuts out numbers from strings that start with a digit and sums them
    if (napis.length > 0 && digits.includes(napis.charAt(0))) {
        let i = 1;
        while (i < napis.length && digits.includes(napis.charAt(i))) {
            i++;
        }
        total_sum += parseInt(napis.slice(0, i), 10);
    }
    return total_sum;
}

var expect = chai.expect;

describe('The cyfry() function', function() {
    it('Returns 5 for "122"', function() {
    expect(cyfry("122")).to.equal(5);
    });
    it('Returns 0 for "abc"', function() {
    expect(cyfry("abc")).to.equal(0);
    });
    it('Returns 5 for "ab122"', function() {
    expect(cyfry("ab122")).to.equal(5);
    });
    it('Returns 2 for "101abc"', function() {
    expect(cyfry("101abc")).to.equal(2);
    });
    it('Returns 0 for ""', function() {
    expect(cyfry("")).to.equal(0);
    });
});    

describe('The litery() function', function() {
    it('Returns 0 for "122"', function() {
      expect(litery("122")).to.equal(0);
    });
    it('Returns 3 for "abc"', function() {
        expect(litery("abc")).to.equal(3);
    });
    it('Returns 2 for "ab122"', function() {
        expect(litery("ab122")).to.equal(2);
    });
    it('Returns 3 for "101abc"', function() {
        expect(litery("101abc")).to.equal(3);
    });
    it('Returns 0 for ""', function() {
        expect(litery("")).to.equal(0);
    });
});

describe('The suma() function', function() {
    it('Returns 122 for "122"', function() {
      expect(suma("122")).to.equal(122);
    });
    it('Returns 122 for "abc"', function() {
        expect(suma("abc")).to.equal(122);
    });
    it('Returns 122 for "ab122"', function() {
        expect(suma("ab122")).to.equal(122);
    });
    it('Returns 223 for "101abc"', function() {
        expect(suma("101abc")).to.equal(223);
    });
    it('Returns 223 for ""', function() {
        expect(suma("")).to.equal(223);
    });
});

