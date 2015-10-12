
Ext.define('NFW2.view.win_bgp_ad_settingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_bgp_ad_setting',

    data: {
        distance: __zen('distance'),
        rip: __zen('rip'),
        ospf: __zen('ospf'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add: __zen('add'),
        ip_mask: __zen('ip_mask'),
        option: __zen('option')
    }

});