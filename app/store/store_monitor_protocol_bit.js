
Ext.define('NFW2.store.store_monitor_protocol_bit', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_protocol_bit',
            data: [
                {
                    value: 'bytes',
                    name: 'Bytes'
                },
                {
                    value: 'pkt',
                    name: 'Packet'
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