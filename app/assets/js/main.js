/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {
  var city = new ObsidianCity();
  console.log(city);

  city.enableFloorGrid(32, 4);
  city.updateScene();

})();
