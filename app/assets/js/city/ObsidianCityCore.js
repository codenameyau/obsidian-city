/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/*******************************
 * ObsidianCity Initialization *
 *******************************/
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
  // Initialize threejs scene
  this.scene = new THREE.Scene();
  var settings = this.settings;
  var canvasWidth  = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var aspectRatio  = canvasWidth/canvasHeight;

  // Initialize WebGL renderer
  this.renderer = new THREE.WebGLRenderer(settings.renderer);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.utils.addToDOM(settings.meta.dom, this.renderer.domElement);
  this.renderer.running = true;

  // Initialize camera
  this.camera = new THREE.PerspectiveCamera(
    settings.camera.fov,
    aspectRatio,
    settings.camera.near,
    settings.camera.far
  );
  this.camera.position.set(
    settings.camera.zoomX,
    settings.camera.zoomY,
    settings.camera.zoomZ
  );
  this.camera.lookAt(this.scene.position);
  this.scene.add(this.camera);
};


ObsidianCity.prototype.initializeEventListeners = function() {
  window.addEventListener('resize', this.resizeWindow.bind(this), false);
  window.addEventListener('focus', this.resumeClock.bind(this), false);
  window.addEventListener('blur', this.pauseClock.bind(this), false);
  window.addEventListener('keydown', this.keyboardInput.bind(this), false);
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


/*****************************
 * ObsidianCity Clock Methods *
 *****************************/
ObsidianCity.prototype.resumeClock = function() {
  this.clock.start();
};


ObsidianCity.prototype.pauseClock = function() {
  this.clock.stop();
};


ObsidianCity.prototype.resumeGame = function() {
  this.HUD.paused.style.display = 'none';
  this.renderer.running = true;
  this.resumeClock();
  window.requestAnimationFrame(this.updateScene.bind(this));
};


ObsidianCity.prototype.pauseGame = function() {
  this.HUD.paused.style.display = 'block';
  this.renderer.running = false;
  this.pauseClock();
};


ObsidianCity.prototype.togglePause = function() {
  if (this.renderer.running) {
    this.pauseGame();
  }
  else {
    this.resumeGame();
  }
};


/********************************
 * ObsidianCity Event Listeners *
 ********************************/


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
