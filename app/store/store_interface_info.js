
Ext.define('NFW2.store.store_interface_info', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_interface_info',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'port'
                },
                {
                    name: 'speed'
                },
                {
                    name: 'errs'
                },
				 {
                    name: 'colls'
                },
                {
                    name: 'zone'
                },
				{
                    name: 'duplex'
                },
                {
                    name: 'ip'
                },
				{
                    name: 'mac'
                },
				{
					name:'state'
				}
				
            ]
        }, cfg)]);
    }
});