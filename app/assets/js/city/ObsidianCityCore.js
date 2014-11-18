/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/****************************
 * ObsidianCity Constructor *
 ****************************/
function ObsidianCity(settings) {
  this.initializeSettings();
  this.initializeClock();
  this.initializeScene();
  this.initializeCamera();
  this.initializeControls();
  this.initializeHUD();
  this.initializeEventListeners();
  this.settings.city = settings;
}


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
      near: 0.5,
      far: 2000,
      zoomX: 220,
      zoomY: 100,
      zoomZ: 220,
    },

    controls: {
      enabled: true,
      userPan: false,
      userPanSpeed: 3,
      minDistance: 80.0,
      maxDistance: 300.0,
      maxPolarAngle: (Math.PI/180) * 85,
      minPolarAngle: (Math.PI/180) * 55,
    },

    renderer: {
      antialias: false,
    },
  };
};


ObsidianCity.prototype.initializeClock = function() {
  this.clock = new THREE.Clock();
  this.clock.delta = this.clock.getDelta();
};


ObsidianCity.prototype.initializeScene = function() {
  this.scene = new THREE.Scene();
  this.renderer = new THREE.WebGLRenderer(this.settings.renderer);
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.utils.addToDOM(this.settings.meta.dom, this.renderer.domElement);
  this.renderer.running = true;
};


ObsidianCity.prototype.initializeCamera = function() {
  var s = this.settings.camera;
  var aspect = window.innerWidth/window.innerHeight;
  this.camera = new THREE.PerspectiveCamera(s.fov, aspect, s.near, s.far);
  this.camera.position.set(s.zoomX, s.zoomY, s.zoomZ);
  this.scene.add(this.camera);
};


ObsidianCity.prototype.initializeControls = function() {
  var s = this.settings.controls;
  this.controls = new THREE.OrbitControls(this.camera);
  for (var key in s) { this.controls[key] = s[key]; }
};


ObsidianCity.prototype.initializeHUD = function() {
  this.HUD = {};
  this.enablePausedHUD();
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
ObsidianCity.prototype.renderScene = function() {
  this.renderer.render(this.scene, this.camera);
};


ObsidianCity.prototype.updateScene = function() {
  if (this.renderer.running) {
    window.requestAnimationFrame(this.updateScene.bind(this));
    this.controls.update();
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


ObsidianCity.prototype.resumeRenderer = function() {
  this.renderer.running = true;
  this.resumeClock();
  window.requestAnimationFrame(this.updateScene.bind(this));
};


ObsidianCity.prototype.pauseRenderer = function() {
  this.renderer.running = false;
  this.pauseClock();
};


ObsidianCity.prototype.togglePause = function() {
  if (this.renderer.running) {
    this.HUD.paused.style.display = 'block';
    this.controls.enabled = false;
    this.pauseRenderer();
  }
  else {
    this.HUD.paused.style.display = 'none';
    this.controls.enabled = true;
    this.resumeRenderer();
  }
};


/********************************
 * ObsidianCity Event Listeners *
 ********************************/
ObsidianCity.prototype.keyboardInput = function(event) {
  switch (event.which) {

  // spacebar: toggle pause
  case 32:
    event.preventDefault();
    this.togglePause();
    break;
  }
};


/*******************************
 * ObsidianCity Public Methods *
 *******************************/
ObsidianCity.prototype.add = function(mesh) {
  this.scene.add(mesh);
};
