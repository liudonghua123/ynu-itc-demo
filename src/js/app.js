angular.module('itcDataApp', [])
  .controller('itcDataController', function($scope, $http) {
    $scope.categories = [];
    $scope.firstKeyName = function (obj) {
        return Object.keys(obj)[0];
    };
    $scope.firstKeyValues = function (obj) {
        return obj[Object.keys(obj)[0]];
    };
    $scope.randomIcon = function() {
        var availableIcons = ["mif-steps","mif-squirrel","mif-ambulance","mif-justice","mif-file-excel","mif-cab","mif-bicycle","mif-train"];
        return availableIcons[parseInt(Math.random() * (availableIcons.length))];
    };
    $scope.randomBgColor = function() {
        var availableColors = ["bg-indigo","bg-cyan","bg-amber","bg-darkCyan","bg-pink","bg-violet","bg-brown","bg-grayDark","bg-cobalt"];
        return availableColors[parseInt(Math.random() * (availableColors.length))];
    };
    $scope.yaml = function() {
        return window.yaml;
    }

    $http.get('data.yml').then(function(data,status,headers,congfig){
            console.info(data);
            $scope.categories = window.jsyaml.load(data.data).categories;
        }, function(data,status,headers,congfig){
            console.error(data);
            $scope.categories = [];
        });
  });