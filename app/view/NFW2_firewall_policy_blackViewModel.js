
Ext.define('NFW2.view.NFW2_firewall_policy_blackViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_policy_black',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        all_del: __zen('all_del'),
        file_find: __zen('file_find'),
        confirm: __zen('confirm'),
        ipv4: __zen('ipv4'),
        desc: __zen('desc'),
        registered_date: __zen('registered_date'),
        fw_export: __zen('fw_export'),
        fw_import: __zen('fw_import'),
        fw_count: __zen('fw_count')
    }

});