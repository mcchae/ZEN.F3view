
Ext.define('NFW2.view.NFW2_firewall_policy_ipv6_filteringViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_policy_ipv6_filtering',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        fw_verify: __zen('fw_verify'),
        fw_dob: __zen('fw_dob'),
        fw_unrefer: __zen('fw_unrefer'),
        fw_audit: __zen('fw_audit'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        file_find: __zen('file_find'),
        fw_export: __zen('fw_export'),
        fw_import: __zen('fw_import'),
        src: __zen('src'),
        dest: __zen('dest'),
        svc: __zen('service'),
        header: 'IPv6 '+__zen('header'),
        src_port: __zen('src_port'),
        dest_port: __zen('dest_port'),
        fw_count: __zen('fw_count'),
        rank: __zen('rank'),
        rule_id: __zen('rule_id'),
        two_way: __zen('two_way'),
        action: __zen('action'),
        timeout: __zen('timeout'),
        log: __zen('log'),
        profile: __zen('profile'),
        detail_set: __zen('detail_setting'),
        last_hit: __zen('last_hit'),
        valid_period: __zen('valid_period'),
        desc: __zen('desc'),
        use: __zen('use'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});