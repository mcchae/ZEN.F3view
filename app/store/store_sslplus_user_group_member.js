
Ext.define('NFW2.store.store_sslplus_user_group_member', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_sslplus_user_group_member',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'id'
                }
            ]
        }, cfg)]);
    }
});