
Ext.define('NFW2.store.store_logsearch_name', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logsearch_name',
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});