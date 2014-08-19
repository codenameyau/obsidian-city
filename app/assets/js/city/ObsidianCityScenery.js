/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*************************
 * ObsidianCity Lighting *
 *************************/
ObsidianCity.prototype.addAmbientLight = function(color) {
  color = color || 0X9c9c9c;
  this.scene.add(new THREE.AmbientLight(color));
};
