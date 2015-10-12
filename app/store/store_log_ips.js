
Ext.define('NFW2.store.store_log_ips', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_ips',
            fields: [
                {
                    name: 'index'
                },
                {
                    name: 'description'
                },
                {
                    name: 'dip'
                },
                {
                    name: 'direction'
                },
                {
                    name: 'dport'
                },
                {
                    name: 'event'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'sip'
                },
                {
                    name: 'sport'
                },
                {
                    name: 'timestamp'
                },
                {
                    name: 'timestamp1'
                },
                {
                    name: 'timestamp2'
                },
                {
                    name: 'fsid'
                },
                {
                    name: 'pattern_name'
                },
                {
                    name: 'ips_start'
                },
                {
                    name: 'ips_end'
                },
                {
                    name: 'action'
                },
                {
                    name: 'packet_id'
                },
                {
                    name: 'block_byte'
                },
                {
                    name: 'profile_id'
                },
                {
                    name: 'block_count'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'block_type'
                },
                {
                    name: 'logid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'spd_id'
                }
            ]
        }, cfg)]);
    }
});