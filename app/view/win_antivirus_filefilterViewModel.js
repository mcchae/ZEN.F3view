
Ext.define('NFW2.view.win_antivirus_filefilterViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_antivirus_filefilter',

    data: {
        rank: __zen('rank'),
        file: __zen('file'),
        action: __zen('action'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});