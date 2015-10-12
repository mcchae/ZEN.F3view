
Ext.define('NFW2.store.store_monitor_app_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_app_list',
            fields: [
                {
                    name: 'rid'
                },
                {
                    name: 'bytes'
                },
                {
                    name: 'byte_tx'
                },
                {
                    name: 'byte_rx'
                },
                {
                    name: 'byte_tx_p'
                },
                {
                    name: 'byte_rx_p'
                },
                {
                    name: 'session'
                },
                {
                    name: 'session_p'
                },
                {
                    name: 'packets'
                },
                {
                    name: 'packet_tx'
                },
                {
                    name: 'packet_rx'
                },
                {
                    name: 'packet_tx_p'
                },
                {
                    name: 'packet_rx_p'
                },
                {
                    name: 'name'
                },
                {
                    name: 'category'
                },
                {
                    name: 'technology'
                },
                {
                    name: 'purpose'
                },
                {
                    name: 'popularity'
                },
                {
                    name: '_type'
                }
            ],
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});