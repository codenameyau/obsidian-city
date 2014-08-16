/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/****************************
 * ObsidianCity Constructor *
 ****************************/
function ObsidianCity() {
  this.initializeSettings();
  this.initializeClock();
  this.initializeScene();
}


ObsidianCity.prototype.initializeSettings = function() {
  this.settings = {
    meta: {
      dom: 'canvas-body',
    },

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


ObsidianCity.prototype.initializeClock = function() {
  this.clock = new THREE.Clock();
  this.clock.delta = this.clock.getDelta();
};


ObsidianCity.prototype.initializeScene = function() {
  // Create Threejs scene
  this.scene = new THREE.Scene();
  var canvasWidth  = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var aspectRatio  = canvasWidth/canvasHeight;

  // Create WebGL renderer
  this.renderer = new THREE.WebGLRenderer(this.settings.renderer);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.utils.addToDOM(this.settings.meta.dom, this.renderer.domElement);
  this.renderer.running = true;
};


/*************************
 * ObsidianCity Renderer *
 *************************/
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


ObsidianCity.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
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
