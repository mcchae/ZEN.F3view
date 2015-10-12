
Ext.define('NFW2.store.store_alg_ftp_proxy', {
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
            storeId: 'store_alg_ftp_proxy',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('alg_ftp_proxy'),
                    
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'advertised_ftp_ip'
                },
                {
                    name: 'real_ftp_ip'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'port'
                },
                {
                    name: 'max_sess'
                },
                {
                    name: 'action'
                },
                {
                    name: 'upload'
                },
                {
                    name: 'download'
                },
                {
                    name: 'extension_chk_use'
                },
                {
                    name: 'argument_chk_use'
                },
                {
                    name: 'user_list'
                },
                {
                    name: 'command_chk_use'
                },
                {
                    name: 'enable'
                },
                {
                    name: 'num',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});