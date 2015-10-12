
Ext.define('NFW2.view.NFW2_firewall_profile_configViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_profile_config',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        pro_unrefer: __zen('pro_unrefer'),
        pro_unused: __zen('pro_unused'),
        profile_name: __zen('profile_name'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        copy: __zen('copy'),
        application: __zen('application'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        confirm: __zen('confirm')
    }

});