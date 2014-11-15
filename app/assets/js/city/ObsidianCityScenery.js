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

ObsidianCity.prototype.addDirectionalLight = function(color, x, y, z) {
  var light = new THREE.DirectionalLight(color);
  light.position.set(x, y, z);
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
  this.scene.add(new THREE.Line(floorGrid, gridLine, THREE.LinePieces));
};
