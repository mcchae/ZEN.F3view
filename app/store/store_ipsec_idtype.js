
Ext.define('NFW2.store.store_ipsec_idtype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipsec_idtype',
            data: [
                {
                    name: 'Default',
                    val: 'default'
                },
                {
                    name: 'FQDN',
                    val: 'fqdn'
                },
                {
                    name: 'User FQDN',
                    val: 'user'
                },
                {
                    name: 'Key ID',
                    val: 'key'
                },
                {
                    name: 'Any',
                    val: 'any'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});