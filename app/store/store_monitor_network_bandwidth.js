
Ext.define('NFW2.store.store_monitor_network_bandwidth', {
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
            storeId: 'store_monitor_network_bandwidth',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'upload'
                },
                {
                    name: 'download'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'desc'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filename: Ext.encode('/ferret/report/bandwidth/report'),
                    start: Ext.encode(0),
                    limit: Ext.encode(100)
                },
                url: '/api/ftuctrl/getFileContent',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});