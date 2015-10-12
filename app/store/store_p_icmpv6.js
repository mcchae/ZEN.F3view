
Ext.define('NFW2.store.store_p_icmpv6', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_p_icmpv6',
            data: [
                {
                    val: 'Any'
                },
                {
                    val: 'destination-unreachable'
                },
                {
                    val: 'packet-too-big'
                },
                {
                    val: 'time-exceeded'
                },
                {
                    val: 'parameter-problem'
                },
                {
                    val: 'echo-request'
                },
                {
                    val: 'echo-reply'
                },
                {
                    val: 'multicast-listener-query'
                },
                {
                    val: 'multicast-listener-report'
                },
                {
                    val: 'multicast-listener-done'
                },
                {
                    val: 'redirect'
                },
                {
                    val: 'router-renumbering'
                },
                {
                    val: 'icmp-node-information-query'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});