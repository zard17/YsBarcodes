// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('myBarcodes', ['ionic', 'ngCordova'])

myApp.run(function($ionicPlatform, $cordovaFile) {
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: "/",
    templateUrl: "main.html",
    controller: 'MainCtrl'
  });
  $urlRouterProvider.otherwise('/');
})

.controller('MainCtrl', function($scope, $cordovaFile) {
  $scope.barimages = [];

  $scope.$on('$ionicView.enter', function(e) {
    restoreData();
  });

  function restoreData() {
    // get json array from local storage
    var jsonObj = localStorage.getItem("barimages");
    // put to barimages
    if (jsonObj !== null)
      $scope.barimages = JSON.parse(jsonObj);
  }

  function saveData() {
    // barimages to json array
    var barImagesJson = JSON.stringify($scope.barimages);
    // put to local storage
    localStorage.setItem("barimages", barImagesJson);
  }

  $scope.onTap = function() {
    console.log('tapped!');
  }

  $scope.handleAdd = function() {
    window.imagePicker.getPictures(
      function(results) {
        var filename = results[0].substring(results[0].lastIndexOf('/')+1);
        var destDir = cordova.file.dataDirectory + "barimages/";
        $cordovaFile.moveFile(cordova.file.cacheDirectory, filename, destDir)
          .then(function (success) {
            $scope.barimages.push(destDir + filename);
            console.log(filename + ' move ok');
            saveData();
          }, function (error) {
            console.log(error);
          });
      }, function (error) {
        console.log('Error: ' + error);
      }, {
        maximumImagesCount: 1
      }
    );
  };
});