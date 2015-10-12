
Ext.define('NFW2.store.store_ipv4_object_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipv4_object_list',
            fields: [
                {
                    type: 'int',
                    name: 'num'
                },
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'desc'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});