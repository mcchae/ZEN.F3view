
Ext.define('NFW2.store.store_networkSpeed_half', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_networkSpeed_half',
            data: [
                {
                    value: '10',
                    name: '10Mbps'
                },
                {
                    value: '100',
                    name: '100Mbps'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});