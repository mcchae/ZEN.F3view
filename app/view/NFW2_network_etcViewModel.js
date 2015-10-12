
Ext.define('NFW2.view.NFW2_network_etcViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_etc',

    data: {
        measure_band: __zen('measure_band'),
        require_port: __zen('require_port'),
        add_mirroring: __zen('add_mirroring'),
        target_inter: __zen('target_inter'),
        receive_packet: __zen('receive_packet'),
        trans_packet: __zen('trans_packet'),
        mirror_inter: __zen('mirror_inter'),
        inter: __zen('inter'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});