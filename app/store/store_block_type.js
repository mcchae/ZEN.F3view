
Ext.define('NFW2.store.store_block_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_block_type',
            data: [
                {
                    text: '1:N',
                    value: 1
                },
                {
                    text: 'N:1',
                    value: 2
                },
                {
                    text: '1:1',
                    value: 3
                },
                {
                    text: '1:1(출발지 포트 가변)',
                    value: 4
                },
                {
                    text: 'PacketDrop',
                    value: 5
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.value === 4){ return __zen('dynamic_source_port'); }

                        return rec.data.text;
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