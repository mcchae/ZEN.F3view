
Ext.define('NFW2.view.win_ospf_ad_settingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ospf_ad_setting',

    data: {
        distance: __zen('distance'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        rip: __zen('rip'),
        bgp: __zen('bgp'),
        metric: __zen('metric'),
        ip_mask: __zen('ip_mask'),
        option: __zen('option'),
        add: __zen('add')
    }

});