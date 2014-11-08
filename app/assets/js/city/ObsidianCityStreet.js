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


ObsidianCity.prototype.createRoadGrid = function() {
  var settings = this.settings.city;
  var cityWidth = settings.width;
  var cityLength = settings.length;
  var blockWidth = settings.blockWidth;
  var blockLength = settings.blockLength;
  var roadWidth = settings.roadWidth;
  var wInc = blockWidth  + roadWidth;
  var lInc = blockLength + roadWidth;

  // Define the city road boundaries
  var left = -Math.floor(cityWidth/2) - roadWidth;
  var right = -left + roadWidth;
  var bottom = -Math.floor(cityLength/2);
  var top = -bottom + blockLength;

  // Create horizontal road grid
  for (var w=left; w<right; w += wInc) {
    this.layoutHorizontalRoad(w);
  }

  // Create vertical road grid
  for (var l=bottom; l<top; l += lInc) {
    this.layoutVerticalRoad(l);
  }
};


ObsidianCity.prototype.layoutVerticalRoad = function(pos) {
  var settings = this.settings.city;
  var roadWidth = settings.roadWidth;
  var cityWidth = settings.width;
  var geometry = this.geometry.plane;
  var material = this.material.road;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(roadWidth, cityWidth, 1);
  mesh.rotation.x = this.utils.degToRad(-90);
  mesh.position.x = pos;
  this.add(mesh);
};


ObsidianCity.prototype.layoutHorizontalRoad = function(pos) {

};
