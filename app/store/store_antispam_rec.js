
Ext.define('NFW2.store.store_antispam_rec', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_antispam_rec',
            data: [
                {
                    type: 'sender',
                    name: '송신자'
                },
                {
                    type: 'receiver',
                    name: '수신자'
                },
                {
                    type: 'title',
                    name: '제목'
                },
                {
                    type: 'content',
                    name: '내용'
                }
            ],
            fields: [
                {
                    name: 'type'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.type === "sender"){ return __zen('sender'); }
                        if(rec.data.type === "receiver"){ return __zen('receiver'); }
                        if(rec.data.type === "title"){ return __zen('title2'); }
                        else{ return __zen('contents'); }
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});