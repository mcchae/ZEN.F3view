
Ext.define('NFW2.view.win_antispam_spamViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_antispam_spam',

    data: {
        rank: __zen('rank'),
        type: __zen('type'),
        contents: __zen('contents'),
        action: __zen('action'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        deny: __zen('deny'),
        detect: __zen('detect'),
        allow: __zen('allow')
    }

});