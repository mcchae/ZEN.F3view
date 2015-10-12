
Ext.define('NFW2.store.store_usage_interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_usage_interface',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'eth'
                },
                {
                    name: 'rxPacket'
                },
                {
                    name: 'txPacket'
                },
                {
                    name: 'rxByte'
                },
                {
                    name: 'txByte'
                },
                {
                    name: 'dropByte'
                }
            ]
        }, cfg)]);
    }
});