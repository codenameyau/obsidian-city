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
  city.enableFloorGrid(80, 4);
  // console.log(city);

  // Hemisphere lighting
  city.addAmbientLight(0x777777);
  // city.addDirectionalLight(0x2F2F8F, 0, 0.5, 0.2);
  city.addHemisphereLight(0x9999C9, 0x222222, 0.8);

  var build = ObsidianBuilding.prototype;

  // Generic building
  var buildingA = new ObsidianBuilding(build.genericBuilding,
    {width: 20, length: 20, height: 50, stack: 2});
  buildingA.move(-30, 0, -35);
  city.add(buildingA.mesh);

  // Office building
  var buildingB = new ObsidianBuilding(build.cylinderBuilding,
    {radius: 10, height: 50});
  buildingB.move(0, 0, -35);
  city.add(buildingB.mesh);

  // Cross building
  var buildingC = new ObsidianBuilding(build.crossBuilding,
    {width: 20, length: 20, height: 50});
  buildingC.move(30, 0, -35);
  city.add(buildingC.mesh);

  // Stacked building
  var buildingD = new ObsidianBuilding(build.stackedBuilding,
    {width: 16, length: 16, height: 50, stack: 3});
  buildingD.move(-30, 0, 0);
  city.add(buildingD.mesh);

  // Alternating building
  var buildingE = new ObsidianBuilding(build.alternatingBuilding,
    {width: 20, length: 12, height: 50, text: 'YAU INC'});
  buildingE.move(0, 0, 0);
  city.add(buildingE.mesh);

  // Name building
  var buildingF = new ObsidianBuilding(build.hexagonBuilding,
    {radius: 10, height: 50});
  buildingF.move(30, 0, 0);
  city.add(buildingF.mesh);

  // H-shaped building
  var buildingG = new ObsidianBuilding(build.hShapedBuilding,
    {width: 45, length: 30, height: 25});
  buildingG.move(0, 0, 35);
  city.add(buildingG.mesh);

  // Run update loop
  city.updateScene();
})();
