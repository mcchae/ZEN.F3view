
Ext.define('NFW2.store.store_group_member', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_group_member',
            groupField: 'type',
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
                    name: 'desc'
                },
                {
                    name: 'member'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'num'
                },
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});