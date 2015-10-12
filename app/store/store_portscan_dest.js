
Ext.define('NFW2.store.store_portscan_dest', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_portscan_dest',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'otype'
                }
            ]
        }, cfg)]);
    }
});