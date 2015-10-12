
Ext.define('NFW2.store.store_etc_dr_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_etc_dr_list',
            fields: [
                {
                    name: 'tunnel_ip'
                },
                {
                    name: 'dr_tunnel_ip'
                },
                {
                    name: 'dr_timeout'
                },
                {
                    name: 'num',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});