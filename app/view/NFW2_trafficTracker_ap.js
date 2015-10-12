
Ext.define('NFW2.view.NFW2_trafficTracker_ap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_traffictracker_ap',

    requires: [
        'NFW2.view.NFW2_trafficTracker_apViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Time',
        'Ext.Img',
        'Ext.form.trigger.Trigger',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.grid.plugin.RowExpander'
    ],

    viewModel: {
        type: 'nfw2_traffictracker_ap'
    },
    cls: 'zen_body',
    id: 'NFW2_tracker',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm',
            layout: 'auto',
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
                            xtype: 'container',
                            width: 130,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{search_option}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 5 10',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '{today}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick3'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '{yesterday}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick37'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '7{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick36'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '10{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick35'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '15{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick34'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '{one_month}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick33'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '3{month}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick32'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 5 0 0',
                                            allowDepress: false,
                                            bind: {
                                                text: '6{month}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick31'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: 'st_day',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            editable: false,
                                            format: 'Y-m-d',
                                            submitFormat: 'Ymd',
                                            bind: {
                                                fieldLabel: '{start_date}'
                                            },
                                            listeners: {
                                                afterrender: 'onSt_dayAfterRender',
                                                change: 'onSt_dayChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'dt_day',
                                            padding: '0 0 0 10',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            editable: false,
                                            format: 'Y-m-d',
                                            submitFormat: 'Ymd',
                                            bind: {
                                                fieldLabel: '{end_date}'
                                            },
                                            listeners: {
                                                afterrender: 'onDt_dayAfterRender',
                                                change: 'onDt_dayChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ser_type',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'ser_day_type',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: '1',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_ser_type',
                                            valueField: 'val',
                                            bind: {
                                                fieldLabel: '{search_methods}'
                                            },
                                            listeners: {
                                                change: 'onSer_day_typeChange'
                                            }
                                        },
                                        {
                                            xtype: 'checkboxgroup',
                                            id: 'c_week',
                                            padding: '0 0 0 20',
                                            width: 400,
                                            labelSeparator: ' ',
                                            labelWidth: 80,
                                            bind: {
                                                fieldLabel: '{specific_date}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_mon',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_monBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_tue',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_tueBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_wed',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_wedBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_thu',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_thuBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_fri',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_friBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_sat',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_satBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'w_sun',
                                                    name: 'w_week',
                                                    listeners: {
                                                        beforerender: 'onW_sunBeforeRender'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'spc_time_type',
                                            margin: '0 0 0 125',
                                            padding: '0 10 0 0',
                                            fieldLabel: '',
                                            value: '0',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_spc_type',
                                            valueField: 'val',
                                            listeners: {
                                                change: 'onSpc_time_typeChange'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_time',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'timefield',
                                                    id: 'st_time',
                                                    width: 190,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    value: '0',
                                                    editable: false,
                                                    format: 'H',
                                                    increment: 60,
                                                    submitFormat: 'G',
                                                    bind: {
                                                        fieldLabel: '{time}'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '0 0 0 15',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'dt_time',
                                                    width: 70,
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    valueField: 'val'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'count',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: '100',
                                            editable: false,
                                            store: 'store_tracker_count',
                                            valueField: 'text',
                                            bind: {
                                                fieldLabel: '{output_count}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'action',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: '318963713',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_app_action',
                                            valueField: 'val',
                                            bind: {
                                                fieldLabel: '{action}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 's_purpose',
                                            padding: '0 0 0 10',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: '0',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_purpose',
                                            valueField: 'val',
                                            bind: {
                                                fieldLabel: '{search_purpose}'
                                            },
                                            listeners: {
                                                change: 'onS_purposeChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'order_sort',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: '-1',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_sort',
                                            valueField: 'val',
                                            bind: {
                                                fieldLabel: ' {alignment_methods}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'order_type',
                                            padding: '0 0 0 10',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: 'bytes_sum',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_otype',
                                            valueField: 'val',
                                            bind: {
                                                fieldLabel: '{align_criteria}'
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
                    height: 1,
                    margin: '5 0 5 0',
                    style: 'background-color:#c2c2c2',
                    width: 980,
                    layout: 'border'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 130,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{detail_search}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            iconCls: 'icb_add',
                                            listeners: {
                                                click: 'onButtonClick2'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'con_traffic',
                            items: [
                                {
                                    xtype: 'container',
                                    width: 850,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            padding: '0 0 0 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: [
                                                        'lb_arrow',
                                                        'x-field x-form-item-label x-form-item-label-default'
                                                    ],
                                                    id: 'l_label_1',
                                                    itemId: 'l_label',
                                                    width: 60,
                                                    bind: {
                                                        text: '1 {step}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 5',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    height: 10,
                                                    items: [
                                                        {
                                                            xtype: 'image',
                                                            height: 10,
                                                            id: 'up_1',
                                                            width: 23,
                                                            imgCls: 'b_move_up',
                                                            listeners: {
                                                                afterrender: 'onImageAfterRender1'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    height: 10,
                                                    margin: '1 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'image',
                                                            height: 10,
                                                            id: 'down_1',
                                                            width: 23,
                                                            imgCls: 'b_move_dw',
                                                            listeners: {
                                                                afterrender: 'onImageAfterRender2'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'traffic_1',
                                                    itemId: 'traffic',
                                                    padding: '0 0 0 10',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_tracker_app',
                                                    valueField: 'val',
                                                    listeners: {
                                                        change: 'onTraffic_1Change',
                                                        afterrender: 'onTraffic_1AfterRender',
                                                        focus: 'onTraffic_1Focus'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_sd_1',
                                            itemId: 'con_sd',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'ip_1',
                                                    itemId: 'ip',
                                                    fieldLabel: 'IP',
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    listeners: {
                                                        focus: 'onIp_1Focus',
                                                        blur: 'onIp_1Blur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_protocol_1',
                                            itemId: 'con_protocol',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'protocol_1',
                                                    itemId: 'protocol',
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    value: 6,
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_tracker_protocol',
                                                    valueField: 'val',
                                                    bind: {
                                                        fieldLabel: '{protocol}'
                                                    },
                                                    listeners: {
                                                        change: 'onProtocol_1Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'port_1',
                                                    itemId: 'port',
                                                    padding: '0 0 0 10',
                                                    width: 120,
                                                    labelSeparator: ' ',
                                                    labelWidth: 40,
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{port}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_sid_1',
                                            itemId: 'con_sid',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'sid_1',
                                                    itemId: 'sid',
                                                    labelSeparator: ' '
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_scountry_1',
                                            itemId: 'con_scountry',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'c_scode_1',
                                                    itemId: 'c_scode',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    emptyText: 'Select',
                                                    displayField: 'country_desc',
                                                    queryMode: 'local',
                                                    store: 'store_country_items',
                                                    valueField: 'country_code',
                                                    triggers: {
                                                        clear: {
                                                            handler: function(field, trigger, e) {
                                                                field.setValue(null);
                                                            },
                                                            cls: 'x-form-clear-trigger'
                                                        }
                                                    },
                                                    listConfig: {
                                                        xtype: 'boundlist',
                                                        itemSelector: 'div',
                                                        itemTpl: [
                                                            '{codes}'
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_dcountry_1',
                                            itemId: 'con_dcountry',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'c_dcode_1',
                                                    itemId: 'c_dcode',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    emptyText: 'Select',
                                                    displayField: 'country_desc',
                                                    queryMode: 'local',
                                                    store: 'store_country_items',
                                                    valueField: 'country_code',
                                                    triggers: {
                                                        clear: {
                                                            handler: function(field, trigger, e) {
                                                                field.setValue(null);
                                                            },
                                                            cls: 'x-form-clear-trigger'
                                                        }
                                                    },
                                                    listConfig: {
                                                        xtype: 'boundlist',
                                                        itemSelector: 'div',
                                                        itemTpl: [
                                                            '{codes}'
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_category_1',
                                            itemId: 'con_category',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'category_1',
                                                    itemId: 'category',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_profile_category',
                                                    valueField: 'val'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_technology_1',
                                            itemId: 'con_technology',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'technology_1',
                                                    itemId: 'technology',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_profile_technology',
                                                    valueField: 'val'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_purpose_1',
                                            itemId: 'con_purpose',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'purpose_1',
                                                    itemId: 'purpose',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_profile_purpose',
                                                    valueField: 'val'
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
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            hidden: true,
                                                            id: 'del_1',
                                                            itemId: 'btn_del',
                                                            iconCls: 'icb_del',
                                                            bind: {
                                                                text: '{del}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick21'
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
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'errorBox',
                            hidden: true,
                            id: 'errorBox',
                            margin: '5 5 0 0'
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'c_export',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    text: 'PRINT'
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    margin: '0 0 0 5',
                                    text: 'PDF'
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    margin: '0 0 0 5',
                                    text: 'EXCEL'
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    margin: '0 0 0 5',
                                    text: 'WORD'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    id: 'b_chart',
                                    margin: '0 5 0 5',
                                    enableToggle: true,
                                    text: 'Time Chart',
                                    listeners: {
                                        toggle: 'onB_chartToggle'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 5 0 0',
                            width: 100,
                            iconCls: 'icb_ser',
                            bind: {
                                text: '{search}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            iconCls: 'icb_reset',
                            bind: {
                                text: '{search_reset}'
                            },
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    set_chart: function(record) {
                        var me = Ext.getCmp("NFW2_tracker");

                        me.myChart.clear();
                        var time = [];
                        var packets = [];
                        var bytes = [];
                        var session = [];
                        var _packets = {}, _bytes = {}, _session = {};
                        var color = [
                        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                        ];

                        for(var i in record){
                            time.push(record[i].time);
                            packets.push(record[i].packets);
                            bytes.push(record[i].bytes);
                            session.push(record[i].session);
                            _packets[record[i].time] = record[i]._packets;
                            _bytes[record[i].time] = record[i]._bytes;
                            _session[record[i].time] = record[i]._session;
                        }

                        var option = {
                            tooltip : {
                                trigger: 'axis',
                                formatter: function(value){
                                    var result = "";
                                    var data = [__zen('cum_usage'), __zen('cum_session'), __zen('cum_packet')];
                                    var _data = ['_bytes','_session','_packets'];
                                    if(value.length !== 0){
                                        result += value[0][1];
                                    }
                                    for(var i in value){
                                        var color_chk = 0;
                                        eval('var _val = '+_data[i]+';');
                                        for(var j in data){
                                            if(data[j] === value[i][0]){ color_chk = j; }
                                        }
                                        var _value = byteConvert(_val[value[i][1]]);
                                        result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + _value + '</span>';

                                    }

                                    return result;
                                },
                                backgroundColor : 'rgba(0,0,0,0.9)'
                            },
                            legend: {
                                data:[__zen('cum_usage'), __zen('cum_session'), __zen('cum_packet')],
                                orient : 'vertical',
                                x :'right'
                            },
                            dataZoom : {
                                show : true,
                                realtime : true,
                                start : 0,
                                end : 100
                            },
                            grid : {
                                x : 110,
                                width : Ext.getCmp('c_chart').wid-250
                            },
                            xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                name : __zen('time'),
                                data : time,
                                axisLabel : {
                                    formatter: function(value){
                                        var data = value.split(':');
                                        var result = data[0] + ":" + data[1];
                                        return result;
                                    }
                                }
                            }
                            ],
                            yAxis : [
                            {
                                type : 'value',
                                name : __zen('usage')+'(%)',
                                splitArea : {
                                    show:true,
                                    areaStyle : {
                                        color: [
                                        'rgba(250,250,250,0.3)',
                                        'rgba(200,200,200,0.3)'
                                        ]
                                    }
                                },
                                min : 0
                            }
                            ],
                            series : [
                            {
                                name:__zen('cum_usage'),
                                type:'line',
                                data: bytes,
                                symbol:'none',
                                smooth:true,
                                clickable: false

                            },
                            {
                                name:__zen('cum_session'),
                                type:'line',
                                data: session,
                                symbol:'none',
                                smooth:true,
                                clickable: false

                            },
                            {
                                name:__zen('cum_packet'),
                                type:'line',
                                data: packets,
                                symbol:'none',
                                smooth:true,
                                clickable: false

                            }
                            ],
                            animation : false
                        };

                        me.myChart.setOption(option);
                    },
                    hidden: true,
                    html: '<div id="tracker_chart" style="height:300px"></div>',
                    id: 'c_chart',
                    minHeight: 300,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    listeners: {
                        afterrender: 'onC_chartAfterRender'
                    }
                },
                {
                    xtype: 'gridpanel',
                    hidden: true,
                    id: 'grid_top',
                    margin: '5 0 0 0',
                    columnLines: true,
                    disableSelection: true,
                    enableColumnHide: false,
                    sortableColumns: false,
                    store: 'store_tracker_app_total',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value !== record.data.end_ts){
                                    return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6)+" ~ "+record.data.end_ts.substring(0,4)+"-"+record.data.end_ts.substring(4,6)+"-"+record.data.end_ts.substring(6);
                                }else{
                                    return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6);
                                }
                            },
                            align: 'center',
                            dataIndex: 'start_ts',
                            flex: 1,
                            bind: {
                                text: '{date}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return byteConvert(value);
                            },
                            align: 'center',
                            dataIndex: 'total_bytes',
                            flex: 1,
                            bind: {
                                text: '{cum_usage}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return byteConvert(value);
                            },
                            align: 'center',
                            dataIndex: 'total_sessionCnt',
                            flex: 1,
                            bind: {
                                text: '{cum_session}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return byteConvert(value);
                            },
                            align: 'center',
                            dataIndex: 'total_packets',
                            flex: 1,
                            bind: {
                                text: '{cum_packet}'
                            }
                        }
                    ],
                    viewConfig: {
                        loadMask: false
                    }
                },
                {
                    xtype: 'container',
                    id: 'con_step',
                    margin: '5 0 0 0',
                    layout: 'column',
                    items: [
                        {
                            xtype: 'container',
                            id: 'con_step_1',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_1Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_2',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_2Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_3',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_3Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_4',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_4Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_5',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_5Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_6',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_6Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_7',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_7Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_8',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_8Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_9',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_9Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_10',
                            margin: '3 0 0 5',
                            style: 'pointer:cursor'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    cls: 'tbl_fw',
                    id: 'grid_list',
                    margin: '5 0 0 0',
                    title: '',
                    columnLines: true,
                    disableSelection: true,
                    enableColumnHide: false,
                    sortableColumns: false,
                    store: 'store_tracker_app_list',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 60,
                            align: 'center',
                            dataIndex: 'num',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = 'cursor:pointer';
                                return value;
                            },
                            id: 'c_date',
                            minWidth: 120,
                            dataIndex: 'date',
                            flex: 0.5,
                            bind: {
                                text: '{date}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");

                                var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                return who+tra+value;
                            },
                            id: 'c_sip',
                            minWidth: 100,
                            dataIndex: 'sip',
                            flex: 1,
                            bind: {
                                text: '{src}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");

                                var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                return who+tra+value;
                            },
                            id: 'c_dip',
                            minWidth: 100,
                            dataIndex: 'dip',
                            flex: 1,
                            bind: {
                                text: '{dest}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var service = (!record.data.service || record.data.service === "null")?"":"("+record.data.service+")";
                                var dport = (record.data.dport)?","+record.data.dport:"";

                                return getProtocol(value)+dport+service;
                            },
                            id: 'c_protocol',
                            minWidth: 100,
                            dataIndex: 'protocol',
                            flex: 1,
                            bind: {
                                text: '{service}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = record.data.app_name;
                                return (value==="null")?"":value;
                            },
                            id: 'c_sid',
                            dataIndex: 'service',
                            flex: 1,
                            bind: {
                                text: '{application_name}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");

                                if(value === "(null)"){ return '사설IP'; }

                                return "<img src='../images/flag/"+value.toLowerCase()+".png' title='["+value+"] "+me._country[value]+"' /> ["+value+"]";
                            },
                            id: 'c_source_country',
                            dataIndex: 'source_country',
                            flex: 1,
                            bind: {
                                text: '{source_country}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");

                                if(value === "(null)"){ return '사설IP'; }

                                return "<img src='../images/flag/"+value.toLowerCase()+".png' title='["+value+"] "+me._country[value]+"' /> ["+value+"]";
                            },
                            id: 'c_dest_country',
                            dataIndex: 'dest_country',
                            flex: 1,
                            bind: {
                                text: '{dest_country}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'c_category',
                            dataIndex: 'category',
                            flex: 1,
                            bind: {
                                text: '{categorys}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'c_technology',
                            dataIndex: 'technology',
                            flex: 1,
                            bind: {
                                text: '{technology}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'c_purpose',
                            dataIndex: 'purpose',
                            flex: 1,
                            bind: {
                                text: '{purpose}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");
                                var column = me.column;
                                var depth = me.depth;

                                var d = depth.step;
                                eval('var type = depth.dep_'+d+'.type;');

                                var text = (type==='sip')?record.data.sip:(type==='dip')?record.data.dip:(type==='protocol')?record.data.protocol:(type==='source_country')?record.data.source_country:(type==='dest_country')?record.data.dest_country:(type==='sid')?record.data.service:(type==='category')?record.data.category:(type==='technology')?record.data.technology:(type==='purpose')?record.data.purpose:'';
                                if(type === "sid"){
                                    type = "app_name";
                                }
                                eval('var val = record.data.'+type+';');

                                if(type==="protocol"){
                                    val = (text===6||text===17)?text+","+record.data.dport:text;
                                }

                                if(me.s_type === "0" && depth.step === 0){
                                    val = depth.dep_0.text;
                                }

                                var sip = (column.sip)?'':'<button class="dbtn sip" title="'+__zen('src')+'" onclick="tracker_depth(\'sip\',\''+val+'\',true)" />';
                                var dip = (column.dip)?'':'<button class="dbtn dip" title="'+__zen('dest')+'" onclick="tracker_depth(\'dip\',\''+val+'\',true)" />';
                                var protocol = (column.protocol)?'':'<button class="dbtn ser" title="'+__zen('service')+'" onclick="tracker_depth(\'protocol\',\''+val+'\',true)" />';
                                var sid = (column.sid)?'':'<button class="dbtn app" title="'+__zen('application_name')+'" onclick="tracker_depth(\'sid\',\''+val+'\',true)" />';
                                var source_country = (column.source_country)?'':'<button class="dbtn ct" title="'+__zen('source_country')+'" onclick="tracker_depth(\'source_country\',\''+val+'\',true)" />';
                                var dest_country = (column.dest_country)?'':'<button class="dbtn ct" title="'+__zen('dest_country')+'" onclick="tracker_depth(\'dest_country\',\''+val+'\',true)" />';
                                var category = (column.category)?'':'<button class="dbtn cate" title="'+__zen('categorys')+'" onclick="tracker_depth(\'category\',\''+val+'\',true)" />';
                                var technology = (column.technology)?'':'<button class="dbtn tec" title="'+__zen('technology')+'" onclick="tracker_depth(\'technology\',\''+val+'\',true)" />';
                                var purpose = (column.purpose)?'':'<button class="dbtn pur" title="'+__zen('purpose')+'" onclick="tracker_depth(\'purpose\',\''+val+'\',true)" />';
                                var time = (column.time)?'':'<button class="dbtn tm" title="Time" onclick="tracker_time('+rowIndex+')" />';

                                metaData.style = "height:29px";
                                var h_step = '';
                                if(depth.dep_0.type === "date"){ h_step = 5; }else{ h_step = 4; }
                                if(depth.dep_0.type === "date" && !depth.dep_0.text){ h_step = 9; }

                                if(me.purpose === "1" && depth.step < h_step){
                                    return sip+dip+protocol+source_country+dest_country;
                                }else{
                                    return sip+dip+protocol+sid+source_country+dest_country+category+technology+purpose+time;
                                }
                            },
                            id: 'c_opt',
                            align: 'center',
                            dataIndex: 'num',
                            bind: {
                                text: '{option}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var o_stat = (record.data.outbts_per !== 0)?'width:'+record.data.outbts_per+'%':'border:none';
                                var bar_g = '<strong class="bar_g" style="'+o_stat+'"></strong>';

                                var i_stat = (record.data.inbts_per !== 0)?'width:'+record.data.inbts_per+'%':'border:none';
                                var bar_b = '<strong class="bar_b" style="'+i_stat+'"></strong>';

                                return '<div>'+byteConvert(record.data.outbts_sum)+' / '+byteConvert(value)+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                            },
                            id: 'c_byte',
                            minWidth: 200,
                            width: 200,
                            dataIndex: 'inbts_sum',
                            bind: {
                                text: '{cum_usage}(TX/RX)'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var stat = (record.data.sessionCnt_per !== 0)?'width:'+record.data.sessionCnt_per+'%':'border:none';
                                var bar_r = '<strong class="bar_r" style="'+stat+'"></strong>';

                                return '<div>'+byteConvert(value)+'</div><div class="graph">'+bar_r+'</div>';
                            },
                            id: 'c_session',
                            minWidth: 200,
                            width: 200,
                            dataIndex: 'sessionCnt_sum',
                            bind: {
                                text: '{cum_session}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var o_stat = (record.data.otpkts_per !== 0)?'width:'+record.data.otpkts_per+'%':'border:none';
                                var bar_g = '<strong class="bar_g" style="'+o_stat+'"></strong>';

                                var i_stat = (record.data.inpkts_per !== 0)?'width:'+record.data.inpkts_per+'%':'border:none';
                                var bar_b = '<strong class="bar_b" style="'+i_stat+'"></strong>';

                                return '<div>'+byteConvert(record.data.otpkts_sum)+' / '+byteConvert(value)+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                            },
                            id: 'c_packet',
                            minWidth: 200,
                            width: 200,
                            dataIndex: 'inpkts_sum',
                            bind: {
                                text: '{cum_packet}(TX/RX)'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_0;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_0',
                            align: 'center',
                            dataIndex: 'time',
                            text: '0',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_1;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_1',
                            align: 'center',
                            dataIndex: 'time',
                            text: '1',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_2;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_2',
                            align: 'center',
                            dataIndex: 'time',
                            text: '2',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_3;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_3',
                            align: 'center',
                            dataIndex: 'time',
                            text: '3',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_4;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_4',
                            align: 'center',
                            dataIndex: 'time',
                            text: '4',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_5;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_5',
                            align: 'center',
                            dataIndex: 'time',
                            text: '5',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_6;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_6',
                            align: 'center',
                            dataIndex: 'time',
                            text: '6',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_7;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_7',
                            align: 'center',
                            dataIndex: 'time',
                            text: '7',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_8;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_8',
                            align: 'center',
                            dataIndex: 'time',
                            text: '8',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_9;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_9',
                            align: 'center',
                            dataIndex: 'time',
                            text: '9',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_10;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_10',
                            align: 'center',
                            dataIndex: 'time',
                            text: '10',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_11;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_11',
                            align: 'center',
                            dataIndex: 'time',
                            text: '11',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_12;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_12',
                            align: 'center',
                            dataIndex: 'time',
                            text: '12',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_13;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_13',
                            align: 'center',
                            dataIndex: 'time',
                            text: '13',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_14;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_14',
                            align: 'center',
                            dataIndex: 'time',
                            text: '14',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_15;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_15',
                            align: 'center',
                            dataIndex: 'time',
                            text: '15',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_16;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_16',
                            align: 'center',
                            dataIndex: 'time',
                            text: '16',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_17;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_17',
                            align: 'center',
                            dataIndex: 'time',
                            text: '17',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_18;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_18',
                            align: 'center',
                            dataIndex: 'time',
                            text: '18',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_19;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_19',
                            align: 'center',
                            dataIndex: 'time',
                            text: '19',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_20;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_20',
                            align: 'center',
                            dataIndex: 'time',
                            text: '20',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_21;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_21',
                            align: 'center',
                            dataIndex: 'time',
                            text: '21',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_22;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_22',
                            align: 'center',
                            dataIndex: 'time',
                            text: '22',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_23;
                                var bgcolor = get_heatbg(value[0],value[1]);
                                var fcolor = (value[1] > 120)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    var _val = byteConvert(value[0]);
                                    metaData.tdAttr = 'data-qtip="'+_val+'"';
                                    var s_val = (_val.toString().indexOf(".")===-1)?_val:_val.split(".");
                                    return (_val.toString().indexOf(".")===-1)?s_val:s_val[0]+s_val[1].substring(2);
                                }
                            },
                            hidden: true,
                            id: 'time_23',
                            align: 'center',
                            dataIndex: 'time',
                            text: '23',
                            flex: 1
                        }
                    ],
                    viewConfig: {
                        loadMask: false,
                        listeners: {
                            expandbody: 'onTableExpandbody'
                        }
                    },
                    listeners: {
                        cellclick: 'onGrid_listCellClick'
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'store_tracker_app_list',
                            listeners: {
                                beforechange: 'onPagingtoolbarBeforeChange',
                                change: 'onPagingtoolbarChange'
                            }
                        }
                    ],
                    plugins: [
                        {
                            ptype: 'rowexpander',
                            expandOnDblClick: false,
                            expandOnEnter: false,
                            rowBodyTpl: [
                                '<div></div>'
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_trackerBeforeDestroy'
    },

    onButtonClick3: function(button, e, eOpts) {
        var date = new Date();

        Ext.getCmp("st_day").setValue(date);
        Ext.getCmp("dt_day").setValue(date);
    },

    onButtonClick37: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.DAY,-1);

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less);
    },

    onButtonClick36: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.DAY,-7);
        var less_e = Ext.getCmp("st_day").getValue();

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less_e);
    },

    onButtonClick35: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.DAY,-10);
        var less_e = Ext.getCmp("st_day").getValue();

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less_e);
    },

    onButtonClick34: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.DAY,-15);
        var less_e = Ext.getCmp("st_day").getValue();

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less_e);
    },

    onButtonClick33: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.MONTH,-1);
        var less_e = Ext.getCmp("st_day").getValue();

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less_e);
    },

    onButtonClick32: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.MONTH,-3);
        var less_e = Ext.getCmp("st_day").getValue();

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less_e);
    },

    onButtonClick31: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("st_day").getValue(),Ext.Date.MONTH,-6);
        var less_e = Ext.getCmp("st_day").getValue();

        Ext.getCmp("st_day").setValue(less);
        Ext.getCmp("dt_day").setValue(less_e);
    },

    onSt_dayAfterRender: function(component, eOpts) {
        var date = new Date();

        component.setValue(date);
    },

    onSt_dayChange: function(field, newValue, oldValue, eOpts) {
        var ser_type = Ext.getCmp("con_ser_type");
        var spc_type = Ext.getCmp("spc_time_type");
        var time = Ext.getCmp("con_time");

        var val = field.getSubmitValue().split("-");
        val = val.join("");

        var d_val = Ext.getCmp("dt_day").getSubmitValue().split("-");
        d_val = d_val.join("");

        Ext.getCmp("ser_day_type").reset();

        if(val !== d_val){
            ser_type.show();
            spc_type.show();
        }else{
            ser_type.hide();
            spc_type.hide();
            time.enable();
        }
    },

    onDt_dayAfterRender: function(component, eOpts) {
        var date = new Date();

        component.setValue(date);
    },

    onDt_dayChange: function(field, newValue, oldValue, eOpts) {
        var ser_type = Ext.getCmp("con_ser_type");
        var spc_type = Ext.getCmp("spc_time_type");
        var time = Ext.getCmp("con_time");

        var val = field.getSubmitValue().split("-");
        val = val.join("");

        var s_val = Ext.getCmp("st_day").getSubmitValue().split("-");
        s_val = s_val.join("");

        Ext.getCmp("ser_day_type").reset();

        if(val !== s_val){
            ser_type.show();
            spc_type.show();
        }else{
            ser_type.hide();
            spc_type.hide();
            time.enable();
        }
    },

    onSer_day_typeChange: function(field, newValue, oldValue, eOpts) {
        var spc_type = Ext.getCmp("spc_time_type");
        var time = Ext.getCmp("con_time");
        Ext.getCmp("st_time").reset();
        Ext.getCmp("dt_time").setValue('24');

        if(newValue === "1"){
            spc_type.show();
            time.enable();
        }else{
            spc_type.hide();
            time.disable();
        }
    },

    onW_monBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(1);
    },

    onW_tueBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(2);
    },

    onW_wedBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(3);
    },

    onW_thuBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(4);
    },

    onW_friBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(5);
    },

    onW_satBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(6);
    },

    onW_sunBeforeRender: function(component, eOpts) {
        component.boxLabel = getWeek(0);
    },

    onSpc_time_typeChange: function(field, newValue, oldValue, eOpts) {
        var time = Ext.getCmp("con_time");
        Ext.getCmp("st_time").reset();
        Ext.getCmp("dt_time").reset();

        if(newValue === "0"){
            time.enable();
        }else{
            time.disable();
        }
    },

    onS_purposeChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp("NFW2_tracker");
        var _store = Ext.getCmp("traffic_"+me.a_id[0]).getStore();
        me.a_id = [me.a_id[0]];

        var _val = Ext.getCmp("traffic_"+me.a_id[0]).getValue();

        _store.loadData([
            {
                name: __zen('application_name'),
                val: 'sid'
            },
            {
                name: __zen('app_category'),
                val: 'category'
            },
            {
                name: __zen('app_technology'),
                val: 'technology'
            },
            {
                name: __zen('app_purpose'),
                val: 'purpose'
            },
            {
                name: __zen('src'),
                val: 'sip'
            },
            {
                name: __zen('dest'),
                val: 'dip'
            },
            {
                name: __zen('service'),
                val: 'protocol'
            },
            {
                name: __zen('source_country'),
                val: 'source_country'
            },
            {
                name: __zen('dest_country'),
                val: 'dest_country'
            }
        ]);

        if(newValue === '1'){
            _store.removeAt(0,4);

            if(_store.data.items[0].data.val === 'sid'){
                _store.removeAt(0,1);
            }
        }

        Ext.getCmp("del_"+me.a_id[0]).hide();
        var img = Ext.ComponentQuery.query('button[itemId="btn_del"]');

        for(var i=1; i<img.length; i++){
            img[i].up('container').up('container').up('container').destroy();
        }

        Ext.getCmp("traffic_"+me.a_id[0]).setValue(_val);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var n = Ext.ComponentQuery.query('combobox[itemId="traffic"]').length+1;

        if(Ext.getCmp("s_purpose").getValue() === "1"){ if(n > 5){ return false; } }

        if(n > 9){ return false; }

        me.add_traffic(n,n);
    },

    onImageAfterRender1: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts) {

            var label = Ext.ComponentQuery.query('label[itemId="l_label"]');

            var a_id = me.a_id;

            var l = component.up('container').up('container').up('container').getComponent('l_label');

            if(label.length < 2){ return false; }

            var id = component.id.split("_");
            var n = a_id.indexOf(Number(id[1]));

            if(n === 0){ return false; }

            var a_traffic = ["traffic","ip","protocol","port","sid","c_scode","c_dcode","category","technology","purpose"];
            var record = {
                'sid':{
                    name: __zen('application_name'),
                    val: 'sid'
                },
                'category':{
                    name: __zen('app_category'),
                    val: 'category'
                },
                'technology':{
                    name: __zen('app_technology'),
                    val: 'technology'
                },
                'purpose':{
                    name: __zen('app_purpose'),
                    val: 'purpose'
                },
                'sip':{
                    name: __zen('src'),
                    val: 'sip'
                },
                'dip':{
                    name: __zen('dest'),
                    val: 'dip'
                },
                'protocol':{
                    name: __zen('service'),
                    val: 'protocol'
                },
                'source_country':{
                    name: __zen('source_country'),
                    val: 'source_country'
                },
                'dest_country':{
                    name: __zen('dest_country'),
                    val: 'dest_country'
                }
            };
            me.ud_mode = 'up';

            for(var i=0; i<a_traffic.length; i++){
                var p_val = Ext.getCmp(a_traffic[i]+"_"+a_id[n-1]).getValue();
                var val = Ext.getCmp(a_traffic[i]+"_"+a_id[n]);

                if(a_traffic[i] === "traffic"){
                    var _p_store = Ext.getCmp(a_traffic[i]+"_"+a_id[n-1]).getStore();
                    var _store = val.getStore();
                    var _idx = _store.find('val',val.getValue());

                    Ext.getCmp(a_traffic[i]+"_"+a_id[n-1]).bindStore(_store);
                    val.bindStore(_p_store);
                }

                Ext.getCmp(a_traffic[i]+"_"+a_id[n-1]).setValue(val.getValue());
                val.setValue(p_val);
            }

        }, component);
    },

    onImageAfterRender2: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts) {

            var label = Ext.ComponentQuery.query('label[itemId="l_label"]');

            var a_id = me.a_id;

            var l = component.up('container').up('container').up('container').getComponent('l_label');

            if(label.length < 2){ return false; }

            var id = component.id.split("_");
            var n = a_id.indexOf(Number(id[1]));

            if(Number(id[1]) === Math.max.apply(Math,a_id)){ return false; }

            var a_traffic = ["traffic","ip","protocol","port","sid","c_scode","c_dcode","category","technology","purpose"];

            var record = {
                'sid':{
                    name: __zen('application_name'),
                    val: 'sid'
                },
                'category':{
                    name: __zen('app_category'),
                    val: 'category'
                },
                'technology':{
                    name: __zen('app_technology'),
                    val: 'technology'
                },
                'purpose':{
                    name: __zen('app_purpose'),
                    val: 'purpose'
                },
                'sip':{
                    name: __zen('src'),
                    val: 'sip'
                },
                'dip':{
                    name: __zen('dest'),
                    val: 'dip'
                },
                'protocol':{
                    name: __zen('service'),
                    val: 'protocol'
                },
                'source_country':{
                    name: __zen('source_country'),
                    val: 'source_country'
                },
                'dest_country':{
                    name: __zen('dest_country'),
                    val: 'dest_country'
                }
            };
            me.ud_mode = 'down';

            for(var i=0; i<a_traffic.length; i++){
                var p_val = Ext.getCmp(a_traffic[i]+"_"+a_id[n+1]).getValue();
                var val = Ext.getCmp(a_traffic[i]+"_"+a_id[n]);

                if(a_traffic[i] === "traffic"){
                    var _p_store = Ext.getCmp(a_traffic[i]+"_"+a_id[n+1]).getStore();
                    var _store = val.getStore();
                    var _idx = _store.find('val',val.getValue());

                    Ext.getCmp(a_traffic[i]+"_"+a_id[n+1]).bindStore(_store);
                    val.bindStore(_p_store);
                }

                Ext.getCmp(a_traffic[i]+"_"+a_id[n+1]).setValue(val.getValue());
                val.setValue(p_val);
            }

        }, component);
    },

    onTraffic_1Change: function(field, newValue, oldValue, eOpts) {
        var me = this;

        field.up('container').up('container').getComponent('con_sd').hide();
        field.up('container').up('container').getComponent('con_protocol').hide();
        field.up('container').up('container').getComponent('con_sid').hide();
        field.up('container').up('container').getComponent('con_scountry').hide();
        field.up('container').up('container').getComponent('con_dcountry').hide();
        field.up('container').up('container').getComponent('con_category').hide();
        field.up('container').up('container').getComponent('con_technology').hide();
        field.up('container').up('container').getComponent('con_purpose').hide();

        if(newValue === "sip" || newValue === "dip"){
            field.up('container').up('container').getComponent('con_sd').show();
        }else if(newValue === "protocol"){
            field.up('container').up('container').getComponent('con_protocol').show();
        }else if(newValue === "sid"){
            field.up('container').up('container').getComponent('con_sid').show();
        }else if(newValue === "source_country"){
            field.up('container').up('container').getComponent('con_scountry').show();
        }else if(newValue === "dest_country"){
            field.up('container').up('container').getComponent('con_dcountry').show();
        }else if(newValue === 'category'){
            field.up('container').up('container').getComponent('con_category').show();
        }else if(newValue === 'technology'){
            field.up('container').up('container').getComponent('con_technology').show();
        }else if(newValue === 'purpose'){
            field.up('container').up('container').getComponent('con_purpose').show();
        }

        var record = [
            {
                name: __zen('application_name'),
                val: 'sid'
            },
            {
                name: __zen('app_category'),
                val: 'category'
            },
            {
                name: __zen('app_technology'),
                val: 'technology'
            },
            {
                name: __zen('app_purpose'),
                val: 'purpose'
            },
            {
                name: __zen('src'),
                val: 'sip'
            },
            {
                name: __zen('dest'),
                val: 'dip'
            },
            {
                name: __zen('service'),
                val: 'protocol'
            },
            {
                name: __zen('source_country'),
                val: 'source_country'
            },
            {
                name: __zen('dest_country'),
                val: 'dest_country'
            }
        ];

        var _com = Ext.ComponentQuery.query('combobox[itemId="traffic"]');
        for(var i=0; i<_com.length; i++){

            var _store = _com[i].getStore();
            var _val = _com[i].getValue();

            if(_val !== newValue){
                var _idx = _store.find('val',newValue);

                if(_idx !== -1){
                    _store.removeAt(_idx,1);
                }
            }
        }

        var _val = oldValue;

        if(_val === null || newValue === oldValue){ return false; }

        var record = ['sid','category','technology','purpose','sip','dip','protocol','source_country','dest_country'];

        var _id = field.id;

        var _text = (_val==='sid')?__zen('application_name'):(_val==='category')?__zen('app_category'):(_val==='technology')?__zen('app_technology'):(_val==='sip')?__zen('src'):(_val==='dip')?__zen('dest'):(_val==='protocol')?__zen('service'):(_val==='source_country')?__zen('source_country'):__zen('dest_country');
        var _idx = record.indexOf(_val);
        for(var i=0; i<_com.length; i++){
            var _store = _com[i].getStore();

            var c_val = _com[i].getValue();
            var _t_idx = _store.find('val',c_val);
            var a = [];
            for(var l=0; l<_store.data.items.length; l++){
                a.push(_store.data.items[l].data.val);
            }

            if(_t_idx === -1){ continue; }

            _store.insert(0,{name:_text,val:_val});

            var _record = [];
            if(me.ud_mode !== ''){
                if(a.indexOf('sid') !== -1){
                    _record.push({'name':__zen('application_name'),'val':'sid'});
                }
                if(a.indexOf('category') !== -1){
                    _record.push({'name':__zen('app_category'),'val':'category'});
                }
                if(a.indexOf('technology') !== -1){
                    _record.push({'name':__zen('app_technology'),'val':'technology'});
                }
                if(a.indexOf('purpose') !== -1){
                    _record.push({'name':__zen('app_purpose'),'val':'purpose'});
                }
                if(a.indexOf('sip') !== -1){
                    _record.push({'name':__zen('src'),'val':'sip'});
                }
                if(a.indexOf('dip') !== -1){
                    _record.push({'name':__zen('dest'),'val':'dip'});
                }
                if(a.indexOf('protocol') !== -1){
                    _record.push({'name':__zen('service'),'val':'protocol'});
                }
                if(a.indexOf('source_country') !== -1){
                    _record.push({'name':__zen('source_country'),'val':'source_country'});
                }
                if(a.indexOf('dest_country') !== -1){
                    _record.push({'name':__zen('dest_country'),'val':'dest_country'});
                }
            }else{
                if(_store.find('val','sid') !== -1){
                    _record.push({'name':__zen('application_name'),'val':'sid'});
                }
                if(_store.find('val','category') !== -1){
                    _record.push({'name':__zen('app_category'),'val':'category'});
                }
                if(_store.find('val','technology') !== -1){
                    _record.push({'name':__zen('app_technology'),'val':'technology'});
                }
                if(_store.find('val','purpose') !== -1){
                    _record.push({'name':__zen('app_purpose'),'val':'purpose'});
                }
                if(_store.find('val','sip') !== -1){
                    _record.push({'name':__zen('src'),'val':'sip'});
                }
                if(_store.find('val','dip') !== -1){
                    _record.push({'name':__zen('dest'),'val':'dip'});
                }
                if(_store.find('val','protocol') !== -1){
                    _record.push({'name':__zen('service'),'val':'protocol'});
                }
                if(_store.find('val','source_country') !== -1){
                    _record.push({'name':__zen('source_country'),'val':'source_country'});
                }
                if(_store.find('val','dest_country') !== -1){
                    _record.push({'name':__zen('dest_country'),'val':'dest_country'});
                }
            }

            _store.loadData(_record);
            _com[i].setValue(c_val);
        }
    },

    onTraffic_1AfterRender: function(component, eOpts) {
        var _store = component.getStore();
        component.setValue(_store.data.items[0].data.val);
    },

    onTraffic_1Focus: function(component, event, eOpts) {
        this.ud_mode = '';
    },

    onIp_1Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        str += ', '+disp_help_ip('4r');
        str += ', '+disp_help_ip('4s2m');
        str += ', '+disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onIp_1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onProtocol_1Change: function(field, newValue, oldValue, eOpts) {
        var id = field.id.split("_");
        id = id[1];

        if(newValue === 6 || newValue === 17){
            Ext.getCmp("port_"+id).show();
        }else{
            Ext.getCmp("port_"+id).hide();
        }
    },

    onButtonClick21: function(button, e, eOpts) {
        var me = this;
        var a_id = me.a_id;
        me.ud_mode = '';

        var id = button.id.split("_");
        var s = a_id.indexOf(Number(id[1]));
        var _val = Ext.getCmp("traffic_"+id[1]).getValue();

        a_id.splice(s,1);
        button.up('container').up('container').up('container').destroy();

        var n = s+1;
        var max = a_id[a_id.length-1];

        for(var i=s; i<a_id.length; i++){
            Ext.getCmp("l_label_"+a_id[i]).setText(n+" "+__zen('step'));
            n++;
        }
        if(a_id.length === 1){
            Ext.getCmp("del_"+a_id[0]).hide();
        }
        var record = ['sid','category','technology','purpose','sip','dip','protocol','source_country','dest_country'];

        var _text = (_val==='sid')?__zen('application_name'):(_val==='category')?__zen('app_category'):(_val==='technology')?__zen('app_technology'):(_val==='purpose')?__zen('app_purpose'):(_val==='sip')?__zen('src'):(_val==='dip')? __zen('dest'):(_val==='protocol')?__zen('service'):(_val==='source_country')?__zen('source_country'):__zen('country_code');
        var _idx = record.indexOf(_val);
        var _com = Ext.ComponentQuery.query('combobox[itemId="traffic"]');
        for(var i=0; i<_com.length; i++){
            var _store = _com[i].getStore();

            var c_val = _com[i].getValue();
            var _t_idx = _store.find('val',c_val);
            if(_t_idx === -1){ continue; }

            _store.insert(0,{name:_text,val:_val});

            var _record = [];

            if(_store.find('val','sid') !== -1){
                _record.push({'name':__zen('application_name'),'val':'sid'});
            }
            if(_store.find('val','category') !== -1){
                _record.push({'name':__zen('app_category'),'val':'category'});
            }
            if(_store.find('val','technology') !== -1){
                _record.push({'name':__zen('app_technology'),'val':'technology'});
            }
            if(_store.find('val','purpose') !== -1){
                _record.push({'name':__zen('app_purpose'),'val':'purpose'});
            }
            if(_store.find('val','sip') !== -1){
                _record.push({'name':__zen('src'),'val':'sip'});
            }
            if(_store.find('val','dip') !== -1){
                _record.push({'name':__zen('dest'),'val':'dip'});
            }
            if(_store.find('val','protocol') !== -1){
                _record.push({'name':__zen('service'),'val':'protocol'});
            }
            if(_store.find('val','source_country') !== -1){
                _record.push({'name':__zen('source_country'),'val':'source_country'});
            }
            if(_store.find('val','dest_country') !== -1){
                _record.push({'name':__zen('dest_country'),'val':'dest_country'});
            }
            _store.loadData(_record);
            _com[i].setValue(_com[i].getValue());
        }

        me.a_id = a_id;
    },

    onB_chartToggle: function(button, pressed, eOpts) {
        var me = Ext.getCmp("NFW2_tracker");

        if(Ext.getCmp("grid_list").getStore().data.length < 1){
            button.toggle(false);
            return false;
        }

        if(pressed){
            var proxy = me.proxy;

            var _params = {
                start_ts: proxy.start_ts,
                end_ts: proxy.end_ts,
                start_time: proxy.start_time,
                end_time: proxy.end_time,
                criteria: proxy.criteria,
                work_network: proxy.work_network,
                week: proxy.weeks
            };
            me.mask("Loading...");

            request_helper.xmlrpc_call_JsonP(
                'FtDBMgr',
                'getAPPTrackerTimeChart',
                _params,
                function(response){

                    me.unmask();
                    var time = response.detail_list[0].time;
                    var record = [];
                    for(var i=0; i<24; i++){
                        record.push('');
                    }

                    for(var l in time){
                        var ti = l.split("_");

                        var _time = (Number(ti[1])>=10)?ti[1]+':00':'0'+ti[1]+':00';
                        record[ti[1]] = {
                            'time': _time,
                            'packets': time[l][0][1],
                            'bytes': time[l][1][1],
                            'session': time[l][2][1],
                            '_packets': time[l][0][0],
                            '_bytes': time[l][1][0],
                            '_session': time[l][2][0]
                        };
                    }
                    record.splice(Number(proxy.end_time)+1);
                    record.splice(0,Number(proxy.start_time));

                    Ext.getCmp("c_chart").set_chart(record);
                    Ext.getCmp("c_chart").show();
                }
            );
        }else{
            Ext.getCmp("c_chart").hide();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var st_day = Ext.getCmp("st_day").getSubmitValue();
        var dt_day = Ext.getCmp("dt_day").getSubmitValue();

        var st_time = Ext.getCmp("st_time").getSubmitValue();
        var dt_time = Number(Ext.getCmp("dt_time").getValue());

        var s_type = Ext.getCmp("ser_day_type").getValue();
        me.s_type = s_type;
        me.purpose = Ext.getCmp("s_purpose").getValue();
        me.order = Ext.getCmp("order_type").getValue();

        var a_null = ['ser_day_type','spc_time_type','st_time','dt_time','count','action','s_purpose','order_sort','order_type'];
        for(var i=0; i<a_null.length; i++){
            var _val = Ext.getCmp(a_null[i]).getValue();
            if(_val === null){
                prt_errMsg_label(get_msg('err_null'),'errorBox');
                Ext.getCmp(a_null[i]).focus();
                return false;
            }
        }

        var col = [];
        var column = {};
        var depth = {};

        var n_st = st_day.split("-");
        n_st = Number(n_st.join(""));

        var n_dt = dt_day.split("-");
        n_dt = Number(n_dt.join(""));

        if(n_st > n_dt){
            prt_errMsg_label(get_msg('err_datevalid'),'errorBox');
            return false;
        }

        if(st_time >= dt_time){
            prt_errMsg_label(get_msg('err_than'),'errorBox');
            Ext.getCmp("st_time").focus();
            return false;
        }

        var t = Ext.ComponentQuery.query('combobox[itemId="traffic"]');

        var a_id = me.a_id;
        var l = a_id[a_id.length-1];

        for(var i=0; i<a_id.length; i++){

            var traffic = Ext.getCmp("traffic_"+a_id[i]).getValue();
            if(traffic === null){ prt_errMsg_label(get_msg('err_null'),'errorBox'); Ext.getCmp("traffic_"+a_id[i]).focus(); return false; }
            eval('depth.dep_'+i+'= { type: "'+traffic+'" }');

            if(traffic === "sip" || traffic === "dip"){

                var ip = Ext.getCmp("ip_"+a_id[i]);

                if(traffic === "sip"){
                    if(column.sip){
                        prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                        Ext.getCmp("traffic_"+a_id[i]).focus();
                        return false;
                    }
                    column.sip = true;
                    col.push("sip");
                }else if(traffic === "dip"){
                    if(column.dip){
                        prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                        Ext.getCmp("traffic_"+a_id[i]).focus();
                        return false;
                    }
                    column.dip = true;
                    col.push("dip");
                }

                if(l === a_id[i]){
                    if(ip.getValue()===""){ continue; }
                }

                if(CheckNotNull(ip.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); ip.focus(); return false; }
                if(validIPForm(ip.getValue())===false){ prt_errMsg_label(get_msg('err_ip'),'errorBox'); ip.focus(); return false; }

            }else if(traffic === "protocol"){

                var protocol = Ext.getCmp("protocol_"+a_id[i]).getValue();
                if(column.protocol){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }
                column.protocol = true;
                col.push("protocol");

                if(protocol === 6 || protocol === 17){

                    var port = Ext.getCmp("port_"+a_id[i]);

                    if(l === a_id[i]){
                        if(port.getValue()===""){ continue; }
                    }

                    if(CheckNotNull(port.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); port.focus(); return false; }
                    if(port.getValue() < 0 || port.getValue() > 65535){
                        prt_errMsg_label(ValidLimit(0,65535),'errorBox');
                        port.focus();
                        return false;
                    }
                }

            }else if(traffic === "sid"){

                var sid = Ext.getCmp("sid_"+a_id[i]);
                if(column.sid){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }
                column.sid = true;
                col.push("sid");

                if(l === a_id[i]){
                    if(sid.getValue()===""){ continue; }
                }
                if(CheckNotNull(sid.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); sid.focus(); return false; }

            }else if(traffic === "source_country"){

                var country = Ext.getCmp("c_scode_"+a_id[i]);

                if(column.source_country){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }
                column.source_country = true;
                col.push("source_country");

                if(l === a_id[i]){
                    if(country.getValue()===null){ continue; }
                }
                if(CheckNotNull(country.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); country.focus(); return false; }

            }else if(traffic === "dest_country"){

                var country = Ext.getCmp("c_dcode_"+a_id[i]);

                if(column.coudest_countryntry){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }
                column.dest_country = true;
                col.push("dest_country");

                if(l === a_id[i]){
                    if(country.getValue()===null){ continue; }
                }
                if(CheckNotNull(country.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); country.focus(); return false; }

            }else if(traffic === "category"){

                if(column.category){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }

                var ca = Ext.getCmp("category_"+a_id[i]).getValue();

                column.category = true;
                col.push("category");
            }else if(traffic === "technology"){

                if(column.technology){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }

                var te = Ext.getCmp("technology_"+a_id[i]).getValue();

                column.technology = true;
                col.push("technology");
            }else if(traffic === "purpose"){

                if(column.purpose){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }

                var pu = Ext.getCmp("purpose_"+a_id[i]).getValue();

                column.purpose = true;
                col.push("purpose");
            }
        }

        Ext.suspendLayouts();
        Ext.getCmp("errorBox").hide();

        var _store = Ext.data.StoreManager.lookup("store_tracker_app_list");
        _store.removeAll();
        _store.currentPage = 1;

        Ext.getCmp("grid_top").show();
        Ext.getCmp("con_step").show();
        Ext.getCmp("grid_list").show();
        Ext.getCmp("c_export").show();

        if(s_type === "1"){
            Ext.getCmp("c_date").hide();
            Ext.getCmp("c_opt").show();
            Ext.getCmp("b_chart").show();
        }else{
            Ext.getCmp("c_date").show();
            Ext.getCmp("c_opt").hide();
            Ext.getCmp("b_chart").hide();
        }

        Ext.getCmp("c_sip").hide();
        Ext.getCmp("c_dip").hide();
        Ext.getCmp("c_protocol").hide();
        Ext.getCmp("c_source_country").hide();
        Ext.getCmp("c_dest_country").hide();
        Ext.getCmp("c_sid").hide();
        Ext.getCmp("c_category").hide();
        Ext.getCmp("c_technology").hide();
        Ext.getCmp("c_purpose").hide();
        Ext.getCmp("c_chart").hide();

        Ext.getCmp("con_step_1").update('');
        Ext.getCmp("con_step_2").update('');
        Ext.getCmp("con_step_3").update('');
        Ext.getCmp("con_step_4").update('');
        Ext.getCmp("con_step_5").update('');
        Ext.getCmp("con_step_6").update('');
        Ext.getCmp("con_step_7").update('');
        Ext.getCmp("con_step_8").update('');
        Ext.getCmp("con_step_9").update('');
        Ext.getCmp("con_step_10").update('');

        me.depth = depth;
        me.a_id = a_id;
        me.column = column;
        me.col = col;
        Ext.resumeLayouts(true);
        if(s_type === "0"){

            me.m_id = a_id;
            me.search_day();
        }else{

            me.search();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        me.a_id = [me.a_id[0]];

        Ext.suspendLayouts();

        var img = Ext.ComponentQuery.query('button[itemId="btn_del"]');

        for(var i=1; i<img.length; i++){
            img[i].up('container').up('container').up('container').destroy();
        }
        var _id = img[0].id.split("_");
        var record = [
            {
                name: __zen('application_name'),
                val: 'sid'
            },
            {
                name: __zen('app_category'),
                val: 'category'
            },
            {
                name: __zen('app_technology'),
                val: 'technology'
            },
            {
                name: __zen('app_purpose'),
                val: 'purpose'
            },
            {
                name: __zen('src'),
                val: 'sip'
            },
            {
                name: __zen('dest'),
                val: 'dip'
            },
            {
                name: __zen('service'),
                val: 'protocol'
            },
            {
                name: __zen('source_country'),
                val: 'source_country'
            },
            {
                name: __zen('dest_country'),
                val: 'dest_country'
            }
        ];

        Ext.getCmp("fm").getForm().reset();

        var date = new Date();

        Ext.getCmp("st_day").setValue(date);
        Ext.getCmp("dt_day").setValue(date);
        Ext.getCmp("dt_time").setValue(24);
        Ext.getCmp("traffic_"+_id[1]).getStore().loadData(record);
        Ext.getCmp("traffic_"+_id[1]).setValue("sid");
        img[0].hide();
        Ext.getCmp("errorBox").hide();
        Ext.resumeLayouts(true);
    },

    onC_chartAfterRender: function(component, eOpts) {
        var con = Ext.getCmp('c_chart');
        con.wid = document.body.clientWidth - 150;

        document.getElementById('tracker_chart').style.width = con.wid+"px";
    },

    onCon_step_1Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 0;

            delete m_depth.dep_0.text;
            delete m_depth.dep_1;
            delete m_depth.dep_2;
            delete m_depth.dep_3;
            delete m_depth.dep_4;
            delete m_depth.dep_5;
            delete m_depth.dep_6;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();


            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');

            document.getElementById("step_1").innerHTML = '';

            Ext.getCmp("con_step_2").update('');
            Ext.getCmp("con_step_3").update('');
            Ext.getCmp("con_step_4").update('');
            Ext.getCmp("con_step_5").update('');
            Ext.getCmp("con_step_6").update('');
            Ext.getCmp("con_step_7").update('');
            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            if(me.s_type === "1"){
                me.depth = m_depth;
                me.column = column;
                me.get_tracker_search();
            }else{
                me.depth = me.d_depth;
                delete me.depth.dep_0.text;
                me.column = me.d_column;
                me.get_tracker_search(null,'day');
            }

        }, component);
    },

    onCon_step_2Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 1;
            delete m_depth.dep_1.text;
            delete m_depth.dep_2;
            delete m_depth.dep_3;
            delete m_depth.dep_4;
            delete m_depth.dep_5;
            delete m_depth.dep_6;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');

            document.getElementById("step_2").innerHTML = '';

            Ext.getCmp("con_step_3").update('');
            Ext.getCmp("con_step_4").update('');
            Ext.getCmp("con_step_5").update('');
            Ext.getCmp("con_step_6").update('');
            Ext.getCmp("con_step_7").update('');
            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_3Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 2;
            delete m_depth.dep_2.text;
            delete m_depth.dep_3;
            delete m_depth.dep_4;
            delete m_depth.dep_5;
            delete m_depth.dep_6;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');

            document.getElementById("step_3").innerHTML = '';

            Ext.getCmp("con_step_4").update('');
            Ext.getCmp("con_step_5").update('');
            Ext.getCmp("con_step_6").update('');
            Ext.getCmp("con_step_7").update('');
            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_4Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 3;
            delete m_depth.dep_3.text;
            delete m_depth.dep_4;
            delete m_depth.dep_5;
            delete m_depth.dep_6;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('column.'+m_depth.dep_3.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_3.type+'").show();');

            document.getElementById("step_4").innerHTML = '';

            Ext.getCmp("con_step_5").update('');
            Ext.getCmp("con_step_6").update('');
            Ext.getCmp("con_step_7").update('');
            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_5Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 4;
            delete m_depth.dep_4.text;
            delete m_depth.dep_5;
            delete m_depth.dep_6;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('column.'+m_depth.dep_3.type+' = true;');
            eval('column.'+m_depth.dep_4.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_3.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_4.type+'").show();');

            document.getElementById("step_5").innerHTML = '';

            Ext.getCmp("con_step_6").update('');
            Ext.getCmp("con_step_7").update('');
            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_6Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 5;
            delete m_depth.dep_5.text;
            delete m_depth.dep_6;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('column.'+m_depth.dep_3.type+' = true;');
            eval('column.'+m_depth.dep_4.type+' = true;');
            eval('column.'+m_depth.dep_5.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_3.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_4.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_5.type+'").show();');

            document.getElementById("step_6").innerHTML = '';

            Ext.getCmp("con_step_7").update('');
            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_7Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 6;
            delete m_depth.dep_6.text;
            delete m_depth.dep_7;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('column.'+m_depth.dep_3.type+' = true;');
            eval('column.'+m_depth.dep_4.type+' = true;');
            eval('column.'+m_depth.dep_5.type+' = true;');
            eval('column.'+m_depth.dep_6.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_3.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_4.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_5.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_6.type+'").show();');

            document.getElementById("step_7").innerHTML = '';

            Ext.getCmp("con_step_8").update('');
            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_8Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 7;
            delete m_depth.dep_7.text;
            delete m_depth.dep_8;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('column.'+m_depth.dep_3.type+' = true;');
            eval('column.'+m_depth.dep_4.type+' = true;');
            eval('column.'+m_depth.dep_5.type+' = true;');
            eval('column.'+m_depth.dep_6.type+' = true;');
            eval('column.'+m_depth.dep_7.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_3.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_4.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_5.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_6.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_7.type+'").show();');

            document.getElementById("step_8").innerHTML = '';

            Ext.getCmp("con_step_9").update('');
            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_9Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            var m_depth = me.depth;
            var column = {};

            m_depth.step = 8;
            delete m_depth.dep_8.text;
            delete m_depth.dep_9;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_source_country").hide();
            Ext.getCmp("c_dest_country").hide();
            Ext.getCmp("c_sid").hide();
            Ext.getCmp("c_category").hide();
            Ext.getCmp("c_technology").hide();
            Ext.getCmp("c_purpose").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('column.'+m_depth.dep_2.type+' = true;');
            eval('column.'+m_depth.dep_3.type+' = true;');
            eval('column.'+m_depth.dep_4.type+' = true;');
            eval('column.'+m_depth.dep_5.type+' = true;');
            eval('column.'+m_depth.dep_6.type+' = true;');
            eval('column.'+m_depth.dep_7.type+' = true;');
            eval('column.'+m_depth.dep_8.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_2.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_3.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_4.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_5.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_6.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_7.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_8.type+'").show();');

            document.getElementById("step_9").innerHTML = '';

            Ext.getCmp("con_step_10").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onTableExpandbody: function(rowNode, record, expandRow, eOpts) {
        var theTd = Ext.fly(expandRow).down('td');
        Ext.getCmp("NFW2_tracker").mask('Loading...');

        var me = Ext.getCmp("NFW2_tracker");
        var grid = Ext.getCmp("grid_list");
        var col = 3;

        var column = me.column;
        var proxy = me.proxy;

        var depth = me.depth;
        col += Number(depth.step);

        if(me.s_type === "0")
            col -= 1;

        var criteria = Ext.decode(proxy.criteria);
        var _and = [];
        for(var i in criteria.and){
            if(criteria.and[i].sip){ _and.push('sip'); }
            if(criteria.and[i].dip){ _and.push('dip'); }
            if(criteria.and[i].protocol){ _and.push('protocol'); }
            if(criteria.and[i].dport){ _and.push('dport'); }
            if(criteria.and[i].sid){ _and.push('service'); }
            if(criteria.and[i].source_country){ _and.push('source_country'); }
            if(criteria.and[i].dest_country){ _and.push('dest_country'); }
            if(criteria.and[i].category){ _and.push('category'); }
            if(criteria.and[i].technology){ _and.push('technology'); }
            if(criteria.and[i].purpose){ _and.push('purpose'); }
        }
        if(!criteria.and){
            criteria.and = [];
        }

        if(column.sip && _and.indexOf('sip') === -1){ criteria.and.push({'sip':record.data.sip}); }
        if(column.dip && _and.indexOf('dip') === -1){ criteria.and.push({'dip':record.data.dip}); }
        if(column.protocol && _and.indexOf('protocol') === -1){ criteria.and.push({'protocol':record.data.protocol}); }
        if(column.protocol && _and.indexOf('dport') === -1){  if(record.data.dport){criteria.and.push({'dport':record.data.dport});} }
        if(column.sid && _and.indexOf('service') === -1){ criteria.and.push({'service':record.data.service.toString()}); }
        if(column.source_country && _and.indexOf('source_country') === -1){ criteria.and.push({'source_country':record.data.source_country}); }
        if(column.dest_country && _and.indexOf('dest_country') === -1){ criteria.and.push({'dest_country':record.data.dest_country}); }
        if(column.category && _and.indexOf('category') === -1){ criteria.and.push({'category':record.data.category}); }
        if(column.technology && _and.indexOf('technology') === -1){ criteria.and.push({'technology':record.data.technology}); }
        if(column.purpose && _and.indexOf('purpose') === -1){ criteria.and.push({'purpose':record.data.purpose}); }

        var _params = {
            'start_ts': proxy.start_ts,
            'end_ts': proxy.end_ts,
            'start_time': proxy.start_time,
            'end_time': proxy.end_time,
            'criteria': Ext.encode(criteria),
            'week': proxy.weeks,
            'groupbyKey': Ext.encode('time'),
            'orderbyKey': Ext.encode('time'),
            'orderby': Ext.encode(1)
        };
        console.log(_params);

        if(depth.dep_0.type === "date"){
            _params.start_ts = Ext.encode(depth.dep_0.text);
            _params.end_ts = Ext.encode(depth.dep_0.text);
        }

        request_helper.xmlrpc_call_JsonP(
            'FtDBMgr',
            "getAPPTracker",
            _params,
            function(response){

                Ext.getCmp("NFW2_tracker").unmask();

                var b_wid = 200;
                var s_wid = 200;
                var p_wid = 200;

                var _len = response.detail_list.length;
                var ar_time = [];
                for(var i=0; i<_len; i++){
                    var data = response.detail_list[i];
                    var s_time = (data.time < 10)?"0"+data.time+":00":data.time+":00";
                    var e_time = (data.time+1 < 10)?"0"+(data.time+1)+":00":(data.time+1)+":00";

                    var bo_stat = (data.outbts_per!==0)?'width:'+data.outbts_per+'%':'border:none';
                    var b_bar_g = '<strong class="bar_g" style="'+bo_stat+'"></strong>';
                    var bi_stat = (data.inbts_per !== 0)?'width:'+data.inbts_per+'%':'border:none';
                    var b_bar_b = '<strong class="bar_b" style="'+bi_stat+'"></strong>';

                    var s_stat = (data.sessionCnt_per!==0)?'width:'+data.sessionCnt_per+'%':'border:none';
                    var bar_r = '<strong class="bar_r" style="'+s_stat+'"></strong>';

                    var po_stat = (data.otpkts_per!==0)?'width:'+data.otpkts_per+'%':'border:none';
                    var p_bar_g = '<strong class="bar_g" style="'+po_stat+'"></strong>';
                    var pi_stat = (data.inpkts_per !== 0)?'width:'+data.inpkts_per+'%':'border:none';
                    var p_bar_b = '<strong class="bar_b" style="'+pi_stat+'"></strong>';

                    ar_time.push('<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker"><td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:right;background:#f5f5f5;min-heigth:24;"><div class="x-grid-cell-inner">'+s_time+' ~ '+e_time+'</div></td><td role="gridcell" class="x-grid-cell x-grid-td" style="background:#f5f5f5;width:'+b_wid+'px"><div class="x-grid-cell-inner">'+byteConvert(data.outbts_sum)+' / '+byteConvert(data.inbts_sum)+'<div class="graph">'+b_bar_g+b_bar_b+'</div></div></td><td role="gridcell" class="x-grid-cell x-grid-td" style="background:#f5f5f5;width:'+s_wid+'px"><div class="x-grid-cell-inner">'+byteConvert(data.sessionCnt_sum)+'<div class="graph">'+bar_r+'</div></div></td><td role="gridcell" class="x-grid-cell x-grid-td" style="background:#f5f5f5;width:'+p_wid+'px"><div class="x-grid-cell-inner">'+byteConvert(data.otpkts_sum)+' / '+byteConvert(data.inpkts_sum)+'<div class="graph">'+p_bar_g+p_bar_b+'</div></div></td></tr>');
                }

                var traffic_tpl = new Ext.XTemplate('<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;" class="x-grid-item">'+ar_time.join('')+'</table>');

                theTd.update(traffic_tpl.apply({
                    time: '',
                    bytesid: '',
                    sessionid: '',
                    pktid: ''
                }));

                var val = Ext.getCmp("traffic_1").getValue();
                var t_val = (val==='sip')?'dip':'sip';
                Ext.getCmp("traffic_1").setValue(t_val);
                Ext.getCmp("traffic_1").setValue(val);
            }
        );

    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        if(Ext.getCmp("c_date").hidden === false){

            if(cellIndex !== 2){ return false; }

            var column = me.d_column;
            var depth = me.d_depth;
            var m_id = me.m_id;
            var m_column = {};
            var m_depth = {};

            Ext.getCmp("con_step").show();
            var date = record.data.date.split("-");
            depth.dep_0.text = date.join('');

            var step = depth.step+1;

            for(var i=0; i<step; i++){
                eval('var dep = depth.dep_'+i+'.type');
                txt = (dep==="sip")?__zen('src'):(dep==="dip")?__zen('dest'):(dep==="protocol")?__zen('service'):(dep==="sid")?__zen('application_name'):(dep==="source_country")?__zen('source_country'):(dep==="dest_country")?__zen('dest_country'):(dep==="category")?__zen('categorys'):(dep==="technology")?__zen('technology'):(dep==="purpose")?__zen('purpose'):"일별통계 전체 리스트";
                eval('var val = (depth.dep_'+i+'.text)?" ("+depth.dep_'+i+'.text+")":"";');
                if(dep === "protocol"){
                    eval('var p_val = depth.dep_'+i+'.text;');
                    if(p_val){
                        var a_val = p_val.toString().split(',');
                        val = (a_val[1])?" ("+getProtocol(Number(a_val[0]))+','+a_val[1]+")":" ("+getProtocol(Number(a_val[0]))+")";
                    }
                }
                eval('if(depth.dep_'+i+'){ Ext.getCmp("con_step_'+(i+1)+'").update(\'<div style="background:url(../images/bul_06.gif) no-repeat"><label style="padding:3px 0 0 23px;cursor:pointer">'+txt+'</label><span id="step_'+(i+1)+'" style="color:#2c6ed5;cursor:pointer">'+val+'</span></div>\'); }');

                eval('m_depth.dep_'+i+' = { type:"'+dep+'", text:depth.dep_'+i+'.text };');
            }

            m_depth.step = depth.step;

            Ext.getCmp("c_date").hide();
            Ext.getCmp("c_opt").show();

            var a_traffic = ['sip','dip','protocol','sid','source_country','dest_country','category','technology','purpose'];
            for(var i=0; i<a_traffic.length; i++){
                eval('if(column.'+a_traffic[i]+'){ m_column.'+a_traffic[i]+' = true; Ext.getCmp("c_'+a_traffic[i]+'").show(); }');
            }

            me.column = m_column;
            me.depth = m_depth;

            me.get_tracker_search();
        }
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        showLoadMask();
    },

    onPagingtoolbarChange: function(pagingtoolbar, pageData, eOpts) {
        hideLoadMask();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();
        var store = Ext.data.StoreManager.lookup("store_tracker_app_list");
        me.myChart = echarts.init(document.getElementById('tracker_chart'),'macarons');

        me.depth = 0;
        me.type = 'app';
        me.store = store;
        Ext.getCmp("grid_list").hide();
        me.ud_mode = '';

        me.a_id = [1];

        var _params = {
            basename : Ext.encode('mgt_app_filter_list')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();
                if(!response){ return false; }

                var category = response.category;
                var ar_category = [{
                    name:__zen('all'), val: 'All'
                }];
                for(var i in category){
                    ar_category.push({
                        name: category[i], val: category[i]
                    });
                }
                Ext.data.StoreManager.lookup("store_profile_category").loadData(ar_category);

                Ext.getCmp("category_1").setValue("All");

                var technology = response.technology;
                var ar_technology = [{
                    name:__zen('all'), val: 'All'
                }];
                for(var i in technology){
                    ar_technology.push({
                        name:technology[i], val: technology[i]
                    });
                }
                Ext.data.StoreManager.lookup("store_profile_technology").loadData(ar_technology);

                Ext.getCmp("technology_1").setValue("All");

                var purpose = response.purpose;
                var ar_purpose = [{
                    name:__zen('all'), val: 'All'
                }];
                for(var i in purpose){
                    ar_purpose.push({
                        name:purpose[i], val: purpose[i]
                    });
                }
                Ext.data.StoreManager.lookup("store_profile_purpose").loadData(ar_purpose);

                Ext.getCmp("purpose_1").setValue("All");
            }
        );

        var record = [];

        for(var i=1; i<25; i++){
            var time = (i<10)?'0'+i:i;
            record.push({ 'name':time,'val':i });
        }

        var d_time = Ext.create('Ext.data.Store',{
            data: record,
            fields: ['name','val']
        });

        Ext.getCmp("dt_time").bindStore(d_time);
        Ext.getCmp("dt_time").setValue(24);

        var _param = {
            start: Ext.encode(0),
            limit: Ext.encode(null)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'findCountryInfo',
            _param,
            function(response){

                var list = response.list;
                var _res = [];
                var _country = {};
                for(var i=0; i<list.length; i++){
                    _country[list[i].country_code] = ((!(list[i].country_desc==="" ||list[i].country_desc===undefined))?list[i].country_desc:"" );
                    _res.push({
                        'country_code': list[i].country_code,
                        'country_desc': '['+list[i].country_code+'] '+list[i].country_desc,
                        'codes': "<img src='../images/flag/"+list[i].country_code.toLowerCase()+".png'/> ["+list[i].country_code+"] "+((!(list[i].country_desc==="" ||list[i].country_desc===undefined))?list[i].country_desc:"" )
                    });
                }

                me._country = _country;
                Ext.data.StoreManager.lookup("store_country_items").loadData(_res);
            }
        );
    },

    onNFW2_trackerBeforeDestroy: function(component, eOpts) {
        var img = Ext.ComponentQuery.query('button[itemId="btn_del"]');

        for(var i=0; i<img.length; i++){
            img[i].up('container').up('container').up('container').destroy();
        }

        Ext.data.StoreManager.lookup("store_tracker_app_total").removeAll();
        Ext.data.StoreManager.lookup("store_tracker_app_list").removeAll();
    },

    add_traffic: function(n, m) {
        var me = Ext.getCmp("NFW2_tracker");
        me.ud_mode = '';

        var max = Math.max.apply(Math,me.a_id);

        for(var i=0; i<max; i++){
            if(Ext.getCmp("traffic_"+n)){
                n++;
            }
        }

        var record = [
            {
                name: __zen('application_name'),
                val: 'sid'
            },
            {
                name: __zen('app_category'),
                val: 'category'
            },
            {
                name: __zen('app_technology'),
                val: 'technology'
            },
            {
                name: __zen('app_purpose'),
                val: 'purpose'
            },
            {
                name: __zen('src'),
                val: 'sip'
            },
            {
                name: __zen('dest'),
                val: 'dip'
            },
            {
                name: __zen('service'),
                val: 'protocol'
            },
            {
                name: __zen('source_country'),
                val: 'source_country'
            },
            {
                name: __zen('dest_country'),
                val: 'dest_country'
            }
        ];

        if(Ext.getCmp("s_purpose").getValue() === "1"){
            record.splice(0,4);
        }

        var _a_com = [];
        var _com = Ext.ComponentQuery.query('combobox[itemId="traffic"]');
        for(var i=0; i<_com.length; i++){
            for(var l=0; l<record.length; l++){
                if(record[l].val === _com[i].getValue()){
                    record.splice(l,1);
                }
            }
        }
        if(_com.length > 0){
            Ext.getCmp("del_"+me.a_id[0]).show();
        }

        var t_record = Ext.create('Ext.data.Store',{
            data: record,
            fields: ['name','val']
        });

        me.a_id.push(n);

        var con = {
            xtype: 'container',
            width: 850,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    padding: '0 0 0 7',
                    items: [
                        {
                            xtype: 'label',
                            cls: [
                                'lb_arrow',
                                'x-field x-form-item-label x-form-item-label-default'
                            ],
                            id: 'l_label_'+n,
                            itemId: 'l_label',
                            width: 60,
                            text: m+' '+__zen('step')
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '0 0 0 5',
                    items: [
                        {
                            xtype: 'container',
                            height: 10,
                            items: [
                                {
                                    xtype: 'image',
                                    height: 10,
                                    id: 'up_'+n,
                                    width: 23,
                                    imgCls: 'b_move_up',
                                    listeners: {
                                        afterrender: 'onImageAfterRender1'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 10,
                            margin: '1 0 0 0',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 10,
                                    id: 'down_'+n,
                                    width: 23,
                                    imgCls: 'b_move_dw',
                                    listeners: {
                                        afterrender: 'onImageAfterRender2'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'traffic_'+n,
                            itemId: 'traffic',
                            padding: '0 0 0 10',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: t_record,
                            valueField: 'val',
                            listeners: {
                                change: 'onTraffic_1Change',
                                afterrender: 'onTraffic_1AfterRender',
                                focus: 'onTraffic_1Focus'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_sd_'+n,
                    itemId: 'con_sd',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ip_'+n,
                            itemId: 'ip',
                            fieldLabel: 'IP',
                            labelSeparator: ' ',
                            labelWidth: 70,
                            listeners: {
                                focus: 'onIp_1Focus',
                                blur: 'onIp_1Blur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_protocol_'+n,
                    itemId: 'con_protocol',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'protocol_'+n,
                            itemId: 'protocol',
                            fieldLabel: __zen('protocol'),
                            labelSeparator: ' ',
                            labelWidth: 70,
                            value: 6,
                            editable: false,
                            displayField: 'name',
                            store: 'store_tracker_protocol',
                            valueField: 'val',
                            listeners: {
                                change: 'onProtocol_1Change'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'port_'+n,
                            itemId: 'port',
                            padding: '0 0 0 10',
                            fieldLabel: __zen('port'),
                            labelSeparator: ' ',
                            labelWidth: 40,
                            width: 120,
                            enforceMaxLength: true,
                            maxLength: 5
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_sid_'+n,
                    itemId: 'con_sid',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'sid_'+n,
                            itemId: 'sid',
                            labelSeparator: ' '
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_scountry_'+n,
                    itemId: 'con_scountry',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'c_scode_'+n,
                            itemId: 'c_scode',
                            width: 400,
                            labelSeparator: ' ',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'country_desc',
                            queryMode: 'local',
                            store: 'store_country_items',
                            valueField: 'country_code',
                            triggers: {
                                clear: {
                                    handler: function(field, trigger, e) {
                                        field.setValue(null);
                                    },
                                    cls: 'x-form-clear-trigger'
                                }
                            },
                            listConfig: {
                                xtype: 'boundlist',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{codes}'
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_dcountry_'+n,
                    itemId: 'con_dcountry',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'c_dcode_'+n,
                            itemId: 'c_dcode',
                            width: 400,
                            labelSeparator: ' ',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'country_desc',
                            queryMode: 'local',
                            store: 'store_country_items',
                            valueField: 'country_code',
                            triggers: {
                                clear: {
                                    handler: function(field, trigger, e) {
                                        field.setValue(null);
                                    },
                                    cls: 'x-form-clear-trigger'
                                }
                            },
                            listConfig: {
                                xtype: 'boundlist',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{codes}'
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_category_'+n,
                    itemId: 'con_category',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'category_'+n,
                            itemId: 'category',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            value: 'All',
                            store: 'store_profile_category',
                            valueField: 'val'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_technology_'+n,
                    itemId: 'con_technology',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'technology_'+n,
                            itemId: 'technology',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            value: 'All',
                            store: 'store_profile_technology',
                            valueField: 'val'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_purpose_'+n,
                    itemId: 'con_purpose',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'purpose_'+n,
                            itemId: 'purpose',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            value: 'All',
                            store: 'store_profile_purpose',
                            valueField: 'val'
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
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'del_'+n,
                                    itemId: 'btn_del',
                                    cls: 'btn_b',
                                    iconCls: 'icb_del',
                                    text: __zen('del'),
                                    listeners: {
                                        click: function(button, e, eOpts) {
                                            var a_id = me.a_id;
                                            me.ud_mode = '';

                                            var id = button.id.split("_");
                                            var s = a_id.indexOf(Number(id[1]));
                                            var _val = Ext.getCmp("traffic_"+id[1]).getValue();

                                            a_id.splice(s,1);
                                            button.up('container').up('container').up('container').destroy();

                                            var n = s+1;
                                            var max = a_id[a_id.length-1];

                                            for(var i=s; i<a_id.length; i++){
                                                Ext.getCmp("l_label_"+a_id[i]).setText(n+" "+__zen('step'));
                                                n++;
                                            }
                                            if(a_id.length === 1){
                                                Ext.getCmp("del_"+a_id[0]).hide();
                                            }
                                            var record = ['sid','category','technology','purpose','sip','dip','protocol','source_country','dest_country'];

                                            var _text = (_val==='sid')?__zen('application_name'):(_val==='category')?__zen('app_category'):(_val==='technology')?__zen('app_technology'):(_val==='purpose')?__zen('app_purpose'):(_val==='sip')?__zen('src'):(_val==='dip')?__zen('dest'):(_val==='protocol')?__zen('service'):(_val==='source_country')?__zen('source_country'):__zen('dest_country');
                                            var _idx = record.indexOf(_val);
                                            var _com = Ext.ComponentQuery.query('combobox[itemId="traffic"]');
                                            for(var i=0; i<_com.length; i++){
                                                var _store = _com[i].getStore();

                                                var c_val = _com[i].getValue();
                                                var _t_idx = _store.find('val',c_val);
                                                if(_t_idx === -1){ continue; }

                                                _store.insert(0,{name:_text,val:_val});

                                                var _record = [];

                                                if(_store.find('val','sid') !== -1){
                                                    _record.push({'name':__zen('application_name'),'val':'sid'});
                                                }
                                                if(_store.find('val','category') !== -1){
                                                    _record.push({'name':__zen('app_category'),'val':'category'});
                                                }
                                                if(_store.find('val','technology') !== -1){
                                                    _record.push({'name':__zen('app_technology'),'val':'technology'});
                                                }
                                                if(_store.find('val','purpose') !== -1){
                                                    _record.push({'name':__zen('app_purpose'),'val':'purpose'});
                                                }
                                                if(_store.find('val','sip') !== -1){
                                                    _record.push({'name':__zen('src'),'val':'sip'});
                                                }
                                                if(_store.find('val','dip') !== -1){
                                                    _record.push({'name':__zen('dest'),'val':'dip'});
                                                }
                                                if(_store.find('val','protocol') !== -1){
                                                    _record.push({'name':__zen('service'),'val':'protocol'});
                                                }
                                                if(_store.find('val','source_country') !== -1){
                                                    _record.push({'name':__zen('source_country'),'val':'source_country'});
                                                }
                                                if(_store.find('val','dest_country') !== -1){
                                                    _record.push({'name':__zen('dest_country'),'val':'dest_country'});
                                                }
                                                _store.loadData(_record);
                                                _com[i].setValue(_com[i].getValue());
                                            }

                                            me.a_id = a_id;
                                        },
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        Ext.getCmp("con_traffic").add(con);
    },

    get_tracker_search: function(col, day) {
        var me = this;
        Ext.suspendLayouts();
        Ext.getCmp("b_chart").toggle(false);

        var a_id = me.a_id;
        var column = me.column;
        var depth = me.depth;
        console.log(depth);
        if(col){
            Ext.getCmp("c_"+col).show();
        }

        var store_total = Ext.data.StoreManager.lookup("store_tracker_app_total");
        var store = Ext.data.StoreManager.lookup("store_tracker_app_list");
        store_total.removeAll();
        store.removeAll();

        var st_day = Ext.getCmp("st_day").getSubmitValue();
        var dt_day = Ext.getCmp("dt_day").getSubmitValue();

        var st_time = Number(Ext.getCmp("st_time").getSubmitValue());
        var dt_time = Number(Ext.getCmp("dt_time").getValue());
        dt_time = Number(dt_time)-1;

        var h_step = '';
        if(depth.dep_0.type === "date"){ h_step = 5; }else{ h_step = 4; }
        if(depth.dep_0.type === "date" && !depth.dep_0.text){ h_step = 10; }

        if(me.purpose === "1" && depth.step < h_step){
            for(var s=0; s<st_time; s++){
                if(Ext.getCmp("time_"+s).hidden === false)
                    Ext.getCmp("time_"+s).hide();
            }
            for(var i=st_time; i<=dt_time; i++){
                if(Ext.getCmp("time_"+i).hidden === true)
                    Ext.getCmp("time_"+i).show();
            }
            for(var l=dt_time+1; l<24; l++){
                if(Ext.getCmp("time_"+l).hidden === false)
                    Ext.getCmp("time_"+l).hide();
            }
            Ext.getCmp("c_byte").hide();
            Ext.getCmp("c_session").hide();
            Ext.getCmp("c_packet").hide();
            for(var l=0; l<depth.step; l++){
                eval('Ext.getCmp("c_"+depth.dep_'+l+'.type).hide();');
            }
            if(day === "day"){
                Ext.getCmp("c_date").show();
                Ext.getCmp("c_opt").hide();
            }

            var _wid = (5-(depth.step+1))*25+60;
        }else{
            for(var i=0; i<24; i++){
                Ext.getCmp("time_"+i).hide();
            }

            if(day === "day"){
                Ext.getCmp("c_opt").hide();
                Ext.getCmp("con_step").hide();

                for(var i=1; i<10; i++){
                    Ext.getCmp("con_step_"+i).update('');
                }
            }else{
                for(var l=0; l<depth.step; l++){
                    eval('Ext.getCmp("c_"+depth.dep_'+l+'.type).show();');
                }
            }
            Ext.getCmp("c_byte").show();
            Ext.getCmp("c_session").show();
            Ext.getCmp("c_packet").show();

            var _wid = (10-(depth.step+1))*25+70;
        }
        Ext.getCmp("c_opt").setWidth(_wid);

        var week = {};
        var work_network = [];
        var group = [];
        var criteria = {};
        var and = [];
        var or = [];

        if(st_day !== dt_day){
            var w_week = [];
            if(Ext.getCmp("w_mon").getValue()===true){ w_week.push("0"); }
            if(Ext.getCmp("w_tue").getValue()===true){ w_week.push("1"); }
            if(Ext.getCmp("w_wed").getValue()===true){ w_week.push("2"); }
            if(Ext.getCmp("w_thu").getValue()===true){ w_week.push("3"); }
            if(Ext.getCmp("w_fri").getValue()===true){ w_week.push("4"); }
            if(Ext.getCmp("w_sat").getValue()===true){ w_week.push("5"); }
            if(Ext.getCmp("w_sun").getValue()===true){ w_week.push("6"); }
            if(w_week.length > 0)
                week = { 'weeks':w_week };
        }

        var action = Ext.getCmp("action").getValue();
        and.push({ 'event': Number(action) });

        var _h = 0;
        for(var i=0; i<depth.step+1; i++){
            eval('var type = depth.dep_'+i+'.type;');
            eval('var text = (depth.dep_'+i+'.text)?depth.dep_'+i+'.text:"";');
            if(type === 'date'){ continue; }

            eval('var _index = Ext.getCmp("c_'+type+'").fullColumnIndex;');
            Ext.getCmp("grid_list").headerCt.move(_index,3+_h);
            _h++;
            if(type === "sid"){ type = "app_name"; }

            if(i === depth.step){ group.push(type); if(type==="protocol"){ group.push("dport"); } }

            if((type === 'category' || type === 'technology' || type === 'purpose') && text === "All"){ continue; }

            eval('if(type==="protocol"){ var text = (depth.dep_'+i+'.text)?depth.dep_'+i+'.text.toString():""; val = text.split(","); text = val[0]; if(val[1]){ and.push({ "dport": val[1] }); }}');
            eval('if(text!==""){ and.push({ '+type+': text }); }');
        }

        if(and.length > 0){
            criteria = { 'and':and };
        }
        if(or.length > 0){
            criteria.or = or;
        }

        var orderby = Ext.getCmp("order_type").getValue();
        var order = Number(Ext.getCmp("order_sort").getValue());

        if(depth.dep_0.type === "date"){

            if(!depth.dep_0.text){
                group = ['date'];
                order = 1;
            }else{
                st_day = depth.dep_0.text;
                dt_day = depth.dep_0.text;
                Ext.getCmp("c_date").hide();
            }

            orderby = (me.purpose==="0"&&!depth.dep_0.text)?"date":orderby;
        }

        if(me.purpose === "1" && depth.step < h_step){
            group.push("time");
            store_total.getProxy().url = '/api/FtDBMgr/getAPPTrackerTime';
            store.getProxy().url = '/api/FtDBMgr/getAPPTrackerTime';
        }else{
            store_total.getProxy().url = '/api/FtDBMgr/getAPPTracker';
            store.getProxy().url = '/api/FtDBMgr/getAPPTracker';
        }

        showLoadMask();

        store.getProxy().setExtraParam('start_ts',Ext.encode(st_day));
        store.getProxy().setExtraParam('end_ts',Ext.encode(dt_day));
        store.getProxy().setExtraParam('start_time',Ext.encode(st_time));
        store.getProxy().setExtraParam('end_time',Ext.encode(dt_time));
        store.getProxy().setExtraParam('criteria',Ext.encode(criteria));
        store.getProxy().setExtraParam('weeks',Ext.encode(week));
        store.getProxy().setExtraParam('groupbyKey',Ext.encode(group.join(",")));
        store.getProxy().setExtraParam('orderbyKey',Ext.encode(orderby));
        store.getProxy().setExtraParam('orderby',Ext.encode(order));
        store.pageSize = Number(Ext.getCmp("count").getValue());
        store.load({ callback: function(records, options, success){
            if(success){
                hideLoadMask();
                setTimeout(function(){
                    var val = Ext.getCmp("traffic_"+a_id[0]).getValue();
                    var t_val = (val==='sip')?'dip':'sip';
                    Ext.getCmp("traffic_"+a_id[0]).setValue(t_val);
                    Ext.getCmp("traffic_"+a_id[0]).setValue(val);
                },100);
            }
        }});

        console.log(store.getProxy().extraParams);
        me.proxy = store.getProxy().extraParams;

        Ext.resumeLayouts(true);
    },

    search: function() {
        var me = this;

        var col = me.col;
        var a_id = me.a_id;
        var column = me.column;
        var depth = me.depth;

        Ext.getCmp("con_step_1").update('<div style="background:url(../images/bul_06.gif) no-repeat"><label style="padding:3px 0 0 23px;cursor:pointer">'+Ext.getCmp("traffic_"+a_id[0]).getRawValue()+'</label><span id="step_1" style="color:#2c6ed5;cursor:pointer"></span></div>');

        var a_traffic = ["sip","dip","protocol","sid","source_country","dest_country","category","technology","purpose"];
        var s_col = col.join(" ");

        for(var i=1; i<a_id.length; i++){
            depth.step = i-1;
            var p_dep = Ext.getCmp("traffic_"+a_id[i-1]).getValue();
            var dep = Ext.getCmp("traffic_"+a_id[i]).getValue();

            var p_text = (p_dep==='sip'||p_dep==='dip')?Ext.getCmp("ip_"+a_id[i-1]).getValue():(p_dep==="protocol")?Ext.getCmp("protocol_"+a_id[i-1]).getValue():(p_dep==='sid')?Ext.getCmp("sid_"+a_id[i-1]).getValue():(p_dep==='source_country')?Ext.getCmp("c_scode_"+a_id[i-1]).getValue():(p_dep==='dest_country')?Ext.getCmp("c_dcode_"+a_id[i-1]).getValue():(p_dep==='category')?Ext.getCmp("category_"+a_id[i-1]).getValue():(p_dep==='technology')?Ext.getCmp("technology_"+a_id[i-1]).getValue():(p_dep==='purpose')?Ext.getCmp("purpose_"+a_id[i-1]).getValue():'';

            if(p_dep === 'protocol' && (p_text === 6 || p_text === 17)){
                p_text += (Ext.getCmp("port_"+a_id[i-1]).getValue()!=="")?','+Ext.getCmp("port_"+a_id[i-1]).getValue():'';
            }
            me.depth = depth;

            var m = (i===a_id.length-1)?true:false;
            var l_step = false;

            if(m === true){
                if(a_id.length !== a_traffic.length){
                    if(text !== ""){
                        m = false;
                    }
                }
            }

            tracker_depth(dep,p_text);
            m = (i===a_id.length-1)?true:false;

            if(m){
                var text = (dep==='sip'||dep==='dip')?Ext.getCmp("ip_"+a_id[i]).getValue():(dep==="protocol")?Ext.getCmp("protocol_"+a_id[i]).getValue():(dep==='sid')?Ext.getCmp("sid_"+a_id[i]).getValue():(dep==='source_country')?Ext.getCmp("c_scode_"+a_id[i]).getValue():(dep==='dest_country')?Ext.getCmp("c_dcode_"+a_id[i]).getValue():(dep==='category')?Ext.getCmp("category_"+a_id[i]).getValue():(dep==='technology')?Ext.getCmp("technology_"+a_id[i]).getValue():(dep==='purpose')?Ext.getCmp("purpose_"+a_id[i]).getValue():'';

                if(dep==='protocol' && (text === 6 || text === 17)){
                    eval('me.depth.dep_'+depth.step+'.text = (Ext.getCmp("port_"+a_id[i]).getValue()!=="")?text+","+Ext.getCmp("port_"+a_id[i]).getValue():text;');
                    text = Ext.getCmp("port_"+a_id[i]).getValue();
                }else if((dep === 'category' || dep === 'technology' || dep === 'purpose') && text === 'All'){
                    eval('me.depth.dep_'+depth.step+'.text = text;');
                    text = '';
                    var tit = (dep === 'category')?__zen('categorys'):(dep==='technology')?__zen('technology'):(dep==="purpose")?__zen('purpose'):"";
                    Ext.getCmp("con_step_"+(depth.step+1)).update('<div style="background:url(../images/bul_06.gif) no-repeat"><label style="padding:3px 0 0 23px;cursor:pointer">'+tit+'</label><span id="step_'+(depth.step+1)+'" style="color:#2c6ed5;cursor:pointer"> (All)</span></div>');
                }

                if(text !== '' && text !== null){

                    for(var l=0; l<a_traffic.length; l++){

                        if(s_col.indexOf(a_traffic[l]) === -1){
                            me.depth.step = a_id.length-1;
                            eval('me.depth.dep_'+a_id.length+' = { type: "'+a_traffic[l]+'" }');

                            if(dep === 'protocol'){
                                var pro = Ext.getCmp("protocol_"+a_id[i]).getValue();
                                var dport = Ext.getCmp("port_"+a_id[i]).getValue();
                                text = (dport !== "")?pro+","+dport:pro;
                            }

                            tracker_depth(null,text);
                            break;
                        }
                    }
                }

                if(a_id.length === a_traffic.length){
                    l_step = true;
                }
            }

            if(l_step){
                var text = (dep==='sip'||dep==='dip')?Ext.getCmp("ip_"+a_id[i]).getValue():(dep==="protocol")?Ext.getCmp("protocol_"+a_id[i]).getValue():(dep==='sid')?Ext.getCmp("sid_"+a_id[i]).getValue():(dep==='source_country')?Ext.getCmp("c_scode_"+a_id[i]).getValue():(dep==='dest_country')?Ext.getCmp("c_dcode_"+a_id[i]).getValue():(dep==='category')?Ext.getCmp("category_"+a_id[i]).getValue():'';

                if(dep==='protocol' && (text === 6 || text === 17)){
                    text = Ext.getCmp("port_"+a_id[i]).getValue();
                }

                if(text !== '' && text !== null){

                    if(dep === 'protocol'){
                        var pro = Ext.getCmp("protocol_"+a_id[i]).getValue();
                        var txt = (text!=="")?pro+","+text:pro;
                        text = (text!=="")?getProtocol(pro)+","+text:getProtocol(pro);
                    }
                    document.getElementById("step_"+(depth.step+1)).innerHTML = " ("+text+")";
                    text = (dep==='protocol')?txt:text;
                    me.depth.dep_5.text = text;
                }
            }
        }

        for(var i=0; i<a_traffic.length; i++){
            eval('if(column.'+a_traffic[i]+'){ Ext.getCmp("c_'+a_traffic[i]+'").show(); }');
        }

        if(a_id.length === 1){
            depth.step = 0;
            var t_val = Ext.getCmp("traffic_"+a_id[0]).getValue();

            var text = (t_val==='sip'||t_val==='dip')?Ext.getCmp("ip_"+a_id[0]).getValue():(t_val==="protocol")?Ext.getCmp("protocol_"+a_id[0]).getValue():(t_val==='sid')?Ext.getCmp("sid_"+a_id[0]).getValue():(t_val==='source_country')?Ext.getCmp("c_scode_"+a_id[0]).getValue():(t_val==='dest_country')?Ext.getCmp("c_dcode_"+a_id[0]).getValue():(t_val==='category')?Ext.getCmp("category_"+a_id[0]).getValue():(t_val==='technology')?Ext.getCmp("technology_"+a_id[0]).getValue():(t_val==='purpose')?Ext.getCmp("purpose_"+a_id[0]).getValue():'';

            if(t_val==='protocol' && (text === 6 || text === 17)){
                depth.dep_0.text = text;
                text = Ext.getCmp("port_"+a_id[0]).getValue();
            }else if((t_val==='category'||t_val==='technology'||t_val==='purpose') && text === 'All'){
                depth.dep_0.text = text;
                text = '';
                var tit = (t_val === 'category')?__zen('categorys'):(t_val==='technology')?__zen('technology'):(t_val==="purpose")?__zen('purpose'):"";
                Ext.getCmp("con_step_1").update('<div style="background:url(../images/bul_06.gif) no-repeat"><label style="padding:3px 0 0 23px;cursor:pointer">'+tit+'</label><span id="step_1" style="color:#2c6ed5;cursor:pointer"> (All)</span></div>');
            }

            me.depth = depth;

            if(text !== '' && text !== null){

                var type = (t_val==='sip')?'dip':'sip';
                if(t_val === 'protocol'){
                    var pro = Ext.getCmp("protocol_"+a_id[0]).getValue();
                    var dport = Ext.getCmp("port_"+a_id[0]).getValue();
                    text = (dport !== "")?pro+","+dport:pro;
                }

                tracker_depth(null,text);
            }

            me.get_tracker_search(t_val);
        }else{
            me.get_tracker_search();
        }
    },

    search_day: function() {
        var me = this;

        var column = {};
        var d_column = {};
        var depth = {};
        var d_depth = {};
        var a_id = me.m_id;

        var col = me.col;
        var s_col = col.join(" ");

        for(var i=1; i<11; i++){
            Ext.getCmp("con_step_"+i).update('');
        }

        depth.dep_0 = { type: 'date' };
        d_depth.dep_0 = { type: 'date' };

        var traffic = Ext.getCmp("traffic_"+a_id[0]);

        depth.dep_1 = { type: traffic.getValue() };

        var a_traffic = ["sip","dip","protocol","sid","source_country","dest_country","category","technology","purpose"];
        var s_col = me.col.join(" ");

        for(var i=0; i<a_id.length; i++){
            depth.step = (i+1);
            d_depth.step = (i+1);
            var dep = Ext.getCmp("traffic_"+a_id[i]).getValue();
            eval('column.'+dep+' = true;');
            eval('d_column.'+dep+' = true;');

            var text = (dep==='sip'||dep==='dip')?Ext.getCmp("ip_"+a_id[i]).getValue():(dep==="protocol")?Ext.getCmp("protocol_"+a_id[i]).getValue():(dep==="sid")?Ext.getCmp("sid_"+a_id[i]).getValue():(dep==="source_country")?Ext.getCmp("c_scode_"+a_id[i]).getValue():(dep==="dest_country")?Ext.getCmp("c_dcode_"+a_id[i]).getValue():(dep==='category')?Ext.getCmp("category_"+a_id[i]).getValue():(dep==='technology')?Ext.getCmp("technology_"+a_id[i]).getValue():(dep==='purpose')?Ext.getCmp("purpose_"+a_id[i]).getValue():'';

            if(dep === 'protocol' && (text === 6 || text === 17)){
                var pro = text;
                var port = Ext.getCmp("port_"+a_id[i]).getValue();
                if(port !== ''){
                    text = (text === 6 || text === 17)?text+','+port:text;
                }
            }

            text = (text === null)?'':text;

            eval('d_depth.dep_'+(i+1)+' = { type: "'+dep+'", text: "'+text+'" }');
            eval('depth.dep_'+(i+1)+' = { type: "'+dep+'", text: "'+text+'" }');

            if(dep === 'protocol' && (text === 6 || text === 17)){
                text = (port === '')?'':text;
            }

            var m = (i===a_id.length-1)?true:false;
        }

        for(var i=0; i<a_traffic.length; i++){
            Ext.getCmp("c_"+a_traffic[i]).hide();
        }
        Ext.getCmp("c_date").show();

        me.depth = depth;
        me.d_depth = d_depth;
        me.column = column;
        me.d_column = d_column;

        me.get_tracker_search(null,'day');
    }

});