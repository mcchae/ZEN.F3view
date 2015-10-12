
Ext.define('NFW2.store.store_tracker_chart', {
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
            storeId: 'store_tracker_chart',
            proxy: {
                type: 'jsonp',
                url: '/api/FtDBMgr/getFWTrackerTimeChart',
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
                    name: 'session'
                },
                {
                    name: 'bytes'
                },
                {
                    name: 'packets'
                },
                {
                    name: 'detail_list'
                }
            ]
        }, cfg)]);
    }
});