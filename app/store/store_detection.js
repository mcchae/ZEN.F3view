
Ext.define('NFW2.store.store_detection', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_detection',
            data: [
                {
                    text: '탐지',
                    value: 1
                },
                {
                    text: '차단',
                    value: 2
                },
                {
                    text: '사용 안함',
                    value: 0
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