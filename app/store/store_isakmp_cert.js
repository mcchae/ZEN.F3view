
Ext.define('NFW2.store.store_isakmp_cert', {
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
            storeId: 'store_isakmp_cert',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('system_certs'),
                    cond: Ext.encode({
                        type: 'cert'
                    })
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
                    name: 'cert_name'
                },
                {
                    name: 'key_name'
                },
                {
                    name: 'type'
                },
                {
                    name: 'subject'
                },
                {
                    name: 'issuer'
                },
                {
                    name: 'expire_date'
                },
                {
                    name: '_id'
                }
            ]
        }, cfg)]);
    }
});