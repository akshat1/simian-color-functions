'use strict';
/**
 * Color functions module.
 *
 * Color values as accepted by the excellent tinycolor library.
 *
 * @module simian-color-functions
 * @see https://github.com/bgrins/TinyColor
 */


const Color = require('tinycolor2');

const Patterns = {
  Percentage : /.+%/,
  Number     : /\d+/
}


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


function validateRangeInclusive(frac, lb, ub) {
  if (frac < lb || frac > ub) {
    throw new Error(`Delta ${frac} must be between ${lb} and ${ub} `);
  }
}


/**
 * Lighten the color by 'frac'
 * @param {String} color - The color value to be lightened. May be hex, rgba or color name.
 * @param {String|Number} frac - The amount by which the color should be lightened. May be a number or a percentage.
 * @returns {String} - string with the output color, in the same format as input.
 *
 * <p>
 * Converts the input color to hsl, and increases the lightness by frac.
 # @see http://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method
 * </p>
 *
 * @example
 * lighten('black', '50%');           // 'grey'
 * lighten('rgb(0, 0, 0)', 0.5);      // 'rgba(128, 128, 128)'
 * lighten('black', 0.3);             // '#4d4d4d'
 * lighten('rgb(0, 0, 0, 0.7)', 0.5); // 'rgba(128, 128, 128, 0.7)'
 * lighten('#000000', '50%');         // '#808080'
 */
module.exports.lighten = function lighten(color, frac){
  frac = resolveFraction(frac);
  validateRangeInclusive(frac, 0, 1);
  color = Color(color);
  let hsl = color.toHsl();
  hsl.l = Math.min(1, hsl.l + frac);
  return Color(hsl).toString(color.getFormat());
}


/**
 * Darken the color by 'frac'
 * @param {String} color - The color value to be darkened. May be hex, rgba or color name.
 * @param {String|Number} frac - The amount by which the color should be darkened. May be a number or a percentage.
 * @returns {String} - rgba string with the output color.
 *
 * <p>
 * Converts the input color to hsl, and decreases the lightness by frac.
 # @see http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method
 * </p>
 *
 * @example
 * lighten('black', '50%');            // 'grey'
 * lighten('rgb(0, 0, 0)', 0.5);       // 'rgba(128, 128, 128)'
 * lighten('rgb(0, 0, 0, 0.7)', 0.5);  // 'rgba(128, 128, 128, 0.7)'
 * lighten('#000', '50%');             // '#808080'
 */
module.exports.darken = function darken(color, frac){
  frac = resolveFraction(frac);
  validateRangeInclusive(frac, 0, 1);
  color = Color(color);
  let hsl = color.toHsl();
  hsl.l = Math.max(0, hsl.l - frac).toPrecision(3);
  return Color(hsl).toString(color.getFormat());
}

/**
 * Set new opacity regardless of what the original opacity was.
 * @param {String} color - The color value to be modified.
 * @param {String|Number} - The opacity value desired
 * @returns {String} - rgba string
 */
module.exports.opacity = function opacity(color, frac){
  frac = resolveFraction(frac);
  validateRangeInclusive(frac, 0, 1);
  return Color(color).setAlpha(frac).toString();
}
