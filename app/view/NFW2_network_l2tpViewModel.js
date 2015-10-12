
Ext.define('NFW2.view.NFW2_network_l2tpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_l2tp',

    data: {
        l2tp_service: __zen('l2tp_service'),
        ip_pool: __zen('ip_pool'),
        l2tp_secret_key: __zen('l2tp_secret_key'),
        auth_method: __zen('auth_method'),
        dns_server_fir: __zen('dns_server_fir'),
        dns_server_sec: __zen('dns_server_sec'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});