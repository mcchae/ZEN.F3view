
Ext.define('NFW2.store.store_traffic_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_traffic_protocol',
            fields: [
                {
                    name: 'esp_bytes'
                },
                {
                    name: 'esp_pkt'
                },
                {
                    name: 'icmp_bytes'
                },
                {
                    name: 'icmp_pkt'
                },
                {
                    name: 'other_bytes'
                },
                {
                    name: 'other_pkt'
                },
                {
                    name: 'tcp_bytes'
                },
                {
                    name: 'tcp_pkt'
                },
                {
                    name: 'time'
                },
                {
                    name: 'udp_bytes'
                },
                {
                    name: 'udp_pkt'
                }
            ]
        }, cfg)]);
    }
});