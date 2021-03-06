
Ext.define('NFW2.store.store_profile_qos', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_profile_qos',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});