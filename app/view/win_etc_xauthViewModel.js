
Ext.define('NFW2.view.win_etc_xauthViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_etc_xauth',

    data: {
        xauth_user: __zen('xauth_user'),
        user_id: __zen('user_id'),
        pw: __zen('pwd'),
        pw_confirm: __zen('pwd_confirm'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});