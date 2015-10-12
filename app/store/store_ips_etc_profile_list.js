
Ext.define('NFW2.store.store_ips_etc_profile_list', {
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
            storeId: 'store_ips_etc_profile_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('ips_profile')
                },
                url: '/api/ftuctrl/getIPSProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'profile_id'
                },
                {
                    name: '@num'
                }
            ]
        }, cfg)]);
    }
});