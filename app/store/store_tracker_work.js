
Ext.define('NFW2.store.store_tracker_work', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_work',
            data: [
                {
                    name: '업무+비 업무',
                    val: '2'
                },
                {
                    name: '업무',
                    val: '1'
                },
                {
                    name: '비 업무',
                    val: '0'
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