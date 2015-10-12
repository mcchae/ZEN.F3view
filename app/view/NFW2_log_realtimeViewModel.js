
Ext.define('NFW2.view.NFW2_log_realtimeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_realtime',

    data: {
        generate_time: __zen('generate_time'),
        src_ports: __zen('src_ports'),
        dest_ports: __zen('dest_ports'),
        desc: __zen('desc'),
        system: __zen('system'),
        network: __zen('network'),
        fw: __zen('fw'),
        ipsec_vpn: __zen('ipsec_vpn'),
        ssl_vpn: __zen('ssl_vpn'),
        ips: __zen('ips'),
        ddos: __zen('ddos'),
        av: __zen('av'),
        as: __zen('as')
    }

});