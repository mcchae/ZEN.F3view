
Ext.define('NFW2.store.store_raid_mode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_raid_mode',
            data: [
                {
                    mode: 'Stripe',
                    val: 'raid0'
                },
                {
                    mode: 'Mirror',
                    val: 'raid1'
                }
            ],
            fields: [
                {
                    name: 'mode'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});