
Ext.define('NFW2.view.win_network_protocol_ospf_networkViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_network_protocol_ospf_network',

    data: {
        network: __zen('network'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        area: __zen('area')
    }

});