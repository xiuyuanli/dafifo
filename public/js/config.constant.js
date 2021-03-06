'use strict';

dafifoApp.constant('JQ_CONFIG', {
    printArea:['./libs/jquery/printarea/jquery-ui-1.10.4.custom.min.js',
                './libs/jquery/printarea/jquery.PrintArea.js',
                './libs/jquery/printarea/jquery-ui-1.10.4.custom.min.css'],
    slimScroll:['./libs/jquery/printarea/PrintArea.css'],
    scroll:['./libs/jquery/scroll/jquery.mCustomScrollbar.css','./libs/jquery/scroll/jquery.mCustomScrollbar.concat.min.js'],
    drag:['./libs/jquery/drag/drag.js']
})
.constant('MODULE_CONFIG', [
    {
        name:"dafifo.mainboard",
        module:true,
        files:[
            'css/main/main.css',
            'js/mainboard/mainboard.js'
        ]
    },
    {
        name:"dafifo.desktop",
        module:true,
        files:[
            'js/mainboard/desktop.js'
        ]
    },
    {
        name:"dafifo.module",
        module:true,
        files:[
            'js/permission/module.js'
        ]
    },
    {
        name:"dafifo.user",
        module:true,
        files:[
            'js/permission/user.js'
        ]
    }
])
.config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
        $ocLazyLoadProvider.config({
            debug:  false,
            events: true,
            modules: MODULE_CONFIG
        });
 }]);
