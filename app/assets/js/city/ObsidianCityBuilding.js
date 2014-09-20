/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/********************************
 * ObsidianBuilding Constructor *
 ********************************/
function ObsidianBuilding(type, settings) {
  this.type = type;
  this.mesh = new THREE.Object3D();
  this.dimension = {};

  // Run algorithm
  switch (type) {
    case 'generic':
      this.genericBuilding(settings);
      break;
  }
}


/******************************
 * ObsidianBuilding Resources *
 ******************************/
ObsidianBuilding.prototype.geometry = {
  base: new THREE.BoxGeometry(1, 1, 1),
  building: new THREE.BoxGeometry(1, 1, 1),
};


ObsidianBuilding.prototype.updateTranslation = function() {
  for (var k in this.geometry) {
    this.geometry[k].applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  }
};


ObsidianBuilding.prototype.updateTranslation();
ObsidianBuilding.prototype.material = {
  black: new THREE.MeshBasicMaterial({ color: 0x020202 }),
  gray: new THREE.MeshBasicMaterial({ color: 0xCCCCCC }),
};


/****************************
 * ObsidianBuilding Methods *
 ****************************/
ObsidianBuilding.prototype.setDimensions = function(settings) {
  this.dimension.base = settings.base || 1;
  this.dimension.current = 0;
  this.dimension.width  = settings.width;
  this.dimension.length = settings.length;
  this.dimension.height = settings.height;
  this.dimension.radius = settings.radius;
};


/*******************************
 * ObsidianBuilding Foundation *
 *******************************/
ObsidianBuilding.prototype.buildBase = function() {
  var dim = this.dimension;
  var material = this.material.black;
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


ObsidianBuilding.prototype.buildRoof = function() {
  var blockHeight = 2;
  var dim = this.dimension;
  var geometry = this.geometry.base;
  var material = this.material.black;
  var blockMesh = new THREE.Mesh(geometry, material);
  var posX = this.utils.randomInteger(-4, 4);
  var posZ = this.utils.randomInteger(-4, 4);
  blockMesh.scale.set(5, blockHeight, 5);
  blockMesh.position.set(posX, dim.current, posZ);
  dim.current += blockHeight;
  this.mesh.add(blockMesh);
};


ObsidianCity.prototype.buildCylinder = function(building, material, currentHeight, radius, height) {
  var geometry = this.geometry.cylinder;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(radius, height, radius);
  buildingMesh.position.set(0, currentHeight, 0);
  building.add(buildingMesh);
};


/**************************
 * ObsidianBuilding Types *
 **************************/
ObsidianBuilding.prototype.genericBuilding = function(settings) {
  this.setDimensions(settings);
  var dim = this.dimension;
  var stacks = settings.stack;
  var stackHeight = Math.round(dim.height / stacks);

  // Create building stacks
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase();
    dim.width  -= 1;
    dim.length -= 1;

    // Add building stack
    var windowMaterial = this.mapTextureFace(this.squareWindow(dim.width, stackHeight));
    this.buildSection(windowMaterial, stackHeight);
  }

  // Add roof and decorations
  this.buildBase();
  this.buildRoof();
};


/*******************************
 * ObsidianCity Building Types *
 *******************************/
ObsidianCity.prototype.cylinderBuilding = function(radius, height) {
  // Define properties
  var buildingObject = new THREE.Object3D();
  var currentHeight = 0;
  var baseHeight = 1;
  var baseSize = radius * 2;
  var windowMaterial = this.mapTextureFace(this.squareWindow(baseSize, height));

  // Construct building
  this.buildBase(buildingObject, currentHeight, baseSize, baseSize, baseHeight);
  currentHeight += baseHeight;
  this.buildCylinder(buildingObject, windowMaterial, currentHeight, radius, height);
  currentHeight += height;
  return buildingObject;
};
