
Ext.define('NFW2.store.store_tracker_dtime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_dtime',
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});