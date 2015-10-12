
Ext.define('NFW2.view.NFW2_monitor_network_arpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_arp',

    data: {
        ipv4: __zen('ipv4'),
        ipv6: __zen('ipv6'),
        del: __zen('del'),
        inter: __zen('inter'),
        ip: __zen('ip'),
        mac: __zen('mac'),
        flags: __zen('flags'),
        hard_ware: __zen('hard_ware'),
        nodata_monitor_arp: __zen('nodata_monitor_arp')
    }

});