
Ext.define('NFW2.store.store_ips_profile_signature_list', {
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
            pageSize: 1000,
            storeId: 'store_ips_profile_signature_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('signature_list')
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
                    name: '@fsid'
                },
                {
                    name: '@type'
                },
                {
                    name: 'signature_name'
                },
                {
                    name: 'content'
                },
                {
                    name: 'nocase'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'src_addr'
                },
                {
                    name: 'src_port'
                },
                {
                    name: 'direction'
                },
                {
                    name: 'dest_addr'
                },
                {
                    name: 'dest_port'
                },
                {
                    name: 'hazard'
                },
                {
                    name: 'detection_num'
                },
                {
                    name: 'detection_time'
                },
                {
                    name: 'block_time'
                },
                {
                    name: 'block_type'
                },
                {
                    name: 'snort'
                },
                {
                    name: 'group_id'
                },
                {
                    name: '_num'
                },
                {
                    name: 'signature_list'
                },
                {
                    name: 'action'
                },
                {
                    name: '_id'
                },
                {
                    name: 'audit'
                },
                {
                    name: 'use'
                },
                {
                    name: '_check'
                },
                {
                    name: 'ips_profile'
                }
            ]
        }, cfg)]);
    }
});