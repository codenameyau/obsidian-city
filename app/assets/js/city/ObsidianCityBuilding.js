/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/************************
 * ObsidianCity Windows *
 ************************/
ObsidianCity.prototype.windowTexture = function() {

};

ObsidianCity.prototype.generateBuilding = function(type, width, length) {
  var height = this.utils.randomInteger(30, 80);
  // var geometry = this.geometry.box;
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.y = height;
  this.scene.add(mesh);
  // building types: blocky, cube, cylinder, classic
  // building color hue
};
