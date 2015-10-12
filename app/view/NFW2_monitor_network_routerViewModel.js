
Ext.define('NFW2.view.NFW2_monitor_network_routerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_router',

    data: {
        nodata_monitor_router: __zen('nodata_monitor_router'),
        inter: __zen('inter'),
        dest: __zen('dest'),
        gateway: __zen('gateway'),
        distance: __zen('distance'),
        metric: __zen('metric'),
        flags: __zen('flags'),
        uptime: __zen('uptime'),
        protocol_type: __zen('protocol_type'),
        ipv4: __zen('ipv4'),
        ipv6: __zen('ipv6')
    }

});