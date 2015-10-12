
Ext.define('NFW2.store.store_monitor_mem_key', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_mem_key',
            data: [
                {
                    value: 'membuf',
                    name: 'Buffered'
                },
                {
                    value: 'memcac',
                    name: 'Cached'
                },
                {
                    value: 'memfre',
                    name: 'Free'
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