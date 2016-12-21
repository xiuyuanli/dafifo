/**
 * Created by warren on 2016/12/20.
 */
/**
 * Created by warren on 2016/12/19.
 */
(function(angular, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(window.angular || null, function(angular) {
    var app = angular.module('dafifo.user', []);

    app.controller('dafifo.user.userController', ['$scope','$rootScope','$state','$stateParams','dafifo.user.userFactory',function($scope,$rootScope,$state,$stateParams,fac) {
        $scope.$parent.activeApp  = "main.user";
        var moduleDetail = {
            "text" : "用户管理",
            "href" : "main.user"
        };
        $scope.isOpen = false;
        for(var i=0;i<$scope.$parent.tableArray.length;i++){
            var tab = $scope.$parent.tableArray[i];
            if(tab.text == moduleDetail.text && tab.href == moduleDetail.href){
                $scope.isOpen = true;
                return;
            }
        }
        if(!$scope.isOpen){
            $scope.$parent.tableArray.push(moduleDetail);
        }
    }]);

    app.factory('dafifo.user.userFactory', ['$http',function($http){
        return {

        };
    }]);

    return app;
}));
