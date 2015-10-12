
Ext.define('NFW2.view.win_network_protocol_ospf_interfaceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_network_protocol_ospf_interface',

    data: {
        inter: __zen('inter'),
        type4: __zen('type4'),
        header_o_auth: __zen('header_o_auth'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        cost: __zen('cost'),
        priority_level: __zen('priority_level')
    }

});