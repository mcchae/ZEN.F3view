
Ext.define('NFW2.view.NFW2_network_protocol', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_protocol',

    requires: [
        'NFW2.view.NFW2_network_protocolViewModel',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'nfw2_network_protocol'
    },
    id: 'NFW2_network_protocol',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            margin: '0 0 10 0',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'tabpanel',
                    cls: 'zen_tab',
                    id: 'st_nw_protocol_tab',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            title: 'RIP',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            padding: 10,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            bind: {
                                                title: '{basic_setting}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    resizeHandle: false,
                                                    state: false,
                                                    id: 'st_nw_protocol_rip_use',
                                                    text: 'MyButton',
                                                    listeners: {
                                                        change: 'onNetwork_protocol_rip_useChange',
                                                        afterrender: 'onNetwork_protocol_rip_useAfterRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    disabled: true,
                                                    id: 'st_nw_protocol_rip_version_com',
                                                    margin: '0 0 0 100',
                                                    width: 200,
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: {
                                                        data: [
                                                            {
                                                                name: 1
                                                            },
                                                            {
                                                                name: 2
                                                            }
                                                        ],
                                                        fields: [
                                                            {
                                                                name: 'name'
                                                            }
                                                        ]
                                                    },
                                                    valueField: 'name',
                                                    bind: {
                                                        fieldLabel: '{version}'
                                                    },
                                                    listeners: {
                                                        afterrender: 'onComboboxAfterRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    disabled: true,
                                                    hidden: true,
                                                    id: 'st_nw_protocol_rip_default_chk',
                                                    margin: '0 0 0 20',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    bind: {
                                                        fieldLabel: '{default_originate}'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_rip_advance_btn',
                                                            bind: {
                                                                text: '{advance_setting}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick25'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'st_nw_protocol_rip_status_set',
                                            padding: 10,
                                            bind: {
                                                title: '{status_info}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'st_nw_protocol_rip_status_btn',
                                                    bind: {
                                                        text: '{status}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'st_nw_protocol_rip_network_set',
                                            padding: 10,
                                            bind: {
                                                title: '{network}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'st_nw_protocol_rip_network_con',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'zen_toolbar',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_rip_network_toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_add',
                                                                    bind: {
                                                                        text: '{add}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick1'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_del',
                                                                    bind: {
                                                                        text: '{del}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick19'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'segmentedbutton',
                                                                    cls: 'zen_seg',
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            id: 'st_nw_protocol_rip_network_ipv4',
                                                                            enableToggle: true,
                                                                            pressed: true,
                                                                            bind: {
                                                                                text: '{ipv4}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onRip_network_ipv4Click'
                                                                            }
                                                                        },
                                                                        {
                                                                            id: 'st_nw_protocol_rip_network_ipv6',
                                                                            bind: {
                                                                                text: '{ipv6}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onRip_network_ipv6Click'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            flex: 1,
                                                            disabled: true,
                                                            id: 'st_nw_protocol_rip_network_grid',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return value + "/" + record.data.netmask;
                                                                    },
                                                                    dataIndex: 'net',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{ip_mask}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{name}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect',
                                                                    deselect: 'onCheckboxModelDeselect'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onRip_network_gridCellDblClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            flex: 1,
                                                            disabled: true,
                                                            hidden: true,
                                                            id: 'st_nw_protocol_rip_network_grid_v6',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return value + "/" + record.data.netmask;
                                                                    },
                                                                    dataIndex: 'net',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{ip_prefix}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{name}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect1',
                                                                    deselect: 'onCheckboxModelDeselect1'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onRip_network_grid_v6CellDblClick'
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
                            cls: 'zen_tab_body',
                            title: 'OSPF',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            padding: 10,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            bind: {
                                                title: '{basic_setting}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    resizeHandle: false,
                                                    state: false,
                                                    id: 'st_nw_protocol_ospf_use',
                                                    listeners: {
                                                        change: 'onNetwork_protocol_ospf_useChange',
                                                        afterrender: 'onNetwork_protocol_ospf_useAfterRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    disabled: true,
                                                    id: 'st_nw_protocol_ospf_router_con',
                                                    margin: '0 0 0 100',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            width: 100,
                                                            bind: {
                                                                text: '{router_id}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                    if(!ValidIPAddress(value)){ return get_msg('err_form'); }
                                                                }

                                                                return true;
                                                            },
                                                            id: 'st_nw_protocol_ospf_router_id',
                                                            width: 150,
                                                            maskRe: /[0-9.]/,
                                                            listeners: {
                                                                errorchange: 'onOspf_router_idErrorChange',
                                                                blur: 'onOspf_router_idBlur'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_ad_btn',
                                                            bind: {
                                                                text: '{advance_setting}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick26'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'st_nw_protocol_ospf_status_set',
                                            padding: 10,
                                            bind: {
                                                title: '{status_info}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'st_nw_protocol_ospf_neighbor_btn',
                                                    bind: {
                                                        text: '{neighbor}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick11'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'st_nw_protocol_ospf_interface_btn',
                                                    margin: '0 0 0 5',
                                                    bind: {
                                                        text: '{inter}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick10',
                                                        blur: 'onOspf_interface_btnBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'st_nw_protocol_ospf_database_btn',
                                                    margin: '0 0 0 5',
                                                    bind: {
                                                        text: '{database}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick9'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'st_nw_protocol_ospf_route_btn',
                                                    margin: '0 0 0 5',
                                                    bind: {
                                                        text: '{route}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick2'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'st_nw_protocol_ospf_area_set',
                                            padding: 10,
                                            title: 'Area',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'zen_toolbar',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_area_toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_add',
                                                                    bind: {
                                                                        text: '{add}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick4'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_del',
                                                                    bind: {
                                                                        text: '{del}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick22'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_area_grid',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'area_id',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{area}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if(value === "address"){ return "A.B.C.D"; }
                                                                        else{ return "Number"; }
                                                                    },
                                                                    dataIndex: 'type',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{type4}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'peer_ip',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{peer_ip}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{desc}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect2',
                                                                    deselect: 'onCheckboxModelDeselect2'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onOspf_area_gridCellDblClick'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'ospf_network_set',
                                            padding: 10,
                                            bind: {
                                                title: '{network}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'zen_toolbar',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_network_toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_add',
                                                                    bind: {
                                                                        text: '{add}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick5'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_del',
                                                                    bind: {
                                                                        text: '{del}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick23'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'segmentedbutton',
                                                                    cls: 'zen_seg',
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            id: 'ospf_network_ipv4_btn',
                                                                            enableToggle: true,
                                                                            pressed: true,
                                                                            bind: {
                                                                                text: '{ipv4}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick14'
                                                                            }
                                                                        },
                                                                        {
                                                                            id: 'ospf_network_ipv6_btn',
                                                                            bind: {
                                                                                text: '{ipv6}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick13'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_network_grid',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'net',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{network}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'area_id',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{area}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{desc}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect3',
                                                                    deselect: 'onCheckboxModelDeselect3'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onOspf_network_gridCellDblClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            hidden: true,
                                                            id: 'st_nw_protocol_ospf_network_grid_v6',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'net',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{network}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'area_id',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{area}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{desc}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect4',
                                                                    deselect: 'onCheckboxModelDeselect4'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onOspf_network_grid_v6CellDblClick'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'ospf_inter_set',
                                            padding: 10,
                                            bind: {
                                                title: '{inter}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'zen_toolbar',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_inter_toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_add',
                                                                    bind: {
                                                                        text: '{add}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick6'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_del',
                                                                    bind: {
                                                                        text: '{del}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick24'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_ospf_interface_grid',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'intf',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{inter}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return addComma(value);
                                                                    },
                                                                    dataIndex: 'cost',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{cost}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'priority',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{priority_level}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if(value.state === "yes"){ return "사용"; }
                                                                        else{ return "사용안함"; }
                                                                    },
                                                                    dataIndex: 'authen',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{header_o_auth}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if(value.state === "yes"){ return "사용"; }
                                                                        else{ return "사용안함"; }
                                                                    },
                                                                    dataIndex: 'key_md5',
                                                                    text: 'MD5',
                                                                    flex: 1
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect5',
                                                                    deselect: 'onCheckboxModelDeselect5'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onOspf_interface_gridCellDblClick'
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
                            cls: 'zen_tab_body',
                            title: 'BGP',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            padding: 10,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            bind: {
                                                title: '{basic_setting}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    resizeHandle: false,
                                                    state: false,
                                                    id: 'network_protocol_bgp_use',
                                                    listeners: {
                                                        change: 'onNetwork_protocol_bgp_useChange',
                                                        afterrender: 'onNetwork_protocol_bgp_useAfterRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    disabled: true,
                                                    id: 'bgp_as_con',
                                                    margin: '0 0 0 100',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            width: 100,
                                                            bind: {
                                                                text: '{as2}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var temp = removeComma(value);
                                                                    if(!CheckNotNull(temp)){ return get_msg('err_null'); }
                                                                    if(!ValidNum(temp)){ return get_msg('err_form'); }
                                                                    if(!LengthCheck(temp,0,4294967295)){ return ValidLimit(0,4294967295); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                4294967295,
                                                                null)
                                                            },
                                                            id: 'bgp_remote',
                                                            width: 100,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 12,
                                                            listeners: {
                                                                errorchange: 'onBgp_remoteErrorChange',
                                                                blur: 'onBgp_remoteBlur',
                                                                focus: 'onBgp_remoteFocus',
                                                                change: 'onBgp_remoteChange'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    disabled: true,
                                                    id: 'bgp_router_con',
                                                    margin: '0 0 0 10',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            width: 100,
                                                            bind: {
                                                                text: '{router_id}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                    if(!ValidIPAddress(value)){ return get_msg('err_form'); }
                                                                }

                                                                return true;
                                                            },
                                                            id: 'bgp_router_id',
                                                            width: 150,
                                                            maskRe: /[0-9.]/,
                                                            listeners: {
                                                                errorchange: 'onBgp_router_idErrorChange',
                                                                blur: 'onBgp_router_idBlur'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            disabled: true,
                                                            id: 'bgp_ad_btn',
                                                            bind: {
                                                                text: '{advance_setting}'
                                                            },
                                                            listeners: {
                                                                click: 'onBgp_ad_btnClick'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'bgp_status_set',
                                            padding: 10,
                                            bind: {
                                                title: '{status_info}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'bgp_neighbor_btn',
                                                    bind: {
                                                        text: '{neighbor}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick12',
                                                        blur: 'onBgp_neighbor_btnBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'bgp_status_btn',
                                                    margin: '0 0 0 5',
                                                    bind: {
                                                        text: '{status}'
                                                    },
                                                    listeners: {
                                                        click: 'onButtonClick3'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'bgp_network_set',
                                            padding: 10,
                                            bind: {
                                                title: '{network}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'zen_toolbar',
                                                            disabled: true,
                                                            id: 'bgp_network_toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_add',
                                                                    bind: {
                                                                        text: '{add}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick7'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_del',
                                                                    bind: {
                                                                        text: '{del}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick17'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'segmentedbutton',
                                                                    cls: 'zen_seg',
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            id: 'bgp_network_ipv4_btn',
                                                                            enableToggle: true,
                                                                            pressed: true,
                                                                            bind: {
                                                                                text: '{ipv4}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick16'
                                                                            }
                                                                        },
                                                                        {
                                                                            id: 'bgp_network_ipv6_btn',
                                                                            bind: {
                                                                                text: '{ipv6}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick15'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            id: 'st_nw_protocol_bgp_network_grid',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return value + "/" + record.data.netmask;
                                                                    },
                                                                    dataIndex: 'net',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{ip_mask}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{desc}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect6',
                                                                    deselect: 'onCheckboxModelDeselect6'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onBgp_network_gridCellDblClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            hidden: true,
                                                            id: 'st_nw_protocol_bgp_network_grid_v6',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return value + "/" + record.data.netmask;
                                                                    },
                                                                    dataIndex: 'net',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{ip_prefix}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'desc',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{desc}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect7',
                                                                    deselect: 'onCheckboxModelDeselect7'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onBgp_network_grid_v6CellDblClick'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            id: 'bgp_address_set',
                                            padding: 10,
                                            bind: {
                                                title: '{neighbor_ip}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            cls: 'zen_toolbar',
                                                            disabled: true,
                                                            id: 'bgp_address_toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_add',
                                                                    bind: {
                                                                        text: '{add}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick8'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    iconCls: 'ic_del',
                                                                    bind: {
                                                                        text: '{del}'
                                                                    },
                                                                    listeners: {
                                                                        click: 'onButtonClick18'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            disabled: true,
                                                            id: 'bgp_address_grid',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 60,
                                                                    align: 'center',
                                                                    dataIndex: 'string',
                                                                    text: 'N'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'neighbor_ip',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{neighbor_ip}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return addComma(value);
                                                                    },
                                                                    dataIndex: 'remote_as',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{as_remote}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'port',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{port}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if(value === "yes"){ return "사용"; }
                                                                        else{ return "사용안함"; }
                                                                    },
                                                                    dataIndex: 'default_originate',
                                                                    flex: 1,
                                                                    bind: {
                                                                        text: '{default_originate}'
                                                                    }
                                                                }
                                                            ],
                                                            selModel: {
                                                                selType: 'checkboxmodel',
                                                                mode: 'SIMPLE',
                                                                listeners: {
                                                                    select: 'onCheckboxModelSelect8',
                                                                    deselect: 'onCheckboxModelDeselect8'
                                                                }
                                                            },
                                                            listeners: {
                                                                celldblclick: 'onBgp_address_gridCellDblClick'
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
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: 0,
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
                        click: 'onButtonClick21'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick20'
                    }
                }
            ]
        }
    ],
    listeners: {
        render: 'onPanelRender',
        afterrender: 'onPanelAfterRender'
    },

    onNetwork_protocol_rip_useChange: function(button) {
        if(button.state){
            Ext.getCmp('st_nw_protocol_rip_version_com').enable(true);
            Ext.getCmp('st_nw_protocol_rip_default_chk').enable(true);
            Ext.getCmp('st_nw_protocol_rip_advance_btn').enable(true);
            Ext.getCmp('st_nw_protocol_rip_status_btn').enable(true);
            Ext.getCmp('st_nw_protocol_rip_network_toolbar').enable(true);
            Ext.getCmp('st_nw_protocol_rip_network_grid').enable(true);
            Ext.getCmp('st_nw_protocol_rip_network_grid_v6').enable(true);
        }
        else{
            Ext.getCmp('st_nw_protocol_rip_version_com').disable(true);
            Ext.getCmp('st_nw_protocol_rip_default_chk').disable(true);
            Ext.getCmp('st_nw_protocol_rip_advance_btn').disable(true);
            Ext.getCmp('st_nw_protocol_rip_status_btn').disable(true);
            Ext.getCmp('st_nw_protocol_rip_network_toolbar').disable(true);
            Ext.getCmp('st_nw_protocol_rip_network_grid').disable(true);
            Ext.getCmp('st_nw_protocol_rip_network_grid_v6').disable(true);
        }
    },

    onNetwork_protocol_rip_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onComboboxAfterRender: function(component, eOpts) {
        var inter = component.getStore().data;

        if(inter.length > 0){
            component.setValue(inter.items[0].data['name']);
        }
    },

    onButtonClick25: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_protocol');

        var win = Ext.create('NFW2.view.win_rip_ad_setting',{
            rip_info : me.rip_info,
            modal : true
        });

        win.show();
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'rip_status'
        });

        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var ver = 4;

        if(Ext.getCmp('st_nw_protocol_rip_network_ipv4').pressed){ ver = 4; }
        else{ ver = 6; }

        var win = Ext.create('NFW2.view.win_network_protocol_rip_network',{
            modal : true,
            version : ver
        });

        win.show();
    },

    onButtonClick19: function(button, e, eOpts) {
        if(Ext.getCmp('st_nw_protocol_rip_network_ipv4').pressed){
            var tbl = Ext.getCmp('st_nw_protocol_rip_network_grid').getSelectionModel();
            var sel = tbl.getSelection();
            var store = Ext.getCmp('st_nw_protocol_rip_network_grid').getStore();

            if(Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list.length === 0){
                Ext.Msg.alert("", get_msg("sel_del"));
                return false;
            }

            var record = [];

            for(var i in store.data.items){
                var chk = false;
                for(var j in Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list){
                    if(Number(i) === Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list[j]){
                        chk = true;
                    }
                }

                if(chk === false){
                    record.push(store.data.items[i].data);
                }
            }

            store.loadData(record);
        }
        else{
            var tbl = Ext.getCmp('st_nw_protocol_rip_network_grid_v6').getSelectionModel();
            var sel = tbl.getSelection();
            var store = Ext.getCmp('st_nw_protocol_rip_network_grid_v6').getStore();

            if(Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list.length === 0){
                Ext.Msg.alert("", get_msg("sel_del"));
                return false;
            }

            var record = [];

            for(var i in store.data.items){
                var chk = false;
                for(var j in Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list){
                    if(Number(i) === Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list[j]){
                        chk = true;
                    }
                }

                if(chk === false){
                    record.push(store.data.items[i].data);
                }
            }

            store.loadData(record);
        }
    },

    onRip_network_ipv4Click: function(button, e, eOpts) {
        Ext.getCmp('st_nw_protocol_rip_network_grid').show();
        Ext.getCmp('st_nw_protocol_rip_network_grid_v6').hide();
    },

    onRip_network_ipv6Click: function(button, e, eOpts) {
        Ext.getCmp('st_nw_protocol_rip_network_grid').hide();
        Ext.getCmp('st_nw_protocol_rip_network_grid_v6').show();
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list.splice(i,1); }
        }
    },

    onRip_network_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_rip_network',{
                modal : true,
                version : 4,
                edit : "edit",
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onCheckboxModelSelect1: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list){
            if(Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect1: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list){
            if(Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list.splice(i,1); }
        }
    },

    onRip_network_grid_v6CellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_rip_network',{
                modal : true,
                version : 6,
                edit : "edit",
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onNetwork_protocol_ospf_useChange: function(button) {
        if(button.state){
            Ext.getCmp('st_nw_protocol_ospf_router_con').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_neighbor_btn').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_interface_btn').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_database_btn').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_ad_btn').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_route_btn').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_area_toolbar').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_area_grid').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_network_toolbar').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_network_grid').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_inter_toolbar').enable(true);
            Ext.getCmp('st_nw_protocol_ospf_interface_grid').enable(true);
        }
        else{
            Ext.getCmp('st_nw_protocol_ospf_router_con').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_neighbor_btn').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_interface_btn').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_database_btn').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_ad_btn').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_route_btn').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_area_toolbar').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_area_grid').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_network_toolbar').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_network_grid').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_inter_toolbar').disable(true);
            Ext.getCmp('st_nw_protocol_ospf_interface_grid').disable(true);
        }
    },

    onNetwork_protocol_ospf_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onOspf_router_idErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onOspf_router_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick26: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_protocol');

        var win = Ext.create('NFW2.view.win_ospf_ad_setting',{
            ospf_info : me.ospf_info,
            modal : true
        });

        win.show();
    },

    onButtonClick11: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'ospf_neighbor'
        });

        win.show();
    },

    onButtonClick10: function(button, e, eOpts) {
        var grid = Ext.getCmp('st_nw_protocol_ospf_interface_grid');
        var tbl = grid.getSelectionModel().getSelection();
        var args = "";

        if(tbl.length === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('sel_ospf_inter'));
            return false;
        }
        else if((tbl.length > 1)){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_bgp_sel_one'));
            return false;
        }
        else{
            args = tbl[0].data.intf;
        }

        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'ospf_interface',
            args : args
        });

        win.show();
    },

    onOspf_interface_btnBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update("");
    },

    onButtonClick9: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'ospf_database'
        });

        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'ospf_route'
        });

        win.show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_ospf_area',{
            modal : true
        });

        win.show();
    },

    onButtonClick22: function(button, e, eOpts) {
        var tbl = Ext.getCmp('st_nw_protocol_ospf_area_grid').getSelectionModel();
        var sel = tbl.getSelection();
        var store = Ext.getCmp('st_nw_protocol_ospf_area_grid').getStore();
        var v4_store = Ext.getCmp('st_nw_protocol_ospf_network_grid').getStore();
        var v6_store = Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').getStore();

        if(Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }

        for(var j in v4_store.data.items){
            for(var l in sel){
                if(v4_store.data.items[j].data.area_id === sel[l].data.area_id){
                    Ext.Msg.alert("", "현재 네트워크에서 사용 중인 Area 입니다.");
                    return false;
                }
            }
        }

        for(var k in v6_store.data.items){
            for(var l in sel){
                if(v6_store.data.items[k].data.area_id === sel[l].data.area_id){
                    Ext.Msg.alert("", "현재 네트워크에서 사용 중인 Area 입니다.");
                    return false;
                }
            }
        }

        var record = [];

        for(var i in store.data.items){
            var chk = false;
            for(var j in Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list){
                if(Number(i) === Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list[j]){
                    chk = true;
                }
            }

            if(chk === false){
                record.push(store.data.items[i].data);
            }
        }

        store.loadData(record);
    },

    onCheckboxModelSelect2: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect2: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list.splice(i,1); }
        }
    },

    onOspf_area_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_ospf_area',{
                modal : true,
                edit : 'edit',
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onButtonClick5: function(button, e, eOpts) {
        var ver = 4;

        if(Ext.getCmp('ospf_network_ipv4_btn').pressed){ ver = 4; }
        else{ ver = 6; }

        var win = Ext.create('NFW2.view.win_network_protocol_ospf_network',{
            modal : true,
            version : ver
        });

        win.show();
    },

    onButtonClick23: function(button, e, eOpts) {
        if(Ext.getCmp('ospf_network_ipv4_btn').pressed){
            var tbl = Ext.getCmp('st_nw_protocol_ospf_network_grid').getSelectionModel();
            var sel = tbl.getSelection();
            var store = Ext.getCmp('st_nw_protocol_ospf_network_grid').getStore();

            if(Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list.length === 0){
                Ext.Msg.alert("", get_msg("sel_del"));
                return false;
            }

            var record = [];

            for(var i in store.data.items){
                var chk = false;
                for(var j in Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list){
                    if(Number(i) === Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list[j]){
                        chk = true;
                    }
                }

                if(chk === false){
                    record.push(store.data.items[i].data);
                }
            }

            store.loadData(record);
        }
        else{
            var tbl = Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').getSelectionModel();
            var sel = tbl.getSelection();
            var store = Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').getStore();

            if(Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list.length === 0){
                Ext.Msg.alert("", get_msg("sel_del"));
                return false;
            }

            var record = [];

            for(var i in store.data.items){
                var chk = false;
                for(var j in Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list){
                    if(Number(i) === Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list[j]){
                        chk = true;
                    }
                }

                if(chk === false){
                    record.push(store.data.items[i].data);
                }
            }

            store.loadData(record);
        }
    },

    onButtonClick14: function(button, e, eOpts) {
        Ext.getCmp('st_nw_protocol_ospf_network_grid').show();
        Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').hide();
    },

    onButtonClick13: function(button, e, eOpts) {
        Ext.getCmp('st_nw_protocol_ospf_network_grid').hide();
        Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').show();
    },

    onCheckboxModelSelect3: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect3: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list.splice(i,1); }
        }
    },

    onOspf_network_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_ospf_network',{
                modal : true,
                version : 4,
                edit : "edit",
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onCheckboxModelSelect4: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect4: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list.splice(i,1); }
        }
    },

    onOspf_network_grid_v6CellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_ospf_network',{
                modal : true,
                version : 6,
                edit : "edit",
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onButtonClick6: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_ospf_interface',{
            modal : true
        });

        win.show();
    },

    onButtonClick24: function(button, e, eOpts) {
        var tbl = Ext.getCmp('st_nw_protocol_ospf_interface_grid').getSelectionModel();
        var sel = tbl.getSelection();
        var store = Ext.getCmp('st_nw_protocol_ospf_interface_grid').getStore();

        if(Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }

        var record = [];

        for(var i in store.data.items){
            var chk = false;
            for(var j in Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list){
                if(Number(i) === Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list[j]){
                    chk = true;
                }
            }

            if(chk === false){
                record.push(store.data.items[i].data);
            }
        }

        store.loadData(record);
    },

    onCheckboxModelSelect5: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect5: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list.splice(i,1); }
        }
    },

    onOspf_interface_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_ospf_interface',{
            modal : true,
            edit : "edit",
            record : record,
            index : rowIndex
        });

        win.show();
    },

    onNetwork_protocol_bgp_useChange: function(button) {
        if(button.state){
            Ext.getCmp('bgp_as_con').enable(true);
            Ext.getCmp('bgp_router_con').enable(true);
            Ext.getCmp('bgp_neighbor_btn').enable(true);
            Ext.getCmp('bgp_status_btn').enable(true);
            Ext.getCmp('bgp_ad_btn').enable(true);
            Ext.getCmp('bgp_network_toolbar').enable(true);
            Ext.getCmp('st_nw_protocol_bgp_network_grid').enable(true);
            Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').enable(true);
            Ext.getCmp('bgp_address_toolbar').enable(true);
            Ext.getCmp('bgp_address_grid').enable(true);
        }
        else{
            Ext.getCmp('bgp_as_con').disable(true);
            Ext.getCmp('bgp_router_con').disable(true);
            Ext.getCmp('bgp_neighbor_btn').disable(true);
            Ext.getCmp('bgp_status_btn').disable(true);
            Ext.getCmp('bgp_ad_btn').disable(true);
            Ext.getCmp('bgp_network_toolbar').disable(true);
            Ext.getCmp('st_nw_protocol_bgp_network_grid').disable(true);
            Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').disable(true);
            Ext.getCmp('bgp_address_toolbar').disable(true);
            Ext.getCmp('bgp_address_grid').disable(true);
        }
    },

    onNetwork_protocol_bgp_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onBgp_remoteErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBgp_remoteBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onBgp_remoteFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onBgp_remoteChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onBgp_router_idErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBgp_router_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onBgp_ad_btnClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_protocol');

        var win = Ext.create('NFW2.view.win_bgp_ad_setting',{
            bgp_info : me.bgp_info,
            modal : true
        });

        win.show();
    },

    onButtonClick12: function(button, e, eOpts) {
        var grid = Ext.getCmp('st_nw_protocol_bgp_network_grid');
        var grid_v6 = Ext.getCmp('st_nw_protocol_bgp_network_grid_v6');
        var tbl = grid.getSelectionModel().getSelection();
        var tbl_v6 = grid_v6.getSelectionModel().getSelection();
        var args = "";

        if(Ext.getCmp('bgp_network_ipv4_btn').pressed){
            if(tbl.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('sel_bgp_network'));
                return false;
            }
            else if((tbl.length > 1)){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_bgp_sel_one'));
                return false;
            }
            else{
                args = tbl[0].data.net;
            }
        }
        else{
            if(tbl_v6.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('sel_bgp_network'));
                return false;
            }
            else if((tbl_v6.length > 1)){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_bgp_sel_one'));
                return false;
            }
            else{
                args = tbl_v6[0].data.net;
            }
        }

        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'bgp_neighbor',
            args : args
        });

        win.show();
    },

    onBgp_neighbor_btnBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update("");
    },

    onButtonClick3: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_status',{
            modal : true,
            mode : 'bgp_status'
        });

        win.show();
    },

    onButtonClick7: function(button, e, eOpts) {
        var ver = 4;

        if(Ext.getCmp('bgp_network_ipv4_btn').pressed){ ver = 4; }
        else{ ver = 6; }


        var win = Ext.create('NFW2.view.win_network_protocol_bgp_network',{
            modal : true,
            version : ver
        });

        win.show();
    },

    onButtonClick17: function(button, e, eOpts) {
        if(Ext.getCmp('bgp_network_ipv4_btn').pressed){
            var tbl = Ext.getCmp('st_nw_protocol_bgp_network_grid').getSelectionModel();
            var sel = tbl.getSelection();
            var store = Ext.getCmp('st_nw_protocol_bgp_network_grid').getStore();

            if(Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list.length === 0){
                Ext.Msg.alert("", get_msg("sel_del"));
                return false;
            }

            var record = [];

            for(var i in store.data.items){
                var chk = false;
                for(var j in Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list){
                    if(Number(i) === Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list[j]){
                        chk = true;
                    }
                }

                if(chk === false){
                    record.push(store.data.items[i].data);
                }
            }

            store.loadData(record);
        }
        else{
            var tbl = Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').getSelectionModel();
            var sel = tbl.getSelection();
            var store = Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').getStore();

            if(Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list.length === 0){
                Ext.Msg.alert("", get_msg("sel_del"));
                return false;
            }

            var record = [];

            for(var i in store.data.items){
                var chk = false;
                for(var j in Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list){
                    if(Number(i) === Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list[j]){
                        chk = true;
                    }
                }

                if(chk === false){
                    record.push(store.data.items[i].data);
                }
            }

            store.loadData(record);
        }
    },

    onButtonClick16: function(button, e, eOpts) {
        Ext.getCmp('st_nw_protocol_bgp_network_grid').show();
        Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').hide();
    },

    onButtonClick15: function(button, e, eOpts) {
        Ext.getCmp('st_nw_protocol_bgp_network_grid').hide();
        Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').show();
    },

    onCheckboxModelSelect6: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect6: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list){
            if(Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list.splice(i,1); }
        }
    },

    onBgp_network_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_bgp_network',{
                modal : true,
                version : 4,
                edit : "edit",
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onCheckboxModelSelect7: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list){
            if(Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect7: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list){
            if(Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list[i] === index){ Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list.splice(i,1); }
        }
    },

    onBgp_network_grid_v6CellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_network_protocol_bgp_network',{
                modal : true,
                version : 6,
                edit : "edit",
                record : record,
                index : rowIndex
            });

            win.show();
        }
    },

    onButtonClick8: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_bgp_address',{
            modal : true
        });

        win.show();
    },

    onButtonClick18: function(button, e, eOpts) {
        var tbl = Ext.getCmp('bgp_address_grid').getSelectionModel();
        var sel = tbl.getSelection();
        var store = Ext.getCmp('bgp_address_grid').getStore();

        if(Ext.getCmp('bgp_address_grid').sel_list.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }

        var record = [];

        for(var i in store.data.items){
            var chk = false;
            for(var j in Ext.getCmp('bgp_address_grid').sel_list){
                if(Number(i) === Ext.getCmp('bgp_address_grid').sel_list[j]){
                    chk = true;
                }
            }

            if(chk === false){
                record.push(store.data.items[i].data);
            }
        }

        store.loadData(record);
    },

    onCheckboxModelSelect8: function(rowmodel, record, index, eOpts) {
        var chk = false;

        for(var i in Ext.getCmp('bgp_address_grid').sel_list){
            if(Ext.getCmp('bgp_address_grid').sel_list[i] === index){ chk = true; }
        }

        if(chk === false){
            Ext.getCmp('bgp_address_grid').sel_list.push(index);
        }
    },

    onCheckboxModelDeselect8: function(rowmodel, record, index, eOpts) {
        for(var i in Ext.getCmp('bgp_address_grid').sel_list){
            if(Ext.getCmp('bgp_address_grid').sel_list[i] === index){ Ext.getCmp('bgp_address_grid').sel_list.splice(i,1); }
        }
    },

    onBgp_address_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_protocol_bgp_address',{
            modal : true,
            record : record,
            index : rowIndex,
            edit : "edit"
        });

        win.show();
    },

    onButtonClick21: function(button, e, eOpts) {
        var me = this;
        var obj_rip = {};
        var rip_network = [];
        var rip_network_store = Ext.getCmp('st_nw_protocol_rip_network_grid').getStore();
        var rip_network_store_v6 = Ext.getCmp('st_nw_protocol_rip_network_grid_v6').getStore();
        var obj_ospf = {};
        var ospf_area = [];
        var ospf_area_store = Ext.getCmp('st_nw_protocol_ospf_area_grid').getStore();
        var ospf_network = [];
        var ospf_network_store = Ext.getCmp('st_nw_protocol_ospf_network_grid').getStore();
        var ospf_network_store_v6 = Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').getStore();
        var ospf_inter = [];
        var ospf_inter_store = Ext.getCmp('st_nw_protocol_ospf_interface_grid').getStore();
        var obj_bgp = {};
        var bgp_network = [];
        var bgp_network_store = Ext.getCmp('st_nw_protocol_bgp_network_grid').getStore();
        var bgp_network_store_v6 = Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').getStore();
        var bgp_address = [];
        var bgp_address_store = Ext.getCmp('bgp_address_grid').getStore();

        if(Ext.getCmp('st_nw_protocol_rip_use').state === true){
            obj_rip.use = "enable";
        }
        else{
            obj_rip.use = "disable";
        }

        // if(Ext.getCmp('st_nw_protocol_rip_default_chk').getValue()){
        //     obj_rip.default_originate = "yes";
        // }
        // else{
        //     obj_rip.default_originate = "no";
        // }

        obj_rip.version = Ext.getCmp('st_nw_protocol_rip_version_com').getValue();

        for(var i in rip_network_store.data.items){
            rip_network.push({
                'net' : rip_network_store.data.items[i].data.net,
                'netmask' : rip_network_store.data.items[i].data.netmask,
                'desc' : rip_network_store.data.items[i].data.desc
            });
        }

        for(var i in rip_network_store_v6.data.items){
            rip_network.push({
                'net' : rip_network_store_v6.data.items[i].data.net,
                'netmask' : rip_network_store_v6.data.items[i].data.netmask,
                'desc' : rip_network_store_v6.data.items[i].data.desc
            });
        }

        obj_rip.network = rip_network;

        if(Ext.getCmp('st_nw_protocol_ospf_use').state === true){
            if(Ext.getCmp('st_nw_protocol_ospf_router_id').isValid() === false){ Ext.getCmp('st_nw_protocol_tab').setActiveTab(1); Ext.getCmp('st_nw_protocol_ospf_router_id').focus(); return false; }
            obj_ospf.use = "enable";
        }
        else{
            obj_ospf.use = "disable";
        }

        obj_ospf.router_id = Ext.getCmp('st_nw_protocol_ospf_router_id').getValue();

        for(var k in ospf_area_store.data.items){
            ospf_area = [];
            for(var l in ospf_network_store.data.items){
                if(ospf_area_store.data.items[k].data.area_id === ospf_network_store.data.items[l].data.area_id){
                    ospf_network.push({
                        'net' : ospf_network_store.data.items[l].data.net,
                        'area_id' : ospf_network_store.data.items[l].data.area_id,
                        'desc' : ospf_network_store.data.items[l].data.desc
                    });
                }
            }

            for(var l in ospf_network_store_v6.data.items){
                if(ospf_area_store.data.items[k].data.area_id === ospf_network_store_v6.data.items[l].data.area_id){
                    ospf_network.push({
                        'net' : ospf_network_store_v6.data.items[l].data.net,
                        'area_id' : ospf_network_store.data_v6.items[l].data.area_id,
                        'desc' : ospf_network_store.data_v6.items[l].data.desc
                    });
                }
            }

            ospf_area.push({
                'area_id' : ospf_area_store.data.items[k].data.area_id,
                'networks' : ospf_network,
                'type' : ospf_area_store.data.items[k].data.type,
                'peer_ip' : ospf_area_store.data.items[k].data.peer_ip,
                'desc' : ospf_area_store.data.items[k].data.desc
            });
        }

        obj_ospf.area = ospf_area;

        for(var j in ospf_inter_store.data.items){
            ospf_inter.push({
                'intf' : ospf_inter_store.data.items[j].data.intf,
                'type' : ospf_inter_store.data.items[j].data.type,
                'cost' : ospf_inter_store.data.items[j].data.cost,
                'priority' : ospf_inter_store.data.items[j].data.priority,
                'authen' : ospf_inter_store.data.items[j].data.authen,
                'key_md5' : ospf_inter_store.data.items[j].data.key_md5
            });
        }

        obj_ospf.interface = ospf_inter;

        if(Ext.getCmp('network_protocol_bgp_use').state === true){
            if(Ext.getCmp('bgp_remote').isValid() === false){ Ext.getCmp('st_nw_protocol_tab').setActiveTab(2); Ext.getCmp('bgp_remote').focus(); return false; }
            if(Ext.getCmp('bgp_router_id').isValid() === false){ Ext.getCmp('st_nw_protocol_tab').setActiveTab(2); Ext.getCmp('bgp_router_id').focus(); return false; }
            obj_bgp.use = "enable";
        }
        else{
            obj_bgp.use = "disable";
        }

        obj_bgp.as_number = removeComma(Ext.getCmp('bgp_remote').getValue());
        obj_bgp.router_id = Ext.getCmp('bgp_router_id').getValue();

        for(var n in bgp_network_store.data.items){
            bgp_network.push({
                'net' : bgp_network_store.data.items[n].data.net,
                'netmask' : bgp_network_store.data.items[n].data.netmask,
                'desc' : bgp_network_store.data.items[n].data.desc
            });
        }
        for(var n in bgp_network_store_v6.data.items){
            bgp_network.push({
                'net' : bgp_network_store_v6.data.items[n].data.net,
                'netmask' : bgp_network_store_v6.data.items[n].data.netmask,
                'desc' : bgp_network_store_v6.data.items[n].data.desc
            });
        }

        obj_bgp.network = bgp_network;

        for(var m in bgp_address_store.data.items){
            bgp_address.push({
                'neighbor_ip' : bgp_address_store.data.items[m].data.neighbor_ip,
                'remote_as' : bgp_address_store.data.items[m].data.remote_as,
                'port' : bgp_address_store.data.items[m].data.port,
                'default_originate' : bgp_address_store.data.items[m].data.default_originate
            });
        }

        obj_bgp.neighbor = bgp_address;

        obj_rip.distance = me.rip_info.distance;
        obj_rip.metric = me.rip_info.metric;
        obj_rip.redistribute = me.rip_info.redistribute;
        obj_rip.timer = me.rip_info.timer;
        obj_rip.default_originate = me.rip_info.default_originate;
        obj_rip.static_route = me.rip_info.static_route;

        var _params = {
            basename : Ext.encode('network_router_rip'),
            obj : Ext.encode(obj_rip)
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

        obj_ospf.distance = me.ospf_info.distance;
        obj_ospf.default_originate = me.ospf_info.default_originate;
        obj_ospf.redistribute = me.ospf_info.redistribute;
        obj_ospf.abrtype = me.ospf_info.abrtype;
        obj_ospf.static_route = me.ospf_info.static_route;

        var _params = {
            basename : Ext.encode('network_router_ospf'),
            obj : Ext.encode(obj_ospf)
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

        obj_bgp.distance = me.bgp_info.distance;
        obj_bgp.redistribute = me.bgp_info.redistribute;
        obj_bgp.static_route = me.bgp_info.static_route;

        var _params = {
            basename : Ext.encode('network_router_bgp'),
            obj : Ext.encode(obj_bgp)
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

    onButtonClick20: function(button, e, eOpts) {
        var me = this;

        me.get_protocol();
    },

    onPanelRender: function(component, eOpts) {
        var rip_network_store = {
            fields: [
                {
                    name: 'net'
                },
                {
                    name: 'netmask'
                },
                {
                    name: 'desc'
                }
            ]
        };

        Ext.getCmp('st_nw_protocol_rip_network_grid').reconfigure(rip_network_store);
        Ext.getCmp('st_nw_protocol_rip_network_grid_v6').reconfigure(rip_network_store);

        var ospf_network_store = {
            fields: [
                {
                    name: 'net'
                },
                {
                    name: 'area_id'
                },
                {
                    name: 'desc'
                }
            ]
        };

        Ext.getCmp('st_nw_protocol_ospf_network_grid').reconfigure(ospf_network_store);
        Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').reconfigure(ospf_network_store);

        var ospf_area_store = {
            fields: [
                {
                    name: 'area_id'
                },
                {
                    name: 'networks'
                },
                {
                    name: 'type'
                },
                {
                    name: 'peer_ip'
                },
                {
                    name: 'desc'
                }
            ]
        };

        Ext.getCmp('st_nw_protocol_ospf_area_grid').reconfigure(ospf_area_store);

        var ospf_interface_store = {
            fields: [
                {
                    name: 'intf'
                },
                {
                    name: 'type'
                },
                {
                    name: 'cost'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'interval'
                },
                {
                    name: 'authen'
                },
                {
                    name: 'key_md5'
                }
            ]
        };

        Ext.getCmp('st_nw_protocol_ospf_interface_grid').reconfigure(ospf_interface_store);

        var bgp_network_store = {
            fields: [
                {
                    name: 'net'
                },
                {
                    name: 'netmask'
                },
                {
                    name: 'desc'
                }
            ]
        };

        Ext.getCmp('st_nw_protocol_bgp_network_grid').reconfigure(bgp_network_store);
        Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').reconfigure(bgp_network_store);

        var bgp_address_store = {
            fields: [
                {
                    name: 'neighbor_ip'
                },
                {
                    name: 'remote_as'
                },
                {
                    name: 'port'
                },
                {
                    name: 'default_originate'
                }
            ]
        };

        Ext.getCmp('bgp_address_grid').reconfigure(bgp_address_store);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        this.fieldInfo = makeZenTip();
        me.ospf_info = {
            'distance':{'state':'no','value':'110'},
            'abrtype':{'state':'no','type':'standard'},
            'redistribute':{'state':'no','static':'yes','rip':'no','bgp':'no'},
            'default_originate':{'state':'no','type':{'status':'originate','metric':'no','value':'','always':'no'}},
            'static_route':{'routes':[{'ipaddr':'','opt':'null0','net':''}],'state':'no'}
        };

        me.rip_info = {
            'metric':{'state':'no','value':'1'},
            'distance':{'state':'no','value':'120'},
            'timer':{'state':'no','update':'30','timeout':'180','garbage':'120'},
            'redistribute':{'state':'no','static':{'state':'yes','metric_state':'yes','metric':'1'},'ospf':{'state':'yes','metric_state':'yes','metric':'1'},'bgp':{'state':'yes','metric_state':'yes','metric':'1'}},
            'default_originate':'no',
            'static_route':{'routes':[{'ipaddr':'','opt':'null0','net':''}],'state':'no'}
        };

        me.bgp_info = {
            'distance':{'state':'no','external':'20','internal':'200','local':'200'},
            'redistribute':{'state':'no','static':'yes','rip':'no','ospf':'no'},
            'static_route':{'routes':[{'ipaddr':'','opt':'null0','net':''}],'state':'no'}
        };

        Ext.getCmp('st_nw_protocol_rip_network_grid').sel_list = [];
        Ext.getCmp('st_nw_protocol_rip_network_grid_v6').sel_list = [];
        Ext.getCmp('st_nw_protocol_ospf_area_grid').sel_list = [];
        Ext.getCmp('st_nw_protocol_ospf_network_grid').sel_list = [];
        Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').sel_list = [];
        Ext.getCmp('st_nw_protocol_ospf_interface_grid').sel_list = [];
        Ext.getCmp('st_nw_protocol_bgp_network_grid').sel_list = [];
        Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').sel_list = [];
        Ext.getCmp('bgp_address_grid').sel_list = [];

        me.get_protocol();
    },

    get_protocol: function() {
        var me = this;

        var _params = {
            basename : Ext.encode("network_router_rip")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();
                if(response !== null){
                    if(response.use === "enable"){
                        //                 if(response.default_originate === "yes"){ Ext.getCmp('st_nw_protocol_rip_default_chk').setValue(true); }
                        //                 else{ Ext.getCmp('st_nw_protocol_rip_default_chk').setValue(false); }

                        Ext.getCmp('st_nw_protocol_rip_use').state = true;
                        Ext.getCmp('st_nw_protocol_rip_use').moveHandle(true);
                        Ext.getCmp('st_nw_protocol_rip_version_com').enable(true);
                        Ext.getCmp('st_nw_protocol_rip_default_chk').enable(true);
                        Ext.getCmp('st_nw_protocol_rip_status_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_rip_advance_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_rip_network_toolbar').enable(true);
                        Ext.getCmp('st_nw_protocol_rip_network_grid').enable(true);
                        Ext.getCmp('st_nw_protocol_rip_network_grid_v6').enable(true);

                        me.rip_info.distance = response.distance;
                        me.rip_info.metric = response.metric;
                        me.rip_info.redistribute = response.redistribute;
                        me.rip_info.timer = response.timer;
                        me.rip_info.default_originate = response.default_originate;
                        me.rip_info.static_route = response.static_route;
                    }
                    else{
                        Ext.getCmp('st_nw_protocol_rip_use').state = false;
                        Ext.getCmp('st_nw_protocol_rip_use').moveHandle(false);
                        Ext.getCmp('st_nw_protocol_rip_version_com').disable(true);
                        Ext.getCmp('st_nw_protocol_rip_default_chk').disable(true);
                        Ext.getCmp('st_nw_protocol_rip_status_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_rip_advance_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_rip_network_toolbar').disable(true);
                        Ext.getCmp('st_nw_protocol_rip_network_grid').disable(true);
                        Ext.getCmp('st_nw_protocol_rip_network_grid_v6').disable(true);
                    }

                    Ext.getCmp('st_nw_protocol_rip_version_com').setValue(response.version);

                    var record = [];
                    var record_v6 = [];

                    for(var i in response.network){
                        if(ValidIPAddress(response.network[i].net)){ record.push(response.network[i]); }
                        else{ record_v6.push(response.network[i]); }
                    }

                    Ext.getCmp('st_nw_protocol_rip_network_grid').getStore().loadData(record);
                    Ext.getCmp('st_nw_protocol_rip_network_grid_v6').getStore().loadData(record_v6);
                }
            }
        );

        var _params = {
            basename : Ext.encode("network_router_ospf")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();
                if(response !== null){
                    Ext.getCmp('st_nw_protocol_tab').setActiveTab(1);
                    if(response.use === "enable"){
                        Ext.getCmp('st_nw_protocol_ospf_use').state = true;
                        Ext.getCmp('st_nw_protocol_ospf_use').moveHandle(true);
                        Ext.getCmp('st_nw_protocol_ospf_router_con').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_neighbor_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_interface_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_ad_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_database_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_route_btn').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_area_toolbar').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_area_grid').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_network_toolbar').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_network_grid').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_inter_toolbar').enable(true);
                        Ext.getCmp('st_nw_protocol_ospf_interface_grid').enable(true);

                        me.ospf_info.distance = response.distance;
                        me.ospf_info.abrtype = response.abrtype;
                        me.ospf_info.redistribute = response.redistribute;
                        me.ospf_info.default_originate = response.default_originate;
                        me.ospf_info.static_route = response.static_route;
                    }
                    else{
                        Ext.getCmp('st_nw_protocol_ospf_use').state = false;
                        Ext.getCmp('st_nw_protocol_ospf_use').moveHandle(false);
                        Ext.getCmp('st_nw_protocol_ospf_router_con').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_neighbor_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_interface_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_ad_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_database_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_route_btn').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_area_toolbar').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_area_grid').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_network_toolbar').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_network_grid').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_inter_toolbar').disable(true);
                        Ext.getCmp('st_nw_protocol_ospf_interface_grid').disable(true);
                    }

                    Ext.getCmp('st_nw_protocol_ospf_router_id').setValue(response.router_id);
                    Ext.getCmp('st_nw_protocol_tab').setActiveTab(0);

                    Ext.getCmp('st_nw_protocol_ospf_interface_grid').getStore().loadData(response.interface);

                    Ext.getCmp('st_nw_protocol_ospf_area_grid').getStore().loadData(response.area);

                    var record = [];
                    var record_v6 = [];

                    for(var i in response.area){
                        for(var j in response.area[i].networks){
                            var temp = response.area[i].networks[j].net.split('/');
                            if(ValidIPAddress(temp[0])){
                                record.push(response.area[i].networks[j]);
                            }
                            else{
                                record_v6.push(response.area[i].networks[j]);
                            }
                        }
                    }

                    Ext.getCmp('st_nw_protocol_ospf_network_grid').getStore().loadData(record);
                    Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').getStore().loadData(record_v6);
                }
            }
        );

        var _params = {
            basename : Ext.encode("network_router_bgp")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();
                if(response !== null){
                    Ext.getCmp('st_nw_protocol_tab').setActiveTab(2);
                    if(response.use === "enable"){
                        Ext.getCmp('network_protocol_bgp_use').state = true;
                        Ext.getCmp('network_protocol_bgp_use').moveHandle(true);
                        Ext.getCmp('bgp_as_con').enable(true);
                        Ext.getCmp('bgp_ad_btn').enable(true);
                        Ext.getCmp('bgp_router_con').enable(true);
                        Ext.getCmp('bgp_neighbor_btn').enable(true);
                        Ext.getCmp('bgp_status_btn').enable(true);
                        Ext.getCmp('bgp_network_toolbar').enable(true);
                        Ext.getCmp('st_nw_protocol_bgp_network_grid').enable(true);
                        Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').enable(true);
                        Ext.getCmp('bgp_address_toolbar').enable(true);
                        Ext.getCmp('bgp_address_grid').enable(true);

                        me.bgp_info.distance = response.distance;
                        me.bgp_info.redistribute = response.redistribute;
                        me.bgp_info.static_route = response.static_route;
                    }
                    else{
                        Ext.getCmp('network_protocol_bgp_use').state = false;
                        Ext.getCmp('network_protocol_bgp_use').moveHandle(false);
                        Ext.getCmp('bgp_as_con').disable(true);
                        Ext.getCmp('bgp_ad_btn').disable(true);
                        Ext.getCmp('bgp_router_con').disable(true);
                        Ext.getCmp('bgp_neighbor_btn').disable(true);
                        Ext.getCmp('bgp_status_btn').disable(true);
                        Ext.getCmp('bgp_network_toolbar').disable(true);
                        Ext.getCmp('st_nw_protocol_bgp_network_grid').disable(true);
                        Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').disable(true);
                        Ext.getCmp('bgp_address_toolbar').disable(true);
                        Ext.getCmp('bgp_address_grid').disable(true);
                    }
                    Ext.getCmp('bgp_remote').setValue(response.as_number);
                    Ext.getCmp('bgp_router_id').setValue(response.router_id);

                    Ext.getCmp('st_nw_protocol_tab').setActiveTab(0);

                    Ext.getCmp('bgp_address_grid').getStore().loadData(response.neighbor);

                    var record = [];
                    var record_v6 = [];

                    for(var i in response.network){
                        if(ValidIPAddress(response.network[i].net)){
                            record.push(response.network[i]);
                        }
                        else{
                            record_v6.push(response.network[i]);
                        }
                    }

                    Ext.getCmp('st_nw_protocol_bgp_network_grid').getStore().loadData(record);
                    Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').getStore().loadData(record_v6);
                }
            }
        );
    }

});