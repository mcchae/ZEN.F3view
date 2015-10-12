
Ext.define('NFW2.view.win_ipm_networkViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ipm_network',

    data: {
        obj_name: __zen('obj_name'),
        inter: __zen('inter'),
        network: __zen('network'),
        detect: __zen('detect'),
        deny: __zen('deny'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        default_action: __zen('default_action'),
        ip_scan_period: __zen('ip_scan_period'),
        ip_scan_per_sec: __zen('ip_scan_per_sec')
    }

});