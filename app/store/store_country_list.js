
Ext.define('NFW2.store.store_country_list', {
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
            storeId: 'store_country_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('object_country')
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
                    name: '@num'
                },
                {
                    name: 'name'
                },
                {
                    name: 'codes'
                },
                {
                    name: 'codes_desc'
                },
                {
                    name: 'desc'
                },
                {
                    name: '@cid'
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