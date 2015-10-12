
Ext.define('NFW2.view.NFW2_firewall_object_ip_ipv6_addressViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_ip_ipv6_address',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        unrefer: __zen('obj_unrefer'),
        unused: __zen('obj_unused'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        file_find: __zen('file_find'),
        obj_export: __zen('obj_export'),
        obj_import: __zen('obj_import'),
        obj_count: __zen('obj_count'),
        count: __zen('count_mem'),
        obj_name: __zen('obj_name'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});