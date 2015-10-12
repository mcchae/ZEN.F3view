
Ext.define('NFW2.view.NFW2_monitor_firewall_sessionInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_sessioninfo',

    data: {
        session_msg1: __zen('session_msg1'),
        del: __zen('del'),
        all_del: __zen('all_del'),
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        generate_time: __zen('generate_time'),
        policy_nat_id: __zen('policy_nat_id'),
        src: __zen('src'),
        src_ip: __zen('src_ip'),
        src_port: __zen('src_port'),
        dest: __zen('dest'),
        dest_ip: __zen('dest_ip'),
        dest_port: __zen('dest_port'),
        protocol: __zen('protocol'),
        timeout: __zen('timeout'),
        packet_count: __zen('packet_count'),
        usage: __zen('usage'),
        status: __zen('status'),
        info: __zen('info')
    }

});