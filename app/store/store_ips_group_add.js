
Ext.define('NFW2.store.store_ips_group_add', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ips_group_add',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('ips_group'),
                    start_group_id: Ext.encode(0)
                },
                url: '/api/ftuctrl/getIPSGroup',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '@id'
                },
                {
                    name: 'group_name'
                },
                {
                    name: 'totalcnt'
                }
            ]
        }, cfg)]);
    }
});