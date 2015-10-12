
Ext.define('NFW2.store.store_white_black_ip_list', {
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
            pageSize: 100,
            storeId: 'store_white_black_ip_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    sort_list: Ext.encode([
                        [
                            'ip_first',
                            1
                        ],
                        [
                            'ip_last',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'date'
                },
                {
                    name: 'ip',
                    sortType: 'asInt'
                },
                {
                    name: 'desc'
                },
                {
                    name: '_id'
                },
                {
                    name: 'ip_first',
                    sortType: 'asInt'
                },
                {
                    name: 'ip_last',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});