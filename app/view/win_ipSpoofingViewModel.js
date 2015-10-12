
Ext.define('NFW2.view.win_ipSpoofingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ipspoofing',

    data: {
        inter: __zen('inter'),
        ipv4_local: __zen('ipv4_local'),
        ipv6_local: __zen('ipv6_local'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});