
Ext.define('NFW2.store.store_security_isakmpsa_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_security_isakmpsa_list',
            pageSize: 100,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'ver'
                },
                {
                    name: 'action'
                },
                {
                    name: 'authby'
                },
                {
                    name: 'psk'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'force_natt'
                },
                {
                    name: 'dpd_sec'
                },
                {
                    name: 'dpd_cnt'
                },
                {
                    name: 'encpt'
                },
                {
                    name: 'auth'
                },
                {
                    name: 'group'
                },
                {
                    name: 'lifetime'
                },
                {
                    name: 'ipsecsa_obj'
                },
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'cert_name'
                },
                {
                    name: 'algorism'
                }
            ]
        }, cfg)]);
    }
});