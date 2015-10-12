
Ext.define('NFW2.store.store_use', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_use',
            data: [
                {
                    text: '사용',
                    value: 'on'
                },
                {
                    text: '사용 안함',
                    value: 'off'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.value === "on"){ return __zen('use'); }
                        else{ return __zen('unused'); }
                    },
                    name: 'text'
                }
            ]
        }, cfg)]);
    }
});