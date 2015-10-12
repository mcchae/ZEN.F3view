
Ext.define('NFW2.store.store_usage_cpu', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_usage_cpu',
            fields: [
                {
                    name: 'time'
                },
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
                    name: 'hdd'
                }
            ]
        }, cfg)]);
    }
});