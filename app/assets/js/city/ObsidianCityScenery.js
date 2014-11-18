/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*************************
 * ObsidianCity Lighting *
 *************************/
ObsidianCity.prototype.addAmbientLight = function(color) {
  var light = new THREE.AmbientLight(color);
  this.add(light);
};


ObsidianCity.prototype.addHemisphereLight = function(skyColor, groundColor, intensity) {
  var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  this.add(light);
};


/***********************
 * ObsidianCity Street *
 **********************/
ObsidianCity.prototype.enableFloorGrid = function(lines, steps, gridColor) {
  lines = lines || 20;
  steps = steps || 2;
  gridColor = gridColor || 0xFFFFFF;
  var floorGrid = new THREE.Geometry();
  var gridLine = new THREE.LineBasicMaterial( {color: gridColor} );
  for (var i = -lines; i <= lines; i += steps) {
    floorGrid.vertices.push(new THREE.Vector3(-lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, -lines));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, lines));
  }
  this.add(new THREE.Line(floorGrid, gridLine, THREE.LinePieces));
};


ObsidianCity.prototype.enableBaseFloor = function() {
  var dim = this.settings.city;
  var geometry = this.geometry.base;
  var material = this.material.black;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(2.2*dim.width, 1, 2.2*dim.length);
  mesh.position.set(0, -1, 0);
  this.add(mesh);
};
