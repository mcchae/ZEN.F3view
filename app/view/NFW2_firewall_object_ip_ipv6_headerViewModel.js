
Ext.define('NFW2.view.NFW2_firewall_object_ip_ipv6_headerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_ip_ipv6_header',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        obj_unrefer: __zen('obj_unrefer'),
        obj_unused: __zen('obj_unused'),
        obj_name: __zen('obj_name'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        confirm: __zen('confirm'),
        header: __zen('header'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        obj_count: __zen('obj_count')
    }

});