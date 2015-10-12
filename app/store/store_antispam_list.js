
Ext.define('NFW2.store.store_antispam_list', {
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
            storeId: 'store_antispam_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('anti_spam')
                },
                url: '/api/ftuctrl/getObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
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
                    name: 'chktype'
                },
                {
                    name: 'action'
                },
                {
                    name: 'addtitle'
                },
                {
                    name: 'maxreceivercount',
                    sortType: 'asInt'
                },
                {
                    name: 'maxmailsize',
                    sortType: 'asInt'
                },
                {
                    name: 'spamfilter'
                },
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'useBaysian'
                },
                {
                    name: 'BaysianScore'
                },
                {
                    name: 'useRBL'
                },
                {
                    name: 'RBL'
                },
                {
                    name: 'ChangedReceiver'
                },
                {
                    name: 'AlarmReceiver'
                },
                {
                    name: 'AlarmEvent'
                },
                {
                    name: 'IP'
                },
                {
                    name: 'MailAddress'
                },
                {
                    name: 'AllowSendingCount'
                },
                {
                    name: 'SendingProhibitTime'
                },
                {
                    name: 'SendingIntegralTime'
                },
                {
                    name: 'AllowReceivingCount'
                },
                {
                    name: 'ReceivingProhibitTime'
                },
                {
                    name: 'ReceivingIntegralTime'
                }
            ]
        }, cfg)]);
    }
});