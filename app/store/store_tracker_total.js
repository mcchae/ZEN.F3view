
Ext.define('NFW2.store.store_tracker_total', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_total',
            fields: [
                {
                    name: 'start_ts'
                },
                {
                    name: 'end_ts'
                },
                {
                    name: 'total_packets'
                },
                {
                    name: 'total_bytes'
                },
                {
                    name: 'total_sessionCnt'
                }
            ]
        }, cfg)]);
    }
});