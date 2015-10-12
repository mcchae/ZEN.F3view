
Ext.define('NFW2.view.NFW2_monitor_firewall_trackerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_tracker',

    data: {
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        tracker_msg1: __zen('tracker_msg1'),
        all_policy: __zen('all_policy'),
        advance_policy: __zen('advance_policy'),
        del_session: __zen('del_session'),
        priority_level: __zen('priority_level'),
        rule_id: __zen('rule_id'),
        src: __zen('src'),
        dest: __zen('dest'),
        service: __zen('service'),
        action: __zen('action'),
        usage: __zen('usage2'),
        session: __zen('session'),
        packet: __zen('packet'),
        protocol: __zen('protocol'),
        src_port: __zen('src_port'),
        dest_port: __zen('dest_port')
    }

});