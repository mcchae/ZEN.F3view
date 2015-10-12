
Ext.define('NFW2.view.win_network_protocol_rip_status', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_rip_status',

    requires: [
        'NFW2.view.win_network_protocol_rip_statusViewModel',
        'Ext.form.Panel',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'win_network_protocol_rip_status'
    },
    cls: 'zen_win',
    height: 250,
    id: 'win_network_protocol_rip_status',
    width: 400,
    title: 'RIP Status',

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textareafield',
                    flex: 1,
                    readOnly: true,
                    editable: false
                }
            ]
        }
    ]

});