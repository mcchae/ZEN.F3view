
Ext.define('NFW2.store.store_system_link', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_system_link',
            data: [
                {
                    value: 'total',
                    name: '전체'
                },
                {
                    value: 'up',
                    name: '링크 UP'
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