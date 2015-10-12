
Ext.define('NFW2.store.store_daships_update', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_daships_update',
            data: [
                {
                    name: '5',
                    val: '5000'
                },
                {
                    name: '10',
                    val: '10000'
                },
                {
                    name: '30',
                    val: '30000'
                },
                {
                    name: '60',
                    val: '60000'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});