
Ext.define('NFW2.view.win_report_generateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_report_generate',

    data: {
        report_name: __zen('report_name'),
        desc: __zen('desc'),
        e_mail: __zen('e_mail'),
        set: __zen('set'),
        type3: __zen('type3'),
        storage_period: __zen('storage_period'),
        generate_time: __zen('generate_time'),
        system: __zen('system'),
        system_set: __zen('system_set'),
        system_policy: __zen('system_policy'),
        system_usage: __zen('system_usage'),
        system_packet: __zen('system_packet'),
        system_critical: __zen('system_critical'),
        system_expire: __zen('system_expire'),
        tracker: __zen('tracker'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add_email: __zen('add_email')
    }

});