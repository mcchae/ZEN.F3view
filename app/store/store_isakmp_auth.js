
Ext.define('NFW2.store.store_isakmp_auth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_isakmp_auth',
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