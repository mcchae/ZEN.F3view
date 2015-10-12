
Ext.define('NFW2.store.store_monitor_policy_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Number'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_policy_list',
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
                    name: 'id',
                    sortType: 'asInt'
                },
                {
                    type: 'float',
                    name: 'bps',
                    sortType: 'asInt'
                },
                {
                    type: 'float',
                    name: 'pps',
                    sortType: 'asInt'
                },
                {
                    name: 'content',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});