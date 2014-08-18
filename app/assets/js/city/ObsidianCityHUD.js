/*-------JSHint Directives-------*/
/* global ObsidianCity           */
/*-------------------------------*/
'use strict';


/******************
 * HUD Game Pause *
 ******************/
ObsidianCity.prototype.enablePausedHUD = function() {
  var container = document.createElement('div');
  container.className = 'hud-paused';
  container.textContent = 'Paused';
  this.utils.addToDOM(this.settings.meta.dom, container);
  this.HUD.paused = container;
};
