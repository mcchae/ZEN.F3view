
Ext.define('NFW2.store.store_etc_tunnel_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_etc_tunnel_list',
            fields: [
                {
                    name: 'src'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'tunnel_ip'
                },
                {
                    name: 'src_type'
                },
                {
                    name: 'dest_type'
                },
                {
                    name: 'num',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});