
Ext.define('NFW2.view.NFW2_ips_ipSpoofingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ips_ipspoofing',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        inter: __zen('inter'),
        ipv4_local: __zen('ipv4_local'),
        ipv6_local: __zen('ipv6_local'),
        use: __zen('use'),
        unused: __zen('unused')
    }

});