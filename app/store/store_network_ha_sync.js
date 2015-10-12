
Ext.define('NFW2.store.store_network_ha_sync', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_network_ha_sync',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getObject',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'list'
                },
                {
                    name: 'session'
                },
                {
                    name: 'config'
                },
                {
                    name: 'log'
                }
            ]
        }, cfg)]);
    }
});