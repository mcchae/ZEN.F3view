
Ext.define('NFW2.store.store_ipsec_enau_obj', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsec_enau_obj',
            fields: [
                {
                    name: 'name1'
                },
                {
                    name: 'name2'
                },
                {
                    name: 'name3'
                },
                {
                    name: 'name4'
                },
                {
                    name: 'val1'
                },
                {
                    name: 'val2'
                },
                {
                    name: 'val3'
                },
                {
                    name: 'val4'
                }
            ]
        }, cfg)]);
    }
});