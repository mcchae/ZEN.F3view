
Ext.define('NFW2.store.store_sslplus_encry', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_sslplus_encry',
            data: [
                {
                    name: 'AES-128-CBC'
                },
                {
                    name: 'AES-192-CBC'
                },
                {
                    name: 'AES-256-CBC'
                },
                {
                    name: 'SEED'
                },
                {
                    name: 'ARIA128'
                },
                {
                    name: 'ARIA192'
                },
                {
                    name: 'ARIA256'
                }
            ],
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});