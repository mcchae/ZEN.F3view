
Ext.define('NFW2.store.store_daships_uid_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_daships_uid_list',
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
                    type: 'int',
                    name: 'fsid'
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
                    type: 'int',
                    name: 'sport'
                },
                {
                    name: 'dip'
                },
                {
                    type: 'int',
                    name: 'dport'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'action'
                },
                {
                    type: 'int',
                    name: 'block_count'
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