/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/*-------------------------------*/
'use strict';


/**********************
 * ObsidianCity Utils *
 **********************/
ObsidianCity.prototype.utils = {

  // Returns value if property is not defined
  checkProperty : function(object, property, value) {
    if (object && typeof object[property] !== 'undefined') { value = object[property]; }
    return value;
  },

  // Converts degrees to radians
  degToRad : function(degrees) {
    return Math.PI/180 * degrees;
  },

  // Converts radians to degrees
  radToDeg : function(degrees) {
    return 180/Math.PI * degrees;
  },

};
