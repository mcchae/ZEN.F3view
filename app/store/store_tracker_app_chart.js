
Ext.define('NFW2.store.store_tracker_app_chart', {
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
            storeId: 'store_tracker_app_chart',
            proxy: {
                type: 'jsonp',
                url: '/api/FtDBMgr/getAPPTrackerTimeChart',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: 'time'
                },
                {
                    type: 'int',
                    name: 'bytes'
                },
                {
                    type: 'int',
                    name: 'packets'
                },
                {
                    type: 'int',
                    name: 'session'
                },
                {
                    name: 'detail_list'
                }
            ]
        }, cfg)]);
    }
});