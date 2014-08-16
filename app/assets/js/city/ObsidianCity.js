/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/****************************
 * ObsidianCity Constructor *
 ****************************/
function ObsidianCity() {
  this.initializeSettings();
  this.initializeScene();
}

ObsidianCity.prototype.initializeSettings = function() {
  this.settings = {
    camera: {
      fov: 45,
      near: 1,
      far: 1000,
      zoomX: 0,
      zoomY: 20,
      zoomZ: 50,
    },

    controls: {
      enabled: true,
      userPan: true,
      userPanSpeed: 1,
      minDistance: 10.0,
      maxDistance: 200.0,
      maxPolarAngle: (Math.PI/180) * 80,
    },

    renderer: {
      antialias: false,
    }
  };
};

ObsidianCity.prototype.initializeScene = function() {
  this.scene = new THREE.Scene();
};

ObsidianCity.prototype.rendererScene = function() {
  this.renderer.render(this.scene, this.camera );
};

ObsidianCity.prototype.updateScene = function() {
  if (this.renderer.running) {
    window.requestAnimationFrame(this.updateScene.bind(this));
    this.clock.delta = this.clock.getDelta();
    this.camera.update();
    this.renderScene();
  }
};

/*******************************
 * ObsidianCity Public Methods *
 *******************************/
ObsidianCity.prototype.changeSettings = function(type, dictionary) {
  var setting = this.settings[type];
  for (var key in dictionary) {
    if (setting.hasOwnProperty(key)) {
      setting[key] = dictionary[key];
    }
  }
};
