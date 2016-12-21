/**
 * Created by warren on 2016/12/13.
 * @author lipeng
 * @date   2016/12/13
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
    var app = angular.module('loginApp', []);
    app.controller('SigninFormController',['$scope','dafifo.loginFactory',function($scope,fac) {
        $scope.user={};
        $scope.login = function() {
            fac.toLogin($scope.user,function(data){
                    console.log(111);
            });
        }
    }]);
    app.factory('dafifo.loginFactory', ['$http',function($http){
            return {
                /**  登录  **/
                toLogin : function(params,callback){
                    $http.post('/toLogin', params).success(function(data){
                        if (data) {
                            return callback && callback(data);
                        }
                    });
                }
            };
    }]);
}));