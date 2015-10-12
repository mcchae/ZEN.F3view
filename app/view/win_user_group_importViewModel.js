
Ext.define('NFW2.view.win_user_group_importViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_user_group_import',

    data: {
        group_id: __zen('group_id'),
        user_id: __zen('user_id'),
        user_name: __zen('user_name'),
        user_depart: __zen('user_depart'),
        auth_server: __zen('auth_server'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});