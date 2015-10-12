
Ext.define('NFW2.store.store_monitor_user_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Number'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_user_list',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/execKctrlFunc',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    type: 'float',
                    name: 'bytes'
                },
                {
                    name: 'byt_tx'
                },
                {
                    name: 'byt_rx'
                },
                {
                    name: 'byt_tx_r'
                },
                {
                    name: 'byt_rx_r'
                },
                {
                    type: 'float',
                    name: 'sess'
                },
                {
                    name: 'sessions_p'
                },
                {
                    type: 'float',
                    name: 'packets'
                },
                {
                    name: 'pkt_tx'
                },
                {
                    name: 'pkt_rx'
                },
                {
                    name: 'pkt_tx_r'
                },
                {
                    name: 'pkt_rx_r'
                },
                {
                    name: 'id'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'srv'
                },
                {
                    name: 'ltime'
                },
                {
                    name: 'to'
                },
                {
                    name: 'name'
                },
                {
                    name: 'user_name'
                },
                {
                    name: 'user_depart'
                }
            ]
        }, cfg)]);
    }
});