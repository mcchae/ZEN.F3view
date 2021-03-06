
Ext.define('NFW2.store.store_object_session_list', {
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
            storeId: 'store_object_session_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('object_session'),
                    search_info: Ext.encode({
                        
                    }),
                    sort_list: Ext.encode([
                        [
                            'name',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: 'limit_type'
                },
                {
                    name: 'desc'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'tx'
                },
                {
                    name: 'rx'
                },
                {
                    name: 'threshold'
                },
                {
                    name: 'lasthit'
                },
                {
                    name: 'lastupdate'
                }
            ]
        }, cfg)]);
    }
});