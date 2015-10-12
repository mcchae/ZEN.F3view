
Ext.define('NFW2.view.NFW2_monitor_system_cpuViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_system_cpu',

    data: {
        min_30: __zen('min_30'),
        hour_1: __zen('hour_1'),
        hour_12: __zen('hour_12'),
        hour_24: __zen('hour_24'),
        usage_cpu: __zen('usage_cpu'),
        usage_memory: __zen('usage_memory'),
        buffered: __zen('buffered'),
        cached: __zen('cached'),
        free: __zen('free'),
        maximum: __zen('maximum'),
        minimum: __zen('minimum'),
        average: __zen('average')
    }

});