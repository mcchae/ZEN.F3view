
Ext.define('NFW2.view.win_user_serverViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_user_server',

    data: {
        search_type: __zen('search_type'),
        obj_name: __zen('obj_name'),
        server_type: __zen('server_type'),
        server_address: __zen('server_address'),
        desc: __zen('desc'),
        connection_port: __zen('connection_port'),
        base_dn: __zen('base_dn'),
        bind_dn: __zen('bind_dn'),
        bind_pwd: __zen('bind_pwd'),
        user_id: __zen('user_id'),
        pwd: __zen('pwd'),
        test: __zen('test'),
        test_result: __zen('test_result'),
        shared_pwd: __zen('shared_pwd'),
        user_name: __zen('user_name'),
        user_depart: __zen('user_depart'),
        user_group: __zen('user_group'),
        user_group_mem: __zen('user_group_mem'),
        detail_setting: __zen('detail_setting'),
        basic_setting: __zen('basic_setting'),
        auth_test: __zen('auth_test'),
        properties_name: __zen('properties_name'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});