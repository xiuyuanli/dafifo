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
                break;
            }
        }
        if(!$scope.isOpen){
            $scope.$parent.tableArray.push(moduleDetail);
        }

        /** 行选择 **/
        $scope.rowSelect = function(row){
            $scope.selectRow = row;
        };

        /** 获取角色信息 **/
        fac.getRole({},function(data){
            $scope.roleData = data.root;
            $scope.paginationConf.totalItems = data.totalCount;
        });

        /** 分页 **/
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){

            }
        };

        /** 添加角色 **/
        $scope.add = function(){
            $('#roleModal').modal('show');
        };
        /** 修改角色 **/
        $scope.edit = function(){
            $('#roleModal').modal('show');
        };
        /** 删除角色 **/
        $scope.delete = function(){

        };
        /** 分配角色权限 **/
        $scope.mgButton = function(){

        };

    }]);

    app.factory('dafifo.role.roleFactory', ['$http',function($http){
        return {
            getRole : function( params,callback ){
                $http.get('/json/role-data.json').success(function(data, header, config, status){
                    if(data){
                        return callback && callback(data);
                    }
                });
            }
        };
    }]);

    return app;
}));
