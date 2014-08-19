/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/***********************************
 * ObsidianCity Building Resources *
 ***********************************/
ObsidianCity.prototype.defineBuildingGeometry = function() {
  this.geometry = {};

  // Basic box geometry
  this.geometry.box = new THREE.BoxGeometry(1, 1, 1);
  this.geometry.box.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
};


ObsidianCity.prototype.defineBuildingMaterial = function() {
  this.material = {};

  // Basic material
  this.material.basic = {
    gray: new THREE.MeshLambertMaterial({color: 0xCCCCCC}),
  };

  // Window texture
  this.material.building = {
    striped: this.windowStripedMaterial(),
  };
};


/***********************************
 * ObsidianCity Texture Generation *
 ***********************************/
ObsidianCity.prototype.textureCanvas = function(width, height) {
  // Create canvas and set dimensions
  var canvas = document.createElement('canvas');
  canvas.width = width || 32;
  canvas.height = height || 32;

  // Fill canvas with white
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
};


ObsidianCity.prototype.textureResolution = function(canvas, width, height) {
  // Create high-res canvas
  var hiResCanvas = document.createElement('canvas');
  hiResCanvas.width = width || 512;
  hiResCanvas.height = height || 512;

  // Draw in old canvas to new canvas
  var ctx = hiResCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled  = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, hiResCanvas.width, hiResCanvas.height);
  return hiResCanvas;
};


ObsidianCity.prototype.createTextureMaterial = function(canvas) {
  var texture = new THREE.Texture(canvas);
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
ObsidianCity.prototype.windowStripedMaterial = function() {
  var width = 32, height = 64;

  // Draw shade of random luminance in windows
  var canvas = this.textureCanvas(width, height);
  var ctx = canvas.getContext('2d');
  for (var y=2; y<height; y += 2) {
    for (var x=0; x<width; x += 2) {
      var value = Math.floor( Math.random() * height );
      ctx.fillStyle = 'rgb(' + [value, value, value].join(',') + ')';
      ctx.fillRect(x, y, 2, 1);
    }
  }

  // Create a hi-res texture from canvas
  var hiResCanvas = this.textureResolution(canvas, 512, 1024);
  return this.createTextureMaterial(hiResCanvas);
};


/******************************
 * ObsidianCity Building Mesh *
 ******************************/
ObsidianCity.prototype.blockBuilding = function(width, length) {
  var height = this.utils.randomInteger(30, 50);
  var geometry = this.geometry.box;
  var material = this.material.building.striped;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(width, height, length);
  return mesh;
};
