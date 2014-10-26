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
ObsidianBuilding.prototype.generateWindows = function(width, length, height) {
  var black = this.material.black;
  var windows = width * 2;
  var padding = 1;

  // Draw windows texture
  var ctx = this.textureCanvas(windows, height);
  for (var h=padding; h<height; h += 2) {
    var lightsColor = this.utils.randomInteger(20, 150);
    for (var w=padding; w<windows; w += 2.5) {
      var windowColor = this.utils.getGrayscale(
        this.utils.randomNormal(lightsColor, 100));
      this.drawRectangle(ctx, windowColor, w, h, 1.5, 1);
    }
  }

  // Map created texture to window face
  var texture = this.createTexture(ctx.canvas, 256, 256);
  var windowsMap = [texture, texture, black, black, texture, texture];
  return new THREE.MeshFaceMaterial(windowsMap);
};


ObsidianBuilding.prototype.generateCylinderWindows = function(radius, height) {
  var black = this.material.black;
  var windows = radius * 2;
  var padding = 1;

  // Draw windows texture
  var ctx = this.textureCanvas(windows, height);
  for (var h=padding; h<height; h += 2) {
    var lightsColor = this.utils.randomInteger(20, 150);
    for (var w=padding; w<windows; w += 2.5) {
      var windowColor = this.utils.getGrayscale(
        this.utils.randomNormal(lightsColor, 100));
      this.drawRectangle(ctx, windowColor, w, h, 1.5, 1);
    }
  }

  // Map created texture to window face
  var texture = this.createTexture(ctx.canvas, 256, 256);
  var windowsMap = [texture, texture, black, black, texture, texture];
  return new THREE.MeshFaceMaterial(windowsMap);
};
