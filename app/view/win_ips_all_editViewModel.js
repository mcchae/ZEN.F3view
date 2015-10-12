
Ext.define('NFW2.view.win_ips_all_editViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ips_all_edit',

    data: {
        all: __zen('all'),
        action: __zen('action'),
        deny_type: __zen('deny_type'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});