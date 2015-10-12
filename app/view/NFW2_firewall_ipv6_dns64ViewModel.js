
Ext.define('NFW2.view.NFW2_firewall_ipv6_dns64ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_ipv6_dns64',

    data: {
        title: __zen('dns64'),
        prefix: __zen('prefix'),
        eth: __zen('ipv6_eth'),
        info1: __zen('dns64_info1'),
        info2: __zen('dns64_info2'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});