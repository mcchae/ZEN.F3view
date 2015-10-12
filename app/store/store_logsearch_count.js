
Ext.define('NFW2.store.store_logsearch_count', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logsearch_count',
            data: [
                {
                    val: 100
                },
                {
                    val: 200
                }/*,{
                    val: 500
                },
                {
                    val: 1000
                },
                {
                    val: 5000
                }*/
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});