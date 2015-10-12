
Ext.define('NFW2.store.store_ipsec_lifetime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsec_lifetime',
            autoLoad: true,
            data: [
                {
                    val: '1'
                },
                {
                    val: '2'
                },
                {
                    val: '4'
                },
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