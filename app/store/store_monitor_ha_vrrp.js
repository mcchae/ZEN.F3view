
Ext.define('NFW2.store.store_monitor_ha_vrrp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ha_vrrp',
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'status'
                },
                {
                    name: 'group_ip'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'group_num'
                },
                {
                    name: 'mode'
                }
            ]
        }, cfg)]);
    }
});