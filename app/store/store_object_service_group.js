
Ext.define('NFW2.store.store_object_service_group', {
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
            groupField: 'type',
            storeId: 'store_object_service_group',
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