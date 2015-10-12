
Ext.define('NFW2.view.win_network_protocol_bgp_addressViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_network_protocol_bgp_address',

    data: {
        port: __zen('port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        neighbor_ip: __zen('neighbor_ip'),
        as_remote: __zen('as_remote'),
        default_originate: __zen('default_originate')
    }

});