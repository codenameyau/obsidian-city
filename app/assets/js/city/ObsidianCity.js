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
  this.initializeEventListeners();
}


/**************************
 * ObsidianCity Generator *
 **************************/
