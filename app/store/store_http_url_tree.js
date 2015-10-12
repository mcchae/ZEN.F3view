
Ext.define('NFW2.store.store_http_url_tree', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_http_url_tree',
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'leaf'
                },
                {
                    name: 'idex'
                }
            ]
        }, cfg)]);
    }
});