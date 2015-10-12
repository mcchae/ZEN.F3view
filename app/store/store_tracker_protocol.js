
Ext.define('NFW2.store.store_tracker_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_protocol',
            data: [
                {
                    name: 'TCP',
                    val: 6
                },
                {
                    name: 'UDP',
                    val: 17
                },
                {
                    name: 'ICMP',
                    val: 1
                },
                {
                    name: 'IGMP',
                    val: 2
                },
                {
                    name: 'AH',
                    val: 51
                },
                {
                    name: 'ESP',
                    val: 50
                },
                {
                    name: 'GRE',
                    val: 47
                },
                {
                    name: 'ICMPv6',
                    val: 58
                },
                {
                    name: 'EIGRP',
                    val: 88
                },
                {
                    name: 'OSPF',
                    val: 89
                },
                {
                    name: 'RIP',
                    val: 520
                },
                {
                    name: 'ISIS',
                    val: 124
                },
                {
                    name: 'PIM',
                    val: 103
                },
                {
                    name: 'IGRP',
                    val: 9
                },
                {
                    name: 'RSVP',
                    val: 46
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});