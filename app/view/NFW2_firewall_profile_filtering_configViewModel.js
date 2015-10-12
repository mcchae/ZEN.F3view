
Ext.define('NFW2.view.NFW2_firewall_profile_filtering_configViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_profile_filtering_config',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        copy: __zen('copy'),
        pro_unrefer: __zen('pro_unrefer'),
        pro_unused: __zen('pro_unused'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        profile_name: __zen('profile_name'),
        desc: __zen('desc'),
        confirm: __zen('confirm')
    }

});