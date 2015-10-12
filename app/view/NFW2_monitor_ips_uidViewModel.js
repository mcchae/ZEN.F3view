
Ext.define('NFW2.view.NFW2_monitor_ips_uidViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_ips_uid',

    data: {
        min_5: __zen('min_5'),
        min_10: __zen('min_10'),
        min_30: __zen('min_30'),
        hour_1: __zen('hour_1'),
        hour_5: __zen('hour_5'),
        hour_12: __zen('hour_12'),
        filter_set: __zen('filter_set'),
        filter_unused: __zen('filter_unused'),
        hours: __zen('hours'),
        rule_id: __zen('rule_id'),
        fsid: __zen('fsid'),
        sig_name: __zen('sig_name'),
        attacker_port: __zen('attacker_port'),
        dest_port_ips: __zen('dest_port_ips'),
        action: __zen('action'),
        count: __zen('count'),
        bytes: __zen('bytes'),
        deny: __zen('deny'),
        note: __zen('note'),
        detect_per_policy: __zen('detect_per_policy')
    }

});