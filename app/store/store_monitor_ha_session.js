
Ext.define('NFW2.store.store_monitor_ha_session', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ha_session',
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'link'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'new'
                },
                {
                    name: 'update'
                },
                {
                    name: 'delete'
                }
            ]
        }, cfg)]);
    }
});