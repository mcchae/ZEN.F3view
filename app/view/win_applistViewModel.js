
Ext.define('NFW2.view.win_applistViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_applist',

    data: {
        name: __zen('name'),
        categorys: __zen('categorys'),
        purpose: __zen('purpose'),
        technology: __zen('technology'),
        awareness: __zen('awareness'),
        renewal_date: __zen('renewal_date'),
        content_type: __zen('content_type'),
        company: __zen('company'),
        protocol: __zen('protocol'),
        signature: __zen('signature'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        register_request: __zen('register_request')
    }

});