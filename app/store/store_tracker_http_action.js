
Ext.define('NFW2.store.store_tracker_http_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_http_action',
            data: [
                {
                    name: '통합',
                    val: '0'
                },
                {
                    name: '탐지',
                    val: '318898177'
                },
                {
                    name: '차단',
                    val: '318898178'
                },
                {
                    name: '승인',
                    val: '318898179'
                },
                {
                    name: '미 분류',
                    val: '318898181'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '0'){
                            return __zen('integrated');
                        }else if(rec.data.val === '318898177'){
                            return __zen('detect');
                        }else if(rec.data.val === '318898178'){
                            return __zen('block');
                        }else if(rec.data.val === '318898179'){
                            return __zen('approval');
                        }else{
                            return __zen('unclassification');
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