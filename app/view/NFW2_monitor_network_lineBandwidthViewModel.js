
Ext.define('NFW2.view.NFW2_monitor_network_lineBandwidthViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_linebandwidth',

    data: {
        nodata_monitor_bandwidth: __zen('nodata_monitor_bandwidth'),
        measure_server_ip: __zen('measure_server_ip'),
        inter: __zen('inter'),
        measure_line: __zen('measure_line'),
        hours: __zen('hours'),
        tx: __zen('tx'),
        rx: __zen('rx'),
        section: __zen('section'),
        sec_10: __zen('sec_10')
    }

});