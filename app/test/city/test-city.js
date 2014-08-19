/* global PubTest, ObsidianCity */
'use strict';

(function() {

  var testCity = new PubTest('ObsidianCity');

  // Test Case: changeSettings
  testCity.testCase(function() {
    var city = new ObsidianCity();
    city.changeSettings('camera', {fov: 50, far: 2000});
    city.changeSettings('controls', {userPan: false});

    testCity.assertEqual(city.settings.camera.fov, 50,
      'camera fov should be 50');

    testCity.assertEqual(city.settings.camera.far, 2000,
      'camera fov should be 2000');

    testCity.assertEqual(city.settings.controls.userPan, false,
      'controls userPan should be false');
  });

  testCity.results();

})();
