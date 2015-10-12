
Ext.define('NFW2.view.win_ipv6SPDViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ipv6spd',

    data: {
        spd_add: __zen('spd_add'),
        spd_edit: __zen('spd_edit'),
        src: __zen('src'),
        dest: __zen('dest'),
        service: __zen('service'),
        basic_set: __zen('basic_setting'),
        profile: __zen('profile'),
        detail_set: __zen('detail_setting'),
        rule_rank: __zen('rule_rank'),
        rule_two_way: __zen('rule_two_way'),
        action: __zen('action'),
        timeout: __zen('timeout'),
        header: 'IPv6 '+__zen('header'),
        sec: __zen('sec'),
        log: __zen('log'),
        desc: __zen('desc'),
        web_filtering: __zen('web_filtering'),
        app_control: __zen('app_control'),
        ips: __zen('ips'),
        av: __zen('av'),
        as: __zen('as'),
        schedule: __zen('schedule'),
        qos: __zen('qos'),
        ses_usage: __zen('ses_usage'),
        fw_valid_period: __zen('fw_valid_period'),
        fw_email_set: __zen('fw_email_set'),
        fw_email_info1: __zen('fw_email_info1'),
        ssl_inspection: __zen('ssl_inspection'),
        priority_level: __zen('priority_level'),
        info_deny: '* '+__zen('info_deny'),
        high: __zen('high'),
        middle: __zen('middle'),
        low: __zen('low'),
        name: __zen('name'),
        port: __zen('port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});