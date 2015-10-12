
Ext.define('NFW2.store.store_protocol_bgp_list', {
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
            storeId: 'store_protocol_bgp_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'as_number'
                },
                {
                    name: 'use'
                },
                {
                    name: 'router_id'
                },
                {
                    name: 'network'
                },
                {
                    name: 'neighbor'
                }
            ]
        }, cfg)]);
    }
});