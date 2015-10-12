
Ext.define('NFW2.store.store_traffic_interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_traffic_interface',
            fields: [
                {
                    name: 'eth0_tx'
                },
                {
                    name: 'eth1_tx'
                },
                {
                    name: 'eth2_tx'
                },
                {
                    name: 'eth3_tx'
                },
                {
                    name: 'eth0_rx'
                },
                {
                    name: 'eth1_rx'
                },
                {
                    name: 'eth2_rx'
                },
                {
                    name: 'eth3_rx'
                },
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});