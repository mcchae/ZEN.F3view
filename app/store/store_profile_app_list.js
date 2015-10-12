
Ext.define('NFW2.store.store_profile_app_list', {
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
            pageSize: 10,
            storeId: 'store_profile_app_list',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getObject',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'category'
                },
                {
                    name: 'vendor'
                },
                {
                    name: 'released_date'
                },
                {
                    name: 'popularity'
                },
                {
                    name: 'name'
                },
                {
                    name: 'references'
                },
                {
                    name: 'descriptions'
                },
                {
                    name: 'content_type'
                },
                {
                    name: 'rid'
                },
                {
                    name: '_id'
                },
                {
                    name: 'technology'
                },
                {
                    name: 'protocols'
                },
                {
                    name: 'revision'
                },
                {
                    name: 'purpose'
                },
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'action'
                },
                {
                    name: 'applications'
                },
                {
                    name: 'type'
                },
                {
                    name: 'qos'
                }
            ]
        }, cfg)]);
    }
});