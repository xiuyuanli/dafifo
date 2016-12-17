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
                views:{
                    'mainboard@main':{
                        controller:'dafifo.mainboard.desktopController',
                        templateUrl:"tpl/desktop.html"
                    }
                },
                resolve: loadSequence(['dafifo.desktop'])
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