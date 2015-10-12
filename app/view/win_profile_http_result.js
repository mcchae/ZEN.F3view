
Ext.define('NFW2.view.win_profile_http_result', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_profile_http_result',

    requires: [
        'NFW2.view.win_profile_configViewModel1',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_profile_http_result'
    },
    cls: 'zen_win',
    width: 500,
    bodyPadding: 20,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onWindowAfterRender'
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
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    bind: {
                                        text: '{url_64max}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_byte',
                            maxHeight: 300,
                            scrollable: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 0 0 5',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    bind: {
                                        text: '{url_duplication}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_dup',
                            maxHeight: 300,
                            scrollable: true
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
                    itemId: 'fld_msg_pop'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onB_addClick1'
                    }
                }
            ]
        }
    ],

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        var _byte = me._byte;
        var _dup = me._dup;

        if(_byte.length > 0){
            Ext.getCmp("con_byte").update(_byte.join('<br/>'));
        }

        if(_dup.length > 0){
            Ext.getCmp("con_dup").update(_dup.join('<br/>'));
        }
    },

    onB_addClick1: function(button, e, eOpts) {
        this.close();
    }

});