
Ext.define('NFW2.store.store_filtering_setting', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_filtering_setting',
            fields: [
                {
                    name: 'text'
                }
            ]
        }, cfg)]);
    }
});