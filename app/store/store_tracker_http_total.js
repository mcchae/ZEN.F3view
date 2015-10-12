
Ext.define('NFW2.store.store_tracker_http_total', {
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
            storeId: 'store_tracker_http_total',
            proxy: {
                type: 'jsonp',
                url: '/api/FtDBMgr/getHTTPTracker',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.total_list'
                }
            },
            fields: [
                {
                    name: 'start_ts'
                },
                {
                    name: 'end_ts'
                },
                {
                    name: 'total_inbts'
                },
                {
                    name: 'count'
                }
            ]
        }, cfg)]);
    }
});