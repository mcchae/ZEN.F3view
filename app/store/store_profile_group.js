
Ext.define('NFW2.store.store_profile_group', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_profile_group',
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'leaf'
                },
                {
                    name: 'idex'
                },
                {
                    name: '_id'
                }
            ]
        }, cfg)]);
    }
});