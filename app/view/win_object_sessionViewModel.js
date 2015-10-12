
Ext.define('NFW2.view.win_object_sessionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_object_session',

    data: {
        obj_name: __zen('obj_name'),
        desc: __zen('desc'),
        operate_mode: __zen('operate_mode'),
        session_new : __zen('session_new'),
        session_limit: __zen('session_limit'),
        session_access: __zen('session_access'),
        session_user: __zen('session_user'),
        limit_size: __zen('limit_size'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});