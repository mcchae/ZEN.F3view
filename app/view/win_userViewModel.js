
Ext.define('NFW2.view.win_userViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_user',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        confirm: __zen('confirm'),
        user_depart: __zen('user_depart'),
        obj_name: __zen('obj_name'),
        user_id: __zen('user_id'),
        user_name: __zen('user_name'),
        auth_server: __zen('auth_server'),
        idle_timeout: __zen('idle_timeout'),
        last_hit: __zen('last_hit'),
        limit_access: __zen('limit_access'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        cancel: __zen('cancel'),
        pwd: __zen('pwd'),
        pwd_confirm: __zen('pwd_confirm')
    }

});