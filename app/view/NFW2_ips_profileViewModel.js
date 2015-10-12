
Ext.define('NFW2.view.NFW2_ips_profileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ips_profile',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        copy: __zen('copy'),
        profile_name: __zen('profile_name'),
        fw_policy_id: __zen('fw_policy_id'),
        desc: __zen('desc')
    }

});