var expect = require('expect.js'),
    Utils = require('../utils/Utils.js');

describe('Utils', function () {

    describe('#encodeToAlphabet()', function () {

        var base62alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var base2alphabet = '01';

        it('7 (10) to base62', function () {
            var x = Utils.encodeToAlphabet(base62alphabet, 7);
            expect(x).to.eql('7')
        });

        it('10 (10) to base62', function () {
            var x = Utils.encodeToAlphabet(base62alphabet, 10);
            expect(x).to.eql('a')
        });

        it('100 (10) to base62', function () {
            var x = Utils.encodeToAlphabet(base62alphabet, 100);
            expect(x).to.eql('1C')
        });

        it('990 (10) to base62', function () {
            var x = Utils.encodeToAlphabet(base62alphabet, 990);
            expect(x).to.eql('fY')
        });

        it('0 (10) to base62', function () {
            var x = Utils.encodeToAlphabet(base62alphabet, 0);
            expect(x).to.eql('0')
        });

        it('15 (10) to base2', function () {
            var x = Utils.encodeToAlphabet(base2alphabet, 15);
            expect(x).to.eql('1111')
        });

        it('128 (10) to base2', function () {
            var x = Utils.encodeToAlphabet(base2alphabet, 128);
            expect(x).to.eql('10000000')
        });

        /* Error cases */

        it('-4 (10) to base2', function () {
            var x = Utils.encodeToAlphabet(base2alphabet, -4);
            expect(x).to.be(null)
        });


        it('10 (10) to undefined alphabet', function () {
            var x = Utils.encodeToAlphabet(null, 10);
            expect(x).to.be(null)
        });

    });

});