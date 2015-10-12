
Ext.define('NFW2.store.store_fw_profile_web_list', {
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
            storeId: 'store_fw_profile_web_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('fw_profile_web')
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
                    name: 'name'
                },
                {
                    name: 'description'
                },
                {
                    name: '@cid'
                },
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'lasthit'
                },
                {
                    name: 'element'
                }
            ]
        }, cfg)]);
    }
});