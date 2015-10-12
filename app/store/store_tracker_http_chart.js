
Ext.define('NFW2.store.store_tracker_http_chart', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_http_chart',
            proxy: {
                type: 'jsonp',
                url: '/api/FtDBMgr/getHTTPTrackerTimeChart',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    type: 'int',
                    name: 'time'
                },
                {
                    type: 'int',
                    name: 'count'
                },
                {
                    type: 'int',
                    name: 'bytes'
                }
            ]
        }, cfg)]);
    }
});