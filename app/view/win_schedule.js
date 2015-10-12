
Ext.define('NFW2.view.win_schedule', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_schedule',

    requires: [
        'NFW2.view.win_scheduleViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.form.field.Date',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_schedule'
    },
    cls: 'zen_win',
    id: 'win_schedule',
    scrollable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
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
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_submitClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_resetClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_scheduleAfterRender',
        close: 'onWin_scheduleClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        flex: 1,
                        itemId: 'fm',
                        scrollable: true,
                        bodyPadding: 20,
                        items: [
                            {
                                xtype: 'textfield',
                                validator: function(value) {
                                    if(value === true){ return true; }
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                    return true;
                                },
                                cls: 'lb_req',
                                id: 'obj_name',
                                margin: '0 0 10 0',
                                width: 380,
                                labelSeparator: ' ',
                                labelWidth: 110,
                                msgTarget: 'none',
                                enforceMaxLength: true,
                                maxLength: 31,
                                minLength: 1,
                                bind: {
                                    fieldLabel: '{obj_name}'
                                },
                                listeners: {
                                    errorchange: 'onObj_nameErrorChange',
                                    blur: 'onObj_nameBlur'
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'schedule_desc',
                                margin: '0 0 10 0',
                                width: 380,
                                labelSeparator: ' ',
                                labelWidth: 110,
                                msgTarget: 'none',
                                enforceMaxLength: true,
                                maxLength: 63,
                                bind: {
                                    fieldLabel: '{desc}'
                                }
                            },
                            {
                                xtype: 'container',
                                id: 'periodG',
                                margin: '0 0 10 0',
                                width: 580,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'x-field x-form-item-label x-form-item-label-default',
                                        id: 'schedule_period',
                                        width: 125,
                                        bind: {
                                            text: '{period}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
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
                                                    pack: 'end'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        cls: 'btn_b',
                                                        iconCls: 'icb_add',
                                                        bind: {
                                                            text: '{add}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick3'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                cls: 'in_grid',
                                                id: 'grid_date',
                                                margin: '5 0 0 0',
                                                disableSelection: true,
                                                enableColumnHide: false,
                                                enableColumnMove: false,
                                                enableColumnResize: false,
                                                sortableColumns: false,
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "cell_date";
                                                            return (value.length === 10||value==='')?value:Ext.Date.format(value, 'Y-m-d');
                                                        },
                                                        dataIndex: 's_date',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{start}'
                                                        },
                                                        editor: {
                                                            xtype: 'datefield',
                                                            baseCls: 'cell_date',
                                                            itemId: 'start_date',
                                                            allowBlank: false,
                                                            editable: false,
                                                            format: 'Y-m-d',
                                                            submitFormat: 'Y-m-d',
                                                            listeners: {
                                                                focus: 'onDatefieldFocus1'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "~";
                                                        },
                                                        width: 40,
                                                        align: 'center'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = 'cell_date';
                                                            return (value.length === 10||value==='')?value:Ext.Date.format(value, 'Y-m-d');
                                                        },
                                                        dataIndex: 'e_date',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{end}'
                                                        },
                                                        editor: {
                                                            xtype: 'datefield',
                                                            baseCls: 'cell_date',
                                                            itemId: 'end_date',
                                                            allowBlank: false,
                                                            editable: false,
                                                            format: 'Y-m-d',
                                                            submitFormat: 'Y-m-d',
                                                            listeners: {
                                                                focus: 'onDatefieldFocus'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                            return "icr_del";
                                                        },
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            Ext.getCmp("grid_date").getStore().removeAt(rowIndex);
                                                        },
                                                        width: 30,
                                                        align: 'center'
                                                    }
                                                ],
                                                viewConfig: {
                                                    markDirty: false
                                                },
                                                plugins: [
                                                    {
                                                        ptype: 'cellediting',
                                                        pluginId: 'cell_date',
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
                                id: 'monthG',
                                margin: '0 0 10 0',
                                width: 500,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        id: 'schedule_month',
                                        width: 145,
                                        labelSeparator: ' ',
                                        labelWidth: 110,
                                        bind: {
                                            fieldLabel: '{per_year}'
                                        },
                                        listeners: {
                                            change: 'onSchedule_monthChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        id: 'schedule_monthG',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'segmentedbutton',
                                                cls: 'zen_seg',
                                                allowMultiple: true,
                                                items: [
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_1',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '1'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_2',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '2'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_3',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '3'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_4',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '4'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_5',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '5'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_6',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '6'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_7',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '7'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_8',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '8'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_9',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '9'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_10',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '10'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_11',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '11'
                                                    },
                                                    {
                                                        componentCls: 's_mon',
                                                        id: 'mon_12',
                                                        width: 40,
                                                        enableToggle: true,
                                                        text: '12'
                                                    }
                                                ],
                                                listeners: {
                                                    toggle: 'onSegmentedbuttonToggle'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'dayG',
                                margin: '0 0 10 0',
                                width: 520,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        id: 'schedule_day',
                                        width: 145,
                                        labelSeparator: ' ',
                                        labelWidth: 110,
                                        bind: {
                                            fieldLabel: '{per_month}'
                                        },
                                        listeners: {
                                            change: 'onSchedule_dayChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        id: 'schedule_dayG',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                id: 'dayG1',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'segmentedbutton',
                                                        cls: 'zen_seg',
                                                        allowMultiple: true,
                                                        items: [
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_1',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '1'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_2',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '2'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_3',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '3'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_4',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '4'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_5',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '5'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_6',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '6'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_7',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '7'
                                                            }
                                                        ],
                                                        listeners: {
                                                            toggle: 'onSegmentedbuttonToggle1'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                id: 'dayG2',
                                                margin: '-1 0 0 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'segmentedbutton',
                                                        cls: 'zen_seg',
                                                        allowMultiple: true,
                                                        items: [
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_8',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '8'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_9',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '9'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_10',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '10'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_11',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '11'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_12',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '12'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_13',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '13'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_14',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '14'
                                                            }
                                                        ],
                                                        listeners: {
                                                            toggle: 'onSegmentedbuttonToggle2'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                id: 'dayG3',
                                                margin: '-1px 0 0 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'segmentedbutton',
                                                        cls: 'zen_seg',
                                                        allowMultiple: true,
                                                        items: [
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_15',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '15'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_16',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '16'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_17',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '17'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_18',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '18'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_19',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '19'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_20',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '20'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_21',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '21'
                                                            }
                                                        ],
                                                        listeners: {
                                                            toggle: 'onSegmentedbuttonToggle3'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                id: 'dayG4',
                                                margin: '-1 0 0 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'segmentedbutton',
                                                        cls: 'zen_seg',
                                                        allowMultiple: true,
                                                        items: [
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_22',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '22'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_23',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '23'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_24',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '24'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_25',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '25'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_26',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '26'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_27',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '27'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_28',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '28'
                                                            }
                                                        ],
                                                        listeners: {
                                                            toggle: 'onSegmentedbuttonToggle4'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                id: 'dayG5',
                                                margin: '-1 0 0 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'segmentedbutton',
                                                        cls: 'zen_seg',
                                                        allowMultiple: true,
                                                        items: [
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_29',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '29'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_30',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '30'
                                                            },
                                                            {
                                                                componentCls: 's_day',
                                                                id: 'day_31',
                                                                width: 40,
                                                                enableToggle: true,
                                                                text: '31'
                                                            }
                                                        ],
                                                        listeners: {
                                                            toggle: 'onSegmentedbuttonToggle5'
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
                                id: 'weekG',
                                margin: '0 0 10 0',
                                width: 520,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        id: 'schedule_week',
                                        width: 145,
                                        labelSeparator: ' ',
                                        labelWidth: 110,
                                        bind: {
                                            fieldLabel: '{per_week}'
                                        },
                                        listeners: {
                                            change: 'onSchedule_weekChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        id: 'week_listG',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'segmentedbutton',
                                                cls: 'zen_seg',
                                                allowMultiple: true,
                                                items: [
                                                    me.processChk_sun({
                                                        componentCls: 's_week',
                                                        id: 'chk_sun',
                                                        width: 40,
                                                        enableToggle: true
                                                    }),
                                                    me.processChk_mon({
                                                        componentCls: 's_week',
                                                        id: 'chk_mon',
                                                        width: 40,
                                                        enableToggle: true
                                                    }),
                                                    me.processChk_tue({
                                                        componentCls: 's_week',
                                                        id: 'chk_tue',
                                                        width: 40,
                                                        enableToggle: true
                                                    }),
                                                    me.processChk_wed({
                                                        componentCls: 's_week',
                                                        id: 'chk_wed',
                                                        width: 40,
                                                        enableToggle: true
                                                    }),
                                                    me.processChk_thu({
                                                        componentCls: 's_week',
                                                        id: 'chk_thu',
                                                        width: 40,
                                                        enableToggle: true
                                                    }),
                                                    me.processChk_fri({
                                                        componentCls: 's_week',
                                                        id: 'chk_fri',
                                                        width: 40,
                                                        enableToggle: true
                                                    }),
                                                    me.processChk_sat({
                                                        componentCls: 's_week',
                                                        id: 'chk_sat',
                                                        width: 40,
                                                        enableToggle: true
                                                    })
                                                ],
                                                listeners: {
                                                    toggle: 'onSegmentedbuttonToggle6'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'timeG',
                                margin: '0 0 10 0',
                                width: 580,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'x-field x-form-item-label x-form-item-label-default',
                                        id: 'schedule_time',
                                        width: 125,
                                        bind: {
                                            text: '{per_day}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
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
                                                        iconCls: 'icb_add',
                                                        bind: {
                                                            text: '{add}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                cls: 'in_grid',
                                                id: 'grid_time',
                                                margin: '5 0 0 0',
                                                disableSelection: true,
                                                enableColumnHide: false,
                                                enableColumnMove: false,
                                                enableColumnResize: false,
                                                sortableColumns: false,
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        width: 150,
                                                        bind: {
                                                            text: '{start}'
                                                        },
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_combo';
                                                                    return (value.length === 2)?value:Ext.Date.format(value, 'H');
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                dataIndex: 'start_st',
                                                                editor: {
                                                                    xtype: 'timefield',
                                                                    baseCls: 'cell_combo',
                                                                    msgTarget: 'none',
                                                                    validateOnChange: false,
                                                                    editable: false,
                                                                    format: 'H',
                                                                    increment: 60,
                                                                    submitFormat: 'H',
                                                                    listeners: {
                                                                        focus: 'onTimefieldFocus'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('hour');
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                align: 'center'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "cell_combo";
                                                                    return value;
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                dataIndex: 'start_ed',
                                                                text: '',
                                                                editor: {
                                                                    xtype: 'combobox',
                                                                    baseCls: 'cell_combo',
                                                                    width: 60,
                                                                    editable: false,
                                                                    displayField: 'val',
                                                                    queryMode: 'local',
                                                                    store: 'store_schedule_time',
                                                                    valueField: 'val',
                                                                    listeners: {
                                                                        focus: 'onComboboxFocus'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('min');
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                align: 'center'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "-";
                                                        },
                                                        height: 32,
                                                        width: 20,
                                                        align: 'center'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        width: 150,
                                                        flex: 1,
                                                        bind: {
                                                            text: '{end}'
                                                        },
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_combo';
                                                                    return (value.length === 2)?value:Ext.Date.format(value, 'H');
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                dataIndex: 'end_st',
                                                                editor: {
                                                                    xtype: 'timefield',
                                                                    baseCls: 'cell_combo',
                                                                    msgTarget: 'none',
                                                                    validateOnChange: false,
                                                                    editable: false,
                                                                    format: 'H',
                                                                    increment: 60,
                                                                    submitFormat: 'H',
                                                                    listeners: {
                                                                        focus: 'onTimefieldFocus1'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('hour');
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                align: 'center'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "cell_combo";
                                                                    return value;
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                dataIndex: 'end_ed',
                                                                editor: {
                                                                    xtype: 'combobox',
                                                                    baseCls: 'cell_combo',
                                                                    editable: false,
                                                                    displayField: 'val',
                                                                    queryMode: 'local',
                                                                    store: 'store_schedule_time',
                                                                    valueField: 'val',
                                                                    listeners: {
                                                                        focus: 'onComboboxFocus1'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('min');
                                                                },
                                                                height: 0,
                                                                style: 'border:none;',
                                                                width: 50,
                                                                align: 'center'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        height: 32,
                                                        width: 35,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                    Ext.getCmp("grid_time").getStore().removeAt(rowIndex);
                                                                },
                                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                    return "icr_del";
                                                                }
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
                                                        pluginId: 'cell_time',
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
                                hidden: true,
                                id: 'btn_Group2',
                                width: 520,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        hidden: true,
                                        id: 'btn_pop_prev',
                                        width: 30,
                                        text: '<',
                                        listeners: {
                                            click: 'on_btn_pop_prev'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        hidden: true,
                                        id: 'btn_pop_next',
                                        margin: '0 5 0 5',
                                        width: 30,
                                        text: '>',
                                        listeners: {
                                            click: 'on_btn_pop_next'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processChk_sun: function(config) {
        config.text = getWeek(0);
        return config;
    },

    processChk_mon: function(config) {
        config.text = getWeek(1);
        return config;
    },

    processChk_tue: function(config) {
        config.text = getWeek(2);
        return config;
    },

    processChk_wed: function(config) {
        config.text = getWeek(3);
        return config;
    },

    processChk_thu: function(config) {
        config.text = getWeek(4);
        return config;
    },

    processChk_fri: function(config) {
        config.text = getWeek(5);
        return config;
    },

    processChk_sat: function(config) {
        config.text = getWeek(6);
        return config;
    },

    onObj_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onObj_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick3: function(button, e, eOpts) {
        var store = Ext.getCmp("grid_date").getStore();

        if(store.data.items.length+1 > 5){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(5));
            return false;
        }

        store.add({'s_date':'', 'e_date':''});
    },

    onDatefieldFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onDatefieldFocus: function(component, event, eOpts) {
        component.expand();
    },

    onSchedule_monthChange: function(field, newValue, oldValue, eOpts) {
        this.chk_toggle('all','s_mon','schedule_month',newValue);
    },

    onSegmentedbuttonToggle: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_mon','schedule_month');
    },

    onSchedule_dayChange: function(field, newValue, oldValue, eOpts) {
        this.chk_toggle('all','s_day','schedule_day',newValue);
    },

    onSegmentedbuttonToggle1: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_day','schedule_day');
    },

    onSegmentedbuttonToggle2: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_day','schedule_day');
    },

    onSegmentedbuttonToggle3: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_day','schedule_day');
    },

    onSegmentedbuttonToggle4: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_day','schedule_day');
    },

    onSegmentedbuttonToggle5: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_day','schedule_day');
    },

    onSchedule_weekChange: function(field, newValue, oldValue, eOpts) {
        this.chk_toggle('all','s_week','schedule_week',newValue);
    },

    onSegmentedbuttonToggle6: function(segmentedbutton, button, isPressed, eOpts) {
        this.chk_toggle('','s_week','schedule_week');
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.getCmp("grid_time").getStore();

        if(store.data.items.length+1 > 5){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(5));
            return false;
        }

        store.add({'start_st':'','start_ed':'','end_st':'','end_ed':''});
    },

    onTimefieldFocus: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxFocus: function(component, event, eOpts) {
        component.expand();
    },

    onTimefieldFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxFocus1: function(component, event, eOpts) {
        component.expand();
    },

    on_btn_pop_prev: function(button, e, eOpts) {
        var tbl = Ext.getCmp("object_schedule_list");
        var store = tbl.getStore();

        var prevcid = store.getAt(this.idx - 1).data["@cid"];

    },

    on_btn_pop_next: function(button, e, eOpts) {
        var tbl = Ext.getCmp("object_schedule_list");
        var store = tbl.getStore();

        var prevcid = store.getAt(this.idx - 1).data["@cid"];

    },

    onBtn_submitClick: function(button, e, eOpts) {
        var me = this;
        var count = (me.loadmode==='schedule')?Ext.getCmp("NFW2_object_schedule").count:null;

        if(Ext.getCmp('obj_name').isValid() === false){ Ext.getCmp("obj_name").focus(); return false; }

        // 월
        var mon = [];
        var els_mon = Ext.ComponentQuery.query('#schedule_monthG button[componentCls="s_mon"]');

        for(var k=0; k<els_mon.length; k++){

            if(els_mon[k].pressed){ mon.push(els_mon[k].text); }
        }

        // 일
        var day = [];
        var els_day = Ext.ComponentQuery.query('button[componentCls="s_day"]');

        for(var q=0; q<els_day.length; q++){

            if(els_day[q].pressed){ day.push(els_day[q].text); }
        }

        day.sort(function(a,b){
            return a-b;
        });

        /*// mon, day valid not check
        var _day = 0;
        var _a_mon = {1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31};
        for(var i=0; i<mon.length; i++){
            var _num = _a_mon[Number(mon[i])];
            for(var l=0; l<day.length; l++){
                console.log(mon[i]+'/'+_num+'/'+day[l]);
                if(Number(day[l]) > _num){
                    _day++;
                    prt_errMsg(get_msg('err_valid'),null);
                    return false;
                }
            }
        }
        var _day = 0;
        for(var i=0; i<mon.length; i++){

            if(Number(mon[i])%2 === 0){
                if(mon.length === 1 && mon[i] === "2"){
                    var _num = (mon[i]==='2')?29:(mon[i]==='8')?31:30;
                    for(var l=0; l<day.length; l++){
                        console.log(day[l]+'/'+mon[i]+'/'+_num);
                        if(Number(day[l]) >= _num){
                            prt_errMsg(get_msg('err_valid'),null);
                            return false;
                        }
                    }
                }else{
                    _day++;
                }
            }
        }

        if(mon.length === _day){
            for(var i=0; i<day.length; i++){
                if(Number(day[i]) > 31){
                    prt_errMsg(get_msg('err_valid'),null);
                    return false;
                }
            }
        }*/

        //요일
        var week = [];
        var els_week = {

            'chk_mon' : (Ext.getCmp('chk_mon').pressed)? 'on':'off',
            'chk_tue' : (Ext.getCmp('chk_tue').pressed)? 'on':'off',
            'chk_wed' : (Ext.getCmp('chk_wed').pressed)? 'on':'off',
            'chk_thu' : (Ext.getCmp('chk_thu').pressed)? 'on':'off',
            'chk_fri' : (Ext.getCmp('chk_fri').pressed)? 'on':'off',
            'chk_sat' : (Ext.getCmp('chk_sat').pressed)? 'on':'off',
            'chk_sun' : (Ext.getCmp('chk_sun').pressed)? 'on':'off'
        };

        week.push(els_week);

        // 특정기간
        var dataG = [];
        var timeG = [];
        var s_date = Ext.ComponentQuery.query('datefield[itemId="start_date"]');
        var e_date = Ext.ComponentQuery.query('datefield[itemId="end_date"]');
        var s_time = Ext.ComponentQuery.query('timefield[itemId="tstart_st"]');

        var d_store = Ext.getCmp("grid_date").getStore();
        var n_date = Ext.Date.format(new Date, 'Ymd');
        var n_count = 0;
        var n_valid = 0;

        for(var i=0; i<d_store.data.items.length; i++){
            var item = d_store.data.items[i].data;

            var sd = (item.s_date.length===10)?item.s_date:Ext.Date.format(item.s_date, 'Y-m-d');
            var ed = (item.e_date.length===10)?item.e_date:Ext.Date.format(item.e_date, 'Y-m-d');
            if(sd === '' && ed === ''){ continue; }
            var n_ed = (item.e_date.length === 10)?item.e_date.split("-").join(''):Ext.Date.format(item.e_date,'Ymd');

            if(sd !== '' && ed === ''){
                prt_errMsg(get_msg('err_null'), null);
                Ext.getCmp("grid_date").getPlugin('cell_date').startEdit(i,1);
                return false;
            }else if(sd === '' && ed !== ''){
                prt_errMsg(get_msg('err_null'), null);
                Ext.getCmp("grid_date").getPlugin('cell_date').startEdit(i,0);
                return false;
            }

            if(n_date > n_ed){
                n_count++;
            }

            var s_sd = sd.split("-");
            var s_ed = ed.split("-");
            for(var l=0; l<mon.length; l++){
                if(Number(s_sd[1]) > Number(mon[l]) || Number(s_ed[1]) < Number(mon[l])){
                    n_valid++;
                }
            }
            for(var l=0; l<day.length; l++){
                if(Number(s_sd[2]) > Number(day[l]) || Number(s_ed[2]) < Number(day[l])){
                    n_valid++;
                }
            }

            if(sd !== '' && ed !== ''){
                if(sd > ed){
                    prt_errMsg(get_msg('err_than'),null);
                    Ext.getCmp("grid_date").getPlugin('cell_date').startEdit(i,0);
                    return false;
                }else{
                    prt_errMsg(null,null);
                    dataG.push(sd+' ~ '+ed);
                }
            }
        }

        if(n_count > 0){
            Ext.MessageBox.confirm(__weguardia,get_msg('conf_prev_date'),function(btn){
                if(btn === "yes"){

                    /*if(n_valid > 0){
                        Ext.MessageBox.confirm(__weguardia,get_msg('conf_sch_valid'),function(btn){
                            if(btn === "yes"){

                                chk_dep1();
                            }else{
                                return false;
                            }
                        });
                    }else{*/
                    chk_dep1();
                    //}
                }else{
                    return false;
                }
            });
        }
        /*if(n_count === 0 && n_valid > 0){
            Ext.MessageBox.confirm(__weguardia,get_msg('conf_sch_valid'),function(btn){
                if(btn === "yes"){

                    chk_dep1();
                }else{
                    return false;
                }
            });
        }*/
        //if(n_count === 0 && n_valid === 0){
        chk_dep1();
        //}

        function chk_dep1(){
            var timeG = [];
            var s_time = Ext.ComponentQuery.query('timefield[itemId="tstart_st"]');

            var t_store = Ext.getCmp("grid_time").getStore();
            for(var i=0; i<t_store.data.items.length; i++){
                var item = t_store.data.items[i].data;

                var ts_st = (item.start_st.length===2)?item.start_st:Ext.Date.format(item.start_st,'H');
                var ts_ed = item.start_ed;
                var te_st = (item.end_st.length===2)?item.end_st:Ext.Date.format(item.end_st,'H');
                var te_ed = item.end_ed;

                if(ts_st !== '' && ts_ed === ''){
                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,2);
                    return false;
                }else if(ts_st === '' && ts_ed !== ''){
                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,0);
                    return false;
                }

                if(te_st !== '' && te_ed === ''){
                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,7);
                    return false;
                }else if(te_st === '' && te_ed !== ''){
                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,5);
                    return false;
                }

                if(ts_st !== '' && te_st === ''){
                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,5);
                    return false;
                }else if(ts_st === '' && te_st !== ''){
                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,0);
                    return false;
                }

                if(ts_st !== '' && ts_ed !== '' && te_st !== '' && te_ed !== ''){

                    if(ts_st+ts_ed > te_st+te_ed){
                        prt_errMsg(__zen('time')+ get_msg('err_than'),null);
                        Ext.getCmp("grid_time").getPlugin('cell_time').startEdit(i,0);
                        return false;
                    }else{
                        prt_errMsg(null,null);
                        timeG.push(ts_st+':'+ts_ed+' ~ '+te_st+':'+te_ed);
                    }
                }
            }

            if(mon.length === 0 && day.length === 0 && dataG.length === 0 && timeG.length === 0){

                if(week[0]['chk_mon'] === 'off' && week[0]['chk_tue'] === 'off' && week[0]['chk_wed'] === 'off' && week[0]['chk_thu'] === 'off' &&
                   week[0]['chk_fri'] === 'off' && week[0]['chk_sat'] === 'off' && week[0]['chk_sun'] === 'off'){

                    prt_errMsg(ValidSelect(__zen('schedule'),0),null);
                    return false;
                }
            }
            prt_errMsg(null,null);

            var update = (me.edit === "edit")? true:false;
            var cid = me.cid;

            var obj = {
                '@cid' : cid,
                name : Ext.getCmp('obj_name').getValue(),
                desc : Ext.getCmp('schedule_desc').getValue(),
                month : mon,
                day : day,
                week_list : week,
                period : dataG,
                time : timeG
            };

            var _params = {
                basename : Ext.encode('object_schedule'),
                obj : Ext.encode(obj),
                id_info : Ext.encode({'fieldname':'@cid'}),
                num_info : Ext.encode({'fieldname':'@num'}),
                update : Ext.encode(update)
            };

            var key = {
                name: Ext.getCmp("obj_name").getValue(),
                _kind: 'object_schedule'
            };

            if(update){
                key['@cid'] = {
                    '$ne': cid
                };
            }

            var _param = {
                basename: Ext.encode("with_cid"),
                key: Ext.encode(key)
            };

            if(me.name !== Ext.getCmp("obj_name").getValue()){

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObject',
                    _param,
                    function(response){

                        if(response !== null){
                            prt_errMsg(get_msg('err_objname'), null); Ext.getCmp('obj_name').focus(); return false;
                        }else{
                            fn_set(_params);
                        }
                    }
                );
            }else{
                fn_set(_params);
            }
        }

        function fn_set(_params){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){

                    var _store = Ext.data.StoreManager.lookup("store_object_schedule_list");

                    _store.load(function(records, options, success) {
                        if(me.loadmode === 'schedule' && !me.edit){
                            var tot = options.getProxy().getReader().rawData.retval;
                            Ext.getCmp("disp_sch_total").setValue(tot.total+'/'+tot.max_count);
                        }

                    });

                    if(count && me.loadmode==='schedule' && _store.getTotalCount()+1 >= count){
                        me.close();
                        return false;
                    }


                    if(me.edit === "edit"){

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
                            fn: setWinState,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                    var _store = Ext.getCmp("grid_date").getStore();
                    _store.removeAll();
                    _store.add({'s_date':'','e_date':''});

                    var t_store = Ext.getCmp("grid_time").getStore();
                    t_store.removeAll();
                    t_store.add({'start_st':'','start_ed':'','end_st':'','end_ed':''});

                }
            );
        }
    },

    onBtn_resetClick: function(button, e, eOpts) {
        this.close();
    },

    onWin_scheduleAfterRender: function(component, eOpts) {
        var me = this;
        me.d_id = [1];
        me.t_id = [1];

        chk_zenauth(null);

        var a_min = [];
        for(var i=0; i<60; i++){
            var min = (i<10)?'0'+i:i;
            a_min.push({'val':min});
        }

        var d_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['s_date','e_date']
        });

        Ext.getCmp("grid_date").bindStore(d_record);

        var t_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['start_st','start_ed','end_st','end_ed']
        });

        Ext.getCmp("grid_time").bindStore(t_record);

        Ext.data.StoreManager.lookup("store_schedule_time").loadData(a_min);

        if(me.edit === "edit"){

            var _params = {
                basename : Ext.encode('object_schedule'),
                search_info : Ext.encode({'type':'cid','value':me.cid})
            };

            me.setTitle(__zen('schedule_edit')+" - " + me.num);

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,
                function(response){
                    Ext.getCmp("obj_name").setValue(response.list[0].name);
                    Ext.getCmp('schedule_desc').setValue(response.list[0].desc);

                    // 월
                    var mon_cnt = response.list[0].month.length;
                    var els_mon = Ext.ComponentQuery.query('button[componentCls="s_mon"]');

                    for(var k=0; k<mon_cnt; k++){
                        Ext.getCmp("mon_"+response.list[0].month[k]).toggle(true);
                    }

                    // 요일
                    var str = ['chk_sun','chk_mon','chk_tue','chk_wed','chk_thu','chk_fri','chk_sat'];

                    for(var a=0; a<str.length; a++){
                        if(response.list[0].week_list[0][str[a]] === "on"){ Ext.getCmp(str[a]).toggle(true); }
                    }

                    // 일
                    var day_cnt = response.list[0].day.length;
                    var els_day = Ext.ComponentQuery.query('button[componentCls="s_day"]');

                    for(var b=0; b<day_cnt; b++){
                        Ext.getCmp("day_"+response.list[0].day[b]).toggle(true);
                    }

                    // 특정 기간
                    var p_list = response.list[0].period;

                    var _store = Ext.getCmp("grid_date").getStore();
                    var d_record = [];
                    for(var i=0; i<p_list.length; i++){
                        var p_value = response.list[0].period[i].split(" ~ ");
                        d_record.push({'s_date':p_value[0], 'e_date':p_value[1]});
                    }
                    _store.loadData(d_record);

                    // 특정 시간
                    var t_list = response.list[0].time;
                    var t_record = [];
                    for(var j=0; j<t_list.length; j++){
                        var t_value = response.list[0].time[j].split(" ~ ");

                        t_record.push({
                            'start_st':t_value[0].substring(0,2),
                            'start_ed':t_value[0].substring(3,5),
                            'end_st':t_value[1].substring(0,2),
                            'end_ed':t_value[1].substring(3,5)
                        });
                    }
                    Ext.getCmp("grid_time").getStore().loadData(t_record);
                }
            );
        }else{

            me.setTitle(__zen('schedule_add'));
            Ext.getCmp("grid_date").getStore().add({'s_date':'','e_date':''});
            Ext.getCmp("grid_time").getStore().add({'start_st':'','start_ed':'','end_st':'','end_ed':''});
        }
    },

    onWin_scheduleClose: function(panel, eOpts) {
        var button1 = Ext.ComponentQuery.query('button[itemId="btn_close1"]');
        var button3 = Ext.ComponentQuery.query('button[itemId="btn_close3"]');

        for(var i=0; i<button1.length; i++){
            button1[i].up('container').destroy();
        }

        for(var j=0; j<button3.length; j++){
            button3[j].up('container').destroy();
        }

        var _store = Ext.getCmp("grid_date").getStore();
        _store.removeAll();
    },

    chk_toggle: function(mode, cls, chk_id, val) {
        var els = Ext.ComponentQuery.query('button[componentCls="'+cls+'"]');
        var all = Ext.getCmp(chk_id);

        if(mode === 'all'){
            for(var i=0; i<els.length; i++){
                els[i].toggle(val);
            }
        }else{
            var ev = 0;
            var e_val = [];
            for(var i=0; i<els.length; i++){
                e_val.push(els[i].pressed);
                if(els[i].pressed){ ev++; }
            }

            if(ev === els.length){
                Ext.getCmp(chk_id).setValue(true);
            }else{
                Ext.getCmp(chk_id).setValue(false);
            }

            for(var l=0; l<els.length; l++){
                els[l].toggle(e_val[l]);
            }
        }
    }

});