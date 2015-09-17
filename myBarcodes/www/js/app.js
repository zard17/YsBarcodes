// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova.plugins.file'])

.run(function($ionicPlatform, $cordovaFile) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    $cordovaFile.createDir(cordova.file.dataDirectory, "barimages", false)
      .then(function (success) {
        console.log('barimages dir created!');
      }, function (error) {
        console.log(error);
      });
  });
})

.controller('MainCtrl', function($scope, $cordovaFile) {
  $scope.barimages = [];

  $scope.onTap = function() {
    console.log('tapped!');
  }

  $scope.handleAdd = function() {
    window.imagePicker.getPictures(
      function(results) {
        for (var i = 0; i < results.length; i++) {
          var filename = results[i].substring(results[i].lastIndexOf('/')+1);
          var destDir = cordova.file.dataDirectory + "barimages/";
          $cordovaFile.moveFile(cordova.file.cacheDirectory, filename, destDir)
            .then(function (success) {
              $scope.barimages.push(destDir + filename);
              console.log(filename + ' move ok');
            }, function (error) {
              console.log(error);
            });
        }
      }, function (error) {
        console.log('Error: ' + error);
      }, {
        maximumImagesCount: 1
      }
    );
  };
});
