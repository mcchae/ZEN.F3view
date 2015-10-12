
Ext.define('NFW2.store.store_system_disk_sdb', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_system_disk_sdb',
            fields: [
                {
                    name: 'data'
                }
            ]
        }, cfg)]);
    }
});