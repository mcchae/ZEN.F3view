
Ext.define('NFW2.store.store_monitor_ddos_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ddos_list',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'attack_name'
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
                    name: 'action'
                },
                {
                    name: 'bytes'
                },
                {
                    name: 'block_count',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});