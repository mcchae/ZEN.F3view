
Ext.define('NFW2.view.NFW2_log_statistics_logViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_statistics_log',

    data: {
        date: __zen('date'),
        time: __zen('time'),
        search: __zen('search'),
        day: __zen('day'),
        yesterday: __zen('yesterday'),
        one_month: __zen('one_month'),
        month: __zen('month'),
        today: __zen('today'),
        system: __zen('system'),
        network: __zen('network'),
        fw: __zen('fw'),
        ssl_vpn: __zen('ssl_vpn'),
        ips: __zen('ips'),
        av: __zen('av'),
        as: __zen('as'),
        total: __zen('total'),
        ddos: __zen('ddos'),
        ipsec_vpn: __zen('ipsec_vpn')
    }

});