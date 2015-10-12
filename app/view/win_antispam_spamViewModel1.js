
Ext.define('NFW2.view.win_antispam_spamViewModel1', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_antispam_mailfilter',

    data: {
        rank: __zen('rank'),
        mail_address: __zen('mail_address'),
        mail_sen_rec: __zen('mail_sen_rec'),
        search_not: __zen('search_not'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});