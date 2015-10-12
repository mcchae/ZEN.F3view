
Ext.define('NFW2.store.store_monitor_ha_info', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ha_info',
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
                    name: 'virtual_ip'
                },
                {
                    name: 'virtual_mac'
                }
            ]
        }, cfg)]);
    }
});