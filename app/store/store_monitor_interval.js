
Ext.define('NFW2.store.store_monitor_interval', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_interval',
            data: [
                {
                    value: 2000,
                    name: '2'
                },
                {
                    value: 5000,
                    name: '5'
                },
                {
                    value: 10000,
                    name: '10'
                },
                {
                    value: 30000,
                    name: '30'
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