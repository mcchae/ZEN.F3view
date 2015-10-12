
Ext.define('NFW2.store.store_trafficAnomaly_dns_portList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_trafficAnomaly_dns_portList',
            fields: [
                {
                    name: 'port'
                }
            ]
        }, cfg)]);
    }
});