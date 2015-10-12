
Ext.define('NFW2.view.NFW2_monitor_ipm_tableViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_ipm_table',

    data: {
        inter: __zen('inter'),
        ip: __zen('ip'),
        mac: __zen('mac'),
        status: __zen('status'),
        last_hit: __zen('last_hit'),
        desc: __zen('desc'),
        set: __zen('set'),
        obj_name: __zen('obj_name')
    }

});