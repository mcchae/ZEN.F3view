
Ext.define('NFW2.store.store_monitor_ipsec_ike', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ipsec_ike',
            fields: [
                {
                    name: 'ike_memory'
                },
                {
                    name: 'sa1'
                },
                {
                    name: 'sa2'
                }
            ]
        }, cfg)]);
    }
});