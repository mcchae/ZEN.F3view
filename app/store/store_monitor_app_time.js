
Ext.define('NFW2.store.store_monitor_app_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_app_time',
            data: [
                {
                    name: '30분',
                    val: 'half_hour'
                },
                {
                    name: '1시간',
                    val: 'hour'
                },
                {
                    name: '12시간',
                    val: 'half_day'
                },
                {
                    name: '1일',
                    val: 'day'
                },
                {
                    name: '1주일',
                    val: 'week'
                },
                {
                    name: '1달',
                    val: 'month'
                },
                {
                    name: '1년',
                    val: 'year'
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