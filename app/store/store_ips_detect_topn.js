
Ext.define('NFW2.store.store_ips_detect_topn', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ips_detect_topn',
            fields: [
                {
                    name: 'signature_name'
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