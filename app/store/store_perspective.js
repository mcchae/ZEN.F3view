
Ext.define('NFW2.store.store_perspective', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_perspective',
            data: [
                {
                    value: '전체',
                    name: '전체'
                },
                {
                    value: 'admin',
                    name: '관리자'
                },
                {
                    value: 'sec_admin',
                    name: '보안관리자'
                },
                {
                    value: 'user',
                    name: '일반사용자'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});