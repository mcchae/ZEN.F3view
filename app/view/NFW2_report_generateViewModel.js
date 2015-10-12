
Ext.define('NFW2.view.NFW2_report_generateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_report_generate',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        add_intgrate_report: __zen('add_intgrate_report'),
        report_daily: __zen('report_daily'),
        report_weekly: __zen('report_weekly'),
        report_monthly: __zen('report_monthly'),
        report_specific: __zen('report_specific'),
        report_intgrate: __zen('report_intgrate'),
        report_name: __zen('report_name'),
        desc: __zen('desc'),
        set: __zen('set'),
        generate_count: __zen('generate_count')
    }

});