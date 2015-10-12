
Ext.define('NFW2.store.store_monitor_item', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_item',
            data: [
                {
                    value: 'avg',
                    name: 'avg'
                },
                {
                    value: 'min',
                    name: 'min'
                },
                {
                    value: 'max',
                    name: 'max'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});