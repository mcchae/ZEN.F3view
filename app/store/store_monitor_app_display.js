
Ext.define('NFW2.store.store_monitor_app_display', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_app_display',
            data: [
                {
                    name: '애플리케이션',
                    val: 'name'
                },
                {
                    name: '범주',
                    val: 'category'
                },
                {
                    name: '기술',
                    val: 'technology'
                },
                {
                    name: '목적',
                    val: 'purpose'
                },
                {
                    name: '인지도',
                    val: 'popularity'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});