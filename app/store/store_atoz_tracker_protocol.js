
Ext.define('NFW2.store.store_atoz_tracker_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_atoz_tracker_protocol',
            data: [
                {
                    country_desc: '::select',
                    country_code: 'sel'
                },
                {
                    country_desc: 'IP',
                    country_code: 'ip'
                },
                {
                    country_desc: 'ICMP',
                    country_code: 'icmp'
                },
                {
                    country_desc: 'IGMP',
                    country_code: 'igmp'
                },
                {
                    country_desc: 'IPIP',
                    country_code: 'ipip'
                },
                {
                    country_desc: 'TCP',
                    country_code: 'tcp'
                },
                {
                    country_desc: 'UDP',
                    country_code: 'udp'
                },
                {
                    country_desc: 'ESP',
                    country_code: 'esp'
                },
                {
                    country_desc: 'AH',
                    country_code: 'ah'
                },
                {
                    country_desc: 'ICMPV6',
                    country_code: 'icmpv6'
                },
                
            ],
            fields: [
                {
                    name: 'country_desc'
                },
                {
                    name: 'country_code'
                }
            ]
        }, cfg)]);
    }
});