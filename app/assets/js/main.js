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
  var buildingA = new ObsidianBuilding('generic',
    {width: 20, length: 20, height: 50, stack: 2});
  buildingA.move(-30, 0, -35);
  city.add(buildingA.mesh);

  // Office building
  var buildingB = new ObsidianBuilding('cylinder',
    {radius: 10, height: 50});
  buildingB.move(0, 0, -35);
  city.add(buildingB.mesh);

  // Section building
  var buildingC = new ObsidianBuilding('section',
    {width: 20, length: 20, height: 50});
  buildingC.move(30, 0, -35);
  city.add(buildingC.mesh);

  // Stacked building
  var buildingD = new ObsidianBuilding('stacked',
    {width: 16, length: 16, height: 50, stack: 3});
  buildingD.move(-30, 0, 0);
  city.add(buildingD.mesh);

  // U-shaped building
  var buildingE = new ObsidianBuilding('u-shaped',
    {width: 45, length: 25, height: 20});
  buildingE.move(0, 0, 30);
  city.add(buildingE.mesh);

  // Run update loop
  city.updateScene();
})();
