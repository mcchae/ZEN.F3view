
Ext.define('NFW2.store.store_http_sex', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_http_sex',
            data: [
                {
                    txt: '0 (성행위 없음)',
                    val: 's0'
                },
                {
                    txt: '1 (격렬한 키스)',
                    val: 's1'
                },
                {
                    txt: '2 (착의상태의 성적접촉)',
                    val: 's2'
                },
                {
                    txt: '3 (노골적이지 않은 성행위)',
                    val: 's3'
                },
                {
                    txt: '4 (성범죄 또는 노골적인 성행위)',
                    val: 's4'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 's0'){
                            return '0 ('+__zen('http_sex1')+')';
                        }else if(rec.data.val === 's1'){
                            return '1 ('+__zen('http_sex2')+')';
                        }else if(rec.data.val === 's2'){
                            return '2 ('+__zen('http_sex3')+')';
                        }else if(rec.data.val === 's3'){
                            return '3 ('+__zen('http_sex4')+')';
                        }else{
                            return '4 ('+__zen('http_sex5')+')';
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