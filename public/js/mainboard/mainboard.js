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

    app.controller('dafifo.mainboard.mainboardController', ['$scope','$rootScope','$state','dafifo.mainboard.mainboardFactory',function($scope,$rootScope,$state,fac){
        fac.getMenu(function(data){
            $scope.nodeArray = data;
        });

        $scope.nodeHoverEvent = function(parentNode){
            $scope.childNodeArray = parentNode.children;
        };
        if( $state.current.name== "main" )
            $state.go('main.desktop');
        $scope.activeApp  = "";
        $scope.tableArray = [];
        $scope.closeTable = function(app){
            var index = $scope.tableArray.indexOf(app);
            $scope.tableArray.splice(index,1);
            if($scope.tableArray[index]){
                $state.go($scope.tableArray[index].href);
            }else if($scope.tableArray[index - 1]){
                $state.go($scope.tableArray[index-1].href);
            }else{
                $state.go('main.desktop');
            }
        };

    }]);

    app.factory('dafifo.mainboard.mainboardFactory', ['$http',function($http){
        return {
            getMenu : function( callback ){
                $http.get('/json/menu-data.json').success(function(data, header, config, status){
                    if(data){
                        return callback && callback(data);
                    }
                });
            }
        };
    }]);

    return app;
}));