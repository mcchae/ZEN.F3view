
Ext.define('NFW2.store.store_monitor_qos_list', {
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
            storeId: 'store_monitor_qos_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'type'
                },
                {
                    name: 'minband'
                },
                {
                    name: 'maxband'
                },
                {
                    name: 'packet_drop'
                },
                {
                    name: 'bps'
                },
                {
                    name: 'use_que'
                },
                {
                    name: 'policy'
                },
                {
                    name: 'application'
                },
                {
                    name: 'object'
                }
            ]
        }, cfg)]);
    }
});