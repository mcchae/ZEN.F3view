
Ext.define('NFW2.store.store_traffic_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_traffic_action',
            data: [
                {
                    value: 'alert',
                    name: '탐지'
                },
                {
                    value: 'drop',
                    name: '차단'
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