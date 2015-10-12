
Ext.define('NFW2.store.store_system_state_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_system_state_time',
            autoLoad: true,
            data: [
                {
                    val: '0'
                },
                {
                    val: '1'
                },
                {
                    val: '2'
                },
                {
                    val: '3'
                },
                {
                    val: '4'
                },
                {
                    val: '5'
                },
                {
                    val: '6'
                },
                {
                    val: '7'
                },
                {
                    val: '8'
                },
                {
                    val: '9'
                },
                {
                    val: '10'
                },
                {
                    val: '11'
                },
                {
                    val: '12'
                },
                {
                    val: '13'
                },
                {
                    val: '14'
                },
                {
                    val: '15'
                },
                {
                    val: '16'
                },
                {
                    val: '17'
                },
                {
                    val: '18'
                },
                {
                    val: '19'
                },
                {
                    val: '20'
                },
                {
                    val: '21'
                },
                {
                    val: '22'
                },
                {
                    val: '23'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});