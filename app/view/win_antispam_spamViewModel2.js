
Ext.define('NFW2.view.win_antispam_spamViewModel2', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_antispam_ipfilter',

    data: {
        rank: __zen('rank'),
        ip: __zen('ip'),
        search_not: __zen('search_not'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});