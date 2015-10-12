
Ext.define('NFW2.store.store_vip_ipv6', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_vip_ipv6',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});