
Ext.define('NFW2.store.store_monitor_log_realtime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_log_realtime',
            fields: [
                {
                    name: 'timestamp'
                },
                {
                    name: 'src'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'sport'
                },
                {
                    name: 'dport'
                }
            ]
        }, cfg)]);
    }
});