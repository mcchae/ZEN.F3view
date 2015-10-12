
Ext.define('NFW2.view.win_dboard_setViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_dboard_set',

    data: {
        monitor: __zen('monitor'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});