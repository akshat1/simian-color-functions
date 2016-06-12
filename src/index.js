'use strict';
/**
 * Color functions module.
 *
 * Color values as accepted by css-color-converter module.
 *
 * @module simian-color-functions
 * @see https://www.npmjs.com/package/css-color-converter
 */


const color = require('css-color-converter');

const Patterns = {
  Percentage : /.+%/,
  Number     : /\d+/
}


/**
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} - the lesser of the two values
 * @example
 * // Both return 3
 * lesser(5, 3);
 * lesser(3, 5);
 */
const lesser = (a, b) => a < b ? a : b;


/**
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} - the greater of the two values
 * @example
 * // Both return 5
 * lesser(5, 3);
 * lesser(3, 5);
 */
const greater = (a, b) => a > b ? a : b;


/**
 * Get a decimal value from a percentage or a number.
 * @param {String|Number} frac - the value to be converted to a decimal fraction
 * @return - a decimal value equivalent to the input
 * @example
 * resolveFraction('25%');   // 0.25
 * resolveFraction('0.25');  // 0.25
 */
function resolveFraction(frac) {
  frac = `${frac}`;
  if (Patterns.Percentage.test(frac)) {
    return parseFloat(frac) / 100;
  } else if (Patterns.Number.test(frac)) {
    return parseFloat(frac);
  } else
    throw new Error('Unknown fraction format: ', inp);
}


/**
 * Return a function which will lighten a (component) value by frac amount.
 */
function getLightenComponentFunc(frac) {
  return function(c, index) {
    // We don't lighten alpha
    if (index === 3)
      return c;

    let delta = 255 - c;
    let bump = delta * frac;
    return lesser(c + bump, 255);
  }
}


/**
 * Return a function which will darken a (component) value by frac amount.
 * @param {String} value - The color value to be darkened. May be hex, rgba or color name.
 * @param {String|Number} frac - The amount by which the color should be lightened. May be a number or a percentage.
 * @returns {Function}
 */
function getDarkenComponentFunc(frac) {
  return function(c, index) {
    // We don't darken alpha
    if (index === 3)
      return c;

    let delta = c - 0;
    let bump = delta * frac;
    return greater(c - bump, 0);
  }
}


/**
 * Lighten the color 'value' by 'frac'
 * @param {String} value - The color value to be lightened. May be hex, rgba or color name.
 * @param {String|Number} frac - The amount by which the color should be lightened. May be a number or a percentage.
 * @returns {String} - rgba string with the output color.
 *
 * @example
 * lighten('white', '50%');                // 'rgba(127, 127, 127)'
 * lighten(rgb(255, 255, 255), 0.5);       // 'rgba(127, 127, 127)'
 * lighten(rgb(255, 255, 255, 0.7), 0.5);  // 'rgba(127, 127, 127, 0.7)'
 * lighten(#FFFFFF, 50%);                  // 'rgba(127, 127, 127)'
 */
module.exports.lighten = function lighten(value, frac){
  frac = resolveFraction(frac);
  let rgba = color(value).toRgbaArray();
  rgba = rgba.map(getLightenComponentFunc(frac));
  return color(rgba).toRgbString();
}


/**
 * Darken the color 'value' by 'frac'
 * @param {String} value - The color value to be darkened. May be hex, rgba or color name.
 * @param {String|Number} frac - The amount by which the color should be darkened. May be a number or a percentage.
 * @returns {String} - rgba string with the output color.
 *
 * @example
 * lighten('black', '50%');          // 'rgba(127, 127, 127)'
 * lighten(rgb(0, 0, 0), 0.5);       // 'rgba(127, 127, 127)'
 * lighten(rgb(0, 0, 0, 0.7), 0.5);  // 'rgba(127, 127, 127, 0.7)'
 * lighten(#000, 50%);               // 'rgba(127, 127, 127)'
 */
module.exports.darken = function darken(value, frac){
  frac = resolveFraction(frac);
  let rgba = color(value).toRgbaArray();
  rgba = rgba.map(getDarkenComponentFunc(frac));
  return color(rgba).toRgbString();
}


/**
 * Set new opacity regardless of what the original opacity was.
 * @param {String} value - The color value to be modified.
 * @param {String|Number} - The opacity value desired
 * @returns {String} - rgba string
 */
module.exports.opacity = function opacity(value, frac) {
  frac = resolveFraction(frac);
  let rgba = color(value).toRgbaArray();
  rgba[3] = frac;
  return color(rgba).toRgbString();
}
