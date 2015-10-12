
Ext.define('NFW2.store.store_monitor_tracker_list', {
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
            storeId: 'store_monitor_tracker_list',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    type: 'int',
                    name: 'uid'
                },
                {
                    name: 'src'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'service'
                },
                {
                    name: 'action'
                },
                {
                    type: 'float',
                    name: 'bps'
                },
                {
                    name: 'bps_p'
                },
                {
                    name: 'bps_tx'
                },
                {
                    name: 'bps_rx'
                },
                {
                    name: 'bps_p_tx'
                },
                {
                    name: 'bps_p_rx'
                },
                {
                    type: 'float',
                    name: 'cps'
                },
                {
                    name: 'cps_p'
                },
                {
                    type: 'float',
                    name: 'pps'
                },
                {
                    name: 'pps_p'
                },
                {
                    name: 'pps_tx'
                },
                {
                    name: 'pps_rx'
                },
                {
                    name: 'pps_p_tx'
                },
                {
                    name: 'pps_p_rx'
                },
                {
                    type: 'float',
                    name: 'bytes'
                },
                {
                    name: 'bytes_p'
                },
                {
                    name: 'bytes_tx'
                },
                {
                    name: 'bytes_rx'
                },
                {
                    name: 'bytes_p_tx'
                },
                {
                    name: 'bytes_p_rx'
                },
                {
                    type: 'float',
                    name: 'sessions'
                },
                {
                    name: 'sessions_p'
                },
                {
                    type: 'float',
                    name: 'packets'
                },
                {
                    name: 'packets_p'
                },
                {
                    name: 'packets_tx'
                },
                {
                    name: 'packets_rx'
                },
                {
                    name: 'packets_p_tx'
                },
                {
                    name: 'packets_p_rx'
                },
                {
                    name: 's_ip'
                },
                {
                    name: 's_type'
                },
                {
                    name: 'd_ip'
                },
                {
                    name: 'd_type'
                },
                {
                    name: 'd_addr'
                },
                {
                    name: 'proto'
                },
                {
                    name: 's_port'
                },
                {
                    name: 'd_port'
                },
                {
                    name: 'num'
                },
                {
                    name: 'd_port_name'
                }
            ]
        }, cfg)]);
    }
});