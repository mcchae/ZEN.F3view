
Ext.define('NFW2.store.store_policy_change', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_policy_change',
            fields: [
                {
                    name: 'jump'
                },
                {
                    name: 'who'
                },
                {
                    name: 'when'
                },
                {
                    name: 'where'
                },
                {
                    name: 'what'
                },
                {
                    name: 'how'
                }
            ]
        }, cfg)]);
    }
});