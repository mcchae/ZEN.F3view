
Ext.define('NFW2.store.store_monitor_destination_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_destination_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'destination'
                },
                {
                    name: 'bps',
                    sortType: 'asInt'
                },
                {
                    name: 'pps',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});