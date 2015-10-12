
Ext.define('NFW2.store.store_isakmp_lifetime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_isakmp_lifetime',
            data: [
                {
                    val: '8'
                },
                {
                    val: '16'
                },
                {
                    val: '24'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});