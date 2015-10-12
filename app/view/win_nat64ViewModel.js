
Ext.define('NFW2.view.win_nat64ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_nat64',

    data: {
        spd_add: 'NAT64 '+__zen('add'),
        spd_edit: 'NAT64 '+__zen('edit'),
        src: __zen('src'),
        xsrc: __zen('xsrc'),
        service: __zen('service'),
        ipv6_group: __zen('ipv6_group'),
        rule_rank: __zen('rule_rank'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});