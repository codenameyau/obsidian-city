/*-------JSHint Directives-------*/
/* global THREE                  */
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
}

/**************************
 * ObsidianCity Generator *
 **************************/
