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
    case 'stacked':
      this.stackedBuilding();
      break;
    case 'h-shaped':
      this.hShapedBuilding();
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
ObsidianBuilding.prototype.updateHeight = function(value) {
  this.dimension.current += value;
}


ObsidianBuilding.prototype.buildBase = function(material, height) {
  var dim = this.dimension;
  var geometry = this.geometry.base;
  var baseMesh = new THREE.Mesh(geometry, material);
  baseMesh.scale.set(dim.width, height, dim.length);
  baseMesh.position.set(0, dim.current, 0);
  this.updateHeight(height);
  this.mesh.add(baseMesh);
};


ObsidianBuilding.prototype.buildStack = function(material, sectionHeight) {
  var dim = this.dimension;
  var geometry = this.geometry.building;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(dim.width, sectionHeight, dim.length);
  buildingMesh.position.set(0, dim.current, 0);
  this.updateHeight(sectionHeight);
  this.mesh.add(buildingMesh);
};


ObsidianBuilding.prototype.buildSection = function(material, width, length, height, x, y) {
  var geometry = this.geometry.building;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(width, height, length);
  buildingMesh.position.set(x, this.dimension.current, y);
  this.mesh.add(buildingMesh);
};


ObsidianBuilding.prototype.buildRoof = function(material) {
  var blockHeight = 2;
  var geometry = this.geometry.base;
  var blockMesh = new THREE.Mesh(geometry, material);
  var posX = this.utils.randomInteger(-4, 4);
  var posZ = this.utils.randomInteger(-4, 4);
  blockMesh.scale.set(5, blockHeight, 5);
  blockMesh.position.set(posX, this.dimension.current, posZ);
  this.updateHeight(blockHeight);
  this.mesh.add(blockMesh);
};


ObsidianBuilding.prototype.buildCylinder = function(material, radius, height) {
  var geometry = this.geometry.cylinder;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(radius, height, radius);
  buildingMesh.position.set(0, this.dimension.current, 0);
  this.updateHeight(height);
  this.mesh.add(buildingMesh);
};


/**************************
 * ObsidianBuilding Types *
 **************************/
ObsidianBuilding.prototype.genericBuilding = function() {
  var width = this.dimension.width;
  var height = this.dimension.height;
  var length = this.dimension.length;
  var stacks = this.settings.stack || 1;
  var stackHeight = Math.round(height / stacks);
  var black = this.material.black;

  // Create building stacks
  this.buildBase(black, 1);
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase(black, 1);
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
  var dim = this.dimension;
  var baseSize = dim.radius * 2;
  var windowSize = baseSize * Math.PI;
  dim.width = baseSize;
  dim.length = baseSize;
  var material = this.generateCylinderWindows(windowSize, dim.height);
  var black = this.material.black;

  // Construct building
  // [TODO] Solve multiple cylinder
  this.buildBase(black, 2);
  this.buildCylinder(material, dim.radius, dim.height);
  this.buildCylinder(black, dim.radius, 2);
  this.buildRoof(black);
};


ObsidianBuilding.prototype.sectionBuilding = function() {
  var width = this.dimension.width;
  var length = this.dimension.length;
  var height = this.dimension.height;
  var sideLength = Math.floor(length * 0.50);
  var mainLength = Math.floor(length * 0.9);
  var sideWidth = Math.floor(width * 0.9);
  var mainWidth = Math.floor(width * 0.55);
  var black = this.material.black;

  // Construct cross sections
  this.buildBase(black, 2);
  var mainWindow = this.generateWindows(mainWidth, mainLength, height);
  var sideWindow = this.generateWindows(sideWidth, sideLength, height);
  this.buildSection(sideWindow, sideWidth, sideLength, height, 0, 0);
  this.buildSection(mainWindow, mainWidth, mainLength, height, 0, 0);
  this.updateHeight(height);
};


ObsidianBuilding.prototype.stackedBuilding = function() {
  var stacks = this.settings.stack || 2;
  var stackHeight = 2 * stacks;
  var dim = this.dimension;
  var width = dim.width;
  var height = dim.height - stackHeight * stacks;
  var length = dim.length;
  var black = this.material.black;

  // Create main building
  var mainWindow = this.generateWindows(width, length, height);
  this.buildBase(black, 2);
  this.buildStack(mainWindow, height);

  // Create building stacks
  for (var i=0; i<stacks; i++) {
    dim.width -= 2;
    dim.length -= 2;
    this.buildBase(black, 1);
    var stackWindow = this.generateWindows(dim.width, dim.length, stackHeight);
    this.buildStack(stackWindow, stackHeight);
    stackHeight -= 2;
  }
  this.buildBase(black, 1);
};


ObsidianBuilding.prototype.hShapedBuilding = function() {
  var dim = this.dimension;
  var sliceHeight = 10;
  var width = dim.width;
  var height = dim.height - sliceHeight;
  var length = dim.length;
  var sideWidth = Math.floor(width * 0.2);
  var mainWidth = Math.floor(width * 0.6);
  var mainLength = Math.floor(length * 0.4);
  var sidePosX = Math.floor(mainWidth/2);

  // Create main building
  var black = this.material.black;
  var mainWindow = this.generateWindows(mainWidth, mainLength, height);
  var sideWindow = this.generateWindows(sideWidth, length, height);
  this.buildBase(black, 2);
  this.buildSection(sideWindow, sideWidth, length, height, -sidePosX, 0);
  this.buildSection(mainWindow, width, mainLength, height, 0, 0);
  this.buildSection(sideWindow, sideWidth, length, height, sidePosX, 0);
  this.updateHeight(height);
};
