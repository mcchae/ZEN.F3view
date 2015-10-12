
Ext.define('NFW2.store.store_security_target_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_security_target_list',
            pageSize: 100,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: '_id'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'uid'
                },
                {
                    name: 'isakmp_sa'
                },
                {
                    name: 'iface'
                },
                {
                    name: 'group_id'
                },
                {
                    name: 'chk_use'
                }
            ]
        }, cfg)]);
    }
});