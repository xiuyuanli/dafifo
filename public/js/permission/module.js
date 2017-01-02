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
    var app = angular.module('dafifo.module', ['treeGrid']);

    app.controller('dafifo.module.moduleController', ['$scope','$rootScope','$state','dafifo.module.moduleFactory',function($scope,$rootScope,$state,fac) {
        $scope.$parent.activeApp  = "main.module";
        var moduleDetail = {
            "text" : "模块管理",
            "href" : "main.module"
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
        };

        $scope.col_defs = [
            {
                field: "name",
                displayName: "模块（菜单）名称"
            },
            {
                field: "code",
                displayName: "模块编码"
            },
            {
                field: "parentName",
                displayName: "父节点名称"
            },
            {
                field: "url",
                displayName: "路径"
            },
            {
                field: "disable",
                displayName: "是否有效",
                cellTemplate: "<input type='checkbox' ng-checked='{{ row.branch[col.field] }}' />",
            },
            {
                field: "sort",
                displayName: "排序"
            }
        ];
        $scope.tree_data = [];
        fac.getModuleData({},function(data){
            $scope.tree_data = data;
        });
        $scope.my_tree_handler = function(branch){
            //$('#module').modal('show')
        };
        $scope.add = function(){
            $('#module').modal('show');
        }
        $scope.edit = function(){
            $('#module').modal('show');
        }
        $scope.delete = function(){
            $('#module').modal('show');
        }
        $scope.mgButton = function(){
            $('#moduleToButton').modal('show');
        };

    }]);

    app.factory('dafifo.module.moduleFactory', ['$http',function($http){
        return {
            getModuleData : function(params,callback){
                $http.get('/json/module-data.json').success(function(data, header, config, status){
                    if(data){
                        return callback && callback(data);
                    }
                });
            }
        };
    }]);

    /*app.directive('treeView',[function(){
        return {
            restrict: 'E',
            templateUrl: '/treeView.html',
            scope: {
                treeData: '=',
                canChecked: '=',
                textField: '@',
                itemClicked: '&',
                itemCheckedChanged: '&',
                itemTemplateUrl: '@'
            },
            controller:['$scope', function($scope){
                $scope.itemExpended = function(item, $event){
                    item.$$isExpend = ! item.$$isExpend;
                    $event.stopPropagation();
                };

                $scope.getItemIcon = function(item){
                    var isLeaf = $scope.isLeaf(item);
                    if(isLeaf){
                        return 'fa fa-leaf';
                    }
                    return item.$$isExpend ? 'fa fa-minus': 'fa fa-plus';
                };

                $scope.isLeaf = function(item){
                    return !item.children || !item.children.length;
                };

                $scope.warpCallback = function(callback, item, $event){
                    ($scope[callback] || angular.noop)({
                        $item:item,
                        $event:$event
                    });
                };
            }]
        };
    }]);*/

    return app;
}));
