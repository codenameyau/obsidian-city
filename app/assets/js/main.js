/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/* global ObsidianBuilding       */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {

  // Create city road layout
  var city = new ObsidianCity();
  city.enableFloorGrid(300, 16, 0x999999);

  // Hemisphere lighting
  city.addAmbientLight(0x777777);
  city.addDirectionalLight(0x2F2AAF, 0.2, 0.5, 0.2);
  city.addHemisphereLight(0x9999C9, 0x222222, 0.7);

  // Create road grid
  // city.layoutVerticalRoad();
  // city.layoutHorizontalRoad();

  //  Construct buildings
  var build = ObsidianBuilding.prototype;

  // Building fps test
  for (var i=0; i<150; i++) {
    var posX = city.utils.randomInteger(-250, 250);
    var posZ = city.utils.randomInteger(-250, 250);
    var wSize = 4 * city.utils.randomInteger(2, 8);
    var lSize = 4 * city.utils.randomInteger(2, 8);
    var hSize = 4 * city.utils.randomInteger(4, 20);
    var stacks = city.utils.randomInteger(1, 4);
    var radius = city.utils.randomInteger(6, 12);
    var buildingType = city.utils.randomInteger(0, 5);
    var building;
    var settings = {
      width: wSize,
      length: lSize,
      height: hSize,
      stack: stacks,
      radius: radius
    };

    switch (buildingType) {
      case 0: // Generic
        building = new ObsidianBuilding(build.genericBuilding, settings);
        break;

      case 1: // Cylinder
        building = new ObsidianBuilding(build.cylinderBuilding, settings);
        break;

      case 2: // Hexagon
        building = new ObsidianBuilding(build.hexagonBuilding, settings);
        break;

      case 3: // Cross
        building = new ObsidianBuilding(build.crossBuilding, settings);
        break;

      case 4: // Stacked
        building = new ObsidianBuilding(build.stackedBuilding, settings);
        break;
    }

    building.move(posX, 0, posZ);
    city.add(building.mesh);
  }

  // Run update loop
  city.updateScene();

})();
