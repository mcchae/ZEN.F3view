
Ext.define('NFW2.store.store_monitor_grid_mem', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_grid_mem',
            fields: [
                {
                    name: 'max'
                },
                {
                    name: 'min'
                },
                {
                    name: 'avg'
                },
                {
                    name: 'name'
                },
                {
                    name: 'color'
                }
            ]
        }, cfg)]);
    }
});