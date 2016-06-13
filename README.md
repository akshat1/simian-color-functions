# simian-color-functions
Color functions. I use them with PostCSS using the excellent postcss-functions plugin, but these can be used anywhere one needs to lighten or darken color values.

API:
```
const ColorFunctions = require('simian-color-functions');

ColorFunctions.lighten('black', '50%');               // -> 'grey'
ColorFunctions.lighten('#000000', '0.5');             // -> '#808080'
ColorFunctions.lighten('rgb(0, 0, 0)', '50%');        // -> 'rgba(128, 128, 128)'
ColorFunctions.lighten('rgba(0, 0, 0, 0.7)', '50%');  // -> 'rgba(128, 128, 128, 0.7)'

ColorFunctions.darken('white', '50%');                // -> 'grey'
ColorFunctions.darken('black', '50%');                // -> 'black'
```

To see detailed documentation, just run the default gulp task which will also generate the jsdoc.
