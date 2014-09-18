/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/***********************************
 * ObsidianCity Building Resources *
 ***********************************/
ObsidianCity.prototype.defineBuildingGeometry = function() {
  // reusable geometry
  this.geometry = {};
  this.createBoxGeometry('base');
  this.createBoxGeometry('building');
};


ObsidianCity.prototype.createBoxGeometry = function(name) {
  this.geometry[name] = new THREE.BoxGeometry(1, 1, 1);
  this.geometry[name].applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
};


ObsidianCity.prototype.defineBuildingMaterial = function() {
  this.material = {};

  // Basic material
  this.material.basic = {
    gray: new THREE.MeshLambertMaterial({ color: 0xCCCCCC }),
    black: new THREE.MeshBasicMaterial({ color: 0x020202 }),
  };

  // [TODO] Window texture cache
  this.material.building = {};
};


/***********************************
 * ObsidianCity Texture Generation *
 ***********************************/
ObsidianCity.prototype.textureCanvas = function(width, height, bgcolor) {
  // Create canvas and set dimensions
  var canvas = document.createElement('canvas');
  canvas.width  = width  || 32;
  canvas.height = height || 32;

  // Fill canvas with white
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcolor || '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return ctx;
};


ObsidianCity.prototype.createTexture = function(canvas, width, height) {
  // Create hi-res canvas
  var hiResCanvas = document.createElement('canvas');
  hiResCanvas.width = width || 512;
  hiResCanvas.height = height || 512;

  // Draw in old canvas to new canvas
  var ctx = hiResCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled  = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, hiResCanvas.width, hiResCanvas.height);

  // Create texture material from hi-res canvas
  var texture = new THREE.Texture(hiResCanvas);
  texture.anisotropy = this.renderer.getMaxAnisotropy();
  texture.needsUpdate = true;
  return new THREE.MeshLambertMaterial({
    map: texture,
    vertexColors: THREE.VertexColors,
  });
};


/*******************************
 * ObsidianCity Window Texture *
 *******************************/
ObsidianCity.prototype.drawWindow = function(ctx, color, x, y, xSize, ySize) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, xSize, ySize);
};


ObsidianCity.prototype.stripedBuildingMaterial = function() {
  // Initial texture size
  var width = 32, height = 64;

  // Draw shade of random luminance in windows
  var ctx = this.textureCanvas(width, height, '#FFFFFF');
  for (var y=2; y<height; y += 2) {
    for (var x=0; x<width; x += 2) {
      var color = this.utils.randomGrayscale(40, 100);
      this.drawWindow(ctx, color, x, y, 2, 1);
    }
  }

  // Create a hi-res texture from canvas
  return this.createTexture(ctx.canvas, 256, 512);
};


ObsidianCity.prototype.squareBuildingMaterial = function(width, height) {
  var windows = width * 2;
  var padding = 1;
  var windowColor;
  var lightsColor;

  // Draw windows on blank canvas
  var ctx = this.textureCanvas(windows, height, '#000000');
  for (var i=padding; i<windows; i++) {
    lightsColor = this.utils.randomInteger(0, 100);
    for (var j=padding; j<height; j++) {
      windowColor = this.utils.randomGrayscale(10, 180);
      this.drawWindow(ctx, windowColor, i, j, 2, 1);
      j += 1;
    }
    i += 2;
  }

  // Create a hi-res texture from canvas
  return this.createTexture(ctx.canvas, 512, 512);
};


/************************************
 * ObsidianCity Building Foundation *
 ************************************/
ObsidianCity.prototype.buildBase = function(building, currentHeight, width, length, height) {
  var material = this.material.basic.black;
  var geometry = this.geometry.base;
  var baseMesh = new THREE.Mesh(geometry, material);
  baseMesh.scale.set(width, height, length);
  baseMesh.position.set(0, currentHeight, 0);
  building.add(baseMesh);
};

ObsidianCity.prototype.buildSection = function(building, currentHeight, width, length, height) {
  var geometry = this.geometry.building;
  var black = this.material.basic.black;
  var windows = this.squareBuildingMaterial(width, height);
  var windowsMap = [windows, windows, black, black, windows, windows];
  var windowMaterial = new THREE.MeshFaceMaterial(windowsMap);
  var buildingMesh = new THREE.Mesh(geometry, windowMaterial);
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

/*******************************
 * ObsidianCity Building Types *
 *******************************/
ObsidianCity.prototype.genericBuilding = function(width, length, totalHeight, stacks) {
  // Define building properties
  var buildingObject = new THREE.Object3D();
  var height = Math.round(totalHeight / stacks);
  var baseHeight = 1;
  var currentHeight = 0;

  // Create building stacks
  for (var i=0; i<stacks; i++) {
    // Add floor base
    this.buildBase(buildingObject, currentHeight, width, length, baseHeight);
    currentHeight += baseHeight;
    width  -= 1;
    length -= 1;

    // Add building stack
    this.buildSection(buildingObject, currentHeight, width, length, height);
    currentHeight += height;
    width  -= 1;
    length -= 1;
  }

  // Add roof and cover
  this.buildBase(buildingObject, currentHeight, width, length, baseHeight);
  currentHeight += 1;
  this.buildRoof(buildingObject, currentHeight, true);
  return buildingObject;
};
