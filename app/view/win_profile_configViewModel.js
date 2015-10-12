
Ext.define('NFW2.view.win_profile_configViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_profile_config',

    data: {
        url: __zen('url'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        web_filter_info1: __zen('web_filter_info1')
    }

});