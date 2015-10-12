
Ext.define('NFW2.store.store_ipsec_ancpt', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'store_ipsec_ancpt',
            data: [
                {
                    name: '3DES',
                    val: '3des'
                },
                {
                    name: 'SEED',
                    val: 'seed'
                },
                {
                    name: 'AES128',
                    val: 'aes128'
                },
                {
                    name: 'AES256',
                    val: 'aes256'
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
                    name: 'NULL_ENC',
                    val: 'null_enc'
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