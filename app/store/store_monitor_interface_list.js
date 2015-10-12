
Ext.define('NFW2.store.store_monitor_interface_list', {
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
            storeId: 'store_monitor_interface_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getNetworkUsage',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'if_info'
                },
                {
                    name: 'if_stat'
                }
            ]
        }, cfg)]);
    }
});