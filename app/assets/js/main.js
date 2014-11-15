/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/* global ObsidianBuilding       */
/*-------------------------------*/
'use strict';


(function() {

  /*****************
   * City Settings *
   *****************/
  var settings = {
    width: 150,
    length: 150,
    blockWidth: 24,
    blockLength: 24,
    roadWidth: 5,
  };

  /******************
   * Building Names *
   ******************/
  var prefix = [
    'i',
    'Green',
    'Mega',
    'Super',
    'Omni',
    'e',
    'Hyper',
    'Global',
    'Vital',
    'Next',
    'Pacific',
    'Metro',
    'Unity',
    'G-',
    'Trans',
    'Infinity',
    'Superior',
    'Monolith',
    'Best',
    'Atlantic',
    'First',
    'Union',
    'National',
    'Vision',
  ];

  var business = [
    'Biotic',
    'Info',
    'Data',
    'Solar',
    'Aerospace',
    'Motors',
    'Nano',
    'Online',
    'Circuits',
    'Energy',
    'Med',
    'Robotics',
    'Exports',
    'Security',
    'Systems',
    'Financial',
    'Industrial',
    'Media',
    'Materials',
    'Foods',
    'Networks',
    'Shipping',
    'Tools',
    'Medical',
    'Publishing',
    'Enterprises',
    'Audio',
    'Health',
    'Bank',
    'Imports',
    'Apparel',
    'Petroleum',
    'Studios',
    'Labs',
    'Unlimited',
    'Tech',
  ];

  /***************
   * Define City *
   ***************/
  var city = new ObsidianCity(settings);
  city.enableFloorGrid(256, 16, 0x999999);
  city.enableSkybox('#000000', '#14131A');
  city.enableBaseFloor();

  // Hemisphere lighting
  city.addAmbientLight(0x777777);
  city.addDirectionalLight(0x2F2AAF, 0.2, 0.5, 0.2);
  city.addHemisphereLight(0x9999C9, 0x222222, 0.7);

  //  City parameters
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
        building = new ObsidianBuilding(build.hShapedBuilding, settings);
        break;

      case 4: // Unused
        building = new ObsidianBuilding(build.cylinderBuilding, settings);
        break;
    }
    return building;
  };

  var generateBusinessName = function(height) {
    var businessName = '';
    if (height > 50 && city.utils.randomInteger(0, 2)) {
      var pValue = city.utils.randomInteger(0, prefix.length);
      var bValue = city.utils.randomInteger(0, business.length);
      businessName = prefix[pValue] + business[bValue];
    }
    return businessName;
  };

  var computerHeight = function(x, z) {
    var hMod = Math.floor(0.03 * Math.max(Math.abs(x), Math.abs(z)));
    var hSize = 4 * (city.utils.randomInteger(8, 22 - hMod) - hMod);
    hSize = (hSize < 25) ? 25 : hSize;
    return hSize;
  };

  var constructBuildings = function(x, z) {
    var wSize = 4 * city.utils.randomInteger(4, 8);
    var lSize = 4 * city.utils.randomInteger(4, 8);
    var hSize = computerHeight(x, z);
    var stacks = city.utils.randomInteger(0, 3);
    var radius = city.utils.randomInteger(8, 12);
    var settings = {
        width: wSize,
        length: lSize,
        height: hSize,
        stack: stacks,
        radius: radius,
        text: generateBusinessName(hSize),
      };

    // Select random building type
    var buildingType = city.utils.randomInteger(0, 4);
    var building = selectBuilding(buildingType, settings);
    var rotationAngle = city.utils.randomInteger(0, 4) * 90;
    building.rotate(rotationAngle);
    building.move(x, 0, z);
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
