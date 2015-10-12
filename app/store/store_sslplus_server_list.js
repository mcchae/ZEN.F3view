
Ext.define('NFW2.store.store_sslplus_server_list', {
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
            storeId: 'store_sslplus_server_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('server_access_config'),
                    sort_list: Ext.encode([
                        [
                            '_num',
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
                    name: 'rname'
                },
                {
                    name: 'manager'
                },
                {
                    name: 'tel'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'ip_list'
                },
                {
                    name: '_id'
                },
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'update'
                }
            ]
        }, cfg)]);
    }
});