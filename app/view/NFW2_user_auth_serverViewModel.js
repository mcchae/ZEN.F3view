
Ext.define('NFW2.view.NFW2_user_auth_serverViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_user_auth_server',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        search_type: __zen('search_type'),
        obj_name: __zen('obj_name'),
        server_type: __zen('server_type'),
        server_address: __zen('server_address'),
        desc: __zen('desc'),
        connection_port: __zen('connection_port'),
        obj_count: __zen('obj_count')
    }

});