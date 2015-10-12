
Ext.define('NFW2.view.NFW2_ipm_networkViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ipm_network',

    data: {
        obj_name: __zen('obj_name'),
        inter: __zen('inter'),
        network: __zen('network'),
        desc: __zen('desc'),
        add: __zen('add'),
        del: __zen('del'),
        default_action: __zen('default_action'),
        ip_scan_period: __zen('ip_scan_period'),
        ip_scan_per_sec: __zen('ip_scan_per_sec')
    }

});