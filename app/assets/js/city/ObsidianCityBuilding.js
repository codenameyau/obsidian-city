/*-------JSHint Directives-------*/
/* global THREE                  */
/*-------------------------------*/
'use strict';


/********************************
 * ObsidianBuilding Constructor *
 ********************************/
function ObsidianBuilding(build, settings) {
  this.mesh = new THREE.Object3D();
  this.settings = settings;
  this.setDimensions();
  build.bind(this)();
}


/****************************
 * ObsidianBuilding Methods *
 ****************************/
ObsidianBuilding.prototype.setDimensions = function() {
  var settings = this.settings;
  this.dimension = {
    current: 0,
    width: settings.width,
    length: settings.length,
    height: settings.height,
    radius: settings.radius,
  };
};


ObsidianBuilding.prototype.move = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};


ObsidianBuilding.prototype.rotate = function(deg) {
  this.mesh.rotation.y = this.utils.degToRad(deg);
};


/*******************************
 * ObsidianBuilding Foundation *
 *******************************/
ObsidianBuilding.prototype.updateHeight = function(value) {
  this.dimension.current += value;
};


ObsidianBuilding.prototype.buildBase = function(material, height) {
  var dim = this.dimension;
  var geometry = this.geometry.base;
  var baseMesh = new THREE.Mesh(geometry, material);
  baseMesh.scale.set(dim.width, height, dim.length);
  baseMesh.position.set(0, dim.current, 0);
  this.updateHeight(height);
  this.mesh.add(baseMesh);
};


ObsidianBuilding.prototype.buildStack = function(material, height, scale) {
  scale = scale || 1;
  var dim = this.dimension;
  var geometry = this.geometry.building;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(dim.width * scale, height, dim.length * scale);
  buildingMesh.position.set(0, dim.current, 0);
  this.updateHeight(height);
  this.mesh.add(buildingMesh);
};


ObsidianBuilding.prototype.buildSection = function(material, width, length, height, x, y) {
  var geometry = this.geometry.building;
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(width, height, length);
  buildingMesh.position.set(x, this.dimension.current, y);
  this.mesh.add(buildingMesh);
};


ObsidianBuilding.prototype.buildCylinder = function(geometry, material, radius, height) {
  var buildingMesh = new THREE.Mesh(geometry, material);
  buildingMesh.scale.set(radius, height, radius);
  buildingMesh.position.set(0, this.dimension.current, 0);
  this.updateHeight(height);
  this.mesh.add(buildingMesh);
};


ObsidianBuilding.prototype.fontSettings = {
  size: 2, height: 1, curveSegments: 5,
};


ObsidianBuilding.prototype.buildRoof = function(material) {
  var text = this.settings.text;
  if (text) {
    var dim = this.dimension;
    var textMaterial = this.material.text;
    var textGeometry = new THREE.TextGeometry(text, this.fontSettings);
    var textMesh = new THREE.Mesh(textGeometry, textMaterial);
    var posX = Math.ceil(-text.length/2);
    var posZ = dim.length / 2;
    textMesh.scale.set(0.65, 0.65, 0.2);
    textMesh.position.set(posX, dim.current, posZ);
    this.mesh.add(textMesh);
  }
  this.buildBase(material, 2);
  this.buildDecoration(0, 0);
};


ObsidianBuilding.prototype.buildDecoration = function(x, z) {
  var dim = this.dimension;
  var height = this.utils.randomInteger(2, 4);
  var width = Math.floor(dim.width / 3);
  var length = Math.floor(dim.length / 3);
  var geometry = this.geometry.building;
  var material = this.material.black;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(width, height, length);
  mesh.position.set(x, dim.current, z);
  this.mesh.add(mesh);
};


/**************************
 * ObsidianBuilding Types *
 **************************/
ObsidianBuilding.prototype.genericBuilding = function() {
  var width = this.dimension.width;
  var height = this.dimension.height;
  var length = this.dimension.length;
  var black = this.material.black;
  var material = this.generateWindows(width, length, height);

  // Create building stacks
  this.buildBase(black, 1);
  this.buildStack(material, height);
  this.buildRoof(black);
  this.buildDecoration(0, 0);
};


ObsidianBuilding.prototype.cylinderBuilding = function() {
  var dim = this.dimension;
  var baseSize = dim.radius * 2;
  var windowSize = baseSize * Math.PI;
  dim.width = baseSize;
  dim.length = baseSize;
  var material = this.generateCylinderWindows(windowSize, dim.height);
  var black = this.material.black;
  var geometry = this.geometry.cylinder;

  // Construct building
  this.buildBase(black, 2);
  this.buildCylinder(geometry, material, dim.radius, dim.height);
  this.buildCylinder(geometry, black, dim.radius, 2);
};


ObsidianBuilding.prototype.crossBuilding = function() {
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
  var stackHeight = 3 * stacks;
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
    dim.width -= 4;
    dim.length -= 4;
    this.buildBase(black, 1);
    var stackWindow = this.generateWindows(dim.width, dim.length, stackHeight);
    this.buildStack(stackWindow, stackHeight);
    stackHeight -= 2;
  }
  this.buildRoof(black);
};


ObsidianBuilding.prototype.hShapedBuilding = function() {
  var dim = this.dimension;
  var sliceHeight = 10;
  var width = dim.width;
  var height = dim.height - sliceHeight;
  var length = dim.length;
  var widthModifier = 0.5;
  var sideWidth = Math.floor(width * 0.2);
  var mainWidth = Math.floor(width * 0.6);
  var mainLength = Math.floor(length * widthModifier);
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
  dim.length = mainLength;
  this.buildRoof(black);
};
