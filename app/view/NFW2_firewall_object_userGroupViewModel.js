
Ext.define('NFW2.view.NFW2_firewall_object_userGroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_usergroup',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        obj_unrefer: __zen('obj_unrefer'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        confirm: __zen('confirm'),
        obj_unused: __zen('obj_unused'),
        server_select: __zen('server_select'),
        search_type: __zen('search_type'),
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
        user_import: __zen('user_import'),
        mem_obj_name: __zen('mem_obj_name'),
        user_group_import: __zen('user_group_import'),
        obj_count: __zen('obj_count')
    }

});