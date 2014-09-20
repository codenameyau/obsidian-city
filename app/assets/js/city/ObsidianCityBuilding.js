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

ObsidianBuilding.prototype.geometry = {
  base: new THREE.BoxGeometry(1, 1, 1),
  building: new THREE.BoxGeometry(1, 1, 1),
};

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


/**************************
 * ObsidianBuilding Types *
 **************************/
ObsidianBuilding.prototype.genericBuilding = function(settings) {
  this.setDimensions(settings);
  var width  = settings.width;
  var length = settings.length;
  var height = settings.height;
  var stacks = settings.stack;
  var stackHeight = Math.round(height / stacks);
  var windowMaterial;

  // Create building stacks
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase();
    this.dimension.width  -= 1;
    this.dimension.length -= 1;

    // Add building stack
    // windowMaterial = this.mapTextureFace(this.squareWindow(width, height));
    // this.buildSection(buildingObject, windowMaterial, currentHeight, width, length, height);
    // currentHeight += height;
    // width  -= 1;
    // length -= 1;
  }

  // // Add roof and decorations
  // this.buildBase(width, length, baseHeight);
  // currentHeight += 1;
  // this.buildRoof(buildingObject, currentHeight, true);
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


ObsidianCity.prototype.buildSection = function(building, material, currentHeight, width, length, height) {
  var geometry = this.geometry.building;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(width, height, length);
  buildingMesh.position.set(0, currentHeight, 0);
  building.add(buildingMesh);
};


ObsidianCity.prototype.buildRoof = function(building, currentHeight, block) {
  block = block || true;
  var geometry = this.geometry.base;
  var material = this.material.basic.black;
  var blockMesh = new THREE.Mesh(geometry, material);
  var posX = this.utils.randomInteger(-4, 4);
  var posZ = this.utils.randomInteger(-4, 4);
  blockMesh.scale.set(5, 2, 5);
  blockMesh.position.set(posX, currentHeight, posZ);
  building.add(blockMesh);
};


ObsidianCity.prototype.buildCylinder = function(building, material, currentHeight, radius, height) {
  var geometry = this.geometry.cylinder;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(radius, height, radius);
  buildingMesh.position.set(0, currentHeight, 0);
  building.add(buildingMesh);
};


/*******************************
 * ObsidianCity Building Types *
 *******************************/
ObsidianCity.prototype.genericBuilding = function(width, length, totalHeight, stacks) {
  // Define building properties
  var buildingObject = new THREE.Object3D();
  var height = Math.round(totalHeight / stacks);
  var baseHeight = 1;
  var currentHeight = 0;
  var windowMaterial;

  // Create building stacks
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase(buildingObject, currentHeight, width, length, baseHeight);
    currentHeight += baseHeight;
    width  -= 1;
    length -= 1;

    // Add building stack
    windowMaterial = this.mapTextureFace(this.squareWindow(width, height));
    this.buildSection(buildingObject, windowMaterial, currentHeight, width, length, height);
    currentHeight += height;
    width  -= 1;
    length -= 1;
  }

  // Add roof and decorations
  this.buildBase(buildingObject, currentHeight, width, length, baseHeight);
  currentHeight += 1;
  this.buildRoof(buildingObject, currentHeight, true);
  return buildingObject;
};


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
