/**
 * Created by warren on 2016/12/28.
 */
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
    var app = angular.module('dafifo.role', ['tm.pagination']);

    app.controller('dafifo.role.roleController', ['$scope','$rootScope','$state','$stateParams','dafifo.role.roleFactory',function($scope,$rootScope,$state,$stateParams,fac) {
        $scope.$parent.activeApp  = "main.role";
        var moduleDetail = {
            "text" : "角色管理",
            "href" : "main.role"
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

        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){

            }
        };

    }]);

    app.factory('dafifo.role.roleFactory', ['$http',function($http){
        return {

        };
    }]);

    return app;
}));
