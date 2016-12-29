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
    var app = angular.module('dafifo.user', ['tm.pagination']);

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
        fac.getUser({},function(data){
            $scope.userData = data.root;
            $scope.paginationConf.totalItems = data.totalCount;
        });
        $scope.ngClick = function(row){
            $scope.index = $scope.userData.indexOf(row);
        };
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){

            }
        };
    }]);

    app.factory('dafifo.user.userFactory', ['$http',function($http){
        return {
            getUser : function(params, callback ){
                $http.get('/json/user-data.json').success(function(data, header, config, status){
                    if(data){
                        return callback && callback(data);
                    }
                });
            }
        };
    }]);

    return app;
}));
