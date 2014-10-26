/*-------JSHint Directives-------*/
/* global THREE                  */
/*-------------------------------*/
'use strict';


/********************************
 * ObsidianBuilding Constructor *
 ********************************/
function ObsidianBuilding(type, settings) {
  this.mesh = new THREE.Object3D();
  this.type = type;
  this.settings = settings;
  this.setDimensions();

  // Run algorithm
  switch (type) {
    case 'generic':
      this.genericBuilding();
      break;
    case 'cylinder':
      this.cylinderBuilding();
      break;
    case 'section':
      this.sectionBuilding();
      break;
  }
}


/******************************
 * ObsidianBuilding Resources *
 ******************************/
ObsidianBuilding.prototype.geometry = {
  base: new THREE.BoxGeometry(1, 1, 1),
  building: new THREE.BoxGeometry(1, 1, 1),
  cylinder: new THREE.CylinderGeometry(1, 1, 1, 32),
};


ObsidianBuilding.prototype.updateTranslation = function() {
  for (var k in this.geometry) {
    this.geometry[k].applyMatrix(
      new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  }
};


ObsidianBuilding.prototype.updateTranslation();
ObsidianBuilding.prototype.material = {
  black: new THREE.MeshBasicMaterial({ color: 0x060606 }),
  gray: new THREE.MeshBasicMaterial({ color: 0xCCCCCC }),
};


/****************************
 * ObsidianBuilding Methods *
 ****************************/
ObsidianBuilding.prototype.setDimensions = function() {
  var settings = this.settings;
  this.dimension = {};
  this.dimension.current = 0;
  this.dimension.width  = settings.width;
  this.dimension.length = settings.length;
  this.dimension.height = settings.height;
  this.dimension.radius = settings.radius;
};


ObsidianBuilding.prototype.move = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};


/*******************************
 * ObsidianBuilding Foundation *
 *******************************/
ObsidianBuilding.prototype.buildBase = function(material, height) {
  var dim = this.dimension;
  var geometry = this.geometry.base;
  var baseMesh = new THREE.Mesh(geometry, material);
  baseMesh.scale.set(dim.width, height, dim.length);
  baseMesh.position.set(0, dim.current, 0);
  dim.current += height;
  this.mesh.add(baseMesh);
};


ObsidianBuilding.prototype.buildStack = function(material, sectionHeight) {
  var dim = this.dimension;
  var geometry = this.geometry.building;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(dim.width, sectionHeight, dim.length);
  buildingMesh.position.set(0, dim.current, 0);
  dim.current += sectionHeight;
  this.mesh.add(buildingMesh);
};


ObsidianBuilding.prototype.buildRoof = function(material) {
  var blockHeight = 2;
  var dim = this.dimension;
  var geometry = this.geometry.base;
  var blockMesh = new THREE.Mesh(geometry, material);
  var posX = this.utils.randomInteger(-4, 4);
  var posZ = this.utils.randomInteger(-4, 4);
  blockMesh.scale.set(5, blockHeight, 5);
  blockMesh.position.set(posX, dim.current, posZ);
  dim.current += blockHeight;
  this.mesh.add(blockMesh);
};


ObsidianBuilding.prototype.buildCylinder = function(material, radius, height) {
  var dim = this.dimension;
  var geometry = this.geometry.cylinder;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(radius, height, radius);
  buildingMesh.position.set(0, dim.current, 0);
  dim.current += height;
  this.mesh.add(buildingMesh);
};


/**************************
 * ObsidianBuilding Types *
 **************************/
ObsidianBuilding.prototype.genericBuilding = function() {
  // Building properties
  var width = this.dimension.width;
  var height = this.dimension.height;
  var length = this.dimension.length;
  var stacks = this.settings.stack;
  var stackHeight = Math.round(height / stacks);
  var black = this.material.black;

  // Create building stacks
  this.buildBase(black, 1);
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase(black, 2);
    width  -= 1;
    length -= 1;

    // Add building stack
    var material = this.generateWindows(width, length, stackHeight);
    this.buildStack(material, stackHeight);
  }

  // Add roof and decorations
  this.buildBase(black, 2);
  this.buildRoof(black);
};


ObsidianBuilding.prototype.cylinderBuilding = function() {
  // Building Properties
  var dim = this.dimension;
  var baseSize = dim.radius * 2;
  var windowSize = baseSize * Math.PI;
  dim.width = baseSize;
  dim.length = baseSize;
  var material = this.generateCylinderWindows(windowSize, dim.height);
  var black = this.material.black;

  // Construct building
  this.buildBase(black, 1);
  this.buildCylinder(material, dim.radius, dim.height);
  this.buildCylinder(black, dim.radius, 2);
  this.buildRoof(black);
};


ObsidianBuilding.prototype.sectionBuilding = function() {
  // Building properties
  var dim = this.dimension;
  var black = this.material.black;
  var sideWidth = Math.floor(dim.width * 0.1);
  var mainWidth = Math.floor(dim.width * 0.7);

  // Add building base
  this.buildBase(black, 1);

  // Construct sections

};
