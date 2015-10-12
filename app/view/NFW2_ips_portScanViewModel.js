
Ext.define('NFW2.view.NFW2_ips_portScanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ips_portscan',

    data: {
        action: __zen('action'),
        detect_time: __zen('detect_time'),
        protocol: __zen('protocol'),
        sensitivity: __zen('sensitivity'),
        expect_ip_set: __zen('expect_ip_set'),
        src: __zen('src'),
        dest: __zen('dest'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        
    }

});