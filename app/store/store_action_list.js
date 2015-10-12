
Ext.define('NFW2.store.store_action_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_action_list',
            fields: [
                {
                    name: 'action'
                },
                {
                    name: 'action_value'
                }
            ]
        }, cfg)]);
    }
});