
Ext.define('NFW2.view.NFW2_ssl_basicViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ssl_basic',

    data: {
        ssl_tunnel_port: __zen('ssl_tunnel_port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add: __zen('add'),
        split_routing: __zen('split_routing'),
        gateway: __zen('gateway'),
        rent_ip_range: __zen('rent_ip_range'),
        device_auth: __zen('device_auth'),
        dl_ip_range: __zen('dl_ip_range'),
        import_split_routing: __zen('import_split_routing'),
        symmetrickey_algo: __zen('symmetrickey_algo'),
        client_timeout: __zen('client_timeout'),
        ssl_info1: __zen('ssl_info1')
    }

});