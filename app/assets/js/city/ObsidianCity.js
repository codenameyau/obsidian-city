/*-------JSHint Directives-------*/
/* global ObsidianCity, THREE    */
/*-------------------------------*/
'use strict';


/****************************
 * ObsidianCity Constructor *
 ****************************/
function ObsidianCity() {
  // Functions defined in Core
  this.initializeSettings();
  this.initializeClock();
  this.initializeScene();
  this.initializeCamera();
  this.initializeControls();
  this.initializeHUD();
  this.initializeEventListeners();

  // Define reusable resources
  this.defineBuildingGeometry();
  this.defineBuildingMaterial();
}

/**************************
 * ObsidianCity Generator *
 **************************/
