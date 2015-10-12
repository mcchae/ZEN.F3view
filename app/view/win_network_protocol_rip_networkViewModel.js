
Ext.define('NFW2.view.win_network_protocol_rip_networkViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_network_protocol_rip_network',

    data: {
        ip_mask: __zen('ip_mask'),
        name: __zen('name'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        ip_prefix: __zen('ip_prefix')
    }

});