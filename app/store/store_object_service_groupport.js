
Ext.define('NFW2.store.store_object_service_groupport', {
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
            storeId: 'store_object_service_groupport',
            autoLoad: false,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'type'
                }
            ],
            listeners: {
                load: {
                    fn: me.onJsonpstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        var me = Ext.getCmp("win_portgroup");
        me.init_object_service_group();
    }

});