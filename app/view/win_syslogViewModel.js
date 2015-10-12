
Ext.define('NFW2.view.win_syslogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_syslog',

    data: {
        ip: __zen('ip'),
        port: __zen('port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        log: __zen('log')
    }

});