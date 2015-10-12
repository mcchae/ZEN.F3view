
Ext.define('NFW2.view.NFW2_monitor_ddos_trafficViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_ddos_traffic',

    data: {
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        hours: __zen('hours'),
        attack_type: __zen('attack_type'),
        protocol: __zen('protocol'),
        src: __zen('src'),
        src_port: __zen('src_port'),
        dest: __zen('dest'),
        dest_port: __zen('dest_port'),
        action: __zen('action'),
        count_byte: __zen('count_byte'),
        cancel_deny: __zen('cancel_deny'),
        nodata_monitor_ddos: __zen('nodata_monitor_ddos')
    }

});