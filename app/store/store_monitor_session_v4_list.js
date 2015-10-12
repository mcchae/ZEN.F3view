
Ext.define('NFW2.store.store_monitor_session_v4_list', {
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
            pageSize: 100,
            storeId: 'store_monitor_session_v4_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    func_name: Ext.encode('mod_monitor_fw_block_info'),
                    args: Ext.encode({
                        ver: 4,
                        proto: 'any',
                        src: 'any',
                        dst: 'any',
                        sport: 'any',
                        dport: 'any',
                        block: 'any',
                        page: 1
                    })
                },
                url: '/api/ftuctrl/execKctrlFunc',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'start'
                },
                {
                    name: 'destination'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'strport',
                    sortType: 'asInt'
                },
                {
                    name: 'dstport',
                    sortType: 'asInt'
                },
                {
                    name: 'policy',
                    sortType: 'asInt'
                },
                {
                    name: 'timeout',
                    sortType: 'asInt'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});