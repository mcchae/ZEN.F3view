
Ext.define('NFW2.store.store_ipsec_sechost', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsec_sechost',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'cnt'
                }
            ]
        }, cfg)]);
    }
});