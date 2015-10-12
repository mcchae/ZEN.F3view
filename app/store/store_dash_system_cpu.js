
Ext.define('NFW2.store.store_dash_system_cpu', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_dash_system_cpu',
            fields: [
                {
                    name: 'cpunic'
                },
                {
                    name: 'cpusys'
                },
                {
                    name: 'cpuidl'
                },
                {
                    name: 'cpuusr'
                },
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});