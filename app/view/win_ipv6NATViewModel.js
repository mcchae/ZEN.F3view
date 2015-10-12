
Ext.define('NFW2.view.win_ipv6NATViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ipv6nat',

    data: {
        spd_add: 'NAT '+__zen('add'),
        spd_edit: 'NAT '+__zen('edit'),
        src: __zen('src'),
        dest: __zen('dest'),
        service: __zen('service'),
        xsrc: __zen('xsrc'),
        xdest: __zen('xdest'),
        xservice: __zen('xservice'),
        rule_rank: __zen('rule_rank'),
        type: __zen('type'),
        eth: __zen('eth'),
        desc: __zen('desc'),
        change: __zen('change'),
        name: __zen('name'),
        port: __zen('port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});