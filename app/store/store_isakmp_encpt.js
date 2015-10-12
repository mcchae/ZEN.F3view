
Ext.define('NFW2.store.store_isakmp_encpt', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_isakmp_encpt',
            data: [
                {
                    name: 'SEED128',
                    val: 'seed128'
                },
                {
                    name: 'SEED256',
                    val: 'seed256'
                },
                {
                    name: 'ARIA128',
                    val: 'aria128'
                },
                {
                    name: 'ARIA192',
                    val: 'aria192'
                },
                {
                    name: 'ARIA256',
                    val: 'aria256'
                },
                {
                    name: '3DES',
                    val: '3des'
                },
                {
                    name: 'AES128',
                    val: 'aes128'
                },
                {
                    name: 'AES192',
                    val: 'aes192'
                },
                {
                    name: 'AES256',
                    val: 'aes256'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});