
Ext.define('NFW2.view.win_inter_reportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_inter_report',

    data: {
        intgrate_name: __zen('intgrate_name'),
        intgrate_desc: __zen('intgrate_desc'),
        report_method: __zen('report_method'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});