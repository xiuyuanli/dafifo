/**
 * Created by warren on 2016/12/13.
 * @author lipeng
 * @date   2016/12/13
 * @description 主面板
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

    var app = angular.module('dafifo.mainboard', []);

    app.controller('dafifo.mainboard.mainboardController', ['$scope','$rootScope','dafifo.mainboard.mainboardFactory',function($scope,$rootScope,fac){

    }]);

    app.factory('dafifo.mainboard.mainboardFactory', ['$http',function($http){
        return {

        };
    }]);

    return app;
}));