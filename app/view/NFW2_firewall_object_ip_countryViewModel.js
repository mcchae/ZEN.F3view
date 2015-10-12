
Ext.define('NFW2.view.NFW2_firewall_object_ip_countryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_ip_country',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        unrefer: __zen('obj_unrefer'),
        unused: __zen('obj_unused'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        target_addr: __zen('target_addr'),
        ctcode_search: __zen('ctcode_search'),
        country_code: __zen('country_code'),
        obj_name: __zen('obj_name'),
        obj_count: __zen('obj_count'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});