
Ext.define('NFW2.store.store_direction', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_direction',
            data: [
                {
                    text: '->',
                    value: '->'
                },
                {
                    text: '<>',
                    value: '<>'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'text'
                }
            ]
        }, cfg)]);
    }
});