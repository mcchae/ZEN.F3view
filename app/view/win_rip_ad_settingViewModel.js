
Ext.define('NFW2.view.win_rip_ad_settingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_rip_ad_setting',

    data: {
        metric: __zen('metric'),
        distance: __zen('distance'),
        update: __zen('update'),
        timeout: __zen('timeout'),
        use: __zen('use'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        default_originate: __zen('default_originate'),
        ip_mask: __zen('ip_mask'),
        option: __zen('option'),
        add: __zen('add')
    }

});