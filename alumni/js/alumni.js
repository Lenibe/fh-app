/* global window */

function navigate(target) {
    'use strict';
    
    onInApp = window.open(target, '_blank', 'location=no,hidden=yes,closebuttoncaption=Done,toolbar=no');
}
