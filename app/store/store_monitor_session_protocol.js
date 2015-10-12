
Ext.define('NFW2.store.store_monitor_session_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_session_protocol',
            data: [
                {
                    name: 'ALL',
                    value: 'all'
                },
                {
                    name: 'TCP',
                    value: 'tcp'
                },
                {
                    name: 'UDP',
                    value: 'udp'
                },
                {
                    name: 'ICMP',
                    value: 'icmp'
                },
                {
                    name: 'IGMP',
                    value: 'igmp'
                },
                {
                    name: 'AH',
                    value: 'ah'
                },
                {
                    name: 'ESP',
                    value: 'esp'
                },
                {
                    name: 'GRE',
                    value: 'gre'
                },
                {
                    name: 'ICMPv6',
                    value: 'icmpv6'
                },
                {
                    name: 'EIGRP',
                    value: 'eigrp'
                },
                {
                    name: 'OSPF',
                    value: 'ospf'
                },
                {
                    name: 'ISIS',
                    value: 'isis'
                },
                {
                    name: 'PIM',
                    value: 'pim'
                },
                {
                    name: 'RSVP',
                    value: 'rsvp'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});