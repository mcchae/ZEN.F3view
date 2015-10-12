
Ext.define('NFW2.view.NFW2_firewall_etc', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_etc',

    requires: [
        'NFW2.view.NFW2_firewall_etcViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Radio',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_firewall_etc'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_etc',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_1'
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    bind: {
                                        text: '{use_spi}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'firewall_etc_l3_con',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_2'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    margin: '3 0 0 5',
                                    bind: {
                                        text: '{use_l3_mode}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender1'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'firewall_etc_voip_con',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_3'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    margin: '3 0 0 5',
                                    bind: {
                                        text: '{use_voip}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender2'
                                    }
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
                                    xtype: 'checkboxfield',
                                    id: 'chk_4',
                                    listeners: {
                                        change: 'onCheckboxfieldChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    bind: {
                                        text: '{spd_nat_redun_chk}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender3'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    disabled: true,
                                    id: 'btn_con',
                                    margin: '0 0 0 20',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            items: [
                                                {
                                                    id: 'btn_active',
                                                    bind: {
                                                        text: '{policy_apply}'
                                                    },
                                                    listeners: {
                                                        click: 'onBtn_activeClick'
                                                    }
                                                },
                                                {
                                                    id: 'btn_save',
                                                    margin: '0 0 0 5',
                                                    bind: {
                                                        text: '{policy_save}'
                                                    },
                                                    listeners: {
                                                        click: 'onBtn_saveClick'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'firewall_etc_pan_con',
                            margin: '5 0 0 0 ',
                            items: [
                                {
                                    xtype: 'form',
                                    id: 'form',
                                    header: false,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    hidden: true,
                                                    id: 'pan_use_chk1',
                                                    fieldLabel: '사용',
                                                    labelSeparator: ' ',
                                                    labelWidth: 150,
                                                    listeners: {
                                                        change: 'onPan_use_chkChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    disabled: true,
                                                    id: 'pan_set_con',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'lb_info',
                                                                    hidden: true,
                                                                    margin: '8 0 0 10',
                                                                    text: '감시 네트워크 : Internal로 선언된 인터페이스로 RX 되는 모든 출발지 주소'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1,
                                                                    margin: '8 0 0 0',
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            margin: '0 0 0 10',
                                                                            iconCls: 'icb_add',
                                                                            bind: {
                                                                                text: '{add_monitor_network}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick',
                                                                                blur: 'onButtonBlur1'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'image',
                                                                            height: 201,
                                                                            margin: '5 0 0 5',
                                                                            maxHeight: 15,
                                                                            maxWidth: 15,
                                                                            width: 201,
                                                                            src: '../images/b_help.png',
                                                                            listeners: {
                                                                                render: 'click',
                                                                                afterrender: 'onImageAfterRender'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1,
                                                                    margin: '8 0 0 10',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'gridpanel',
                                                                            cls: 'in_grid',
                                                                            id: 'observer_grid',
                                                                            maxHeight: 130,
                                                                            minHeight: 29,
                                                                            scrollable: {
                                                                                x: false,
                                                                                y: true
                                                                            },
                                                                            width: 440,
                                                                            header: false,
                                                                            title: 'My Grid Panel',
                                                                            allowDeselect: true,
                                                                            disableSelection: true,
                                                                            hideHeaders: true,
                                                                            rowLines: false,
                                                                            sortableColumns: false,
                                                                            columns: [
                                                                                {
                                                                                    xtype: 'gridcolumn',
                                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                        metaData.tdCls = 'cell_text';
                                                                                        return value;
                                                                                    },
                                                                                    id: 'observer_ip_col',
                                                                                    dataIndex: 'ip1',
                                                                                    text: 'IP',
                                                                                    flex: 1,
                                                                                    editor: {
                                                                                        xtype: 'textfield',
                                                                                        baseCls: 'cell_text',
                                                                                        modelValidation: false,
                                                                                        msgTarget: 'none',
                                                                                        maskRe: /[0-9.]/,
                                                                                        listeners: {
                                                                                            errorchange: 'onTextfieldErrorChange',
                                                                                            blur: 'onTextfieldBlur',
                                                                                            focus: 'onTextfieldFocus'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'actioncolumn',
                                                                                    width: 45,
                                                                                    align: 'center',
                                                                                    items: [
                                                                                        {
                                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                                var store = Ext.getCmp('observer_grid').getStore();

                                                                                                store.removeAt(rowIndex, 1);
                                                                                                Ext.getCmp('observer_grid').focus();
                                                                                                Ext.getCmp('NFW2_firewall_etc').set_grid(Ext.getCmp('observer_grid'));
                                                                                            },
                                                                                            iconCls: 'icr_del'
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            viewConfig: {
                                                                                markDirty: false
                                                                            },
                                                                            plugins: [
                                                                                {
                                                                                    ptype: 'cellediting',
                                                                                    pluginId: 'celledit',
                                                                                    clicksToEdit: 1
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'lb_info',
                                                                    hidden: true,
                                                                    text: '보호 네트워크 : PAN으로 선언된 인터페이스로 TX 되는 모든 목적지 주소'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1,
                                                                    margin: '8 0 0 0',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            iconCls: 'icb_add',
                                                                            bind: {
                                                                                text: '{add_protect_network}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick1',
                                                                                blur: 'onButtonBlur'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'image',
                                                                            height: 201,
                                                                            margin: '5 0 0 5',
                                                                            maxHeight: 15,
                                                                            maxWidth: 15,
                                                                            width: 201,
                                                                            src: '../images/b_help.png',
                                                                            listeners: {
                                                                                render: 'click1',
                                                                                afterrender: 'onImageAfterRender1'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1,
                                                                    margin: '8 0 0 0',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'gridpanel',
                                                                            cls: 'in_grid',
                                                                            id: 'protect_grid',
                                                                            maxHeight: 130,
                                                                            minHeight: 29,
                                                                            scrollable: {
                                                                                x: false,
                                                                                y: true
                                                                            },
                                                                            width: 440,
                                                                            header: false,
                                                                            title: 'My Grid Panel',
                                                                            allowDeselect: true,
                                                                            disableSelection: true,
                                                                            hideHeaders: true,
                                                                            rowLines: false,
                                                                            sortableColumns: false,
                                                                            columns: [
                                                                                {
                                                                                    xtype: 'gridcolumn',
                                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                        metaData.tdCls = 'cell_text';
                                                                                        return value;
                                                                                    },
                                                                                    id: 'protect_ip_col',
                                                                                    dataIndex: 'ip1',
                                                                                    text: 'IP',
                                                                                    flex: 1,
                                                                                    editor: {
                                                                                        xtype: 'textfield',
                                                                                        baseCls: 'cell_text',
                                                                                        modelValidation: false,
                                                                                        msgTarget: 'none',
                                                                                        allowBlank: false,
                                                                                        enableKeyEvents: true,
                                                                                        maskRe: /[0-9.]/,
                                                                                        listeners: {
                                                                                            blur: 'onTextfieldBlur1',
                                                                                            focus: 'onTextfieldFocus1'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'actioncolumn',
                                                                                    width: 45,
                                                                                    align: 'center',
                                                                                    items: [
                                                                                        {
                                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                                var store = Ext.getCmp('protect_grid').getStore();

                                                                                                store.removeAt(rowIndex, 1);
                                                                                                Ext.getCmp('protect_grid').focus();
                                                                                                Ext.getCmp('NFW2_firewall_etc').set_grid(Ext.getCmp('protect_grid'));
                                                                                            },
                                                                                            iconCls: 'icr_del'
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            viewConfig: {
                                                                                markDirty: false
                                                                            },
                                                                            plugins: [
                                                                                {
                                                                                    ptype: 'cellediting',
                                                                                    pluginId: 'celledit1',
                                                                                    clicksToEdit: 1
                                                                                }
                                                                            ],
                                                                            listeners: {
                                                                                cellclick: 'onObserver_gridCellClick1'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '8 0 0 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'fw_etc_lb1',
                                                                    margin: '0 0 0 10',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    width: 150,
                                                                    bind: {
                                                                        text: '{protect_period}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    items: [
                                                                        {
                                                                            xtype: 'combobox',
                                                                            id: 'protect_sttime_com1',
                                                                            width: 80,
                                                                            labelSeparator: ' ',
                                                                            editable: false,
                                                                            displayField: 'time',
                                                                            queryMode: 'local',
                                                                            store: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'time'
                                                                                    }
                                                                                ]
                                                                            },
                                                                            valueField: 'time',
                                                                            listeners: {
                                                                                afterrender: 'onProtect_time_com1AfterRender',
                                                                                change: 'onProtect_sttime_com1Change'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'fw_etc_lb2',
                                                                    margin: '5 0 0 15',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    width: 25,
                                                                    bind: {
                                                                        text: '{hour}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            xtype: 'combobox',
                                                                            id: 'protect_sttime_com2',
                                                                            width: 80,
                                                                            labelSeparator: ' ',
                                                                            editable: false,
                                                                            displayField: 'time',
                                                                            queryMode: 'local',
                                                                            store: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'time'
                                                                                    }
                                                                                ]
                                                                            },
                                                                            valueField: 'time',
                                                                            listeners: {
                                                                                afterrender: 'onProtect_sttime_com2AfterRender'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'fw_etc_lb3',
                                                                    margin: '5 0 0 15',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    width: 55,
                                                                    bind: {
                                                                        text: '{min} ~'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            xtype: 'combobox',
                                                                            id: 'protect_dttime_com1',
                                                                            width: 80,
                                                                            labelSeparator: ' ',
                                                                            editable: false,
                                                                            displayField: 'time',
                                                                            queryMode: 'local',
                                                                            store: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'time'
                                                                                    }
                                                                                ]
                                                                            },
                                                                            valueField: 'time',
                                                                            listeners: {
                                                                                afterrender: 'onProtect_time_com2AfterRender',
                                                                                change: 'onProtect_dttime_com1Change'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'fw_etc_lb4',
                                                                    margin: '5 0 0 15',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    width: 25,
                                                                    bind: {
                                                                        text: '{hour}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            xtype: 'combobox',
                                                                            id: 'protect_dttime_com2',
                                                                            width: 80,
                                                                            labelSeparator: ' ',
                                                                            editable: false,
                                                                            displayField: 'time',
                                                                            queryMode: 'local',
                                                                            store: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'time'
                                                                                    }
                                                                                ]
                                                                            },
                                                                            valueField: 'time',
                                                                            listeners: {
                                                                                afterrender: 'onProtect_dttime_com2AfterRender'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'protect_time_lb',
                                                                    margin: '3 0 0 15',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    bind: {
                                                                        text: '{min}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'pan_time_chk1',
                                                                    margin: '0 0 0 20',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onRadiofieldChange'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    flex: 1,
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{include}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender4'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'pan_time_chk2',
                                                                    listeners: {
                                                                        change: 'onRadiofieldChange1'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    flex: 1,
                                                                    margin: '3 0 0 5',
                                                                    bind: {
                                                                        text: '{exception}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender5'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'pan_protocol_lb',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    width: 150,
                                                                    bind: {
                                                                        text: '{sensing_protocol}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'pan_protocol1',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onPan_protocol1Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{tcp}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender6'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'pan_protocol2',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onPan_protocol2Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{udp}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender7'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'pan_protocol3',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onPan_protocol3Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    bind: {
                                                                        text: '{icmp}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender8'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'errorBox',
                                                                    hidden: true,
                                                                    id: 'pan_protocol_error'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            margin: '8 0 10 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'lb_req',
                                                                    id: 'block_time_lb',
                                                                    style: {
                                                                        color: '#cecece'
                                                                    },
                                                                    width: 155,
                                                                    bind: {
                                                                        text: '{detect_time}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(value !== true){
                                                                            var _value = removeComma(value);

                                                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                            if(!LengthCheck(_value, 10, 3600)){ return ValidLimit(10, addComma(3600)); }
                                                                        }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length(10,
                                                                        3600,
                                                                        null)
                                                                    },
                                                                    cls: 'inp_unit',
                                                                    id: 'pan_block_time',
                                                                    width: 120,
                                                                    afterBodyEl: [
                                                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                                                    ],
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 150,
                                                                    msgTarget: 'none',
                                                                    value: 30,
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 5,
                                                                    maxLengthText: ' ',
                                                                    listeners: {
                                                                        errorchange: 'onPan_block_timeErrorChange',
                                                                        focus: 'onPan_block_timeFocus',
                                                                        blur: 'onPan_block_timeBlur',
                                                                        change: 'onPan_block_timeChange',
                                                                        keydown: 'onPan_block_timeKeydown'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_firewall_etcAfterRender',
        render: 'onNFW2_firewall_etcRender'
    },
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
                    id: 'btn_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_cancelClick'
                    }
                }
            ]
        }
    ],

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_1').getValue()){ Ext.getCmp('chk_1').setValue(false); }
            else{ Ext.getCmp('chk_1').setValue(true); }
        }, component);
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_2').getValue()){ Ext.getCmp('chk_2').setValue(false); }
            else{ Ext.getCmp('chk_2').setValue(true); }
        }, component);
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_3').getValue()){ Ext.getCmp('chk_3').setValue(false); }
            else{ Ext.getCmp('chk_3').setValue(true); }
        }, component);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){ Ext.getCmp('btn_con').setDisabled(false); }
        else{ Ext.getCmp('btn_con').setDisabled(true); }
    },

    onLabelRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_4').getValue()){ Ext.getCmp('chk_4').setValue(false); }
            else{ Ext.getCmp('chk_4').setValue(true); }
        }, component);
    },

    onBtn_activeClick: function(button, e, eOpts) {
        Ext.getCmp('btn_save').toggle(false);
        Ext.getCmp('btn_active').toggle(true);
    },

    onBtn_saveClick: function(button, e, eOpts) {
        Ext.getCmp('btn_save').toggle(true);
        Ext.getCmp('btn_active').toggle(false);
    },

    onPan_use_chkChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('pan_set_con').enable(true);
            Ext.getCmp('protect_time_lb').setStyle('color', '#cccccc');
            Ext.getCmp('block_time_lb').setStyle('color', '#cccccc');
            Ext.getCmp('fw_etc_lb1').setStyle('color', '#cccccc');
            Ext.getCmp('fw_etc_lb2').setStyle('color', '#cccccc');
            Ext.getCmp('fw_etc_lb3').setStyle('color', '#cccccc');
            Ext.getCmp('fw_etc_lb4').setStyle('color', '#cccccc');
            Ext.getCmp('NFW2_firewall_etc').doLayout();

        }
        else{
            //     Ext.suspendLayouts();
            Ext.getCmp('protect_time_lb').setStyle('color', '#cecece');
            Ext.getCmp('block_time_lb').setStyle('color', '#cecece');
            Ext.getCmp('fw_etc_lb1').setStyle('color', '#cecece');
            Ext.getCmp('fw_etc_lb2').setStyle('color', '#cecece');
            Ext.getCmp('fw_etc_lb3').setStyle('color', '#cecece');
            Ext.getCmp('fw_etc_lb4').setStyle('color', '#cecece');
            Ext.getCmp('pan_set_con').disable(true);
            Ext.getCmp('form').getForm().reset();
            Ext.getCmp('observer_grid').getStore().removeAll();
            Ext.getCmp('observer_grid').hide();
            Ext.getCmp('protect_grid').getStore().removeAll();
            Ext.getCmp('protect_grid').hide();
            //     Ext.resumeLayouts();
            Ext.getCmp('firewall_etc_pan_con').doLayout();
            Ext.getCmp('protect_sttime_com1').setValue(0);
            Ext.getCmp('protect_sttime_com2').setValue(0);
            Ext.getCmp('protect_dttime_com1').setValue(24);
            Ext.getCmp('protect_dttime_com2').setValue(0);
            Ext.getCmp('pan_protocol1').setValue(true);
            Ext.getCmp('pan_protocol2').setValue(true);
            Ext.getCmp('pan_protocol3').setValue(true);
            Ext.getCmp('NFW2_firewall_etc').doLayout();
        }
        console.log(Ext.getCmp('block_time_lb'));
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.getCmp('observer_grid').getStore();

        if(store.getCount() > 15){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(16));

            return false;
        }

        var obj = {
            'type' : 'single',
            'ip1' : '',
            'ip2' : ''
        };
        store.add(obj);
        Ext.getCmp('NFW2_firewall_etc').set_grid(Ext.getCmp('observer_grid'));
    },

    onButtonBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    click: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
        component.tooltip.show();
        },component);

        component.getEl().on('mouseover', function(eOpts) {
            return false;
        },component);
    },

    onImageAfterRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
                autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            shadow: false,
            alwaysOnTop : true,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 470,
                    height : 90,
                    cls:'tip_box',
                    html : '<div class="title">'+__zen('monitor_network')+'</div><div class="list">'+__zen('monitor_network_desc')+'</div>'
                }
            ]
        });
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        setTipBlur(this,component);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4srm');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onButtonClick1: function(button, e, eOpts) {
        var store = Ext.getCmp('protect_grid').getStore();

        if(store.getCount() > 15){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(16));

            return false;
        }

        var obj = {
            'type' : 'single',
            'ip1' : '',
            'ip2' : ''
        };
        store.add(obj);
        Ext.getCmp('NFW2_firewall_etc').set_grid(Ext.getCmp('protect_grid'));
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    click1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
        component.tooltip.show();
        },component);

        component.getEl().on('mouseover', function(eOpts) {
            return false;
        },component);
    },

    onImageAfterRender1: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            shadow: false,
            alwaysOnTop : true,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 470,
                    height : 90,
                    cls:'tip_box',
                    html : '<div class="title">'+__zen('protect_network')+'</div><div class="list">'+__zen('protect_network_desc')+'</div>'
                }
            ]
        });
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        setTipBlur(this,component);
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4srm');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onObserver_gridCellClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Ext.getCmp('protect_ip_col').record = record;
    },

    onProtect_time_com1AfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('protect_sttime_com1').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("protect_sttime_com1").setValue(inter.items[0].data['time']);
        }
    },

    onProtect_sttime_com1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue === 24){
            var records = [];

            records.push({
                'time' : "00"
            });

            Ext.getCmp('protect_sttime_com2').getStore().loadData(records);
        }
        else{
            var records = [];

            for(var i = 0;i < 60;i++){
                if(String(i).length === 1){ i = "0" + i; }
                records.push({
                    'time' : i
                });
            }

            Ext.getCmp('protect_sttime_com2').getStore().loadData(records);
        }
    },

    onProtect_sttime_com2AfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('protect_sttime_com2').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("protect_sttime_com2").setValue(inter.items[0].data['time']);
        }
    },

    onProtect_time_com2AfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('protect_dttime_com1').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("protect_dttime_com1").setValue(inter.items[24].data['time']);
        }
    },

    onProtect_dttime_com1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue === 24){
            var records = [];

            records.push({
                'time' : "00"
            });

            Ext.getCmp('protect_dttime_com2').getStore().loadData(records);
        }
        else{
            var records = [];

            for(var i = 0;i < 60;i++){
                if(String(i).length === 1){ i = "0" + i; }
                records.push({
                    'time' : i
                });
            }

            Ext.getCmp('protect_dttime_com2').getStore().loadData(records);
        }
    },

    onProtect_dttime_com2AfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('protect_dttime_com2').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("protect_dttime_com2").setValue(inter.items[0].data['time']);
        }
    },

    onRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){ Ext.getCmp('pan_time_chk2').setValue(false); }
    },

    onLabelRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('pan_time_chk1').getValue()){ Ext.getCmp('pan_time_chk1').setValue(true); }
        }, component);
    },

    onRadiofieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){ Ext.getCmp('pan_time_chk1').setValue(false); }
    },

    onLabelRender5: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('pan_time_chk2').getValue()){ Ext.getCmp('pan_time_chk2').setValue(true); }
        }, component);
    },

    onPan_protocol1Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<4;i++){
            if(Ext.getCmp('pan_protocol'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 3){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
        }
    },

    onLabelRender6: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('pan_protocol1').getValue()){ Ext.getCmp('pan_protocol1').setValue(false); }
            else{ Ext.getCmp('pan_protocol1').setValue(true); }
        }, component);
    },

    onPan_protocol2Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<4;i++){
            if(Ext.getCmp('pan_protocol'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 3){
            Ext.getCmp('pan_protocol_error').setText(get_msg('err_select'));
            Ext.getCmp('pan_protocol_error').show();
        }
        else{ Ext.getCmp('pan_protocol_error').hide(); }
    },

    onLabelRender7: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('pan_protocol2').getValue()){ Ext.getCmp('pan_protocol2').setValue(false); }
            else{ Ext.getCmp('pan_protocol2').setValue(true); }
        }, component);
    },

    onPan_protocol3Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<4;i++){
            if(Ext.getCmp('pan_protocol'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 3){
            Ext.getCmp('pan_protocol_error').setText(get_msg('err_select'));
            Ext.getCmp('pan_protocol_error').show();
        }
        else{ Ext.getCmp('pan_protocol_error').hide(); }
    },

    onLabelRender8: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('pan_protocol3').getValue()){ Ext.getCmp('pan_protocol3').setValue(false); }
            else{ Ext.getCmp('pan_protocol3').setValue(true); }
        }, component);
    },

    onPan_block_timeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPan_block_timeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onPan_block_timeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('pan_block_time').validateValue(true);
    },

    onPan_block_timeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onPan_block_timeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFieldsetRender: function(component, eOpts) {
        component.setTitle(__zen('pan'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'pan_use_chker',
            style:'margin-left:765px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('pan_set_con').enable(true);
                        Ext.getCmp('protect_time_lb').setStyle('color', '#666');
                        Ext.getCmp('block_time_lb').setStyle('color', '#666');
                        Ext.getCmp('pan_protocol_lb').setStyle('color', '#666');
                        Ext.getCmp('fw_etc_lb1').setStyle('color', '#666');
                        Ext.getCmp('fw_etc_lb2').setStyle('color', '#666');
                        Ext.getCmp('fw_etc_lb3').setStyle('color', '#666');
                        Ext.getCmp('fw_etc_lb4').setStyle('color', '#666');
                        Ext.getCmp('firewall_etc_pan_con').doLayout();
                    }
                    else{
                        Ext.getCmp('pan_set_con').disable(true);
                        Ext.getCmp('protect_time_lb').setStyle('color', '#cecece');
                        Ext.getCmp('block_time_lb').setStyle('color', '#cecece');
                        Ext.getCmp('pan_protocol_lb').setStyle('color', '#cecece');
                        Ext.getCmp('fw_etc_lb1').setStyle('color', '#cecece');
                        Ext.getCmp('fw_etc_lb2').setStyle('color', '#cecece');
                        Ext.getCmp('fw_etc_lb3').setStyle('color', '#cecece');
                        Ext.getCmp('fw_etc_lb4').setStyle('color', '#cecece');
                        Ext.getCmp('form').getForm().reset();
                        Ext.getCmp('observer_grid').getStore().removeAll();
                        Ext.getCmp('observer_grid').hide();
                        Ext.getCmp('protect_grid').getStore().removeAll();
                        Ext.getCmp('protect_grid').hide();
                        Ext.getCmp('firewall_etc_pan_con').doLayout();
                        Ext.getCmp('protect_sttime_com1').setValue("00");
                        Ext.getCmp('protect_sttime_com2').setValue("00");
                        Ext.getCmp('protect_dttime_com1').setValue(24);
                        Ext.getCmp('protect_dttime_com2').setValue("00");
                        Ext.getCmp('pan_protocol1').setValue(true);
                        Ext.getCmp('pan_protocol2').setValue(true);
                        Ext.getCmp('pan_protocol3').setValue(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onNFW2_firewall_etcAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        me.set_btn = false;
        if(Ext.getCmp('observer_grid').getStore().getCount() === 0){ Ext.getCmp('observer_grid').hide(); }
        else{ Ext.getCmp('observer_grid').show(); }

        if(Ext.getCmp('protect_grid').getStore().getCount() === 0){ Ext.getCmp('protect_grid').hide(); }
        else{ Ext.getCmp('protect_grid').show(); }

        Ext.getCmp('btn_active').toggle();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){
                if(response === false){
                    Ext.getCmp('firewall_etc_l3_con').show();
                    Ext.getCmp('firewall_etc_voip_con').show();
                    Ext.getCmp('firewall_etc_pan_con').show();
                }
                else{
                    Ext.getCmp('firewall_etc_l3_con').hide();
                    Ext.getCmp('firewall_etc_voip_con').hide();
                    Ext.getCmp('firewall_etc_pan_con').hide();
                }
            }
        );

        me.get_etc();
    },

    onNFW2_firewall_etcRender: function(component, eOpts) {
        var records = [];

        for(var i = 0;i < 25;i++){
            if(String(i).length === 1){ i = "0" + i; }
            records.push({
                'time' : i
            });
        }

        Ext.getCmp('protect_sttime_com1').getStore().loadData(records);
        Ext.getCmp('protect_dttime_com1').getStore().loadData(records);

        var store = {
            fields : [
                {
                    name : 'ip1'
                }
            ]
        };

        Ext.getCmp('observer_grid').reconfigure(store);
        Ext.getCmp('protect_grid').reconfigure(store);

        var records2 = [];

        for(var j = 0;j < 60;j++){
            if(String(j).length === 1){ j = "0" + j; }
            records2.push({
                'time' : j
            });
        }

        Ext.getCmp('protect_sttime_com2').getStore().loadData(records2);
        Ext.getCmp('protect_dttime_com2').getStore().loadData(records2);
    },

    onBtn_okClick: function(button, e, eOpts) {
        var me = this;
        var obj = {};
        var store = Ext.getCmp('observer_grid').getStore();
        var store2 = Ext.getCmp('protect_grid').getStore();

        for(var i in store.data.items){
            if(this.test_validator(store.data.items[i].data.ip1) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(this.test_validator(store.data.items[i].data.ip1));
                me.set_btn = true;

                Ext.getCmp('observer_grid').getPlugin('celledit').startEdit(Number(i), 0);
                return false;
            }
        }

        for(var j in store2.data.items){
            if(this.test_validator(store2.data.items[j].data.ip1) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(this.test_validator(store2.data.items[j].data.ip1));
                me.set_btn = true;
                Ext.getCmp('protect_grid').getPlugin('celledit1').startEdit(Number(j), 0);
                return false;
            }
        }

        if(Ext.getCmp('chk_1').getValue()){ obj.stateful = "on"; }
        else if(!Ext.getCmp('chk_1').getValue()){ obj.stateful = "off"; }
        if(Ext.getCmp('chk_2').getValue()){ obj.multicast_forward = "on"; }
        else if(!Ext.getCmp('chk_2').getValue()){ obj.multicast_forward = "off"; }
        if(Ext.getCmp('chk_3').getValue()){ obj.voip_helper = "on"; }
        else if(!Ext.getCmp('chk_3').getValue()){ obj.voip_helper = "off"; }
        if(Ext.getCmp('chk_4').getValue()){
            obj.chk_duplicate = "on";
            if(Ext.getCmp('btn_active').pressed){ obj.duplicate_mode = "apply"; }
            else if(Ext.getCmp('btn_save').pressed){ obj.duplicate_mode = "save"; }
        }
        else if(!Ext.getCmp('chk_4').getValue()){ obj.chk_duplicate = "off"; }

        if(Ext.getCmp('pan_use_chker').getValue()){
            var pan = {};
            var detect = [];
            var protect = [];
            var src_time = {};
            var dst_time = {};
            var protocol = {};
            var hold_time;
            var time_chk;

            if(Ext.getCmp('pan_block_time').isValid() === false){ Ext.getCmp('pan_block_time').focus(); return false; }
            var cnt = 0;

            for(var i=1;i<4;i++){
                if(Ext.getCmp('pan_protocol'+i).getValue() === false){ cnt++; }
            }

            if(cnt === 3){
                Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
                Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
                return false;
            }

            var ob_grid = Ext.getCmp('observer_grid').getStore();
            var pr_grid = Ext.getCmp('protect_grid').getStore();

            for(var i in ob_grid.data.items){
                var obip_set = {};
                var ipsplit = [];
                var chk = false;
                ipsplit = ob_grid.data.items[i].data.ip1.split('-');

                if(ipsplit[1] !== undefined){
                    obip_set.format = 'range';
                    obip_set.ip1 = ipsplit[0];
                    obip_set.ip2 = ipsplit[1];
                    chk = true;
                }

                ipsplit = ob_grid.data.items[i].data.ip1.split('/');

                if(ipsplit[1] !== undefined){
                    obip_set.format = 'netmask';
                    obip_set.ip1 = ipsplit[0];
                    obip_set.ip2 = ipsplit[1];
                    chk = true;
                }

                if(chk === false){
                    obip_set.format = 'single';
                    obip_set.ip1 = ob_grid.data.items[i].data.ip1;
                    obip_set.ip2 = "";
                }

                detect.push(obip_set);
            }

            for(var j in pr_grid.data.items){
                var prip_set = {};

                var ipsplit = [];
                var chk = false;
                ipsplit = pr_grid.data.items[j].data.ip1.split('-');

                if(ipsplit[1] !== undefined){
                    prip_set.format = 'range';
                    prip_set.ip1 = ipsplit[0];
                    prip_set.ip2 = ipsplit[1];
                    chk = true;
                }

                ipsplit = pr_grid.data.items[j].data.ip1.split('/');

                if(ipsplit[1] !== undefined){
                    prip_set.format = 'netmask';
                    prip_set.ip1 = ipsplit[0];
                    prip_set.ip2 = ipsplit[1];
                    chk = true;
                }

                if(chk === false){
                    prip_set.format = 'single';
                    prip_set.ip1 = pr_grid.data.items[j].data.ip1;
                    prip_set.ip2 = "";
                }

                protect.push(prip_set);
            }

            src_time.hour = (Ext.getCmp('pan_time_chk1').getValue())? Number(Ext.getCmp('protect_sttime_com1').getValue()):Number(Ext.getCmp('protect_dttime_com1').getValue());
            src_time.min = (Ext.getCmp('pan_time_chk1').getValue())? Number(Ext.getCmp('protect_sttime_com2').getValue()):Number(Ext.getCmp('protect_dttime_com2').getValue());

            dst_time.hour = (Ext.getCmp('pan_time_chk1').getValue())? Number(Ext.getCmp('protect_dttime_com1').getValue()):Number(Ext.getCmp('protect_sttime_com1').getValue());
            dst_time.min = (Ext.getCmp('pan_time_chk1').getValue())? Number(Ext.getCmp('protect_dttime_com2').getValue()):Number(Ext.getCmp('protect_sttime_com2').getValue());

            protocol.tcp = (Ext.getCmp('pan_protocol1').getValue())? "on":"off";
            protocol.udp = (Ext.getCmp('pan_protocol2').getValue())? "on":"off";
            protocol.icmp = (Ext.getCmp('pan_protocol3').getValue())? "on":"off";

            hold_time = Number(removeComma(Ext.getCmp('pan_block_time').getValue()));
            time_chk = (Ext.getCmp('pan_time_chk1').getValue())? 0:1;

            if(detect.length === 0){ pan.detect_except = null; }
            else{ pan.detect_except = detect; }
            if(protect.length === 0){ pan.protect_except = null; }
            else{ pan.protect_except = protect; }
            pan.start_time = src_time;
            pan.end_time = dst_time;
            pan.protocol = protocol;
            pan.hold_time = hold_time;
            pan.time_chk = time_chk;

            obj.pan = pan;
        }
        else{
            obj.pan = "off";
        }

        if(me._id){
            obj['_id'] = me._id;
        }

        showLoadMask();
        var _params = {
            basename : Ext.encode('firewall_etc'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                hideLoadMask();
                if(response === true){
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );
    },

    onBtn_cancelClick: function(button, e, eOpts) {
        var me = this;

        me.get_etc();
    },

    get_etc: function() {
        var me = this;

        var _params = {
            basename : Ext.encode("firewall_etc")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();

                if(response !== null){

                    if(response.stateful === "on"){ Ext.getCmp('chk_1').setValue(true); }
                    else if(response.stateful === "off"){ Ext.getCmp('chk_1').setValue(false); }
                    if(response.multicast_forward === "on"){ Ext.getCmp('chk_2').setValue(true); }
                    else if(response.multicast_forward === "off"){ Ext.getCmp('chk_2').setValue(false); }
                    if(response.voip_helper === "on"){ Ext.getCmp('chk_3').setValue(true); }
                    else if(response.voip_helper === "off"){ Ext.getCmp('chk_3').setValue(false); }
                    if(response.chk_duplicate === "on"){
                        Ext.getCmp('chk_4').setValue(true);
                        if(response.duplicate_mode === "apply"){
                            Ext.getCmp('btn_active').toggle(true);
                            Ext.getCmp('btn_save').toggle(false);
                        }
                        else if(response.duplicate_mode === "save"){
                            Ext.getCmp('btn_active').toggle(false);
                            Ext.getCmp('btn_save').toggle(true);
                        }
                    }
                    else if(response.chk_duplicate === "off"){ Ext.getCmp('chk_4').setValue(false); }

                    if(response.pan === "off"){
                        Ext.getCmp("pan_use_chker").state = false;
                        Ext.getCmp("pan_use_chker").moveHandle(false);
                        Ext.getCmp('pan_set_con').disable();
                    }
                    else{
                        var record1 = [];
                        var record2 = [];

                        Ext.getCmp("pan_use_chker").state = true;
                        Ext.getCmp("pan_use_chker").moveHandle(true);
                        Ext.getCmp('pan_set_con').enable(true);
                        Ext.getCmp('protect_time_lb').setStyle('color', '#666');
                        Ext.getCmp('block_time_lb').setStyle('color', '#666');
                        Ext.getCmp('pan_protocol_lb').setStyle('color', '#666');

                        if(response.pan.time_chk === 0){
                            Ext.getCmp('pan_time_chk1').setValue(true);
                            if(String(response.pan.start_time.hour).length === 1){ Ext.getCmp('protect_sttime_com1').setValue("0"+response.pan.start_time.hour); }
                            else{ Ext.getCmp('protect_sttime_com1').setValue(Number(response.pan.start_time.hour)); }
                            if(String(response.pan.start_time.min).length === 1){ Ext.getCmp('protect_sttime_com2').setValue("0"+response.pan.start_time.min); }
                            else{ Ext.getCmp('protect_sttime_com2').setValue(Number(response.pan.start_time.min)); }
                            if(String(response.pan.end_time.hour).length === 1){ Ext.getCmp('protect_dttime_com1').setValue("0"+response.pan.end_time.hour); }
                            else{ Ext.getCmp('protect_dttime_com1').setValue(Number(response.pan.end_time.hour)); }
                            if(String(response.pan.end_time.min).length === 1){ Ext.getCmp('protect_dttime_com2').setValue("0"+response.pan.end_time.min); }
                            else{ Ext.getCmp('protect_dttime_com2').setValue(Number(response.pan.end_time.min)); }
                        }
                        else{
                            Ext.getCmp('pan_time_chk2').setValue(true);
                            if(String(response.pan.end_time.hour).length === 1){ Ext.getCmp('protect_sttime_com1').setValue("0"+response.pan.end_time.hour); }
                            else{ Ext.getCmp('protect_sttime_com1').setValue(Number(response.pan.end_time.hour)); }
                            if(String(response.pan.end_time.min).length === 1){ Ext.getCmp('protect_sttime_com2').setValue("0"+response.pan.end_time.min); }
                            else{ Ext.getCmp('protect_sttime_com2').setValue(Number(response.pan.end_time.min)); }
                            if(String(response.pan.start_time.hour).length === 1){ Ext.getCmp('protect_dttime_com1').setValue("0"+response.pan.start_time.hour); }
                            else{ Ext.getCmp('protect_dttime_com1').setValue(Number(response.pan.start_time.hour)); }
                            if(String(response.pan.start_time.min).length === 1){ Ext.getCmp('protect_dttime_com2').setValue("0"+response.pan.start_time.min); }
                            else{ Ext.getCmp('protect_dttime_com2').setValue(Number(response.pan.start_time.min)); }
                        }

                        if(response.pan.protocol.tcp === "on"){ Ext.getCmp('pan_protocol1').setValue(true); }
                        else{ Ext.getCmp('pan_protocol1').setValue(false); }
                        if(response.pan.protocol.udp === "on"){ Ext.getCmp('pan_protocol2').setValue(true); }
                        else{ Ext.getCmp('pan_protocol2').setValue(false); }
                        if(response.pan.protocol.icmp === "on"){ Ext.getCmp('pan_protocol3').setValue(true); }
                        else{ Ext.getCmp('pan_protocol3').setValue(false); }

                        Ext.getCmp('pan_block_time').setValue(response.pan.hold_time);

                        for(var i in response.pan.detect_except){
                            if(response.pan.detect_except[i].format === "single"){
                                record1.push({
                                    'ip1' : response.pan.detect_except[i].ip1
                                });
                            }
                            else if(response.pan.detect_except[i].format === "range"){
                                record1.push({
                                    'ip1' : response.pan.detect_except[i].ip1 + "-" + response.pan.detect_except[i].ip2
                                });
                            }
                            else{
                                record1.push({
                                    'ip1' : response.pan.detect_except[i].ip1 + "/" + response.pan.detect_except[i].ip2
                                });
                            }
                        }

                        Ext.getCmp('observer_grid').getStore().loadData(record1);
                        me.set_grid(Ext.getCmp('observer_grid'));

                        for(var j in response.pan.protect_except){
                            if(response.pan.protect_except[j].format === "single"){
                                record2.push({
                                    'ip1' : response.pan.protect_except[j].ip1
                                });
                            }
                            else if(response.pan.protect_except[j].format === "range"){
                                record2.push({
                                    'ip1' : response.pan.protect_except[j].ip1 + "-" + response.pan.protect_except[j].ip2
                                });
                            }
                            else{
                                record2.push({
                                    'ip1' : response.pan.protect_except[j].ip1 + "/" + response.pan.protect_except[j].ip2
                                });
                            }
                        }

                        Ext.getCmp('protect_grid').getStore().loadData(record2);
                        me.set_grid(Ext.getCmp('protect_grid'));

                    }

                    me._id = response._id;
                }
            }
        );
    },

    set_grid: function(grid) {
        if(grid.getStore().getCount() === 0){ grid.hide(); }
        else{ grid.show(); }
    },

    test_validator: function(value) {
        var chk = false;
        var ip_ran = value.split('-');

        if(ip_ran[1] !== undefined){
            var dstip = ValidIPAddress(ip_ran[0]);
            var dstmask = ValidIPAddress(ip_ran[1]);
            var dstipv6 = ValidIPv6(ip_ran[0]);
            var nullChk_ip = CheckNotNull(ip_ran[0]);
            var nullChk_mask = CheckNotNull(ip_ran[1]);

            if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
            if(!dstip){ return get_msg('err_ip'); }
            if(!dstmask){ return get_msg('err_form'); }
            chk = true;
        }

        var ip_mask = value.split('/');

        if(ip_mask[1] !== undefined){
            var dstip = ValidIPAddress(ip_mask[0]);
            var dstmask = ValidIPAddress(ip_mask[1]);
            var dstipv6 = ValidIPv6(ip_mask[0]);
            var nullChk_ip = CheckNotNull(ip_mask[0]);
            var nullChk_mask = CheckNotNull(ip_mask[1]);

            if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
            if(!dstip){ return get_msg('err_ip'); }
            if(!dstmask){ return get_msg('err_form'); }
            chk = true;
        }

        if(chk === false){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }
            else if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
        }

        return true;
    }

});