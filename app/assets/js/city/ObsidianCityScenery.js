/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*************************
 * ObsidianCity Lighting *
 *************************/
ObsidianCity.prototype.addAmbientLight = function(color) {
  var light = new THREE.AmbientLight(color);
  this.add(light);
};

ObsidianCity.prototype.addDirectionalLight = function(color, x, y, z) {
  var light = new THREE.DirectionalLight(color);
  light.position.set(x, y, z);
  this.add(light);
};

ObsidianCity.prototype.addHemisphereLight = function(skyColor, groundColor, intensity) {
  var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  this.add(light);
};
