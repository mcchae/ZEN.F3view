
Ext.define('NFW2.store.store_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_action',
            data: [
                {
                    text: '탐지',
                    value: 'alert'
                },
                {
                    text: '차단',
                    value: 'drop'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.value === "alert"){ return __zen('detect'); }
                        else{ return __zen('deny'); }
                    },
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});