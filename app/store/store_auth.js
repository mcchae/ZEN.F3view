
Ext.define('NFW2.store.store_auth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_auth',
            data: [
                {
                    value: 'local',
                    name: 'Local'
                },
                {
                    value: 'ldap',
                    name: 'LDAP'
                },
                {
                    value: 'radius',
                    name: 'RADIUS'
                },
                {
                    value: 'tacacs',
                    name: 'TACACS+'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});