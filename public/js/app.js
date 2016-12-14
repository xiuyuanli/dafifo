'use strict';

var dafifoApp = angular.module('dafifoApp',['ui.utils','ui.router','oc.lazyLoad'])
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function($controllerProvider,   $compileProvider,   $filterProvider,   $provide){
            dafifoApp.controller = $controllerProvider.register;
            dafifoApp.directive  = $compileProvider.directive;
            dafifoApp.filter     = $filterProvider.register;
            dafifoApp.factory    = $provide.factory;
            dafifoApp.service    = $provide.service;
            dafifoApp.constant   = $provide.constant;
            dafifoApp.value      = $provide.value;
        }
    ]);
