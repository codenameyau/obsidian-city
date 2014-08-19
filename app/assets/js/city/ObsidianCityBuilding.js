/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*******************************
 * ObsidianCity Window Texture *
 *******************************/
ObsidianCity.prototype.textureCanvas = function(width, height) {
  // Create canvas and set dimensions
  var canvas = document.createElement('canvas');
  canvas.width = width || 32;
  canvas.height = height || 32;

  // Paint in canvas
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return ctx;
};


ObsidianCity.prototype.createTextureMaterial = function(canvas) {
  var texture = new THREE.Texture(canvas);
  return new THREE.MeshLambertMaterial({
    map: texture,
    vertexColors: THREE.VertexColors,
  });
};


ObsidianCity.prototype.windowStripeMaterial = function() {
  var width = 32;
  var height = 64;
  var ctx = this.textureCanvas(width, height);

  // Draw in random shade in windows
  for (var y=2; y<height; y += 2) {
    for (var x=0; x<width; x += 2) {
      var value = Math.floor( Math.random() * height );
      ctx.fillStyle = 'rgb(' + [value, value, value].join(',') + ')';
      ctx.fillRect(x, y, 2, 1);
    }
  }
  return this.createTextureMaterial(ctx.canvas);
};


/**********************************
 * ObsidianCity Building Resource *
 **********************************/
ObsidianCity.prototype.defineBuildingGeometry = function() {
  this.geometry = {};

  // Basic box geometry
  this.geometry.box = new THREE.BoxGeometry(1, 1, 1);
  this.geometry.box.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
};


ObsidianCity.prototype.defineBuildingMaterial = function() {
  this.material = {};

  // Basic lambert material
  this.material.basicLambert = new THREE.MeshLambertMaterial({color: 0xCCCCCC});
};


/******************************
 * ObsidianCity Building Mesh *
 ******************************/
ObsidianCity.prototype.generateBuilding = function(type, width, length) {
  switch (type) {

  case 'block':
    return this.blockBuilding(width, length);

  }
};


ObsidianCity.prototype.blockBuilding = function(width, length) {
  var height = this.utils.randomInteger(30, 50);
  var geometry = this.geometry.box;
  // [TODO] resuable texture
  var material = this.windowStripeMaterial();
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(width, height, length);
  return mesh;
};
