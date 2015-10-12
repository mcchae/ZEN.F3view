
Ext.define('NFW2.store.store_tracker_ips_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_ips_protocol',
            data: [
                {
                    name: 'IP',
                    val: 0
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
                    name: 'IPIP',
                    val: 4
                },
                {
                    name: 'TCP',
                    val: 6
                },
                {
                    name: 'UDP',
                    val: 17
                },
                {
                    name: 'IPv6',
                    val: 41
                },
                {
                    name: 'ESP',
                    val: 50
                },
                {
                    name: 'AH',
                    val: 51
                },
                {
                    name: 'ICMPv6',
                    val: 58
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