/**
 * Created by warren on 2016/12/19.
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
    var app = angular.module('dafifo.module', ['ngMaterial']);

    app.controller('dafifo.module.moduleController', ['$scope','dafifo.module.moduleFactory',function($scope,fac) {

    }]);

    app.factory('dafifo.module.moduleFactory', ['$http',function($http){
        return {

        };
    }]);

    return app;
}));
