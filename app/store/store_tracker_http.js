
Ext.define('NFW2.store.store_tracker_http', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_http',
            data: [
                {
                    name: '출발지',
                    val: 'sip'
                },
                {
                    name: '도메인',
                    val: 'url'
                },
                {
                    name: '카테고리',
                    val: 'category'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'sip'){
                            return __zen('src');
                        }else if(rec.data.val === 'url'){
                            return __zen('domain');
                        }else{
                            return __zen('category');
                        }
                    },
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});