
Ext.define('NFW2.store.store_etc_tunnel', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_etc_tunnel',
            fields: [
                {
                    name: 'tunnel_ip'
                },
                {
                    name: 'dr_tunnel_ip'
                }
            ]
        }, cfg)]);
    }
});