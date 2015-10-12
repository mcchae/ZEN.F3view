
Ext.define('NFW2.store.store_monitor_traffic_sinfo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_traffic_sinfo',
            fields: [
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'session'
                },
                {
                    name: 'cps'
                },
                {
                    name: 'log'
                },
                {
                    name: 'tit'
                }
            ]
        }, cfg)]);
    }
});