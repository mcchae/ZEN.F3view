
Ext.define('NFW2.store.store_usergroup_import', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_usergroup_import',
            autoLoad: false,
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'mmbr'
                },
                {
                    name: 'gid'
                },
                {
                    name: '_kind'
                },
                {
                    name: 'gname'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('mgt_user_auth_info'),
                    cond: Ext.encode({
                        _kind: 'mod_object_user_group_import'
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
            }
        }, cfg)]);
    }
});