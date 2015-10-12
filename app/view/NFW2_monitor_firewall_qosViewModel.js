
Ext.define('NFW2.view.NFW2_monitor_firewall_qosViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_qos',

    data: {
        inter: __zen('inter'),
        qos_user: __zen('qos_user'),
        policy: __zen('policy'),
        application: __zen('application'),
        guarant_band: __zen('guarant_band'),
        queue_method: __zen('queue_method'),
        limit_band: __zen('limit_band'),
        packet_dump: __zen('packet_dump'),
        bps_tx: __zen('bps_tx'),
        queue_usage: __zen('queue_usage'),
        rule_id: __zen('rule_id'),
        application: __zen('application'),
        nodata_monitor_qos: __zen('nodata_monitor_qos')
    }

});