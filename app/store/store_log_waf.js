
Ext.define('NFW2.store.store_log_waf', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_waf',
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
                    name: 'iface'
                },
                {
                    name: 'inbytes'
                },
                {
                    name: 'inpacket'
                },
                {
                    name: 'nat_dip'
                },
                {
                    name: 'nat_dport'
                },
                {
                    name: 'nat_sip'
                },
                {
                    name: 'nat_sport'
                },
                {
                    name: 'outbytes'
                },
                {
                    name: 'outpacket'
                },
                {
                    name: 'pkt_id'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'rule_num'
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
                    name: 'logid'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});