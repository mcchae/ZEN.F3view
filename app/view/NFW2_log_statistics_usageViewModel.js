
Ext.define('NFW2.view.NFW2_log_statistics_usageViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_statistics_usage',

    data: {
        date: __zen('date'),
        usage_statistics: __zen('usage_statistics'),
        per_inter_traffic: __zen('per_inter_traffic'),
        statistics_info1: __zen('statistics_info1'),
        inter_traffic: __zen('inter_traffic'),
        time: __zen('time'),
        inter: __zen('inter'),
        rx_packet: __zen('rx_packet'),
        tx_packet: __zen('tx_packet'),
        rx_byte: __zen('rx_byte'),
        tx_byte: __zen('tx_byte'),
        drop_byte: __zen('drop_byte'),
        cpu: __zen('cpu'),
        memory: __zen('memory'),
        fw_session: __zen('fw_session'),
        disk: __zen('disk'),
        search: __zen('search'),
        day: __zen('day'),
        yesterday: __zen('yesterday'),
        one_month: __zen('one_month'),
        month: __zen('month'),
        today: __zen('today')
    }

});