
Ext.define('NFW2.store.store_quickboard', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_quickboard',
            fields: [
                {
                    name: 'now'
                },
                {
                    name: 'max'
                },
                {
                    name: 'id'
                },
                {
                    name: 'category'
                }
            ]
        }, cfg)]);
    }
});