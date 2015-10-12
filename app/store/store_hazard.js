
Ext.define('NFW2.store.store_hazard', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_hazard',
            data: [
                {
                    text: 'Critical',
                    value: 'critical'
                },
                {
                    text: 'High',
                    value: 'high'
                },
                {
                    text: 'Normal',
                    value: 'normal'
                },
                {
                    text: 'Low',
                    value: 'low'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});