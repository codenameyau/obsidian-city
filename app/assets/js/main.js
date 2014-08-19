/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {
  var city = new ObsidianCity();
  city.enableFloorGrid(32, 4);
  console.log(city);

  // [TODO] Add lighting
  city.addAmbientLight();

  // Generate building
  city.generateBuilding('block', 2, 2);

  // Run update loop
  city.updateScene();

})();
