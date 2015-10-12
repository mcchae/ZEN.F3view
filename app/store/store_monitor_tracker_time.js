
Ext.define('NFW2.store.store_monitor_tracker_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_tracker_time',
            data: [
                {
                    time: '2',
                    val: '2000'
                },
                {
                    time: '5',
                    val: '5000'
                },
                {
                    time: '10',
                    val: '10000'
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