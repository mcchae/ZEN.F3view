
Ext.define('NFW2.store.store_sslplus_block', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_sslplus_block',
            fields: [
                {
                    name: 'ip'
                },
                {
                    name: 'cidr'
                }
            ]
        }, cfg)]);
    }
});