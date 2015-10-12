
Ext.define('NFW2.store.store_ipv6_group_member', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipv6_group_member',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'member'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'count'
                },
                {
                    name: 'otype'
                }
            ]
        }, cfg)]);
    }
});