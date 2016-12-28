'use strict';

dafifoApp.config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
            
            $urlRouterProvider.otherwise("/main");
            $stateProvider.state('main',{
                url:'/main',
                templateUrl:'/tpl/mainboard.html',
                controller:'dafifo.mainboard.mainboardController',
                resolve: loadSequence(['dafifo.mainboard'])
            }).state("main.desktop",{
                url:"/desktop",
                cache:false,
                views:{
                    'mainboard@main':{
                        controller:'dafifo.desktop.desktopController',
                        templateUrl:"tpl/desktop.html"
                    }
                },
                resolve: loadSequence(['dafifo.desktop'])
            }).state("main.module",{
                url:"/module",
                cache:false,
                views:{
                    'mainboard@main':{
                        controller:'dafifo.module.moduleController',
                        templateUrl:"tpl/permission/module.html"
                    }
                },
                resolve: loadSequence(['dafifo.module'])
            }).state("main.user",{
                url:"/user",
                cache:false,
                views:{
                    'mainboard@main':{
                        controller:'dafifo.user.userController',
                        templateUrl:"tpl/permission/user.html"
                    }
                },
                resolve: loadSequence(['dafifo.user'])
            }).state("main.role",{
                url:"/role",
                cache:false,
                views:{
                    'mainboard@main':{
                        controller:'dafifo.role.roleController',
                        templateUrl:"tpl/permission/role.html"
                    }
                },
                resolve: loadSequence(['dafifo.role'])
            });

            function loadSequence(srcs, callback) {
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function( $ocLazyLoad, $q ){
                            var deferred = $q.defer();
                            var promise  = false;
                            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                            if(!promise){
                                promise = deferred.promise;
                            }
                            angular.forEach(srcs, function(src) {
                                promise = promise.then( function(){
                                    var name = '';
                                    if(JQ_CONFIG[src]){
                                        return $ocLazyLoad.load(JQ_CONFIG[src]);
                                    }
                                    angular.forEach(MODULE_CONFIG, function(module) {
                                        if( module.name == src){
                                            name = module.name;
                                        }else{
                                            name = src;
                                        }
                                    });
                                    return $ocLazyLoad.load(name);
                                } );
                            });
                            deferred.resolve();
                            return callback ? promise.then(function(){ return callback(); }) : promise;
                        }]
                };
            }
        }
    ]);