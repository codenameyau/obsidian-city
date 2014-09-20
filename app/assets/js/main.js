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

  // console.log(city);

  // [TODO] Hemisphere lighting
  city.addAmbientLight();
  city.addDirectionalLight(0x2F2F8F, 0, 0.5, 0.2);

  // Generic building
  var buildingA = new ObsidianBuilding('generic',
    {width: 20, length: 20, height: 55, stack: 3});
  city.scene.add(buildingA.mesh);

  // var buildingB = city.cylinderBuilding(10, 50);
  // buildingB.position.set(-20, 0, 0);
  // city.scene.add(buildingB);

  // Run update loop
  city.updateScene();
})();
