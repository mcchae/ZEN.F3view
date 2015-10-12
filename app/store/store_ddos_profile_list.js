
Ext.define('NFW2.store.store_ddos_profile_list', {
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
            autoLoad: true,
            storeId: 'store_ddos_profile_list',
            pageSize: 100,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/get_ddos_profile_list',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'name'
                },
                {
                    name: 'profile_info'
                },
                {
                    name: 'detectiondelicacy'
                },
                {
                    name: 'detection_info'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});