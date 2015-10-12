
Ext.define('NFW2.store.store_p_icmp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_p_icmp',
            data: [
                {
                    val: 'Any'
                },
                {
                    val: 'echo-request'
                },
                {
                    val: 'echo-reply'
                },
                {
                    val: 'destination-unreachable'
                },
                {
                    val: 'source-quench'
                },
                {
                    val: 'redirect'
                },
                {
                    val: 'router-advertisement'
                },
                {
                    val: 'router-solicitation'
                },
                {
                    val: 'time-exceeded'
                },
                {
                    val: 'timestamp-request'
                },
                {
                    val: 'timestamp-reply'
                },
                {
                    val: 'address-mask-request'
                },
                {
                    val: 'address-mask-reply'
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