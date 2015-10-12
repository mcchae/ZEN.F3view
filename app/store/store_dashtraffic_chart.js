
Ext.define('NFW2.store.store_dashtraffic_chart', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_dashtraffic_chart',
            fields: [
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});