/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*******************************
 * ObsidianCity Window Texture *
 *******************************/
ObsidianCity.prototype.windowTexture = function() {

};


/**********************************
 * ObsidianCity Building Resource *
 **********************************/
ObsidianCity.prototype.defineBuildingGeometry = function() {
  this.geometry = {};

  // Basic box geometry
  this.geometry.box = new THREE.BoxGeometry(1, 1, 1);
  this.geometry.box.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
};


ObsidianCity.prototype.defineBuildingMaterial = function() {
  this.material = {};

  // Basic lambert material
  this.material.basicLambert = new THREE.MeshLambertMaterial({color: 0xCCCCCC});
};


/******************************
 * ObsidianCity Building Mesh *
 ******************************/
ObsidianCity.prototype.generateBuilding = function(type, width, length) {
  var height = this.utils.randomInteger(30, 50);
  var geometry = this.geometry.box;
  var material = this.material.basicLambert;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.x = width;
  mesh.scale.y = height;
  mesh.scale.z = length;
  this.scene.add(mesh);
};

