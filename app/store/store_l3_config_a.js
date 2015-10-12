
Ext.define('NFW2.store.store_l3_config_a', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l3_config_a',
            autoLoad: true,
            data: [
                {
                    val: 'Active(Master)'
                },
                {
                    val: 'Active(Backup)'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});