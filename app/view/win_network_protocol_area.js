
Ext.define('NFW2.view.win_network_protocol_area', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_area',

    requires: [
        'NFW2.view.win_network_protocol_areaViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_area'
    },
    height: 250,
    id: 'win_network_protocol_area',
    width: 400,
    title: 'My Window',

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'My Label'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 250
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 120,
                                    text: 'Area'
                                },
                                {
                                    xtype: 'combobox',
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Peer IP',
                                    labelWidth: 120
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    width: 450,
                                    fieldLabel: '설명',
                                    labelWidth: 120
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    text: '확인'
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    text: '취소'
                }
            ]
        }
    ]

});