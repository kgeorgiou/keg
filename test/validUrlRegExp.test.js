var expect = require('expect.js'),
    Utils = require('../utils/Utils.js');

describe('Utils', function () {

    describe('#isValidURL()', function () {

        it('Should accept scheme-less URLs', function () {
            var x = Utils.isValidUrl('google.com');
            expect(x).to.be(true)
        });

        it('Should accept scheme-less URLs starting with www.', function () {
            var x = Utils.isValidUrl('www.google.com');
            expect(x).to.be(true)
        });

        it('Should accept URLs with http scheme', function () {
            var x = Utils.isValidUrl('http://google.com');
            expect(x).to.be(true)
        });

        it('Should accept URLs with https scheme', function () {
            var x = Utils.isValidUrl('https://google.com');
            expect(x).to.be(true)
        });

        it('Should accept URLs with data scheme', function () {
            var x = Utils.isValidUrl('data://test.com');
            expect(x).to.be(true)
        });

        it('Should accept URLs with mailto scheme', function () {
            var x = Utils.isValidUrl('mailto://test@test.com');
            expect(x).to.be(true)
        });

        it('Should accept URLs with data scheme', function () {
            var x = Utils.isValidUrl('ftp://test.gg');
            expect(x).to.be(true)
        });

        it('Should reject URLs without known schemes', function () {
            var x = Utils.isValidUrl('foo://test.gg');
            expect(x).to.be(false)
        });

        it('Should reject URLs without known schemes', function () {
            var x = Utils.isValidUrl('xyz://test.gg');
            expect(x).to.be(false)
        });

        it('Should reject URLs without TLD', function () {
            var x = Utils.isValidUrl('test');
            expect(x).to.be(false)
        });

        it('Should accept URLs pointing to local host', function () {
            var x = Utils.isValidUrl('localhost');
            expect(x).to.be(true)
        });

        it('Should reject URLs pointing to local host', function () {
            var x = Utils.isValidUrl('localhost:3000');
            expect(x).to.be(true)
        });

        it('Should reject URLs pointing to local host', function () {
            var x = Utils.isValidUrl('127.0.0.1');
            expect(x).to.be(true)
        });

    });

});