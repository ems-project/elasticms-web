// app.js

const $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('bootstrap');

// or you can include specific pieces
// require('bootstrap/js/dist/tooltip');
// require('bootstrap/js/dist/popover');

import {} from 'emsch';

$(document).ready(function() {
    console.log('Hello world, welcome to elasticms website skeleton');
});