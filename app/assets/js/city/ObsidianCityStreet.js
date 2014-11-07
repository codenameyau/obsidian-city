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

  // Create vertical road grid
  for (var w=left; w<right; w += wInc) {
    this.layoutVerticalRoad(w);
  }

  // Create horizontal road grid
  for (var l=bottom; l<top; l += lInc) {
    this.layoutHorizontalRoad(l);
  }
};


ObsidianCity.prototype.layoutHorizontalRoad = function(pos) {
  var settings = this.settings.city;
  var roadWidth = settings.roadWidth;
  var cityWidth = settings.width;
  var geometry = new THREE.PlaneGeometry(roadWidth, cityWidth);
  var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
  console.log(pos);
};


ObsidianCity.prototype.layoutVerticalRoad = function(pos) {

};
