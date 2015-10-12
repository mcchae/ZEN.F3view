
Ext.define('NFW2.view.NFW2_monitor_ipm_mapViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_ipm_map',

    data: {
        detect: __zen('detect'),
        deny: __zen('deny'),
        allow: __zen('allow'),
        obj_name: __zen('obj_name'),
        inter: __zen('inter'),
        action: __zen('action'),
        ip_scan_period: __zen('ip_scan_period'),
        ip_scan_per_sec: __zen('ip_scan_per_sec'),
        network: __zen('network')
    }

});