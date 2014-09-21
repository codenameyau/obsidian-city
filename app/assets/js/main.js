/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/* global ObsidianBuilding       */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {
  var city = new ObsidianCity();
  city.enableFloorGrid(64, 4);
  // console.log(city);

  // Hemisphere lighting
  city.addAmbientLight(0x777777);
  // city.addDirectionalLight(0x2F2F8F, 0, 0.5, 0.2);
  city.addHemisphereLight(0x9999C9, 0x222222, 0.8);

  // Generic building
  var buildingA = new ObsidianBuilding('generic', 'square',
    {width: 20, length: 20, height: 55, stack: 3});
  buildingA.move(15, 0, 0);
  city.add(buildingA.mesh);

  // Office building
  var buildingB = new ObsidianBuilding('cylinder', 'square',
    {radius: 10, height: 55});
  buildingB.move(-15, 0, 0);
  city.add(buildingB.mesh);

  // Run update loop
  city.updateScene();
})();
