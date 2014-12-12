/*-------JSHint Directives--------*/
/* global ObsidianCity            */
/* global ObsidianBuilding        */
/* global THREE                   */
/*--------------------------------*/
'use strict';


/**************************
 * ObsidianCity Resources *
 **************************/
(function() {

  // Reusable geometries
  var geometry = {
    base:     new THREE.BoxGeometry(1, 1, 1),
    building: new THREE.BoxGeometry(1, 1, 1),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 20),
    hexagon:  new THREE.CylinderGeometry(1, 1, 1, 6),
  };

  // Reusable materials
  var material = {
    black: new THREE.MeshBasicMaterial({ color: 0x010101 }),
    gray:  new THREE.MeshBasicMaterial({ color: 0xCCCCCC }),
    text:  new THREE.MeshBasicMaterial({ color: 0xBFBEB5 }),
    road:  new THREE.MeshBasicMaterial({ color: 0x888888 }),
  };

  // Update geometry matrix
  for (var k in geometry) {
    geometry[k].applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  }

  // Define geometry without needing translation
  geometry.plane = new THREE.PlaneBufferGeometry(1, 1);

  // Bind reusable resources
  ObsidianCity.prototype.geometry = geometry;
  ObsidianCity.prototype.material = material;
  ObsidianBuilding.prototype.geometry = geometry;
  ObsidianBuilding.prototype.material = material;

})();
