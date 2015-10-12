
Ext.define('NFW2.store.store_ipsec_auth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsec_auth',
            autoLoad: true,
            data: [
                {
                    name: 'MD5',
                    val: 'md5'
                },
                {
                    name: 'SHA1',
                    val: 'sha1'
                },
                {
                    name: 'SHA256',
                    val: 'sha256'
                },
                {
                    name: 'SHA384',
                    val: 'sha384'
                },
                {
                    name: 'SHA512',
                    val: 'sha512'
                },
                {
                    name: 'HAS160',
                    val: 'has160'
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