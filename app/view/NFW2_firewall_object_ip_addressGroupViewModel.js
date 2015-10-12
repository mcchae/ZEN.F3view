
Ext.define('NFW2.view.NFW2_firewall_object_ip_addressGroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_ip_addressgroup',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        obj_unrefer: __zen('obj_unrefer'),
        obj_unused: __zen('obj_unused'),
        obj_name: __zen('obj_name'),
        domain: __zen('domain'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        confirm: __zen('confirm'),
        group_member: __zen('group_member'),
        obj_count: __zen('obj_count'),
        count_mem: __zen('count_mem')
    }

});