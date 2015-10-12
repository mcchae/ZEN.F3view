
Ext.define('NFW2.store.store_alg_telnet_proxy', {
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
            storeId: 'store_alg_telnet_proxy',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('alg_telnet_proxy'),
                    start: Ext.encode(0),
                    limit: Ext.encode(100)
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'public_server_ip'
                },
                {
                    name: 'real_server_ip'
                },
                {
                    name: 'port_num',
                    sortType: 'asInt'
                },
                {
                    name: 'time_out',
                    sortType: 'asInt'
                },
                {
                    name: 'max_sessions',
                    sortType: 'asInt'
                },
                {
                    name: 'upload'
                },
                {
                    name: 'download'
                },
                {
                    name: 'action'
                },
                {
                    name: 'enable'
                },
                {
                    name: 'num',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});