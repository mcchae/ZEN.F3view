
Ext.define('NFW2.store.store_monitor_sessionInfo', {
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
            storeId: 'store_monitor_sessionInfo',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getSessionInfo',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'bytes'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'info'
                },
                {
                    name: 'packets'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'src'
                },
                {
                    name: 'status'
                },
                {
                    name: 'timeout'
                },
                {
                    name: 'time'
                },
                {
                    name: 'fw'
                },
                {
                    name: 'nat'
                },
                {
                    name: 'init'
                }
            ]
        }, cfg)]);
    }
});