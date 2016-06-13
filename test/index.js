'use strict';

const Chai   = require('chai');
const should = Chai.should();
const expect = Chai.expect;

const SCF = require('./../lib/index.js');

describe('color', function () {
  describe('lighten', function () {
    it('tests that monochromatic colors are lightened correctly', function () {
      var src1 = '#000000';
      SCF.lighten(src1, '0%').should.equal(src1);
      SCF.lighten(src1, '10%').should.equal('#1a1a1a');
      SCF.lighten(src1, '33.33%').should.equal('#555555');
      SCF.lighten(src1, '90%').should.equal('#e6e6e6');
      SCF.lighten(src1, '100%').should.equal('#ffffff');
      SCF.lighten('#FFF', '10%').should.equal('#ffffff');
      SCF.lighten('#F9F9F9', '10%').should.equal('#ffffff');
    });


    it('tests that non-monochromatic colors are lightened correctly', function () {
      var src2 = '#f8af1e';
      SCF.lighten(src2, '0%').should.equal(src2);
      SCF.lighten(src2, '10%').should.equal('#fac14f');
      SCF.lighten(src2, '33.33%').should.equal('#fdeac3');
      SCF.lighten(src2, '90%').should.equal('#ffffff');
      SCF.lighten(src2, '100%').should.equal('#ffffff');
    });


    it('tests that lighten respects incoming color format', function() {
      SCF.lighten('rgb(0, 0, 0)', 0.5).should.equal('rgb(128, 128, 128)');
      SCF.lighten('rgba(0, 0, 0, 0.7)', 0.5).should.equal('rgba(128, 128, 128, 0.7)');
      SCF.lighten('black', 0.5).should.equal('grey');
      SCF.lighten('black', 0.3).should.equal('#4d4d4d');
    })
  });


  describe('darken', function () {
    it('tests that monochromatic colors are darkened correctly', function () {
      var src1 = '#ffffff';
      SCF.darken(src1, '0%').should.equal(src1);
      SCF.darken(src1, '10%').should.equal('#e6e6e6');
      SCF.darken(src1, '33.33%').should.equal('#aaaaaa');
      SCF.darken(src1, '90%').should.equal('#1a1a1a');
      SCF.darken(src1, '100%').should.equal('#000000');
      SCF.darken('#000', '10%').should.equal('#000000');
    });


    it('tests that non-monochromatic colors are darkened correctly', function () {
      var src2 = '#f8af1e';
      SCF.darken(src2, '0%').should.equal(src2);
      SCF.darken(src2, '10%').should.equal('#dc9507');
      SCF.darken(src2, '33.33%').should.equal('#694703');
      SCF.darken(src2, '90%').should.equal('#000000');
      SCF.darken(src2, '100%').should.equal('#000000');
    });


    it('tests that darken respects incoming color format', function () {
      SCF.darken('rgb(255, 255, 255)', 0.5).should.equal('rgb(128, 128, 128)');
      SCF.darken('rgba(255, 255, 255, 0.7)', 0.5).should.equal('rgba(128, 128, 128, 0.7)');
      SCF.darken('white', 0.5).should.equal('grey');
      SCF.darken('white', 0.3).should.equal('#b3b3b3');
    });
  });


  it('tests opacity', function () {
    SCF.opacity('red', '50%').should.equal('rgba(255, 0, 0, 0.5)');
    SCF.opacity('#FFF', '50%').should.equal('rgba(255, 255, 255, 0.5)');
    SCF.opacity('rgba(127, 127, 127, 0.7)', '50%').should.equal('rgba(127, 127, 127, 0.5)');
    SCF.opacity('rgba(127, 127, 127, 0.7)', '0.5').should.equal('rgba(127, 127, 127, 0.5)');
    SCF.opacity('rgba(127, 127, 127, 0.7)', 0.5).should.equal('rgba(127, 127, 127, 0.5)');
  });
})