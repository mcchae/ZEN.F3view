
Ext.define('NFW2.store.store_ipsecsa_obj', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsecsa_obj',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'cid'
                }
            ]
        }, cfg)]);
    }
});