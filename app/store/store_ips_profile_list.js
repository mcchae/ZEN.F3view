
Ext.define('NFW2.store.store_ips_profile_list', {
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
            storeId: 'store_ips_profile_list',
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
                    name: '@cid'
                },
                {
                    name: 'profile_id'
                },
                {
                    name: 'name'
                },
                {
                    name: 'profile_disc'
                },
                {
                    name: 'use_signatures'
                }
            ]
        }, cfg)]);
    }
});