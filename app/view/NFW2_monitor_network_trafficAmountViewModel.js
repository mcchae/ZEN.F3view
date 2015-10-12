
Ext.define('NFW2.view.NFW2_monitor_network_trafficAmountViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_trafficamount',

    data: {
        integrate_tx_rx: __zen('integrate_tx_rx'),
        tx_rx_per_inter: __zen('tx_rx_per_inter'),
        tx_per_inter: __zen('tx_per_inter'),
        min_30: __zen('min_30'),
        hour_1: __zen('hour_1'),
        hour_12: __zen('hour_12'),
        hour_24: __zen('hour_24')
    }

});