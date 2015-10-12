
Ext.define('NFW2.store.store_phy_ipv4', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_phy_ipv4',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});