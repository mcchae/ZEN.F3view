
Ext.define('NFW2.store.store_monitor_app_sort', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_app_sort',
            data: [
                {
                    name: '사용량',
                    val: 'bytes'
                },
                {
                    name: '세션',
                    val: 'sessions'
                },
                {
                    name: '패킷',
                    val: 'packets'
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