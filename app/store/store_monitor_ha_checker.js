
Ext.define('NFW2.store.store_monitor_ha_checker', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ha_checker',
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'status'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'group_num'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'info'
                }
            ]
        }, cfg)]);
    }
});