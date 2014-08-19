/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*************************
 * ObsidianCity Lighting *
 *************************/
ObsidianCity.prototype.addAmbientLight = function(color) {
  color = color || 0x9C9C9C;
  var light = new THREE.AmbientLight(color);
  this.scene.add(light);
};


ObsidianCity.prototype.addDirectionalLight = function(color, x, y, z) {
  color = color || 0x9C9C9C;
  var light = new THREE.DirectionalLight(color);
  light.position.set(x, y, z);
  this.scene.add(light);
};
