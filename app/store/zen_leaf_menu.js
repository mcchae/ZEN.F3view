
Ext.define('NFW2.store.zen_leaf_menu', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'zen_leaf_menu',
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'text'
                }
            ]
        }, cfg)]);
    }
});