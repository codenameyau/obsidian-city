/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


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


ObsidianCity.prototype.layoutVerticalRoad = function() {
  // Road dimensions
  var settings = this.settings.city;
  var cityWidth = settings.width;
  var roadWidth = settings.roadWidth;
  var incWidth = settings.blockWidth + roadWidth;
  var left = -Math.floor(cityWidth/2) - roadWidth;
  var right = -left + roadWidth;

  // Road resources
  var geometry = this.geometry.plane;
  var material = this.material.road;

  // Construct road
  for (var pos=left; pos<right; pos += incWidth) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = this.utils.degToRad(-90);
    mesh.scale.set(roadWidth, cityWidth, 1);
    mesh.position.x = pos;
    this.add(mesh);
  }
};


ObsidianCity.prototype.layoutHorizontalRoad = function() {
  // Road dimensions
  var settings = this.settings.city;
  var cityLength = settings.length;
  var roadWidth = settings.roadWidth;
  var incLength = settings.blockLength + roadWidth;
  var bottom = -Math.floor(cityLength/2) - roadWidth;
  var top = -bottom + roadWidth;

  // Road resources
  var geometry = this.geometry.plane;
  var material = this.material.blue;

  // Construct road
  for (var pos=bottom; pos<top; pos += incLength) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = this.utils.degToRad(-90);
    mesh.scale.set(cityLength, roadWidth, 1);
    mesh.position.z = pos;
    this.add(mesh);
  }
};
