
Ext.define('NFW2.store.store_system_cpu', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_system_cpu',
            fields: [
                {
                    name: 'data'
                }
            ]
        }, cfg)]);
    }
});