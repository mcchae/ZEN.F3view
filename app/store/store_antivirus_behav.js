
Ext.define('NFW2.store.store_antivirus_behav', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_antivirus_behav',
            data: [
                {
                    type: 'on',
                    name: '검사'
                },
                {
                    type: 'off',
                    name: '미 검사'
                }
            ],
            fields: [
                {
                    name: 'type'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.type === "on"){ return __zen('search2'); }
                        else{ return __zen('unsearch'); }
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});