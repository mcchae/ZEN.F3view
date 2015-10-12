
Ext.define('NFW2.store.store_user_import', {
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
            storeId: 'store_user_import',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('mgt_user_auth_info'),
                    cond: Ext.encode({
                        _kind: 'mod_object_user_import'
                    }),
                    sort_list: Ext.encode([
                        [
                            '_id',
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
                    name: '_id'
                },
                {
                    name: 'name'
                },
                {
                    name: 'dep'
                },
                {
                    name: '_kind'
                },
                {
                    name: 'srv'
                },
                {
                    name: 'id'
                }
            ]
        }, cfg)]);
    }
});