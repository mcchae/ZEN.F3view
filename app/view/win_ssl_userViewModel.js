
Ext.define('NFW2.view.win_ssl_userViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ssl_user',

    data: {
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        user_id: __zen('user_id'),
        name: __zen('name'),
        title: __zen('title'),
        depart: __zen('depart'),
        pwd: __zen('pwd'),
        pwd_confirm: __zen('pwd_confirm')
    }

});