/**
 * Created by warren on 2016/12/17.
 */
'use strict';
(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(window.angular || null, function(angular) {
    var app = angular.module('dafifo.desktop', []);

    app.controller('dafifo.desktop.desktopController', ['$scope','dafifo.desktop.desktopFactory',function($scope,fac) {
        fac.getApps(function(data){
            $scope.appData = data;
        });
    }]);

    app.factory('dafifo.desktop.desktopFactory', ['$http',function($http){
        return {
            getApps : function( callback ){
                $http.get('/json/app-data.json').success(function(data, header, config, status){
                    if(data){
                        return callback && callback(data);
                    }
                });
            }
        };
    }]);

    return app;
}));