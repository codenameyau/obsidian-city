/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/*-------------------------------*/
'use strict';


/**********************
 * ObsidianCity Utils *
 **********************/
ObsidianCity.prototype.utils = {

  // Adds element to DOM
  addToDOM: function(parent, element) {
    var container = document.getElementById(parent);
    container.appendChild(element);
  },

  // Returns value if property is not defined
  checkProperty: function(object, property, value) {
    if (object && typeof object[property] !== 'undefined') { value = object[property]; }
    return value;
  },

  // Converts degrees to radians
  degToRad: function(degrees) {
    return Math.PI/180 * degrees;
  },

  // Converts radians to degrees
  radToDeg: function(degrees) {
    return 180/Math.PI * degrees;
  },

  // Returns random integer in range
  randomInteger: function(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
  },

  // Returns random grayscale color in range
  randomGrayscale: function(min, max) {
    min = min || 0;
    max = max || 255;
    return this.getGrayscale(this.randomInteger(min, max));
  },

  // Returns grayscale of integer
  getGrayscale: function(value) {
    return 'rgb(' + [value, value, value].join(',') + ')';
  },

};
