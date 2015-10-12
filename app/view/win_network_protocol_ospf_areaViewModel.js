
Ext.define('NFW2.view.win_network_protocol_ospf_areaViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_network_protocol_ospf_area',

    data: {
        type4: __zen('type4'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        area: __zen('area'),
        peer_ip: __zen('peer_ip')
    }

});