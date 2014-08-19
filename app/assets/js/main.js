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

  // [TODO] Add lighting
  city.addAmbientLight();
  city.addDirectionalLight(0x2F2F8F, 0, 0.5, 0.2);

  // Generate building
  var mesh = city.generateBuilding('block', 16, 16);
  city.scene.add(mesh);

  // Run update loop
  city.updateScene();

})();
