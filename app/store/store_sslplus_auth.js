
Ext.define('NFW2.store.store_sslplus_auth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_sslplus_auth',
            data: [
                {
                    name: '사용 안함',
                    val: '0'
                },
                {
                    name: '사용자 독립적 단말 인증',
                    val: '1'
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