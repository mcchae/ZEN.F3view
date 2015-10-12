
Ext.define('NFW2.store.store_daships_alarm_set', {
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
            pageSize: 60,
            storeId: 'store_daships_alarm_set',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getIPSDashboardConf',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: '@uid'
                },
                {
                    name: '@num'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'detect_count'
                },
                {
                    name: 'block_count'
                },
                {
                    name: 'detect_bytes'
                },
                {
                    name: 'block_bytes'
                }
            ]
        }, cfg)]);
    }
});