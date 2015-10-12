
Ext.define('NFW2.store.store_monitor_sinfo_service', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_sinfo_service',
            data: [
                {
                    name: 'All'
                },
                {
                    name: 'TCP'
                },
                {
                    name: 'UDP'
                },
                {
                    name: 'UDPLITE'
                },
                {
                    name: 'ICMP'
                },
                {
                    name: 'IGMP'
                },
                {
                    name: 'AH'
                },
                {
                    name: 'ESP'
                },
                {
                    name: 'GRE'
                },
                {
                    name: 'ICMPv6'
                },
                {
                    name: 'EIGRP'
                },
                {
                    name: 'OSPF'
                },
                {
                    name: 'ISIS'
                },
                {
                    name: 'PIM'
                },
                {
                    name: 'RSVP'
                }
            ],
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});