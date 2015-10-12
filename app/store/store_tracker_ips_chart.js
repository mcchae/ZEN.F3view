
Ext.define('NFW2.store.store_tracker_ips_chart', {
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
            storeId: 'store_tracker_ips_chart',
            proxy: {
                type: 'jsonp',
                timeout: 1800000,
                url: '/api/FtDBMgr/getIPSTrackerTimeChart',
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
                    name: 'detect'
                },
                {
                    type: 'int',
                    name: 'block'
                },
                {
                    name: 'detail_list'
                }
            ]
        }, cfg)]);
    }
});