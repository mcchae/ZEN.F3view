
Ext.define('NFW2.view.NFW2_firewall_policy_ipv6_NATViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_policy_ipv6_nat',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        fw_verify: __zen('fw_verify'),
        fw_dob: __zen('fw_dob'),
        fw_unrefer: __zen('fw_unrefer'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        file_find: __zen('file_find'),
        fw_export: __zen('fw_export'),
        fw_import: __zen('fw_import'),
        src: __zen('src'),
        dest: __zen('dest'),
        service: __zen('service'),
        xsrc: __zen('xsrc'),
        xdest: __zen('xdest'),
        xservice: __zen('xservice'),
        src_port: __zen('src_port'),
        dest_port: __zen('dest_port'),
        fw_count: __zen('fw_count'),
        rank: __zen('rank'),
        rule_id: __zen('rule_id'),
        type: __zen('type'),
        eth: __zen('eth'),
        last_hit: __zen('last_hit'),
        desc: __zen('desc'),
        use: __zen('use'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});