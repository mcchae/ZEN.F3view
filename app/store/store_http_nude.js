
Ext.define('NFW2.store.store_http_nude', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_http_nude',
            data: [
                {
                    txt: '0 (노출없음)',
                    val: 'n0'
                },
                {
                    txt: '1 (노출복장)',
                    val: 'n1'
                },
                {
                    txt: '2 (부분노출)',
                    val: 'n2'
                },
                {
                    txt: '3 (전신노출)',
                    val: 'n3'
                },
                {
                    txt: '4 (성기노출)',
                    val: 'n4'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val ==='n0'){
                            return '0 ('+__zen('http_nude1')+')';
                        }else if(rec.data.val ==='n1'){
                            return '1 ('+__zen('http_nude2')+')';
                        }else if(rec.data.val ==='n2'){
                            return '2 ('+__zen('http_nude3')+')';
                        }else if(rec.data.val ==='n3'){
                            return '3 ('+__zen('http_nude4')+')';
                        }else{
                            return '4 ('+__zen('http_nude5')+')';
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