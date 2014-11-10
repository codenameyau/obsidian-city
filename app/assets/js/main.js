/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/* global ObsidianBuilding       */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {

  /***************
   * Define City *
   ***************/
  var city = new ObsidianCity();
  city.enableFloorGrid(256, 16, 0x999999);

  // Hemisphere lighting
  city.addAmbientLight(0x777777);
  city.addDirectionalLight(0x2F2AAF, 0.2, 0.5, 0.2);
  city.addHemisphereLight(0x9999C9, 0x222222, 0.7);

  // Create road grid
  // city.layoutVerticalRoad();
  // city.layoutHorizontalRoad();

  //  Construct buildings
  var build = ObsidianBuilding.prototype;
  var cs = city.settings.city;
  var top = -cs.length;
  var bottom = cs.length;
  var left = -cs.width;
  var right = cs.width;
  var roadWidth = cs.roadWidth;
  var blockWidth = cs.blockWidth;
  var blockLength = cs.blockLength;

  /********************
   * Helper Functions *
   ********************/
  var selectBuilding = function(buildingType, settings) {
    var building;
    switch (buildingType) {
      case 0:
        building = new ObsidianBuilding(build.genericBuilding, settings);
        break;

      case 1:
        building = new ObsidianBuilding(build.crossBuilding, settings);
        break;

      case 2:
        building = new ObsidianBuilding(build.stackedBuilding, settings);
        break;

      case 3:
        building = new ObsidianBuilding(build.cylinderBuilding, settings);
        break;

      case 4:
        building = new ObsidianBuilding(build.hShapedBuilding, settings);
        break;

    }
    return building;
  };

  var constructBuildings = function(l, w) {
    // [TODO] Better height-position modifier
    var hMod = Math.floor(0.02 * (Math.abs(l) + Math.abs(w)));
    var wSize = 4 * city.utils.randomInteger(4, 8);
    var lSize = 4 * city.utils.randomInteger(4, 8);
    var hSize = 4 * (city.utils.randomInteger(8, 14) - hMod);
    var stacks = city.utils.randomInteger(0, 3);
    var radius = city.utils.randomInteger(8, 12);
    var settings = {
          width: wSize,
          length: lSize,
          height: hSize,
          stack: stacks,
          radius: radius,
          // text: 'Hello'
        };

    // Select random building type
    var buildingType = city.utils.randomInteger(0, 5);
    var building = selectBuilding(buildingType, settings);
    // building.mesh.rotation.y += city.utils.randomInteger(-6, 6);
    building.move(l, 0, w);
    city.add(building.mesh);
  };


  /*****************
   * Generate City *
   *****************/
  for (var l=top; l<bottom; l += blockLength) {
    for (var w=left; w<right; w += blockWidth) {
      constructBuildings(l, w);
      w += roadWidth;
    }
    l += roadWidth;
  }


  // Run update loop
  city.updateScene();

})();
