
Ext.define('NFW2.store.store_monitor_antispam_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_antispam_list',
            pageSize: 100,
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'action'
                },
                {
                    name: 'desc'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filename: Ext.encode('/etc/ferret/mon/as_monitor'),
                    start: Ext.encode(0),
                    limit: Ext.encode(100)
                },
                url: '/api/ftuctrl/getFileContent',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});