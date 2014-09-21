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
  this.dimension.base = settings.base || 1;
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
ObsidianBuilding.prototype.buildBase = function(material) {
  var dim = this.dimension;
  var geometry = this.geometry.base;
  var baseMesh = new THREE.Mesh(geometry, material);
  baseMesh.scale.set(dim.width, dim.base, dim.length);
  baseMesh.position.set(0, dim.current, 0);
  dim.current += dim.base;
  this.mesh.add(baseMesh);
};


ObsidianBuilding.prototype.buildSection = function(material, sectionHeight) {
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
  // Define properties
  var dim = this.dimension;
  var stacks = this.settings.stack;
  var stackHeight = Math.round(dim.height / stacks);
  var black = this.material.black;

  // Create building stacks
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase(black);
    dim.width  -= 1;
    dim.length -= 1;

    // Add building stack
    var windowMaterial = this.generateWindows(dim.width, stackHeight);
    this.buildSection(windowMaterial, stackHeight);
  }

  // Add roof and decorations
  this.buildBase(black);
  this.buildRoof(black);
};


ObsidianBuilding.prototype.cylinderBuilding = function() {
  // Define properties
  var dim = this.dimension;
  var baseSize = dim.radius * 2;
  var windowSize = baseSize * Math.PI;
  dim.width = baseSize;
  dim.length = baseSize;
  var material = this.generateWindows(windowSize, dim.height);
  var black = this.material.black;

  // Construct building
  this.buildBase(black);
  this.buildCylinder(material, dim.radius, dim.height);
  this.buildCylinder(black, dim.radius, 1);
};
