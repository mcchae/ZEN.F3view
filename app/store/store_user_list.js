
Ext.define('NFW2.store.store_user_list', {
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
            storeId: 'store_user_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('with_cid'),
                    cond: Ext.encode({
                        _kind: 'object_user'
                    }),
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
                    name: 'lasthit'
                },
                {
                    name: 'lastupdate'
                },
                {
                    name: 'name'
                },
                {
                    name: 'user_id'
                },
                {
                    name: 'user_pw'
                },
                {
                    name: 'user_name'
                },
                {
                    name: 'user_depart'
                },
                {
                    name: 'auth_srv'
                },
                {
                    name: 'idle_to'
                },
                {
                    name: 'restriction'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});