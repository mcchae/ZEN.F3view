
Ext.define('NFW2.store.store_ips_user_group', {
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
            storeId: 'store_ips_user_group',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('ips_group')
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
                }
            ]
        }, cfg)]);
    }
});