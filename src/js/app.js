angular.module('itcDataApp', [])
  .controller('itcDataController', function($scope, $http) {
    var itcData = this;
    itcData.categories = [];
    itcData.firstKeyName = function (obj) {
        return Object.keys(obj)[0];
    };
    itcData.firstKeyValues = function (obj) {
        return obj[Object.keys(obj)[0]];
    };
    itcData.randomIcon = function() {
        var availableIcons = ["mif-steps","mif-squirrel","mif-ambulance","mif-justice","mif-file-excel","mif-cab","mif-bicycle","mif-train"];
        return availableIcons[parseInt(Math.random() * (availableIcons.length))];
    };
    itcData.randomBgColor = function() {
        var availableColors = ["bg-indigo","bg-cyan","bg-amber","bg-darkCyan","bg-pink","bg-violet","bg-brown","bg-grayDark","bg-cobalt"];
        return availableColors[parseInt(Math.random() * (availableColors.length))];
    };
    itcData.yaml = function() {
        return window.yaml;
    }

    $http.get('data.yml').then(function(data,status,headers,congfig){
            console.info(data);
            itcData.categories = window.jsyaml.load(data.data).categories;
        }, function(data,status,headers,congfig){
            console.error(data);
            itcData.categories = [];
        });
  });