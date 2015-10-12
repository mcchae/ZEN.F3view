
Ext.define('NFW2.view.NFW2_monitor_basicViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_basic',

    data: {
        eth_monitor: __zen('eth_monitor'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});