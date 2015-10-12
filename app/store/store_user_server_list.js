
Ext.define('NFW2.store.store_user_server_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_user_server_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('user_awareness_auth_server'),
                    sort_list: Ext.encode([
                        [
                            'name',
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
                    type: 'int',
                    name: '@num'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'stype'
                },
                {
                    name: 'addr'
                },
                {
                    name: 'port'
                },
                {
                    name: 'basedn'
                },
                {
                    name: 'secret'
                },
                {
                    name: 'at_id'
                },
                {
                    name: 'at_name'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'at_dep'
                },
                {
                    name: 'at_grp'
                },
                {
                    name: 'im_dn'
                },
                {
                    name: 'im_pw'
                }
            ]
        }, cfg)]);
    }
});