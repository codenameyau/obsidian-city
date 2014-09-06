/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/***********************************
 * ObsidianCity Building Resources *
 ***********************************/
ObsidianCity.prototype.defineBuildingGeometry = function() {
  // Define reusable geometry
  this.geometry = {};

  // Reusable building geometry
  this.geometry.building = new THREE.BoxGeometry(1, 1, 1);
  this.geometry.building.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

  // Reusable base geometry
  this.geometry.base = new THREE.BoxGeometry(1, 1, 1);
  this.geometry.base.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

};


ObsidianCity.prototype.defineBuildingMaterial = function() {
  this.material = {};

  // Basic material
  this.material.basic = {
    gray: new THREE.MeshLambertMaterial({ color: 0xCCCCCC }),
    black: new THREE.MeshBasicMaterial({ color: 0x080808 }),
  };

  // Window texture
  this.material.building = {
    striped: this.stripedBuildingMaterial(),
  };
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
  // Create blank canvas to draw windows
  var windows = width * 2;
  var padding = 1;
  var ctx = this.textureCanvas(windows, height, '#000000');
  for (var i=padding; i<windows; i++) {
    for (var j=padding; j<height; j++) {
      var color = this.utils.randomGrayscale(10, 180);
      this.drawWindow(ctx, color, i, j, 2, 1);
      j += 1;
    }
    i += 2;
  }

  // Create a hi-res texture from canvas
  return this.createTexture(ctx.canvas, 512, 512);
};


/******************************
 * ObsidianCity Building Mesh *
 ******************************/
ObsidianCity.prototype.blockBuilding = function(width, length, height) {
  var buildingObject = new THREE.Object3D();
  var geometry = this.geometry.building;

  // Define materials
  var black = this.material.basic.black;
  var windows = this.squareBuildingMaterial(width, height);
  var materials = [windows, windows, black, black, windows, windows];
  var windowMaterial = new THREE.MeshFaceMaterial(materials);

  // Create building base
  var baseHeight = 2;
  var buildingBase = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), black);
  buildingBase.scale.set(width, baseHeight, length);
  buildingObject.add(buildingBase);

  // [Bug] change black to windowMaterial
  var windowBuilding = new THREE.Mesh(geometry, windowMaterial);
  windowBuilding.scale.set(width-4, height, length-4);
  windowBuilding.position.set(0, baseHeight, 0);
  var windowBuilding2 = new THREE.Mesh(geometry, windowMaterial);
  windowBuilding2.scale.set(width-6, height-20, length-6);
  windowBuilding2.position.set(10, baseHeight, 0);

  var windowBuilding3 = new THREE.Mesh(geometry, windowMaterial);
  windowBuilding3.scale.set(width-8, height+20, length-8);
  windowBuilding3.position.set(0, baseHeight, 0);


  buildingObject.add(windowBuilding);
  buildingObject.add(windowBuilding2);
  buildingObject.add(windowBuilding3);
  return buildingObject;
};


ObsidianCity.prototype.genericBuilding = function(width, length, height) {
  var building = new THREE.Object3D();
  var geometry = this.geometry.building;

  // Define mesh materials
  var side = this.squareBuildingMaterial(width, height);
  var top = this.material.basic.black;
  var materials = [side, side, top, top, side, side];
  var meshMaterial = new THREE.MeshFaceMaterial(materials);
  var mesh = new THREE.Mesh(geometry, meshMaterial);
  mesh.scale.set(width, height, length);
  building.add(mesh);
  return building;
};
