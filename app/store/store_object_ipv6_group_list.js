
Ext.define('NFW2.store.store_object_ipv6_group_list', {
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
            storeId: 'store_object_ipv6_group_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('object_ipv6_group')
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
                    name: 'desc'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'member_name'
                },
                {
                    name: 'lasthit'
                },
                {
                    name: 'lastupdate'
                },
                {
                    name: '@count'
                }
            ]
        }, cfg)]);
    }
});