
Ext.define('NFW2.store.store_http_language', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_http_language',
            data: [
                {
                    txt: '0 (비속어 없음)',
                    val: 'l0'
                },
                {
                    txt: '1 (일상 비속어)',
                    val: 'l1'
                },
                {
                    txt: '2 (거친 비속어)',
                    val: 'l2'
                },
                {
                    txt: '3 (심한 비속어)',
                    val: 'l3'
                },
                {
                    txt: '4 (노골적이고 외설적인 비속어)',
                    val: 'l4'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'l0'){
                            return '0 ('+__zen('http_lan1')+')';
                        }else if(rec.data.val === 'l1'){
                            return '1 ('+__zen('http_lan2')+')';
                        }else if(rec.data.val === 'l2'){
                            return '2 ('+__zen('http_lan3')+')';
                        }else if(rec.data.val === 'l3'){
                            return '3 ('+__zen('http_lan4')+')';
                        }else{
                            return '4 ('+__zen('http_lan5')+')';
                        }
                    },
                    name: 'txt'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});