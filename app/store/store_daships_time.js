
Ext.define('NFW2.store.store_daships_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_daships_time',
            data: [
                {
                    name: '5분',
                    val: '5'
                },
                {
                    name: '10분',
                    val: '10'
                },
                {
                    name: '30분',
                    val: '30'
                },
                {
                    name: '1시간',
                    val: '60'
                },
                {
                    name: '5시간',
                    val: '300'
                },
                {
                    name: '12시간',
                    val: '720'
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