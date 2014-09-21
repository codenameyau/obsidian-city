/*-------JSHint Directives--------*/
/* global ObsidianBuilding, THREE */
/*--------------------------------*/
'use strict';


/***********************************
 * ObsidianBuilding Texture Canvas *
 ***********************************/
ObsidianBuilding.prototype.textureCanvas = function(width, height, bgcolor) {
  // Create canvas and set dimensions
  var canvas = document.createElement('canvas');
  canvas.width  = width  || 32;
  canvas.height = height || 32;

  // Fill canvas with white
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcolor || '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return ctx;
};


ObsidianBuilding.prototype.createTexture = function(canvas, width, height) {
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
  texture.needsUpdate = true;
  return new THREE.MeshLambertMaterial({
    map: texture,
    vertexColors: THREE.VertexColors,
  });
};


ObsidianBuilding.prototype.drawRectangle = function(ctx, color, x, y, xSize, ySize) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, xSize, ySize);
};


/***********************************
 * ObsidianBuilding Window Texture *
 ***********************************/
ObsidianBuilding.prototype.mapTextureFace = function(face) {
  var black = this.material.black;
  var windowsMap = [face, face, black, black, face, face];
  return new THREE.MeshFaceMaterial(windowsMap);
};


ObsidianBuilding.prototype.generateWindow = function(width, height) {
  var windowTexture = this.squareWindow(width, height);
  return this.mapTextureFace(windowTexture);
};


ObsidianBuilding.prototype.columnWindow = function(width, height) {

};


ObsidianBuilding.prototype.squareWindow = function(width, height) {
  var windows = width * 2;
  var padding = 1;
  var ctx = this.textureCanvas(windows, height);
  var lightsColor, windowColor;

  // Draw windows texture
  for (var h=padding; h<height; h += 2) {
    lightsColor = this.utils.randomInteger(20, 150);
    for (var w=padding; w<windows; w += 2.5) {
      windowColor = this.utils.getGrayscale(
        this.utils.randomNormal(lightsColor, 100));
      this.drawRectangle(ctx, windowColor, w, h, 1.5, 1);
    }
  }

  return this.createTexture(ctx.canvas, 512, 512);
};
