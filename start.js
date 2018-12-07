const fs = require('fs-extra');

fs.copySync('./node_modules/@webcomponents/webcomponentsjs', './public/lib/webcomponentsjs');
fs.copySync('./node_modules/@webcomponents/shadycss', './public/lib/webcomponentsjs');
