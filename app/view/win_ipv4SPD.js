
Ext.define('NFW2.view.win_ipv4SPD', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipv4spd',

    requires: [
        'NFW2.view.win_ipv4SPDViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.form.field.Display',
        'Ext.form.CheckboxGroup',
        'Ext.XTemplate',
        'Ext.form.trigger.Trigger',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem'
    ],

    viewModel: {
        type: 'win_ipv4spd'
    },
    cls: 'zen_win',
    height: 610,
    id: 'win_ipv4SPD',
    width: 1050,
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            id: 'fm_v4spd',
            title: '',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'infw_out',
                    height: 230,
                    margin: '5 0 0 0',
                    padding: '5 0 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_src',
                            itemId: 'grid_src',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_src',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{src}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_src").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_src',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop2'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick',
                                containerclick: 'onGrid_srcContainerClick'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_dest',
                            itemId: 'grid_dest',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_dest',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{dest}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_dest").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_dest',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop1'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick1',
                                containerclick: 'onGrid_destContainerClick'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_svc',
                            itemId: 'grid_svc',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_svc',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{service}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_svc").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_svc',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick11',
                                containerclick: 'onGrid_svcContainerClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    cls: 'zen_tab',
                    width: 810,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            bind: {
                                title: '{basic_set}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                minWidth: 100
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'zen_tab_body',
                                    id: 'dv_basic',
                                    items: [
                                        {
                                            xtype: 'container',
                                            id: 'ct_num',
                                            padding: '',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){ return get_msg("err_null"); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        return true;



                                                    },
                                                    cls: 'lb_req',
                                                    id: 'num',
                                                    width: 200,
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: false,
                                                    maxLength: 31,
                                                    minLength: 1,
                                                    bind: {
                                                        fieldLabel: '{rule_rank}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onNameErrorChange',
                                                        keydown: 'onNumKeydown'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: 'fld_range',
                                                    margin: '0 0 0 20'
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'errorBox',
                                                    hidden: true,
                                                    id: 'err_name',
                                                    text: ''
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '5 0',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'cross_spd',
                                                    labelSeparator: ' ',
                                                    bind: {
                                                        fieldLabel: '{rule_two_way}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 5 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    padding: '0 0 0 10',
                                                    style: 'color:#666',
                                                    width: 115,
                                                    bind: {
                                                        text: '{action}'
                                                    }
                                                },
                                                {
                                                    xtype: 'segmentedbutton',
                                                    cls: 'zen_seg',
                                                    id: 'action',
                                                    items: [
                                                        {
                                                            enableToggle: true,
                                                            iconCls: 'icf_Accept',
                                                            pressed: true,
                                                            text: 'Accept',
                                                            listeners: {
                                                                click: 'onButtonClick10'
                                                            }
                                                        },
                                                        {
                                                            iconCls: 'icf_deny',
                                                            text: 'Deny',
                                                            listeners: {
                                                                click: 'onButtonClick9'
                                                            }
                                                        },
                                                        {
                                                            iconCls: 'icf_ipsec',
                                                            text: 'IPSec',
                                                            listeners: {
                                                                click: 'onButtonClick11'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    hidden: true,
                                                    id: 'info_deny_msg',
                                                    fieldCls: 'lb_blue',
                                                    bind: {
                                                        value: '{info_deny}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                padding: '0 0 10 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'loglevel',
                                                    labelSeparator: ' ',
                                                    bind: {
                                                        fieldLabel: '{log}'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            disabled: true,
                                                            hidden: true,
                                                            id: 'lv_option',
                                                            width: 550,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'lv_create',
                                                                    boxLabel: '세션생성'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'lv_close',
                                                                    boxLabel: '세션종료'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'lv_abnormal',
                                                                    boxLabel: '비정상 세션종료'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'lv_drop',
                                                                    boxLabel: '패킷드랍'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }

                                                        if(!LengthCheck(value, 0, 1000000)){ return ValidLimit(0, 1000000); }



                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        1000000,
                                                        null)
                                                    },
                                                    cls: 'lb_req inp_unit',
                                                    id: 'f_timeout',
                                                    width: 220,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 600,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: false,
                                                    bind: {
                                                        fieldLabel: '{timeout}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onTimeoutErrorChange',
                                                        keydown: 'onTimeoutKeydown',
                                                        blur: 'onTimeoutBlur',
                                                        focus: 'onTimeoutFocus'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'errorBox',
                                                    hidden: true,
                                                    id: 'err_timeout',
                                                    text: ''
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '7 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'memo',
                                                    width: 500,
                                                    labelSeparator: ' ',
                                                    enforceMaxLength: true,
                                                    maxLength: 127,
                                                    bind: {
                                                        fieldLabel: '{desc}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bind: {
                                title: '{profile}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                id: 'tab_profile',
                                minWidth: 100
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'zen_tab_body',
                                    id: 'dv_option',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'cont_http',
                                                    margin: '0 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'http',
                                                            width: 440,
                                                            labelSeparator: ' ',
                                                            labelWidth: 140,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: '@cid',
                                                            bind: {
                                                                fieldLabel: '{web_filtering}'
                                                            },
                                                            listeners: {
                                                                beforequery: 'onHttpBeforeQuery'
                                                            },
                                                            triggers: {
                                                                clear: {
                                                                    handler: function(field, trigger, e) {
                                                                        field.setValue(null);
                                                                    },
                                                                    cls: 'x-form-clear-trigger'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_add',
                                                            listeners: {
                                                                click: 'onButtonClick4'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cont_app',
                                                    margin: '0 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'app',
                                                            width: 440,
                                                            labelSeparator: ' ',
                                                            labelWidth: 140,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: '@cid',
                                                            bind: {
                                                                fieldLabel: '{app_control}'
                                                            },
                                                            listeners: {
                                                                beforequery: 'onAppBeforeQuery'
                                                            },
                                                            triggers: {
                                                                clear: {
                                                                    handler: function(field, trigger, e) {
                                                                        field.setValue(null);
                                                                    },
                                                                    cls: 'x-form-clear-trigger'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_add',
                                                            listeners: {
                                                                click: 'onButtonClick5'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cont_ips',
                                                    margin: '0 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'ips',
                                                            width: 440,
                                                            labelSeparator: ' ',
                                                            labelWidth: 140,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: '@cid',
                                                            bind: {
                                                                fieldLabel: '{ips}'
                                                            },
                                                            listeners: {
                                                                beforequery: 'onIpsBeforeQuery'
                                                            },
                                                            triggers: {
                                                                clear: {
                                                                    handler: function(field, trigger, e) {
                                                                        field.setValue(null);
                                                                    },
                                                                    cls: 'x-form-clear-trigger'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_add',
                                                            listeners: {
                                                                click: 'onButtonClick6'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cont_av',
                                                    margin: '0 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'anti_virus',
                                                            width: 440,
                                                            labelSeparator: ' ',
                                                            labelWidth: 140,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: '@cid',
                                                            bind: {
                                                                fieldLabel: '{av}'
                                                            },
                                                            listeners: {
                                                                beforequery: 'onAnti_virusBeforeQuery'
                                                            },
                                                            triggers: {
                                                                clear: {
                                                                    handler: function(field, trigger, e) {
                                                                        field.setValue(null);
                                                                    },
                                                                    cls: 'x-form-clear-trigger'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_add',
                                                            listeners: {
                                                                click: 'onButtonClick7'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cont_as',
                                                    margin: '0 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'anti_spam',
                                                            width: 440,
                                                            labelSeparator: ' ',
                                                            labelWidth: 140,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: '@cid',
                                                            bind: {
                                                                fieldLabel: '{as}'
                                                            },
                                                            listeners: {
                                                                beforequery: 'onAnti_spamBeforeQuery'
                                                            },
                                                            triggers: {
                                                                clear: {
                                                                    handler: function(field, trigger, e) {
                                                                        field.setValue(null);
                                                                    },
                                                                    cls: 'x-form-clear-trigger'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_add',
                                                            listeners: {
                                                                click: 'onButtonClick8'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bind: {
                                title: '{detail_set}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                minWidth: 100
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'zen_tab_body',
                                    id: 'dv_option1',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 0 5 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'schedule',
                                                    width: 440,
                                                    labelSeparator: ' ',
                                                    labelWidth: 110,
                                                    editable: false,
                                                    displayField: 'name',
                                                    valueField: '@cid',
                                                    bind: {
                                                        fieldLabel: '{schedule}'
                                                    },
                                                    listeners: {
                                                        beforequery: 'onScheduleBeforeQuery1'
                                                    },
                                                    triggers: {
                                                        clear: {
                                                            handler: function(field, trigger, e) {
                                                                field.setValue(null);
                                                            },
                                                            cls: 'x-form-clear-trigger'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    iconCls: 'icb_add',
                                                    listeners: {
                                                        click: 'onButtonClick3'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 5 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    tpl: '<tpl for="."><div class="x-boundlist-item">[{option.type}]{name}</div></tpl>',
                                                    id: 'qos',
                                                    width: 440,
                                                    labelSeparator: ' ',
                                                    labelWidth: 110,
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_firewall_object_qos',
                                                    valueField: '@cid',
                                                    bind: {
                                                        fieldLabel: '{qos}'
                                                    },
                                                    listeners: {
                                                        beforequery: 'onQosBeforeQuery1',
                                                        select: 'onQosSelect1'
                                                    },
                                                    triggers: {
                                                        clear: {
                                                            handler: function(field, trigger, e) {
                                                                field.setValue(null);
                                                            },
                                                            cls: 'x-form-clear-trigger'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    iconCls: 'icb_add',
                                                    listeners: {
                                                        click: 'onButtonClick'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    margins: '0 0 0 10',
                                                    hidden: true,
                                                    id: 'qos_prio',
                                                    width: 170,
                                                    labelSeparator: ' ',
                                                    labelWidth: 80,
                                                    value: 'middle',
                                                    editable: false,
                                                    store: {
                                                        data: [
                                                            {
                                                                val: 'high',
                                                                text: __zen('high')
                                                            },
                                                            {
                                                                val: 'middle',
                                                                text: __zen('middle')
                                                            },
                                                            {
                                                                val: 'low',
                                                                text: __zen('low')
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
                                                    },
                                                    valueField: 'val',
                                                    bind: {
                                                        fieldLabel: '{priority_level}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 5 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'session',
                                                    width: 440,
                                                    labelSeparator: ' ',
                                                    labelWidth: 110,
                                                    editable: false,
                                                    displayField: 'name',
                                                    valueField: '@cid',
                                                    bind: {
                                                        fieldLabel: '{ses_usage}'
                                                    },
                                                    listeners: {
                                                        beforequery: 'onSessionBeforeQuery1'
                                                    },
                                                    triggers: {
                                                        clear: {
                                                            handler: function(field, trigger, e) {
                                                                field.setValue(null);
                                                            },
                                                            cls: 'x-form-clear-trigger'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    iconCls: 'icb_add',
                                                    listeners: {
                                                        click: 'onButtonClick1'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        padding: '0 0 7 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'expire_use',
                                                            labelSeparator: ' ',
                                                            labelWidth: 110,
                                                            bind: {
                                                                fieldLabel: '{fw_valid_period}'
                                                            },
                                                            listeners: {
                                                                change: 'onExpire_useChange1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            disabled: true,
                                                            id: 'expire_date',
                                                            fieldLabel: '',
                                                            labelSeparator: ' ',
                                                            editable: false,
                                                            format: 'Y-m-d',
                                                            submitFormat: 'Y-m-d'
                                                        },
                                                        {
                                                            xtype: 'timefield',
                                                            disabled: true,
                                                            id: 'expire_time',
                                                            width: 100,
                                                            fieldLabel: '',
                                                            labelSeparator: ' ',
                                                            editable: false,
                                                            format: 'H',
                                                            increment: 60,
                                                            submitFormat: 'H'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldInfo: {
                                                                txt: __zen('fw_email_info1')
                                                            },
                                                            disabled: true,
                                                            id: 'expire_mail',
                                                            margin: '0 0 3 115',
                                                            width: 500,
                                                            labelAlign: 'top',
                                                            labelSeparator: ' ',
                                                            bind: {
                                                                fieldLabel: '{fw_email_set}'
                                                            },
                                                            listeners: {
                                                                focus: 'onExpire_mailFocus',
                                                                blur: 'onExpire_mailBlur'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_ssli',
                                            labelSeparator: ' ',
                                            bind: {
                                                fieldLabel: '{ssl_inspection}'
                                            }
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
                            itemId: 'fld_msg_fw'
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'on_btn_confirm'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'on_btn_cancel'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'right',
            margin: '5 0 0 0',
            width: 240,
            bodyCls: 'pnl_sub',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'cycle',
                            changeHandler: function(button, item) {
                                button.value = item.itemIndex;
                                //if(item.itemIndex===0){button.text = __zen('name');}

                            },
                            cls: 'btn_b',
                            itemId: 'sear_type',
                            width: 75,
                            value: 0,
                            showText: true,
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menucheckitem',
                                        id: 'sel_fw_cycle_name'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'IP'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'Port'
                                    }
                                ]
                            },
                            listeners: {
                                render: 'onSear_typeRender'
                            }
                        },
                        {
                            xtype: 'textfield',
                            cls: 's_input',
                            width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keydown: 'onTextfieldKeydown'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'pnl_sub_in',
                    items: [
                        {
                            xtype: 'segmentedbutton',
                            componentCls: 'zen_seg',
                            id: 'b_segment',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    enableToggle: true,
                                    pressed: true,
                                    bind: {
                                        text: '{src}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                },
                                {
                                    bind: {
                                        text: '{dest}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick21'
                                    }
                                },
                                {
                                    bind: {
                                        text: '{service}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick211'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'segmentedbutton',
                                    componentCls: 'zen_seg',
                                    id: 'b_segment_sub',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            itemId: 'seg_ip_all',
                                            enableToggle: true,
                                            pressed: true,
                                            text: 'All',
                                            listeners: {
                                                click: 'onButtonClick22'
                                            }
                                        },
                                        {
                                            itemId: 'seg_ip_ip',
                                            text: 'IP',
                                            listeners: {
                                                click: 'onButtonClick212'
                                            }
                                        },
                                        {
                                            itemId: 'seg_ip_group',
                                            text: 'Group',
                                            listeners: {
                                                click: 'onButtonClick2111'
                                            }
                                        },
                                        {
                                            itemId: 'seg_ip_etc',
                                            text: 'Etc',
                                            listeners: {
                                                click: 'onButtonClick21111'
                                            }
                                        },
                                        {
                                            hidden: true,
                                            itemId: 'seg_svc_all',
                                            text: 'All',
                                            listeners: {
                                                click: 'onButtonClick211111'
                                            }
                                        },
                                        {
                                            hidden: true,
                                            itemId: 'seg_svc_port',
                                            text: 'Port',
                                            listeners: {
                                                click: 'onButtonClick2111111'
                                            }
                                        },
                                        {
                                            hidden: true,
                                            itemId: 'seg_svc_group',
                                            text: 'Group',
                                            listeners: {
                                                click: 'onButtonClick21111111'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    itemId: 'btn_add_obj',
                                    iconCls: 'ics_add',
                                    menu: {
                                        xtype: 'menu',
                                        id: 'add_obj_inlist',
                                        width: 150
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    cls: 'sub_grid',
                    height: 450,
                    id: 'grid_setobj',
                    itemId: 'grid_setobj',
                    hideHeaders: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                            },
                            dataIndex: 'name',
                            flex: 1
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 40,
                            dataIndex: 'otype',
                            items: [
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (v !== "env")?"icr_detail":"";
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var cid = record.data.cid;
                                        var otype = record.data.otype;


                                        var tmptd = Ext.get(row).query("ul")[1];
                                        var flag = (tmptd !== undefined)?false:true;


                                        Ext.getCmp("win_ipv4SPD").get_obj_info(cid,otype,"grid_setobj",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);

                                    }
                                },
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (v !== "env")?"icr_edit":"";
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                        var otype = record.data.otype;
                                        var loadmode = (otype==="port" || otype==="group")?"store_svc_obj":"store_ip_obj";
                                        var target = (otype==="port" || otype==="group")?"spd_svc":"spd_ip";

                                        var pid = "";

                                        switch(otype){
                                            case "v4" 		: pid = "win_ipv4";break;
                                            case "v4_group" : pid = "win_ipv4_group";break;
                                            case "domain" 	: pid = "win_ipv4_domain";break;
                                            case "country" 	: pid = "win_country";break;
                                            case "user" 	: pid = "win_user";break;
                                            case "user_group": pid = "win_user_group";break;
                                            case "port" 	: pid = "win_service_port";break;
                                            case "group" 	: pid = "win_portgroup";break;
                                        }

                                        var win = Ext.create('NFW2.view.'+pid,{
                                            edit : "edit",
                                            cid : record.data.cid,
                                            num : '',
                                            modal : true,
                                            loadmode: loadmode,
                                            target : target
                                        });
                                        win.show();
                                    }
                                }
                            ]
                        }
                    ],
                    viewConfig: {
                        copy: true,
                        plugins: [
                            {
                                ptype: 'gridviewdragdrop',
                                dragGroup: 'grid_setobj',
                                dropGroup: 'grid_src',
                                enableDrop: false
                            }
                        ]
                    },
                    listeners: {
                        cellclick: 'onGrid_setobjCellClick',
                        celldblclick: 'onGrid_setobjCellDblClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onViewBeforeDrop2: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype === "port" || otype === "group"){	return false;	}

        var tmp = Ext.data.StoreManager.lookup("store_tmp_src");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}
    },

    onGrid_srcCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;


        this.get_obj_info(cid,otype,"grid_src",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_srcContainerClick: function(dataview, e, eOpts) {
         Ext.getCmp('b_segment').getComponent(0).setPressed(true);
        this.make_inlist('src');
    },

    onViewBeforeDrop1: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype === "port" || otype === "group"){	return false;	}

        var tmp = Ext.data.StoreManager.lookup("store_tmp_dest");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}
    },

    onGrid_srcCellClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;

        this.get_obj_info(cid,otype,"grid_dest",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_destContainerClick: function(dataview, e, eOpts) {
         Ext.getCmp('b_segment').getComponent(1).setPressed(true);
        this.make_inlist('dest');
    },

    onViewBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(!(otype === "port" || otype === "group")){	return false;	}

        var tmp = Ext.data.StoreManager.lookup("store_tmp_svc");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}
    },

    onGrid_srcCellClick11: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;

        this.get_obj_info(cid,otype,"grid_svc",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_svcContainerClick: function(dataview, e, eOpts) {
         Ext.getCmp('b_segment').getComponent(2).setPressed(true);
        this.make_inlist('svc');
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg_fw");
    },

    onNumKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                        if(ValidNumKeydown(code)===false){
                            e.stopEvent();
                        }
    },

    onButtonClick10: function(button, e, eOpts) {
        this.chg_deny_action();
    },

    onButtonClick9: function(button, e, eOpts) {
        this.chg_deny_action();
    },

    onButtonClick11: function(button, e, eOpts) {
        this.chg_deny_action();
    },

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg_fw");
    },

    onTimeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                        if(ValidNumKeydown(code)===false){
                            e.stopEvent();
                        }
    },

    onTimeoutBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
                if(component.getValue()===""){
                    component.setValue(600);
                }
    },

    onTimeoutFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onHttpBeforeQuery: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick4: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_profile_http',{
                                    modal : true
                                });
                                win.show();
    },

    onAppBeforeQuery: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick5: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_awareness',{
                                    modal : true
                                });
                                win.show();
    },

    onIpsBeforeQuery: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick6: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_add_ips_profile',{
                                    modal : true
                                });
                                win.show();
    },

    onAnti_virusBeforeQuery: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick7: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_antivirus_profile',{
                                    modal : true
                                });
                                win.show();
    },

    onAnti_spamBeforeQuery: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick8: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_antispam_profile',{
                                    modal : true
                                });
                                win.show();
    },

    onScheduleBeforeQuery1: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick3: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_schedule',{
                                    modal : true
                                });
                                win.show();
    },

    onQosBeforeQuery1: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onQosSelect1: function(combo, records, eOpts) {
        var qos_type = records[0].raw.option.type;

        if(qos_type==="prio"){Ext.getCmp('qos_prio').show();}
        else{	Ext.getCmp('qos_prio').hide();	}

    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_object_qos',{
                                    modal : true/*,
                                    loadmode: "store_ip_obj",
                                    target:target*/
                                });
                                win.show();
    },

    onSessionBeforeQuery1: function(queryPlan, eOpts) {
        //queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onButtonClick1: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_object_session',{
                                    modal : true/*,
                                    loadmode: "store_ip_obj",
                                    target:target*/
                                });
                                win.show();
    },

    onExpire_useChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue===true){
            Ext.getCmp("expire_date").setDisabled(false);
            Ext.getCmp("expire_time").setDisabled(false);
            Ext.getCmp("expire_mail").setDisabled(false);

        }else{
            Ext.getCmp("expire_date").setDisabled(true);
            Ext.getCmp("expire_time").setDisabled(true);
            Ext.getCmp("expire_mail").setDisabled(true);
            Ext.getCmp("expire_date").setValue('');
            Ext.getCmp("expire_time").setValue('');
            Ext.getCmp("expire_mail").setValue('');
        }
    },

    onExpire_mailFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onExpire_mailBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    on_btn_confirm: function(button, e, eOpts) {
        this.set_fw_spd_ipv4();


    },

    on_btn_cancel: function(button, e, eOpts) {
        this.close();
    },

    onSear_typeRender: function(component, eOpts) {
         component.setText(__zen('name'));
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var settype = Ext.ComponentQuery.query('#sear_type')[0].value;
        var _store = (Ext.getCmp('b_segment').getComponent(2).pressed===true)?"store_svc_obj":"store_ip_obj";

        switch (settype){
            case 0 	: var _params = {type:'name',other:textfield.value}; break;
            case 1	: var _params = {type:'ip',ip:textfield.value}; break;
            case 2	: var _params = {type:'port',port:parseInt(textfield.value)}; break;
        }


        if(e.keyCode === 13){
            if(textfield.value===""){Ext.data.StoreManager.lookup(_store).getProxy().setExtraParam("search_info",  Ext.encode([]));}else{
            Ext.data.StoreManager.lookup(_store).getProxy().setExtraParam("search_info",  Ext.encode(_params));
            }
        Ext.data.StoreManager.lookup(_store).load();
        }

    },

    onButtonClick2: function(button, e, eOpts) {
        this.make_inlist('src');
    },

    onButtonClick21: function(button, e, eOpts) {
        this.make_inlist('dest');
    },

    onButtonClick211: function(button, e, eOpts) {
        this.make_inlist('svc');
    },

    onButtonClick22: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4","ipv4_group","country","domain","user","user_group"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick212: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick2111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4_group"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick21111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","country","domain","user","user_group"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick211111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port","service_group"]));
                Ext.data.StoreManager.lookup('store_svc_obj').load();
    },

    onButtonClick2111111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port"]));
                Ext.data.StoreManager.lookup('store_svc_obj').load();
    },

    onButtonClick21111111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["service_group"]));
                Ext.data.StoreManager.lookup('store_svc_obj').load();
    },

    onGrid_setobjCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        return false;
        var cid = record.data.cid;
        var otype = record.data.otype;
        this.get_obj_info(cid,otype,"grid_setobj",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname);
    },

    onGrid_setobjCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var _tmpstore = "";

        if(Ext.getCmp('b_segment').getComponent(0).pressed===true){	_tmpstore = "store_tmp_src";}
        else if(Ext.getCmp('b_segment').getComponent(1).pressed===true){	_tmpstore = "store_tmp_dest";}
        else if(Ext.getCmp('b_segment').getComponent(2).pressed===true){	_tmpstore = "store_tmp_svc";}

        var tmp = Ext.data.StoreManager.lookup(_tmpstore);

        var chk_dob = tmp.find('cid', record.data.cid);


        if(chk_dob !== -1){	return false;	}

        tmp.add({
            'name' : (record.data.xname===undefined)?record.data.name:record.data.xname,
            'otype' : record.data.otype,
            'cid' : record.data.cid
        });

    },

    onWindowAfterRender: function(component, eOpts) {
        this.init_fw_spd_ipv4();
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        Ext.getCmp('sel_fw_cycle_name').setText(__zen('name'));
    },

    init_fw_spd_ipv4: function(edit, uid) {
        var me = this;

        console.log(me.license);

        Ext.data.StoreManager.lookup('store_firewall_object_qos').load();


        var _getprofile = [
            {    collection: 'with_cid',   cond:{'_kind':'fw_profile_web'},    sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0},
            {    collection: 'with_cid',   cond:{'_kind':'fw_profile_application'},    sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0},
            {    collection: 'ips_profile',   cond:{},    sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0},
            {    collection: 'with_cid',   cond:{'_kind':'anti_virus'},    sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0},
            {    collection: 'with_cid',   cond:{'_kind':'anti_spam'},    sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0},
            {    collection: 'with_cid',   cond:{'_kind':'object_schedule'},    sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0},
            {    collection: 'with_cid',   cond:{'_kind':'object_session'},   sort:'name',    fields:{'@cid':1,'name':1,'_id':0},   ver:0}
        ];

        var xparams = {
            options : Ext.encode(_getprofile)
        };

        request_helper.xmlrpc_call_JsonP('ftuctrl','getMultiObjs',xparams,
                                         function(response){

                                             console.log(response);

                                             for(var i=0; i<response.length; i++){

                                                 var in_data = [];
                                                 var __cond = (response[i].collection === "ips_profile")?"ips":response[i].cond._kind;

                                                 for(var k=0; k<response[i].objs.length; k++){

                                                     in_data.push({
                                                         '@cid' : response[i].objs[k]["@cid"],
                                                         'name' :response[i].objs[k].name
                                                     });
                                                 }
                                                 var __store = Ext.create('Ext.data.Store', {
                                                     fields: ['@cid', 'name'],
                                                     data : in_data
                                                 });

                                                 if(__cond === "fw_profile_web")				{	 Ext.getCmp("http").bindStore(__store);}
                                                 else if(__cond === "fw_profile_application")	{	 Ext.getCmp("app").bindStore(__store);}
                                                 else if(__cond === "ips")					{	 Ext.getCmp("ips").bindStore(__store);}
                                                 else if(__cond === "anti_virus")				{	 Ext.getCmp("anti_virus").bindStore(__store);}
                                                 else if(__cond === "anti_spam")				{	 Ext.getCmp("anti_spam").bindStore(__store);}
                                                 else if(__cond === "object_schedule")		{	 Ext.getCmp("schedule").bindStore(__store);}
                                                 else if(__cond === "object_session")			{	 Ext.getCmp("session").bindStore(__store);}

                                             }

                                             if(me.edit === "edit"){

                                                 me.get_init_data(me.uid);

                                             }



                                         });


        if(me.license !== undefined){

            if(me.license.ipsec !== "on"){  Ext.getCmp('action').getComponent(2).hide();}
            if(me.license.ips !== "on")	{   Ext.getCmp("cont_ips").hide();}
            if(me.license.as !== "on")	{   Ext.getCmp("cont_as").hide();}
            if(me.license.av !== "on")	{   Ext.getCmp("cont_av").hide();}
            if(me.license.fw !== "on")	{   Ext.getCmp("cont_http").hide();Ext.getCmp("cont_app").hide();}
        }



        if(me.edit === "edit"){

            this.setTitle(__zen('spd_edit')+" - "+me.num);
            Ext.getCmp("ct_num").hide();






        }else{
            this.setTitle(__zen('spd_add'));

            Ext.getCmp("num").setValue(me.total);
            Ext.getCmp("fld_range").setText(" (1 ~ " + (me.total) + ")");

            Ext.data.StoreManager.lookup("store_tmp_src").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_dest").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_svc").removeAll();

            if(me.edit === "audit"){

                var newobj = me.auditData.newObject;

                var in_src = [];
                var in_dest = [];
                var in_svc = [];

                for(var i=0; i<newobj.src.length; i++){
                    if(newobj.src[i]["@otype"]==="Any"){continue;}
                    in_src.push({
                        'name' : newobj.src[i]["#text"],
                        'otype' : newobj.src[i]["@otype"],
                        'cid' : newobj.src[i]["@cid"]
                    });
                }
                for(var i=0; i<newobj.dest.length; i++){
                    if(newobj.dest[i]["@otype"]==="Any"){continue;}
                    in_dest.push({
                        'name' : newobj.dest[i]["#text"],
                        'otype' : newobj.dest[i]["@otype"],
                        'cid' : newobj.dest[i]["@cid"]
                    });
                }
                for(var i=0; i<newobj.service.length; i++){
                    if(newobj.service[i]["@otype"]==="Any"){continue;}
                    in_svc.push({
                        'name' : newobj.service[i]["#text"],
                        'otype' : newobj.service[i]["@otype"],
                        'cid' : newobj.service[i]["@cid"]
                    });
                }

                Ext.data.StoreManager.lookup("store_tmp_src").loadData(in_src);
                Ext.data.StoreManager.lookup("store_tmp_dest").loadData(in_dest);
                Ext.data.StoreManager.lookup("store_tmp_svc").loadData(in_svc);
            }

        }

        me.make_inlist('src_init');
    },

    get_init_data: function(uid) {
        var me = this;

        var _params = {
            basename : Ext.encode('firewall_filter_ipv4'),
            key : Ext.encode({'@uid':me.uid})
        };

        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,
                                             function(response){


                                                 var in_src = [];
                                                 var in_dest = [];
                                                 var in_svc = [];

                                                 for(var i=0; i<response.src.length; i++){
                                                     if(response.src[i]["@otype"]==="Any"){continue;}
                                                     in_src.push({
                                                         'name' : response.src[i]["#text"],
                                                         'otype' : response.src[i]["@otype"],
                                                         'cid' : response.src[i]["@cid"]
                                                     });
                                                 }
                                                 for(var i=0; i<response.dest.length; i++){
                                                     if(response.dest[i]["@otype"]==="Any"){continue;}
                                                     in_dest.push({
                                                         'name' : response.dest[i]["#text"],
                                                         'otype' : response.dest[i]["@otype"],
                                                         'cid' : response.dest[i]["@cid"]
                                                     });
                                                 }
                                                 for(var i=0; i<response.service.length; i++){
                                                     if(response.service[i]["@otype"]==="Any"){continue;}
                                                     in_svc.push({
                                                         'name' : response.service[i]["#text"],
                                                         'otype' : response.service[i]["@otype"],
                                                         'cid' : response.service[i]["@cid"]
                                                     });
                                                 }




                                                 Ext.getCmp("cross_spd").setValue((response.etc["@cross_spd"]==="on")?true:false);
                                                 Ext.getCmp("loglevel").setValue(response.etc["@loglevel"]);
                                                 Ext.getCmp("f_timeout").setValue(response.etc["@timeout"]);
                                                 Ext.getCmp("chk_ssli").setValue(response["@ssl"]);

                                                 if(response.etc["@action"]==="Accept"){
                                                     Ext.getCmp('action').getComponent(0).setPressed(true);
                                                 }else if(response.etc["@action"]==="Deny"){
                                                     Ext.getCmp('action').getComponent(1).setPressed(true);
                                                 }else if(response.etc["@action"]==="IPSec"){
                                                     Ext.getCmp('action').getComponent(2).setPressed(true);
                                                 }

                                                 Ext.getCmp("loglevel").setValue((response.etc["@loglevel"]==="on")?true:false);


                                                 Ext.getCmp("schedule").setValue(response.schedule["@cid"]);
                                                 Ext.getCmp("schedule").setRawValue(response.schedule["#text"]);
                                                 Ext.getCmp("qos").setValue(response.resource.qos["@cid"]);
                                                 Ext.getCmp("qos").setRawValue(response.resource.qos["#text"]);
                                                 if(!(response.resource.qos.prio==="" ||response.resource.qos.prio===undefined)){Ext.getCmp("qos_prio").show();}

                                                 Ext.getCmp("session").setValue(response.resource.session["@cid"]);
                                                 Ext.getCmp("session").setRawValue(response.resource.session["#text"]);

                                                 Ext.getCmp("app").setValue(response.profile.application["@cid"]);
                                                 Ext.getCmp("app").setRawValue(response.profile.application["#text"]);


                                                 Ext.getCmp("http").setValue(response.profile.http_filter["@cid"]);
                                                 Ext.getCmp("http").setRawValue(response.profile.http_filter["#text"]);





                                                 Ext.getCmp("ips").setValue(response.profile.ips["@cid"]);
                                                 Ext.getCmp("ips").setRawValue(response.profile.ips["#text"]);
                                                 Ext.getCmp("anti_virus").setValue(response.profile.anti_virus["@cid"]);
                                                 Ext.getCmp("anti_virus").setRawValue(response.profile.anti_virus["#text"]);
                                                 Ext.getCmp("anti_spam").setValue(response.profile.anti_spam["@cid"]);
                                                 Ext.getCmp("anti_spam").setRawValue(response.profile.anti_spam["#text"]);

                                                 Ext.getCmp("expire_use").setValue((response.expire["@chk_use"]==="on")?true:false);
                                                 Ext.getCmp("expire_date").setValue(response.expire["@date"]);
                                                 Ext.getCmp("expire_time").setValue(response.expire["@time"]);
                                                 Ext.getCmp("expire_mail").setValue(response.expire.mail);
                                                 Ext.getCmp("memo").setValue(response.desc);

                                                 Ext.data.StoreManager.lookup("store_tmp_src").loadData(in_src);
                                                 Ext.data.StoreManager.lookup("store_tmp_dest").loadData(in_dest);
                                                 Ext.data.StoreManager.lookup("store_tmp_svc").loadData(in_svc);

                                                 me.chg_deny_action();


                                             }
                                            );

    },

    set_fw_spd_ipv4: function(edit, uid) {
        var me = this;


        /*if(me.license.fw !== "on" && Ext.getCmp('action_g').getValue().action !== "IPSec"){
            if(Ext.getCmp('ips').getValue()===null && Ext.getCmp('app').getValue()===null){
            prt_errMsg("IPS 또는 어플리케이션 항목 필수 선택입니다.",null); return false;
            }
        } *//*is_cc*/


        if((Ext.getCmp('expire_use').getValue()===true)){
            var tmpexpire = Ext.getCmp('expire_date').getSubmitValue();
            var tmptoday =  getTodayTime();
            var _today = tmptoday.substr(0,4)+ tmptoday.substr(5,2) + tmptoday.substr(8,2);
            var _time = Number(tmptoday.substr(11,2))+1;
            var _setdate = tmpexpire.substr(0,4)+ tmpexpire.substr(5,2) + tmpexpire.substr(8,2);
            var _settime = Ext.getCmp('expire_time').getSubmitValue();


            if(tmpexpire === "" || _settime === null){prt_errMsg(__zen('fw_valid_period')+ get_msg("err_null"),'fld_msg_fw'); return false;}
            if (_setdate < _today){	prt_errMsg(get_msg("err_date"),'fld_msg_fw'); return false;}
            if (_setdate === _today){	if(_time > Number(_settime)) { prt_errMsg(get_msg("err_time"),'fld_msg_fw'); return false;}}

            var tmpmail =  Ext.getCmp('expire_mail').getValue();
            if(tmpmail!==""){
                var ar_mail =  tmpmail.split(",");
                for(var i=0; i<ar_mail.length; i++){
                    if(!ValidEmail(ar_mail[i])){ prt_errMsg(get_msg("err_email"),'fld_msg_fw'); return false;}
                }
            }
        }

        var __tmptotal = Ext.data.StoreManager.lookup('store_spd_ipv4_list').getTotalCount();

        var obj = new Object();
        var rule = {};


        var ar_src = Ext.getCmp("grid_src").getStore().data.items;
        var ar_dest = Ext.getCmp("grid_dest").getStore().data.items;
        var ar_svc = Ext.getCmp("grid_svc").getStore().data.items;

        var cnt_src = ar_src.length;
        var cnt_dest = ar_dest.length;
        var cnt_service = ar_svc.length;



        var tmp_null = {"@cid" :"null", "@otype" : "Any",  "#text" : "Any"};

        rule["src"] = [];
        rule["dest"] = [];
        rule["service"] = [];

        if(cnt_src === 0){rule["src"].push(tmp_null);}else{
            for(var i=0; i<cnt_src; i++){

                obj = {
                    '@cid' : ar_src[i].data.cid,
                    '@otype' :ar_src[i].data.otype,
                    '#text' : (ar_src[i].data.xname===undefined)?ar_src[i].data.name:ar_src[i].data.xname
                };

                rule["src"].push(obj);
            }
        }

        if(cnt_dest === 0){rule["dest"].push(tmp_null);}else{
            for(var i=0; i<cnt_dest; i++){

                obj = {
                    '@cid' : ar_dest[i].data.cid,
                    '@otype' :ar_dest[i].data.otype,
                    '#text' : (ar_dest[i].data.xname===undefined)?ar_dest[i].data.name:ar_dest[i].data.xname
                };

                rule["dest"].push(obj);
            }
        }


        if(cnt_service === 0){rule["service"].push(tmp_null);}else{
            for(var i=0; i<cnt_service; i++){

                obj = {
                    '@cid' : ar_svc[i].data.cid,
                    '@otype' :ar_svc[i].data.otype,
                    '#text' : (ar_svc[i].data.xname===undefined)?ar_svc[i].data.name:ar_svc[i].data.xname
                };

                rule["service"].push(obj);
            }
        }



        var update	=(me.edit === "edit")?true:false;

        if(update===false){

            var num = parseInt(Ext.getCmp('num').getValue());


            rule["@use"]		= "on";
            rule["@num"]		= (num > (__tmptotal))?__tmptotal:num;
        }else{
            rule["@uid"]		= parseInt(me.uid);
        }

        rule["@ssl"]		= (Ext.getCmp('chk_ssli').getValue()===true)?"on":"off";
        rule["desc"]		= Ext.getCmp('memo').getValue();

        var action = "Accept";
        if(Ext.getCmp('action').getComponent(1).pressed===true){
            action = "Deny";
        }else if(Ext.getCmp('action').getComponent(2).pressed===true){
            action = "IPSec";
        }

        rule["etc"] = {
            "@action" :action,
            "@cross_spd" : (Ext.getCmp('cross_spd').getValue()===true)?"on":"off",
            "@timeout" : Ext.getCmp('f_timeout').getValue(),
            "@loglevel" : (Ext.getCmp('loglevel').getValue()===true)?"on":"off"
        };


        rule["schedule"] = {
            "@cid" :Ext.getCmp('schedule').getValue(),
            "#text" : Ext.getCmp('schedule').getRawValue()

        };

        rule["resource"] = {

            "qos" :{

                "@cid" :Ext.getCmp('qos').getValue(),
                "#text" : Ext.getCmp('qos').getRawValue(),
                "prio" :(Ext.getCmp('qos_prio').hidden===false)?Ext.getCmp('qos_prio').getValue():""
            },

            "session" :{

                "@cid" :Ext.getCmp('session').getValue(),
                "#text" : Ext.getCmp('session').getRawValue()
            }

        };

        if(action === "Deny"){
            rule["profile"] = {
                "application" :{"@cid" :null, "#text" : ""},
                "http_filter" :{"@cid" :null, "#text" : ""},
                "ips" :{"@cid" :null, "#text" : ""},
                "anti_virus" :{"@cid" :null, "#text" : ""},
                "anti_spam" :{"@cid" :null, "#text" : ""}
            };

        }else{

            rule["profile"] = {

                "application" :{

                    "@cid" :(Ext.getCmp("app").hidden)?null:Ext.getCmp('app').getValue(),
                    "#text" : (Ext.getCmp("app").hidden)?"":Ext.getCmp('app').getRawValue()
                },

                "http_filter" :{

                    "@cid" :(Ext.getCmp("http").hidden)?null:Ext.getCmp('http').getValue(),
                    "#text" : (Ext.getCmp("http").hidden)?"":Ext.getCmp('http').getRawValue()
                },

                "ips" :{

                    "@cid" :(Ext.getCmp("ips").hidden)?null:Ext.getCmp('ips').getValue(),
                    "#text" : (Ext.getCmp("ips").hidden)?"":Ext.getCmp('ips').getRawValue()
                },

                "anti_virus" :{

                    "@cid" :(Ext.getCmp("anti_virus").hidden)?null:Ext.getCmp('anti_virus').getValue(),
                    "#text" : (Ext.getCmp("anti_virus").hidden)?"":Ext.getCmp('anti_virus').getRawValue()
                },

                "anti_spam" :{

                    "@cid" :(Ext.getCmp("anti_spam").hidden)?null:Ext.getCmp('anti_spam').getValue(),
                    "#text" : (Ext.getCmp("anti_spam").hidden)?"":Ext.getCmp('anti_spam').getRawValue()
                }

            };
        }

        rule["expire"] = {

            "@chk_use":(Ext.getCmp('expire_use').getValue()===true)?"on":"off",
            "@date":Ext.getCmp('expire_date').getSubmitValue(),
            "@time":(Ext.getCmp('expire_time').getSubmitValue()===null)?"":Ext.getCmp('expire_time').getSubmitValue(),
            "mail":Ext.getCmp('expire_mail').getValue()

        };



        var _params = {
            basename : Ext.encode('firewall_filter_ipv4'),
            obj : Ext.encode(rule),
            id_info : Ext.encode({'fieldname':'@uid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update),
            check_duplicate : Ext.encode(true)

        };

        Ext.get('fm_v4spd').mask("loading...");

        request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,
                                         function(response){


                                             Ext.get('fm_v4spd').unmask();

                                             if(response.set_uid===0 && response.dup_uid_cnt > 0){


                                                 Ext.MessageBox.confirm(__weguardia,get_msg('conf_dobrule') + response.dup_uid_list,function(btn){
                                                     if(btn === "no"){
                                                         return false;
                                                     }else{
                                                         fn_dupset(false);

                                                     }
                                                 });
                                             }else{
                                                 setalarmmsg(update);
                                             }

                                         }
                                        );



        function fn_dupset(dupmode){


            _params.check_duplicate = Ext.encode(dupmode);

            request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,
                                             function(response){

                                                 setalarmmsg(update);
                                             }
                                            );

        }

        function setalarmmsg(update){
            if(update===true){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_edit"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    fn: setWinClose,
                    icon: Ext.window.MessageBox.INFO
                });



            }else{
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.YESNO,
                    buttonText:{
                        yes: __zen('add_plus'),
                        no: __zen('close')
                    },
                    fn: me.setWinState_policy,
                    icon: Ext.window.MessageBox.INFO
                });

            }

            var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
            _store.load({
                callback : function(records, options, success) {

                    var tot = options.getProxy().getReader().rawData.retval.total_config;

                    if(tot !== undefined){

                        Ext.getCmp('disp_fw_total').setValue(tot.total_count + "/" + tot.max_count);
                        Ext.getCmp('disp_fw_onoff').setValue(tot.on + "/" + tot.off);
                        Ext.getCmp('disp_fw_action').setValue(tot.accept + "/" + tot.deny + "/" + tot.ipsec);

                    }

                }
            });


            if(me.mode === "tracker"){
                Ext.data.StoreManager.lookup("store_monitor_tracker_list").load();
            }

            adminAlarmRefresh();


        }


    },

    setWinState_policy: function(btn) {
        var me = this;
        if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
             }
             }else{
                Ext.getCmp("fm_v4spd").getForm().reset();
        		Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
        		var __tmptotal = Ext.data.StoreManager.lookup('store_spd_ipv4_list').getTotalCount();
        		Ext.getCmp("num").setValue(__tmptotal);
                Ext.getCmp("fld_range").setText(" (1 ~ " + (__tmptotal) + ")");

                 Ext.data.StoreManager.lookup("store_tmp_src").removeAll();
                     Ext.data.StoreManager.lookup("store_tmp_dest").removeAll();
                     Ext.data.StoreManager.lookup("store_tmp_svc").removeAll();
        }
    },

    make_inlist: function(mode) {
        var init = false;
        if(mode==="src_init"){
            mode = "src";
            init = true;
        }
        if(mode==="svc"){
            Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
            Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port","service_group"]));
            Ext.data.StoreManager.lookup('store_svc_obj').load();

            Ext.getCmp('b_segment_sub').getComponent(4).setPressed(true);
            Ext.getCmp('b_segment_sub').getComponent(0).hide();
            Ext.getCmp('b_segment_sub').getComponent(1).hide();
            Ext.getCmp('b_segment_sub').getComponent(2).hide();
            Ext.getCmp('b_segment_sub').getComponent(3).hide();
            Ext.getCmp('b_segment_sub').getComponent(4).show();
            Ext.getCmp('b_segment_sub').getComponent(5).show();
            Ext.getCmp('b_segment_sub').getComponent(6).show();

        }else{
            Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
            Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4","ipv4_group","country","domain","user","user_group"]));
            if(init){
                Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("search_info",  Ext.encode([]));
            }
            Ext.data.StoreManager.lookup('store_ip_obj').load();

            Ext.getCmp('b_segment_sub').getComponent(0).setPressed(true);
            Ext.getCmp('b_segment_sub').getComponent(0).show();
            Ext.getCmp('b_segment_sub').getComponent(1).show();
            Ext.getCmp('b_segment_sub').getComponent(2).show();
            Ext.getCmp('b_segment_sub').getComponent(3).show();
            Ext.getCmp('b_segment_sub').getComponent(4).hide();
            Ext.getCmp('b_segment_sub').getComponent(5).hide();
            Ext.getCmp('b_segment_sub').getComponent(6).hide();
        }


        var target = "";

        if(mode==="svc"){
            target = "store_tmp_svc";
            var data = [{value:'port', text:__zen('service_port'), pid:'win_service_port',store:'store_svc_obj'},
                        {value:'port_group', text:__zen('service_group'), pid:'win_portgroup',store:'store_svc_obj'}];
        }else{
            target = (mode==="src")?"store_tmp_src":"store_tmp_dest";
            var data = [{value:'ipv4', text:__zen('ip_addr'), pid:'win_ipv4',store:'store_ip_obj'},
                        {value:'ipv4_group', text:__zen('ip_group'), pid:'win_ipv4_group',store:'store_ip_obj'},
                        {value:'country', text:__zen('country'), pid:'win_country',store:'store_ip_obj'},
                        {value:'domain', text:__zen('domain'), pid:'win_ipv4_domain',store:'store_ip_obj'},
                        {value:'user', text:__zen('user'), pid:'win_user',store:'store_ip_obj'},
                        {value:'user_group', text:__zen('user_group'), pid:'win_user_group',store:'store_ip_obj'}
                       ];
                        }


                        Ext.getCmp('add_obj_inlist').removeAll();

                        for (var i = 0; i < data.length; ++i){

                        var items =  new Ext.menu.Item({
                        text: data[i].text,
                        value:data[i].value,
                        pid:data[i].pid,
                        store:data[i].store,
                            handler: function(items){
                                var win = Ext.create('NFW2.view.'+items.pid,{
                                    modal : true,
                                    loadmode: items.store,
                                    target:target
                                });
                                win.show();
                            }
        });

        Ext.getCmp('add_obj_inlist').add(items);
        }
    },

    chg_deny_action: function() {
        if(Ext.getCmp('action').getComponent(1).pressed===true){
            Ext.getCmp('tab_profile').setDisabled(true);
            Ext.getCmp('info_deny_msg').show();
        }else{
            Ext.getCmp('tab_profile').setDisabled(false);
            Ext.getCmp('info_deny_msg').hide();
        }
    },

    get_obj_info: function(cid, otype, grid, rowIndex, name, flag) {
        if(otype==="env"){return false;}


        var basename = "";
        var uctrl = "getObject";

        switch(otype){
            case "v4" : basename = "object_ip_address";break;
            case "v4_group" : basename = "object_ip_group"; uctrl = "getObjectMembers";break;
            case "port" : basename = "object_service_port";break;
            case "group" : basename = "object_service_group";uctrl = "getObjectMembers";break;
            case "country" : basename = "object_country";break;
            case "domain" : basename = "object_domain";break;
            case "user" : basename = "object_user";break;
            case "user_group" : basename = "object_user_group";uctrl = "getObjectMembers";break;
        }


        if(otype === "v4_group" || otype === "group" || otype === "user_group"){

            var _params = {
                basename: Ext.encode(basename),
                key_info: Ext.encode({'group_cid':cid})
            };


        }else{

            var _params = {
                basename: Ext.encode("with_cid"),
                key: Ext.encode({ '_kind': basename,'@cid': cid })
            };



        }


        var grid = Ext.getCmp(grid);
        var store = grid.getStore();



        if(!flag){

            store.data.items[rowIndex].data["name"] = name;

            var tmpx = store.data.items[rowIndex];
            store.removeAt(rowIndex);
            store.insert(rowIndex,tmpx);

            return false;
        }

        var disp = '<ul class="disp_obj">';

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            uctrl,
            _params,
            function(response){



                disp += name;


                if(otype === "v4"){

                    for(var j in response.ip){
                        disp += '<li class="inlist_s">'+response.ip[j]["#text"] + '</li>';
                    }

                }else if(otype === "country" ){

                    for(var j in response.codes){
                        disp += '<li class="inlist_s">'+response.codes_desc[j] + '</li>';
                    }


                }else if(otype === "domain"){

                    for(var j in response.domain){
                        disp += '<li class="inlist_s">'+response.domain[j] + '</li>';
                    }

                }else if(otype === "user"){
                    disp += '<li class="inlist_s">'+response.user_id + '</li>';




                }else if(otype === "port"){


                    for(var j in response.protocol){
                        disp += '<li class="inlist_s">'+response.protocol[j]["@type"] + '</li>';
                        if(response.protocol[j]["@type"] === "tcp" || response.protocol[j]["@type"]==="udp"){
                            disp += '<li class="inlist_s">'+response.protocol[j].source.start +'~'+ response.protocol[j].source.end+'</li>';
                            disp += '<li class="inlist_s">'+response.protocol[j].dest.start +'~'+ response.protocol[j].dest.end+'</li>';
                        }else{
                            if(response.protocol[j].kind===undefined){continue;}
                            disp += '<li class="inlist_s">'+response.protocol[j].kind + '</li>';
                        }
                    }


                }else if(otype == "v4_group"){

                    for(var j in response.list){
                        disp += '<li class="inlist">'+response.list[j].name + '</li>';
                        for(var k in response.list[j].detail){
                            disp += '<li class="inlist_s">'+response.list[j].detail[k]["#text"] + '</li>';
                        }
                    }

                }else if(otype == "user_group"){

                    for(var j in response.list){
                        disp += '<li class="inlist">'+response.list[j].name + '</li>';
                        disp += '<li class="inlist_s">'+response.list[j].detail.user_id + '</li>';

                    }


                }else if(otype == "group"){


                    for(var j in response.list){
                        disp += '<li class="inlist">'+response.list[j].name + '</li>';
                        for(var k in response.list[j].detail){
                            disp += '<li class="inlist_s">'+response.list[j].detail[k]["@type"] + '</li>';
                            if(response.list[j].detail[k]["@type"] === "tcp" || response.list[j].detail[k]["@type"]==="udp"){
                                disp += '<li class="inlist_s">'+response.list[j].detail[k].source.start +'~'+ response.list[j].detail[k].source.end+'</li>';
                                disp += '<li class="inlist_s">'+response.list[j].detail[k].dest.start +'~'+ response.list[j].detail[k].dest.end+'</li>';
                            }else{
                                disp += '<li class="inlist_s">'+response.list[j].detail[k].kind + '</li>';
                            }

                        }
                    }

                }

                store.data.items[rowIndex].data["name"] = disp + '</ul>';
                store.data.items[rowIndex].data["xname"] = name;


                var tmpx = store.data.items[rowIndex];


                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);
            }
        );
    }

});