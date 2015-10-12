
Ext.define('NFW2.view.NFW2_monitor_network_protocolViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_protocol',

    data: {
        bytes: __zen('bytes'),
        packets: __zen('packets'),
        min_1: __zen('min_1'),
        min_5: __zen('min_5'),
        min_30: __zen('min_30')
    }

});