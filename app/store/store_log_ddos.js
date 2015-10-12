
Ext.define('NFW2.store.store_log_ddos', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_ddos',
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
                    name: 'attack_type'
                },
                {
                    name: 'block_count'
                },
                {
                    name: 'block_type'
                },
                {
                    name: 'detect_byte'
                },
                {
                    name: 'attack_pps'
                },
                {
                    name: 'profile_id'
                },
                {
                    name: 'action'
                },
                {
                    name: 'audit_log_id'
                },
                {
                    name: 'block_time'
                },
                {
                    name: 'packet_id'
                },
                {
                    name: 'logid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'ddos_start_time'
                },
                {
                    name: 'ddos_end_time'
                }
            ]
        }, cfg)]);
    }
});