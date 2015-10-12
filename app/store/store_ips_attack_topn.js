
Ext.define('NFW2.store.store_ips_attack_topn', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ips_attack_topn',
            fields: [
                {
                    name: 'src'
                },
                {
                    name: 'detect'
                },
                {
                    name: 'block'
                }
            ]
        }, cfg)]);
    }
});