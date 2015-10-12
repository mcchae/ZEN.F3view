
Ext.define('NFW2.store.store_monitor_ips_uid_list', {
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
            storeId: 'store_monitor_ips_uid_list',
            proxy: {
                type: 'jsonp',
                url: '/api/AoDBMgr/searchLog',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'policy'
                },
                {
                    name: 'fsid',
                    sortType: 'asInt'
                },
                {
                    name: 'signature_name'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'sip'
                },
                {
                    name: 'sport',
                    sortType: 'asInt'
                },
                {
                    name: 'dip'
                },
                {
                    name: 'dport',
                    sortType: 'asInt'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'action'
                },
                {
                    name: 'block_count',
                    sortType: 'asInt'
                },
                {
                    name: 'bytes'
                },
                {
                    name: 'block_type'
                },
                {
                    name: 'audit'
                },
                {
                    name: 'id'
                },
                {
                    name: 'sip_cc'
                },
                {
                    name: 'dip_cc'
                }
            ]
        }, cfg)]);
    }
});