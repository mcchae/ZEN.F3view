
Ext.define('NFW2.store.store_daships_policy', {
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
            storeId: 'store_daships_policy',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getIPSDashboardMon',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: 'src'
                },
                {
                    name: 'dest'
                },
                {
                    name: '@uid'
                },
                {
                    name: '@use'
                },
                {
                    name: 'ips'
                },
                {
                    name: '@num'
                },
                {
                    name: 'traffic'
                },
                {
                    name: 'detect'
                },
                {
                    name: 'block'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'log_exist'
                },
                {
                    name: 'start_ts'
                },
                {
                    name: 'list'
                },
                {
                    name: 'no_log_uids'
                },
                {
                    name: 'log_uids'
                },
                {
                    name: 'all_uids'
                }
            ]
        }, cfg)]);
    }
});