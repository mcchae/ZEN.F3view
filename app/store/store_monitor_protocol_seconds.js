
Ext.define('NFW2.store.store_monitor_protocol_seconds', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_protocol_seconds',
            data: [
                {
                    value: 60,
                    name: '1분'
                },
                {
                    value: 300,
                    name: '5분'
                },
                {
                    value: 1800,
                    name: '30분'
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