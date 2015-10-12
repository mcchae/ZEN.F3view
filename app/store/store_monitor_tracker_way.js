
Ext.define('NFW2.store.store_monitor_tracker_way', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_tracker_way',
            data: [
                {
                    name: 'All'
                },
                {
                    name: 'Tx'
                },
                {
                    name: 'Rx'
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