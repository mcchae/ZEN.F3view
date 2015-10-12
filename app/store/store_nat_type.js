
Ext.define('NFW2.store.store_nat_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_nat_type',
            data: [
				{
                    val: 'XNAT',
                    text: 'XNAT (eXclude NAT)'
                },
                {
                    val: 'SNAT',
                    text: 'SNAT (Source NAT)'
                },
				{
                    val: 'DNAT',
                    text: 'DNAT (Destination NAT)'
                },
                {
                    val: 'TNAT',
                    text: 'TNAT (Transparent NAT)'
                },
				{
                    val: 'FNAT',
                    text: 'FNAT (Full NAT)'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});