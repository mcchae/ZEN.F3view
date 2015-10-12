
Ext.define('NFW2.view.win_isakmp_cert', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_isakmp_cert',

    requires: [
        'NFW2.view.win_isakmp_certViewModel',
        'Ext.form.Panel',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'win_isakmp_cert'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 400,
    title: '',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{version}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_version'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{con_number}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_num'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{sig_algorithm}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_algorithm'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{issuer}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_issuer'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{vd_start}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_limit_st'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{vd_end}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_limit_ed'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{subject}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_subject'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{public_key}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_key'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            width: 150,
                            bind: {
                                text: '{key_usage_purpose}'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_purpose'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        var data = me._data;

        me.setTitle(data.cert_name);
        Ext.getCmp("l_version").update();
        Ext.getCmp("l_num").update();
        Ext.getCmp("l_algorithm").update();
        Ext.getCmp("l_issuer").update(data.issuer);
        Ext.getCmp("l_limit_st").update();
        Ext.getCmp("l_limit_ed").update();
        Ext.getCmp("l_subject").update(data.subject);
        Ext.getCmp("l_key").update();
        Ext.getCmp("l_purpose").update();
    }

});