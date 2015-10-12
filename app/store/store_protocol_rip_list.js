
Ext.define('NFW2.store.store_protocol_rip_list', {
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
            storeId: 'store_protocol_rip_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'version'
                },
                {
                    name: 'network'
                },
                {
                    name: 'use'
                }
            ]
        }, cfg)]);
    }
});