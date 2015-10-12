
Ext.define('NFW2.store.store_group_member_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_group_member_list',
            groupField: 'type',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'retval'
                }
            },
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});