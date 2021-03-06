
Ext.define('NFW2.store.store_trafficAnomaly_portList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_trafficAnomaly_portList',
            fields: [
                {
                    name: 'port'
                }
            ]
        }, cfg)]);
    }
});