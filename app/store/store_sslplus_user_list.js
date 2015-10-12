
Ext.define('NFW2.store.store_sslplus_user_list', {
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
            storeId: 'store_sslplus_user_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('ssl_user_config')
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
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'user_name'
                },
                {
                    name: 'login_id'
                },
                {
                    name: 'depart'
                },
                {
                    name: 'title'
                },
                {
                    name: 'password'
                },
                {
                    name: '_id'
                },
                {
                    name: 'trust_ip'
                },
                {
                    name: 'login_date'
                },
                {
                    name: 'logout_date'
                },
                {
                    name: 'login_fail_cnt'
                }
            ]
        }, cfg)]);
    }
});