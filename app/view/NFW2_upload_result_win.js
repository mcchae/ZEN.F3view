
Ext.define('NFW2.view.NFW2_upload_result_win', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_upload_result_win',

    requires: [
        'NFW2.view.NFW2_upload_result_winViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_upload_result_win'
    },
    cls: 'zen_win',
    height: 350,
    width: 450,
    title: 'Result',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 20,
            title: '',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            listeners: {
                afterrender: 'onFormAfterRender'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    bind: {
                                        text: '{invalid_fail}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'l_invalid',
                                    maxHeight: 210,
                                    scrollable: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    bind: {
                                        text: '{duplication_fail}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'l_duplicate',
                                    maxHeight: 210,
                                    scrollable: true
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
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick11'
                    }
                }
            ]
        }
    ],

    onFormAfterRender: function(component, eOpts) {
        var me = this;
        var data = me.fail_ip;

        var ar_du = [];
        var ar_in = [];

        for(var i=0; i<data.length; i++){
            if(data[i].reason === "duplicate data"){
                ar_du.push(data[i].ip);
            }else
            if(data[i].reason === "invalid format"){
                ar_in.push(data[i].ip);
            }
        }

        Ext.getCmp("l_invalid").update(ar_in.join("<br>"));

        Ext.getCmp("l_duplicate").update(ar_du.join("<br>"));
    },

    onButtonClick11: function(button, e, eOpts) {
        this.close();
    }

});