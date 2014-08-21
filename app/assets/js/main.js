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
  var buildingA = city.blockBuilding(20, 20, 50);
  buildingA.position.set(-15, 0, 0);
  city.scene.add(buildingA);

  // var buildingB = city.genericBuilding(20, 20, 50);
  // buildingB.position.set(15, 0, 0);
  // city.scene.add(buildingB);

  // Run update loop
  city.updateScene();

})();
