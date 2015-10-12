
Ext.define('NFW2.store.store_dashtraffic_alarm', {
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
            storeId: 'store_dashtraffic_alarm',
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
                    name: '@num'
                },
                {
                    name: '@uid'
                },
                {
                    name: 'ips'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'stats'
                },
                {
                    name: 'detail_list'
                },
                {
                    name: 'list'
                },
                {
                    name: 'start_ts'
                },
                {
                    name: 'curr_dt'
                },
                {
                    name: 'alarm'
                }
            ]
        }, cfg)]);
    }
});