
Ext.define('NFW2.view.NFW2_monitor_system_daemonViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_system_daemon',

    data: {
        daemon_info1: __zen('daemon_info1'),
        name: __zen('name'),
        status: __zen('status'),
        memory: __zen('memory'),
        start_time: __zen('start_time'),
        monitoring_time: __zen('monitoring_time'),
        desc: __zen('desc'),
        start: __zen('start'),
        stop: __zen('stop'),
        restart: __zen('restart')
    }

});