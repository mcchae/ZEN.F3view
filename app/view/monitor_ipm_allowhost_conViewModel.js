
Ext.define('NFW2.view.monitor_ipm_allowhost_conViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.monitor_ipm_allowhost_con',

    data: {
        ip: __zen('ip'),
        mac: __zen('mac'),
        start: __zen('start'),
        end: __zen('end'),
        desc: __zen('desc'),
        add: __zen('add'),
        del: __zen('del'),
        cancel: __zen('cancel'),
        manage_network: __zen('manage_network'),
        term_use: __zen('term_use'),
        confirm: __zen('confirm')
    }

});