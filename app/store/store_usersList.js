
Ext.define('NFW2.store.store_usersList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_usersList',
            fields: [
                {
                    name: 'num'
                },
                {
                    name: 'id'
                },
                {
                    name: 'pwExpiryDate'
                },
                {
                    name: 'config'
                },
                {
                    name: 'log'
                },
                {
                    name: 'monitor'
                },
                {
                    name: 'email'
                },
                {
                    name: 'email_check'
                },
                {
                    name: 'tel'
                },
                {
                    name: 'host'
                },
                {
                    name: 'role'
                },
                {
                    name: 'otp'
                },
                {
                    name: 'md_passwd'
                },
                {
                    name: 'pass_days'
                },
                {
                    name: '_pass_limit_days_ts'
                },
                {
                    name: 'is_denied'
                }
            ]
        }, cfg)]);
    }
});