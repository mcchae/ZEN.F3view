
Ext.define('NFW2.store.store_user_auth_policy_list', {
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
            storeId: 'store_user_auth_policy_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('user_awareness_auth_policy')
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
                    name: '_id'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,0);
                    },
                    name: 'src'
                },
                {
                    name: 'desc'
                },
                {
                    name: '_num'
                }
            ]
        }, cfg)]);
    }
});