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
        /** 获取列表数据 **/
        fac.getUser({},function(data){
            $scope.userData = data.root;
            $scope.paginationConf.totalItems = data.totalCount;
        });
        /** 分页 **/
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){

            }
        };
        /** 添加用户 **/
        $scope.add = function(){
            $('#userModal').modal('show');
        };
        /** 修改用户 **/
        $scope.edit = function(){
            $('#userModal').modal('show');
        };
        /** 删除用户 **/
        $scope.delete = function(){

        };
        /** 分配用户权限 **/
        $scope.mgPermission = function(){

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
