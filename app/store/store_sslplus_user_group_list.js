
Ext.define('NFW2.store.store_sslplus_user_group_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_sslplus_user_group_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('sslplus_user_group')
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    root: 'retval.list'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: '_id'
                },
                {
                    name: 'member_list'
                },
                {
                    name: 'member_info'
                }
            ]
        }, cfg)]);
    }
});