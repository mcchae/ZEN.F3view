
Ext.define('NFW2.store.store_tracker_ips_traffic', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_ips_traffic',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});