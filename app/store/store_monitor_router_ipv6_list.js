
Ext.define('NFW2.store.store_monitor_router_ipv6_list', {
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
            pageSize: 100,
            storeId: 'store_monitor_router_ipv6_list',
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
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filename: Ext.encode('/proc/net/ipv6_route_ext'),
                    start: Ext.encode(0),
                    limit: Ext.encode(100)
                },
                url: '/api/ftuctrl/getFileContent',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total-1'
                }
            }
        }, cfg)]);
    }
});