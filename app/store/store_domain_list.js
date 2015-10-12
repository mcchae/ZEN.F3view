
Ext.define('NFW2.store.store_domain_list', {
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
            storeId: 'store_domain_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('object_domain')
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
                    name: '@cid'
                },
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
                    name: 'domain'
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