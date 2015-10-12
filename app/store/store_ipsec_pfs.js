
Ext.define('NFW2.store.store_ipsec_pfs', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsec_pfs',
            autoLoad: true,
            data: [
                {
                    name: 'None',
                    val: 'none'
                },
                {
                    name: 'MODP768',
                    val: 'modp768'
                },
                {
                    name: 'MODP1024',
                    val: 'modp1024'
                },
                {
                    name: 'MODP1536',
                    val: 'modp1536'
                },
                {
                    name: 'MODP2048',
                    val: 'modp2048'
                },
                {
                    name: 'MODP3072',
                    val: 'modp3072'
                },
                {
                    name: 'MODP4096',
                    val: 'modp4096'
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