
Ext.define('NFW2.store.store_etc_tunnel_sd', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_etc_tunnel_sd',
            data: [
                {
                    name: 'Any',
                    val: 'any'
                },
                {
                    name: 'IP',
                    val: 'ip'
                },
                {
                    name: 'Odd',
                    val: 'odd'
                },
                {
                    name: 'Even',
                    val: 'even'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'odd'){
                            return __zen('odd');
                        }else if(rec.data.val === 'even'){
                            return __zen('even');
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