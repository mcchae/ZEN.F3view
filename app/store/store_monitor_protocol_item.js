
Ext.define('NFW2.store.store_monitor_protocol_item', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_protocol_item',
            data: [
                {
                    value: 'tcp',
                    name: 'TCP'
                },
                {
                    value: 'udp',
                    name: 'UDP'
                },
                {
                    value: 'icmp',
                    name: 'ICMP'
                },
                {
                    value: 'esp',
                    name: 'ESP'
                },
                {
                    value: 'other',
                    name: 'Others'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});