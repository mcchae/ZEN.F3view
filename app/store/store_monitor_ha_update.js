
Ext.define('NFW2.store.store_monitor_ha_update', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ha_update',
            data: [
                {
                    time: '10',
                    val: '10000'
                },
                {
                    time: '20',
                    val: '20000'
                },
                {
                    time: '30',
                    val: '30000'
                },
                {
                    time: '60',
                    val: '60000'
                }
            ],
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});