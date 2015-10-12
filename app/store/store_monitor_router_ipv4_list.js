
Ext.define('NFW2.store.store_monitor_router_ipv4_list', {
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
            pageSize: 100,
            storeId: 'store_monitor_router_ipv4_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filename: Ext.encode('/proc/net/route_ext'),
                    start: Ext.encode(0),
                    limit: Ext.encode(100)
                },
                url: '/api/ftuctrl/getFileContent',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total-1'
                }
            },
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'protocol_type'
                },
                {
                    name: 'destination'
                },
                {
                    name: 'gateway'
                },
                {
                    name: 'distance'
                },
                {
                    name: 'metric'
                },
                {
                    name: 'flags'
                },
                {
                    name: 'uptime'
                }
            ]
        }, cfg)]);
    }
});