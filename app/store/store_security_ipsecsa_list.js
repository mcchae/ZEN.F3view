
Ext.define('NFW2.store.store_security_ipsecsa_list', {
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
            storeId: 'store_security_ipsecsa_list',
            autoLoad: false,
            sortOnLoad: false,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: '_id'
                },
                {
                    name: 'uid'
                },
                {
                    name: 'ips_lifetime'
                },
                {
                    name: 'hub_net'
                },
                {
                    name: 'pfsgroup'
                },
                {
                    name: 'dpd_sec'
                },
                {
                    name: 'isa_lifetime'
                },
                {
                    name: 'isa_mode'
                },
                {
                    name: 'iface'
                },
                {
                    name: 'group'
                },
                {
                    name: 'local_text'
                },
                {
                    name: 'force_natt'
                },
                {
                    name: 'dns'
                },
                {
                    name: 'timeout'
                },
                {
                    name: 'ip_pool'
                },
                {
                    name: 'isa_algorithm'
                },
                {
                    name: 'dpd_cnt'
                },
                {
                    name: 'psk'
                },
                {
                    name: 'client_ip'
                },
                {
                    name: 'Xauth_certi'
                },
                {
                    name: 'ips_mode'
                },
                {
                    name: 'ips_local'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'sechost'
                },
                {
                    name: 'cert_name'
                },
                {
                    name: 'client_id'
                },
                {
                    name: 'others'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'reply_prot'
                },
                {
                    name: 'ips_algorithm'
                },
                {
                    name: 'ver'
                },
                {
                    name: 'client_pw'
                },
                {
                    name: 'Xauth_serv'
                },
                {
                    name: 'authby'
                },
                {
                    name: 'action'
                },
                {
                    name: 'ips_remote'
                },
                {
                    name: 'remote_text'
                },
                {
                    name: 'ip_ver'
                }
            ]
        }, cfg)]);
    }
});