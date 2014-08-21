/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {
  var city = new ObsidianCity();
  city.enableFloorGrid(64, 4);
  console.log(city);

  // [TODO] Hemisphere lighting
  city.addAmbientLight();
  city.addDirectionalLight(0x2F2F8F, 0, 0.5, 0.2);

  // Generate building
  var mesh = city.blockBuilding(20, 20);
  city.scene.add(mesh);

  // Run update loop
  city.updateScene();

})();
