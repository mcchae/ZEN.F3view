
Ext.define('NFW2.store.store_http_violence', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_http_violence',
            data: [
                {
                    txt: '0 (폭력없음)',
                    val: 'v0'
                },
                {
                    txt: '1 (격투)',
                    val: 'v1'
                },
                {
                    txt: '2 (상해)',
                    val: 'v2'
                },
                {
                    txt: '3 (살해)',
                    val: 'v3'
                },
                {
                    txt: '4 (잔인한 살해)',
                    val: 'v4'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'v0'){
                            return '0 ('+__zen('http_violence1')+')';
                        }else if(rec.data.val === 'v1'){
                            return '1 ('+__zen('http_violence2')+')';
                        }else if(rec.data.val === 'v2'){
                            return '2 ('+__zen('http_violence3')+')';
                        }else if(rec.data.val === 'v3'){
                            return '3 ('+__zen('http_violence4')+')';
                        }else{
                            return '4 ('+__zen('http_violence5')+')';
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