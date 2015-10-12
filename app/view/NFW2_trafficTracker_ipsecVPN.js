
Ext.define('NFW2.view.NFW2_trafficTracker_ipsecVPN', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_traffictracker_ipsecvpn',

    requires: [
        'NFW2.view.NFW2_trafficTracker_ipsecVPNViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Time',
        'Ext.Img',
        'Ext.button.Button',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.Legend',
        'Ext.XTemplate',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.grid.plugin.RowExpander'
    ],

    viewModel: {
        type: 'nfw2_traffictracker_ipsecvpn'
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
                                    text: '검색 옵션'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: 'st_day',
                                            fieldLabel: '시작 날짜',
                                            labelSeparator: ' ',
                                            editable: false,
                                            format: 'Y-m-d',
                                            submitFormat: 'Ymd',
                                            listeners: {
                                                afterrender: 'onSt_dayAfterRender',
                                                change: 'onSt_dayChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'dt_day',
                                            padding: '0 0 0 10',
                                            fieldLabel: '종료 날짜',
                                            labelSeparator: ' ',
                                            editable: false,
                                            format: 'Y-m-d',
                                            submitFormat: 'Ymd',
                                            listeners: {
                                                afterrender: 'onDt_dayAfterRender',
                                                change: 'onDt_dayChange'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_ser_type',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'ser_day_type',
                                                    padding: '0 0 0 10',
                                                    width: 160,
                                                    fieldLabel: '검색 방법',
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    value: '1',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_tracker_ser_type',
                                                    valueField: 'val',
                                                    listeners: {
                                                        change: 'onSer_day_typeChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxgroup',
                                                    id: 'c_week',
                                                    padding: '0 0 0 20',
                                                    width: 400,
                                                    fieldLabel: '특정 요일',
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_mon',
                                                            name: 'w_week',
                                                            boxLabel: '월',
                                                            inputValue: '0'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_tue',
                                                            name: 'w_week',
                                                            boxLabel: '화',
                                                            inputValue: '1'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_wed',
                                                            name: 'w_week',
                                                            boxLabel: '수',
                                                            inputValue: '2'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_thu',
                                                            name: 'w_week',
                                                            boxLabel: '목',
                                                            inputValue: '3'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_fri',
                                                            name: 'w_week',
                                                            boxLabel: '금',
                                                            inputValue: '4'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_sat',
                                                            name: 'w_week',
                                                            boxLabel: '토',
                                                            inputValue: '5'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'w_sun',
                                                            name: 'w_week',
                                                            boxLabel: '일',
                                                            inputValue: '6'
                                                        }
                                                    ]
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
                                            margin: '0 0 0 105',
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
                                                    width: 170,
                                                    fieldLabel: '시간',
                                                    labelSeparator: ' ',
                                                    value: '0',
                                                    editable: false,
                                                    format: 'H',
                                                    increment: 60,
                                                    submitFormat: 'G'
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
                                            fieldLabel: '출력 개수',
                                            labelSeparator: ' ',
                                            value: '100',
                                            editable: false,
                                            store: 'store_tracker_count',
                                            valueField: 'text'
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
                                            fieldLabel: '행위',
                                            labelSeparator: ' ',
                                            value: '0',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_vpn_action',
                                            valueField: 'val'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'work',
                                            padding: '0 0 0 10',
                                            fieldLabel: '업무 구분',
                                            labelSeparator: ' ',
                                            value: '0',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_work',
                                            valueField: 'val'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 's_purpose',
                                            padding: '0 0 0 10',
                                            fieldLabel: '검색 목적',
                                            labelSeparator: ' ',
                                            value: '0',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_purpose',
                                            valueField: 'val',
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
                                            fieldLabel: '정렬 방법',
                                            labelSeparator: ' ',
                                            value: '-1',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_sort',
                                            valueField: 'val'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'order_type',
                                            padding: '0 0 0 10',
                                            fieldLabel: '정렬 기준',
                                            labelSeparator: ' ',
                                            value: 'bytes_sum',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_tracker_otype',
                                            valueField: 'val'
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
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    text: '상세 검색'
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
                                                    text: '1 단계'
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
                                                    store: 'store_tracker_traffic',
                                                    valueField: 'val',
                                                    listeners: {
                                                        change: 'onTraffic_1Change',
                                                        afterrender: 'onTraffic_1AfterRender'
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
                                                    labelWidth: 60,
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
                                                    fieldLabel: '프로토콜',
                                                    labelSeparator: ' ',
                                                    labelWidth: 60,
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
                                                    id: 'port_1',
                                                    itemId: 'port',
                                                    padding: '0 0 0 10',
                                                    fieldLabel: 'Port',
                                                    labelSeparator: ' ',
                                                    labelWidth: 30,
                                                    enforceMaxLength: true,
                                                    maxLength: 5
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_policy_1',
                                            itemId: 'con_policy',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'id_1',
                                                    itemId: 'id',
                                                    fieldLabel: 'ID',
                                                    labelSeparator: ' ',
                                                    labelWidth: 60
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'con_country_1',
                                            itemId: 'con_country',
                                            padding: '0 0 0 10',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'c_code_1',
                                                    itemId: 'c_code',
                                                    width: 300,
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    emptyText: 'Select',
                                                    displayField: 'country_desc',
                                                    store: 'store_country_item',
                                                    valueField: 'country_code'
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
                                                            iconCls: 'icb_add',
                                                            text: '추가',
                                                            listeners: {
                                                                click: 'onButtonClick2'
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
                            width: 100,
                            iconCls: 'icb_reset',
                            text: '검색 초기화',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            width: 100,
                            iconCls: 'icb_ser',
                            text: '검색',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'c_chart',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'cartesian',
                            height: 250,
                            store: 'store_tracker_chart',
                            axes: [
                                {
                                    type: 'category',
                                    fields: [
                                        'time'
                                    ],
                                    position: 'bottom'
                                },
                                {
                                    type: 'numeric',
                                    renderer: function(label, layout, lastLabel) {
                                        return label+'%';
                                    },
                                    fields: [
                                        'bytes',
                                        'session',
                                        'packets'
                                    ],
                                    grid: {
                                        odd: {
                                            fill: '#e8e8e8'
                                        },
                                        opacity: 1,
                                        stroke: '#bbb',
                                        'stroke-width': 0.5
                                    },
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    colors: [
                                        '#115fa6'
                                    ],
                                    title: '누적 사용량',
                                    xField: 'time',
                                    yField: [
                                        'bytes'
                                    ]
                                },
                                {
                                    type: 'line',
                                    colors: [
                                        '#94ae0a'
                                    ],
                                    title: '누적 세션',
                                    xField: 'time',
                                    yField: [
                                        'session'
                                    ]
                                },
                                {
                                    type: 'line',
                                    colors: [
                                        '#a61120'
                                    ],
                                    title: '누적 패킷',
                                    xField: 'time',
                                    yField: [
                                        'packets'
                                    ]
                                }
                            ],
                            legend: {
                                xtype: 'legend',
                                style: 'border:1px solid #ccc',
                                itemCls: 'x-dataview-item_tracker',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{name}'
                                ]
                            }
                        }
                    ]
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
                    store: 'store_tracker_total',
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
                            text: '날짜',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return byteConvert(value);
                            },
                            align: 'center',
                            dataIndex: 'total_bytes',
                            text: '누적 사용량',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return byteConvert(value);
                            },
                            align: 'center',
                            dataIndex: 'total_sessionCnt',
                            text: '누적 세션',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return byteConvert(value);
                            },
                            align: 'center',
                            dataIndex: 'total_packets',
                            text: '누적 패킷',
                            flex: 1
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
                            margin: '0 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_1Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_2',
                            margin: '0 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_2Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_3',
                            margin: '0 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_3Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_4',
                            margin: '0 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_4Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_5',
                            margin: '0 0 0 5',
                            style: 'pointer:cursor',
                            listeners: {
                                render: 'onCon_step_5Render'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_step_6',
                            margin: '0 0 0 5',
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
                    store: 'store_tracker_vpn_list',
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
                            id: 'c_date',
                            minWidth: 120,
                            align: 'center',
                            dataIndex: 'date',
                            text: '날짜',
                            flex: 0.5
                        },
                        {
                            xtype: 'componentcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");

                                var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                return who+tra+value;
                            },
                            id: 'c_sip',
                            minWidth: 150,
                            dataIndex: 'sip',
                            text: '출발지',
                            flex: 1
                        },
                        {
                            xtype: 'componentcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");

                                var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                return who+tra+value;
                            },
                            id: 'c_dip',
                            minWidth: 150,
                            dataIndex: 'dip',
                            text: '목적지',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var service = (record.data.service !== "null")?"("+record.data.service+")":"";
                                var dport = (record.data.dport)?","+record.data.dport:"";

                                return getProtocol(value)+dport+service;
                            },
                            id: 'c_protocol',
                            minWidth: 120,
                            dataIndex: 'protocol',
                            text: '서비스',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'c_spd_id',
                            align: 'center',
                            dataIndex: 'spd_id',
                            text: '보안 정책'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value === "null"){ return '사설IP'; }

                                return value;
                            },
                            id: 'c_country',
                            align: 'center',
                            dataIndex: 'country',
                            text: '국가코드'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var me = Ext.getCmp("NFW2_tracker");
                                var column = me.column;
                                var depth = me.depth;

                                var d = depth.step;
                                eval('var type = depth.dep_'+d+'.type;');

                                var text = (type==='sip')?record.data.sip:(type==='dip')?record.data.dip:(type==='protocol')?record.data.protocol:(type==='country')?record.data.country:(type==='spd_id')?record.data.spd_id:'';

                                eval('var val = record.data.'+type+';');

                                if(type==="protocol"){
                                    val = (text===6||text===17)?text+","+record.data.dport:text;
                                }

                                if(me.s_type === "0" && depth.step === 0){
                                    val = depth.dep_0.text;
                                }

                                var sip = (column.sip)?'':'<button class="dbtn sip" title="출발지" onclick="tracker_depth(\'sip\',\''+val+'\',true)" />';
                                var dip = (column.dip)?'':'<button class="dbtn dip" title="목적지" onclick="tracker_depth(\'dip\',\''+val+'\',true)" />';
                                var protocol = (column.protocol)?'':'<button class="dbtn ser" title="서비스" onclick="tracker_depth(\'protocol\',\''+val+'\',true)" />';
                                var spd_id = (column.spd_id)?'':'<button class="dbtn uid" title="정책" onclick="tracker_depth(\'spd_id\',\''+val+'\',true)" />';
                                var country = (column.country)?'':'<button class="dbtn ct" title="국가코드" onclick="tracker_depth(\'country\',\''+val+'\',true)" />';
                                var time = (column.time)?'':'<button class="dbtn tm" title="Time" onclick="tracker_time('+rowIndex+')" />';

                                metaData.style = "height:29px";
                                var h_step = '';
                                if(depth.dep_0.type === "date"){ h_step = 3; }else{ h_step = 2; }
                                if(depth.dep_0.type === "date" && !depth.dep_0.text){ h_step = 7; }

                                if(me.purpose === "1" && depth.step < h_step){
                                    return sip+dip+protocol;
                                }else{
                                    return sip+dip+protocol+spd_id+country+time;
                                }
                            },
                            id: 'c_opt',
                            align: 'center',
                            dataIndex: 'num',
                            text: '옵션',
                            flex: 0.7
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
                            text: '누적 사용량 (TX/RX)'
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
                            text: '누적 세션'
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
                            text: '누적 패킷 (TX/RX)'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                value = value.time_0;
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                                var val = Number(value[1])-1;
                                var bgcolor = get_heatbg_fw(val);
                                var fcolor = (val > 25)?'fff':'000';

                                metaData.style = 'height:29px;background:#'+bgcolor+';color:#'+fcolor;

                                if(value[0] !== 0){
                                    metaData.tdAttr = 'data-qtip="'+byteConvert(value[0])+'"';
                                    return byteConvert(value[0]);
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
                            store: 'store_tracker_vpn_list'
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
        destroy: 'onNFW2_trackerDestroy'
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
        var _store = Ext.data.StoreManager.lookup("store_tracker_traffic");

        if(newValue === '1'){
            var img = Ext.ComponentQuery.query('image[itemId="del"]');

            for(var i=0; i<img.length; i++){
                img[i].up('container').destroy();
            }
            Ext.getCmp("traffic_1").setValue('sip');
            _store.removeAt(3,2);
            me.a_id = [1];
        }else if(newValue === '0'){
            if(_store.data.items.length === 3){
                _store.add({ "name":"정책", "val":"spd_id" }, { "name":"국가코드", "val":"country" });
            }
        }
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

            var a_traffic = ["traffic","ip","protocol","port","id","c_code"];

            for(var i=0; i<a_traffic.length; i++){
                var p_val = Ext.getCmp(a_traffic[i]+"_"+a_id[n-1]).getValue();
                var val = Ext.getCmp(a_traffic[i]+"_"+a_id[n]);

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

            var a_traffic = ["traffic","ip","protocol","port","id","c_code"];

            for(var i=0; i<a_traffic.length; i++){
                var p_val = Ext.getCmp(a_traffic[i]+"_"+a_id[n+1]).getValue();
                var val = Ext.getCmp(a_traffic[i]+"_"+a_id[n]);

                Ext.getCmp(a_traffic[i]+"_"+a_id[n+1]).setValue(val.getValue());
                val.setValue(p_val);
            }

        }, component);
    },

    onTraffic_1Change: function(field, newValue, oldValue, eOpts) {
        field.up('container').up('container').getComponent('con_sd').hide();
        field.up('container').up('container').getComponent('con_protocol').hide();
        field.up('container').up('container').getComponent('con_policy').hide();
        field.up('container').up('container').getComponent('con_country').hide();

        if(newValue === "sip" || newValue === "dip"){
            field.up('container').up('container').getComponent('con_sd').show();
        }else if(newValue === "protocol"){
            field.up('container').up('container').getComponent('con_protocol').show();
        }else if(newValue === "spd_id"){
            field.up('container').up('container').getComponent('con_policy').show();
        }else if(newValue === "country"){
            field.up('container').up('container').getComponent('con_country').show();
        }
    },

    onTraffic_1AfterRender: function(component, eOpts) {
        component.setValue("sip");
    },

    onIp_1Focus: function(component, event, eOpts) {
        var str = disp_help_ip('all');
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

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var n = Ext.ComponentQuery.query('combobox[itemId="traffic"]').length+1;

        if(Ext.getCmp("s_purpose").getValue() === "1"){ if(n > 3){ return false; } }

        if(n > 5){ return false; }

        me.add_traffic(n,n);
    },

    onB_chartToggle: function(button, pressed, eOpts) {
        var me = this;

        if(pressed){
            var proxy = me.proxy;

            var store = Ext.data.StoreManager.lookup("store_tracker_chart");
            store.getProxy().url = '/api/FtDBMgr/getVPNTrackerTimeChart';
            store.getProxy().setExtraParam('start_ts',proxy.start_ts);
            store.getProxy().setExtraParam('end_ts',proxy.end_ts);
            store.getProxy().setExtraParam('start_time',proxy.start_time);
            store.getProxy().setExtraParam('end_time',proxy.end_time);
            store.getProxy().setExtraParam('criteria',proxy.criteria);
            store.getProxy().setExtraParam('work_network',proxy.work_network);
            store.getProxy().setExtraParam('weeks',proxy.weeks);

            showLoadMask();

            store.load({callback: function(records, options, success){
                if(success){

                    var time = records[0].data.detail_list[0].time;
                    var record = [];
                    for(var i=0; i<24; i++){
                        record.push('');
                    }

                    for(var l in time){
                        var ti = l.split("_");

                        record[ti[1]] = {
                            'time': Number(ti[1]),
                            'packets': time[l][0],
                            'bytes': time[l][1],
                            'session': time[l][2]
                        };
                    }
                    record.splice(Number(proxy.end_time)+1);
                    record.splice(0,Number(proxy.start_time));

                    store.loadData(record);
                    hideLoadMask();
                    Ext.getCmp("c_chart").show();
                }
            }});
        }else{
            Ext.getCmp("c_chart").hide();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        me.a_id = ['1'];

        Ext.suspendLayouts();

        Ext.getCmp("fm").getForm().reset();

        var date = new Date();

        Ext.getCmp("st_day").setValue(date);
        Ext.getCmp("dt_day").setValue(date);

        Ext.getCmp("traffic_1").setValue("sip");
        Ext.getCmp("dt_time").setValue(24);

        var img = Ext.ComponentQuery.query('button[itemId="btn_del"]');

        for(var i=0; i<img.length; i++){
            img[i].up('container').up('container').up('container').destroy();
        }
        Ext.resumeLayouts(true);
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
            prt_errMsg_label('시간이 올바르지 않습니다.','errorBox');
            Ext.getCmp("st_time").focus();
            return false;
        }

        var t = Ext.ComponentQuery.query('combobox[itemId="traffic"]');

        var a_id = me.a_id;
        var l = a_id[a_id.length-1];

        for(var i=0; i<a_id.length; i++){

            var traffic = Ext.getCmp("traffic_"+a_id[i]).getValue();
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

            }else if(traffic === "spd_id"){

                var policy = Ext.getCmp("id_"+a_id[i]);
                if(column.spd_id){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }
                column.spd_id = true;
                col.push("spd_id");

                if(l === a_id[i]){
                    if(policy.getValue()===""){ continue; }
                }
                if(CheckNotNull(policy.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); policy.focus(); return false; }

            }else if(traffic === "country"){

                var country = Ext.getCmp("c_code_"+a_id[i]);

                if(column.country){
                    prt_errMsg_label(get_msg('err_depthdob'),'errorBox');
                    Ext.getCmp("traffic_"+a_id[i]).focus();
                    return false;
                }
                column.country = true;
                col.push("country");

                if(l === a_id[i]){
                    if(country.getValue()===null){ continue; }
                }
                if(CheckNotNull(country.getValue())===false){ prt_errMsg_label(get_msg('err_null'),'errorBox'); country.focus(); return false; }

            }
        }
        Ext.suspendLayouts();
        Ext.getCmp("errorBox").hide();

        var _store = Ext.data.StoreManager.lookup("store_tracker_vpn_list");
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
        Ext.getCmp("c_country").hide();
        Ext.getCmp("c_spd_id").hide();
        Ext.getCmp("c_chart").hide();

        Ext.getCmp("con_step_1").update('');
        Ext.getCmp("con_step_2").update('');
        Ext.getCmp("con_step_3").update('');
        Ext.getCmp("con_step_4").update('');
        Ext.getCmp("con_step_5").update('');
        Ext.getCmp("con_step_6").update('');

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

    onCon_step_1Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){
            showLoadMask();
            var m_depth = me.depth;
            var column = {};

            m_depth.step = 0;

            delete m_depth.dep_0.text;
            delete m_depth.dep_1;
            delete m_depth.dep_2;
            delete m_depth.dep_3;
            delete m_depth.dep_4;
            delete m_depth.dep_5;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_country").hide();
            Ext.getCmp("c_spd_id").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');

            document.getElementById("step_1").innerHTML = '';
            Ext.getCmp("con_step_2").update('');
            Ext.getCmp("con_step_3").update('');
            Ext.getCmp("con_step_4").update('');
            Ext.getCmp("con_step_5").update('');
            Ext.getCmp("con_step_6").update('');

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
            showLoadMask();
            var m_depth = me.depth;
            var column = {};

            m_depth.step = 1;
            delete m_depth.dep_1.text;
            delete m_depth.dep_2;
            delete m_depth.dep_3;
            delete m_depth.dep_4;
            delete m_depth.dep_5;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_country").hide();
            Ext.getCmp("c_spd_id").hide();

            eval('column.'+m_depth.dep_0.type+' = true;');
            eval('column.'+m_depth.dep_1.type+' = true;');
            eval('Ext.getCmp("c_'+m_depth.dep_0.type+'").show();');
            eval('Ext.getCmp("c_'+m_depth.dep_1.type+'").show();');

            document.getElementById("step_2").innerHTML = '';

            Ext.getCmp("con_step_3").update('');
            Ext.getCmp("con_step_4").update('');
            Ext.getCmp("con_step_5").update('');
            Ext.getCmp("con_step_6").update('');

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_3Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){
            showLoadMask();
            var m_depth = me.depth;
            var column = {};

            m_depth.step = 2;
            delete m_depth.dep_2.text;
            delete m_depth.dep_3;
            delete m_depth.dep_4;
            delete m_depth.dep_5;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_country").hide();
            Ext.getCmp("c_spd_id").hide();

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

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_4Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){
            showLoadMask();
            var m_depth = me.depth;
            var column = {};

            m_depth.step = 3;
            delete m_depth.dep_3.text;
            delete m_depth.dep_4;
            delete m_depth.dep_5;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_country").hide();
            Ext.getCmp("c_spd_id").hide();

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

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onCon_step_5Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){
            showLoadMask();
            var m_depth = me.depth;
            var column = {};

            m_depth.step = 4;
            delete m_depth.dep_4.text;
            delete m_depth.dep_5;

            Ext.getCmp("c_sip").hide();
            Ext.getCmp("c_dip").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_country").hide();
            Ext.getCmp("c_spd_id").hide();

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

            me.store.currentPage = 1;

            me.depth = m_depth;
            me.column = column;

            me.get_tracker_search();

        }, component);
    },

    onTableExpandbody: function(rowNode, record, expandRow, eOpts) {
        var theTd = Ext.fly(expandRow).down('td');
        theTd.mask('Loading...');

        var me = Ext.getCmp("NFW2_tracker");
        var grid = Ext.getCmp("grid_list");
        var col = 3;

        var depth = me.depth;
        col += Number(depth.step);

        if(me.s_type === "0")
            col -= 1;

        var week = [];
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
                if(action === "1"){
                    and.push({ 'encryption': 1 });
                }else{
                    and.push({ 'decryption': 1 });
                }


            var work = Ext.getCmp("work").getValue();
            if(work !== "0"){
                if(!me.member || me.member.length === 0){
                    Ext.Msg.alert("","[로그] - [설정] - [기본설정] 의 업무 네트워크를 추가해주세요.");
                    return false;
                }

                if(work === "1"){
                    work_network.push({ 'work':me.member });
                }else if(work === "2"){
                    work_network.push({ 'not_work':me.member });
                }
            }

        for(var i=0; i<depth.step+1; i++){
            eval('var type = depth.dep_'+i+'.type;');
            eval('var text = (depth.dep_'+i+'.text)?depth.dep_'+i+'.text:"";');
            if(type === 'date'){ continue; }
            if(type === 'country' && (text === "" || text === null)){ group.push(type); continue; }
            if((type === 'category' || type === 'technology' || type === 'purpose') && text === "All"){ group.push(type); continue; }

            eval('if(type==="protocol"){ var text = (depth.dep_'+i+'.text)?depth.dep_'+i+'.text.toString():""; val = text.split(","); text = val[0]; if(record.data.dport){ and.push({ "dport": record.data.dport }); } }');
            eval('and.push({ '+type+': record.data.'+type+' });');
        }

        if(and.length > 0){
            criteria = { 'and':and };
        }
        if(or.length > 0){
            criteria.or = or;
        }

        var _params = {
            'start_ts': Ext.encode(Ext.getCmp("st_day").getSubmitValue()),
            'end_ts': Ext.encode(Ext.getCmp("dt_day").getSubmitValue()),
            'start_time': Ext.encode(Number(Ext.getCmp("st_time").getSubmitValue())),
            'end_time': Ext.encode(Number(Ext.getCmp("dt_time").getValue())),
            'criteria': Ext.encode(criteria),
            'weeks': Ext.encode(week),
            'groupbyKey': Ext.encode('time'),
            'orderbyKey': Ext.encode('time'),
            'orderby': Ext.encode(1)
        };

        if(me.type === "firewall" || me.type === "vpn"){
            _params.work_network = Ext.encode(work_network);
        }
        if(depth.dep_0.type === "date"){
            _params.start_ts = Ext.encode(depth.dep_0.text);
            _params.end_ts = Ext.encode(depth.dep_0.text);
        }

        var _ft = "getVPNTracker";

        request_helper.xmlrpc_call_JsonP(
            'FtDBMgr',
            _ft,
            _params,
            function(response){

                var b_wid = 200;
                var s_wid = 200;
                var p_wid = 200;

                var _len = response.detail_list.length;
                var ar_time = [];
                for(var i=0; i<_len; i++){
                    var data = response.detail_list[i];
                    var s_time = (data.time < 10)?"0"+data.time+":00":data.time+":00";
                    var e_time = (data.time+1 < 10)?"0"+(data.time+1)+":00":(data.time+1)+":00";

                    if(me.type === "firewall" || me.type === "app" || me.type === "vpn"){
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


                    }
                    ar_time.push('<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker"><td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:right;background:#f5f5f5;min-heigth:24;"><div class="x-grid-cell-inner">'+s_time+' ~ '+e_time+'</div></td><td role="gridcell" class="x-grid-cell x-grid-td" style="background:#f5f5f5;width:'+b_wid+'px"><div class="x-grid-cell-inner">'+byteConvert(data.outbts_sum)+' / '+byteConvert(data.inbts_sum)+'<div class="graph">'+b_bar_g+b_bar_b+'</div></div></td><td role="gridcell" class="x-grid-cell x-grid-td" style="background:#f5f5f5;width:'+s_wid+'px"><div class="x-grid-cell-inner">'+byteConvert(data.sessionCnt_sum)+'<div class="graph">'+bar_r+'</div></div></td><td role="gridcell" class="x-grid-cell x-grid-td" style="background:#f5f5f5;width:'+p_wid+'px"><div class="x-grid-cell-inner">'+byteConvert(data.otpkts_sum)+' / '+byteConvert(data.otpkts_sum)+'<div class="graph">'+p_bar_g+p_bar_b+'</div></div></td></tr>');
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

            if(cellIndex !== 3){ return false; }
            showLoadMask();
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
                var txt = (dep==="sip")?"출발지":(dep==="dip")?"목적지":(dep==="protocol")?"서비스":(dep==="spd_id")?"보안 정책":(dep==="country")?"국가코드":"일별통계 전체 리스트";
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

            var a_traffic = ['sip','dip','protocol','spd_id','country'];
            for(var i=0; i<a_traffic.length; i++){
                eval('if(column.'+a_traffic[i]+'){ m_column.'+a_traffic[i]+' = true; Ext.getCmp("c_'+a_traffic[i]+'").show(); }');
            }

            me.column = m_column;
            me.depth = m_depth;

            me.get_tracker_search();
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();
        var store = Ext.data.StoreManager.lookup("store_tracker_vpn_list");

        me.depth = 0;
        me.type = 'vpn';
        me.store = store;
        Ext.getCmp("grid_list").hide();

        me.a_id = [1];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_log_setting',
            {},
            function(response){

                if(!response){ return false; }

                me.member = response.network_range.member;
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
    },

    onNFW2_trackerDestroy: function(component, eOpts) {
        var img = Ext.ComponentQuery.query('button[itemId="btn_del"]');

        for(var i=0; i<img.length; i++){
            img[i].up('container').up('container').up('container').destroy();
        }

        Ext.data.StoreManager.lookup("store_tracker_total").removeAll();
        Ext.data.StoreManager.lookup("store_tracker_vpn_list").removeAll();
    },

    add_traffic: function(n, m) {
        var me = Ext.getCmp("NFW2_tracker");

        var max = Math.max.apply(Math,me.a_id);

        for(var i=0; i<max; i++){
            if(Ext.getCmp("traffic_"+n)){
                n++;
            }
        }

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
                            text: m+' 단계'
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
                            store: 'store_tracker_traffic',
                            valueField: 'val',
                            listeners: {
                                change: 'onTraffic_1Change',
                                afterrender: 'onTraffic_1AfterRender'
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
                            labelWidth: 60,
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
                            fieldLabel: '프로토콜',
                            labelSeparator: ' ',
                            labelWidth: 60,
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
                            fieldLabel: 'Port',
                            labelSeparator: ' ',
                            labelWidth: 30,
                            enforceMaxLength: true,
                            maxLength: 5
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_policy_'+n,
                    itemId: 'con_policy',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'id_'+n,
                            itemId: 'id',
                            fieldLabel: 'ID',
                            labelSeparator: ' ',
                            labelWidth: 60
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_country_'+n,
                    itemId: 'con_country',
                    padding: '0 0 0 10',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'c_code_'+n,
                            itemId: 'c_code',
                            width: 300,
                            labelSeparator: ' ',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'country_desc',
                            store: 'store_country_item',
                            valueField: 'country_code'
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
                                    text: '삭제',
                                    listeners: {
                                        click: function(button, e, eOpts) {
                                            var a_id = me.a_id;

                                            var id = button.id.split("_");
                                            var s = a_id.indexOf(Number(id[1]));

                                            a_id.splice(s,1);
                                            button.up('container').up('container').up('container').destroy();

                                            var n = s+1;
                                            var max = a_id[a_id.length-1];

                                            for(var i=s; i<a_id.length; i++){
                                                Ext.getCmp("l_label_"+a_id[i]).setText(n+" 단계");
                                                n++;
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

        var column = me.column;
        var depth = me.depth;
        console.log(depth);
        if(col){
            Ext.getCmp("c_"+col).show();
        }

        var store_total = Ext.data.StoreManager.lookup("store_tracker_total");
        var store = Ext.data.StoreManager.lookup("store_tracker_vpn_list");
        store_total.removeAll();
        store.removeAll();

        var st_day = Ext.getCmp("st_day").getSubmitValue();
        var dt_day = Ext.getCmp("dt_day").getSubmitValue();

        var st_time = Number(Ext.getCmp("st_time").getSubmitValue());
        var dt_time = Number(Ext.getCmp("dt_time").getValue());
        dt_time = (dt_time===24)?23:dt_time;

        var h_step = '';
        if(depth.dep_0.type === "date"){ h_step = 3; }else{ h_step = 2; }
        if(depth.dep_0.type === "date" && !depth.dep_0.text){ h_step = 7; }

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
        }else{
            for(var i=0; i<24; i++){
                Ext.getCmp("time_"+i).hide();
            }

            if(day === "day"){
                Ext.getCmp("c_opt").hide();
                Ext.getCmp("con_step").hide();

                for(var i=1; i<7; i++){
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
        }

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
        if(action === "1"){
            and.push({ 'encryption': 1 });
        }else if(action === "2"){
            and.push({ 'decryption': 1 });
        }

        var work = Ext.getCmp("work").getValue();
        if(work !== "0"){
            if(!me.member || me.member.length === 0){
                Ext.MessageBox.alert("",get_msg('err_lognet'));
                return false;
            }

            if(work === "1"){
                work_network.push({ 'work':me.member });
            }else if(work === "2"){
                work_network.push({ 'not_work':me.member });
            }
        }

        for(var i=0; i<depth.step+1; i++){
            eval('var type = depth.dep_'+i+'.type;');
            eval('var text = (depth.dep_'+i+'.text)?depth.dep_'+i+'.text:"";');
            if(type === 'date'){ continue; }
            group.push(type);
            //if(type === 'country' && (text === "" || text === null)){ group.push(type); continue; }

            eval('if(type==="protocol"){ var text = (depth.dep_'+i+'.text)?depth.dep_'+i+'.text.toString():""; val = text.split(","); text = val[0]; if(val[1]){ and.push({ "dport": val[1] }); }}');//else{ group.push("dport"); } }');
            eval('if(text!==""){ and.push({ '+type+': text }); }');//else{ group.push(type); }');
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
            store_total.getProxy().url = '/api/FtDBMgr/getVPNTrackerTime';
            store.getProxy().url = '/api/FtDBMgr/getVPNTrackerTime';
        }else{
            store_total.getProxy().url = '/api/FtDBMgr/getVPNTracker';
            store.getProxy().url = '/api/FtDBMgr/getVPNTracker';
        }

        Ext.resumeLayouts(true);

        store.getProxy().setExtraParam('start_ts',Ext.encode(st_day));
        store.getProxy().setExtraParam('end_ts',Ext.encode(dt_day));
        store.getProxy().setExtraParam('start_time',Ext.encode(st_time));
        store.getProxy().setExtraParam('end_time',Ext.encode(dt_time));
        store.getProxy().setExtraParam('criteria',Ext.encode(criteria));
        store.getProxy().setExtraParam('work_network',Ext.encode(work));
        store.getProxy().setExtraParam('weeks',Ext.encode(week));
        store.getProxy().setExtraParam('groupbyKey',Ext.encode(group.join(",")));
        store.getProxy().setExtraParam('orderbyKey',Ext.encode(orderby));
        store.getProxy().setExtraParam('orderby',Ext.encode(order));
        store.pageSize = Number(Ext.getCmp("count").getValue());
        store.load({ callback: function(records, options, success){
            if(success){

                setTimeout(function(){
                    var val = Ext.getCmp("traffic_1").getValue();
                    var t_val = (val==='sip')?'dip':'sip';
                    Ext.getCmp("traffic_1").setValue(t_val);
                    Ext.getCmp("traffic_1").setValue(val);
                },100);
            }
        }});

        console.log(store.getProxy().extraParams);
        me.proxy = store.getProxy().extraParams;
    },

    search: function() {
        var me = this;

        var col = me.col;
        var a_id = me.a_id;
        var column = me.column;
        var depth = me.depth;

        Ext.getCmp("con_step_1").update('<div style="background:url(../images/bul_06.gif) no-repeat"><label style="padding:3px 0 0 23px;cursor:pointer">'+Ext.getCmp("traffic_1").getRawValue()+'</label><span id="step_1" style="color:#2c6ed5;cursor:pointer"></span></div>');

        var a_traffic = ["sip","dip","protocol","spd_id","country"];
        var s_col = col.join(" ");

        for(var i=1; i<a_id.length; i++){
            depth.step = i-1;
            var p_dep = Ext.getCmp("traffic_"+a_id[i-1]).getValue();
            var dep = Ext.getCmp("traffic_"+a_id[i]).getValue();

            var p_text = (p_dep==='sip'||p_dep==='dip')?Ext.getCmp("ip_"+a_id[i-1]).getValue():(p_dep==="protocol")?Ext.getCmp("protocol_"+a_id[i-1]).getValue():(p_dep==='spd_id')?Ext.getCmp("id_"+a_id[i-1]).getValue():(p_dep==='country')?Ext.getCmp("c_code_"+a_id[i-1]).getValue():'';

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
                var text = (dep==='sip'||dep==='dip')?Ext.getCmp("ip_"+a_id[i]).getValue():(dep==="protocol")?Ext.getCmp("protocol_"+a_id[i]).getValue():(dep==='spd_id')?Ext.getCmp("id_"+a_id[i]).getValue():(dep==='country')?Ext.getCmp("c_code_"+a_id[i]).getValue():'';

                if(dep==='protocol' && (text === 6 || text === 17)){
                    eval('me.depth.dep_'+depth.step+'.text = (Ext.getCmp("port_"+a_id[i]).getValue()!=="")?text+","+Ext.getCmp("port_"+a_id[i]).getValue():text;');
                    text = Ext.getCmp("port_"+a_id[i]).getValue();
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
                            //tracker_depth(a_traffic[l],text);
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
                var text = (dep==='sip'||dep==='dip')?Ext.getCmp("ip_"+a_id[i]).getValue():(dep==="protocol")?Ext.getCmp("protocol_"+a_id[i]).getValue():(dep==='spd_id')?Ext.getCmp("id_"+a_id[i]).getValue():(dep==='country')?Ext.getCmp("c_code_"+a_id[i]).getValue():'';

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
                    me.depth.dep_4.text = text;
                }
            }
        }

        for(var i=0; i<a_traffic.length; i++){
            eval('if(column.'+a_traffic[i]+'){ Ext.getCmp("c_'+a_traffic[i]+'").show(); }');
        }

        if(a_id.length === 1){
            depth.step = 0;
            var t_val = Ext.getCmp("traffic_1").getValue();

            var text = (t_val==='sip'||t_val==='dip')?Ext.getCmp("ip_1").getValue():(t_val==="protocol")?Ext.getCmp("protocol_1").getValue():(t_val==='spd_id')?Ext.getCmp("id_1").getValue():(t_val==='country')?Ext.getCmp("c_code_1").getValue():'';

            if(t_val==='protocol' && (text === 6 || text === 17)){
                depth.dep_0.text = text;
                text = Ext.getCmp("port_1").getValue();
            }

            me.depth = depth;

            if(text !== '' && text !== null){

                var type = (t_val==='sip')?'dip':'sip';
                if(t_val === 'protocol'){
                    var pro = Ext.getCmp("protocol_1").getValue();
                    var dport = Ext.getCmp("port_1").getValue();
                    text = (dport !== "")?pro+","+dport:pro;
                }
                //Ext.getCmp("c_"+type).show();

                //tracker_depth(type,text);
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

        for(var i=1; i<7; i++){
            Ext.getCmp("con_step_"+i).update('');
        }

        depth.dep_0 = { type: 'date' };
        d_depth.dep_0 = { type: 'date' };

        var traffic = Ext.getCmp("traffic_1");

        depth.dep_1 = { type: traffic.getValue() };
        eval('column.'+traffic.getValue()+' = true;');
        eval('d_column.'+traffic.getValue()+' = true;');

        var a_traffic = ['sip','dip','protocol','spd_id','country'];
        var s_col = me.col.join(" ");

        for(var i=0; i<a_id.length; i++){
            depth.step = (i+1);
            d_depth.step = (i+1);
            var dep = Ext.getCmp("traffic_"+a_id[i]).getValue();
            eval('column.'+dep+' = true;');
            eval('d_column.'+dep+' = true;');

            var text = (dep==='sip'||dep==='dip')?Ext.getCmp("ip_"+a_id[i]).getValue():(dep==="protocol")?Ext.getCmp("protocol_"+a_id[i]).getValue():(dep==="spd_id")?Ext.getCmp("id_"+a_id[i]).getValue():(dep==="country")?Ext.getCmp("c_code_"+a_id[i]).getValue():'';

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

            if(m && i > 0){
                if(text !== ''){
                    /*for(var l=0; l<a_traffic.length; l++){
                        if(s_col.indexOf(a_traffic[l]) === -1){
                            var a = a_id.length+1;
                            depth.step = a;
                            d_depth.step = a;
                            eval('depth.dep_'+a+' = { type: "'+a_traffic[l]+'" };');
                            eval('d_depth.dep_'+a+' = { type: "'+a_traffic[l]+'" };');
                            eval('column.'+a_traffic[l]+' = true;');
                            eval('d_column.'+a_traffic[l]+' = true;');
                            break;
                        }
                    }*/
                }
            }
        }

        if(a_id.length === 1){

            if(d_depth.dep_1.text !== '' && d_depth.dep_1.text !== 'null'){

                if(d_depth.dep_1.type === 'protocol' && (pro === 6 || pro === 17) && d_depth.dep_1.text.indexOf(',') !== 1){

                }else{
                    /*var type = (d_depth.dep_1.type==='sip')?'dip':'sip';
                    d_depth.step = 2;
                    d_depth.dep_2 = { type: type, text: '' };
                    depth.step = 2;
                    depth.dep_2 = { type: type, text: '' };
                    eval('column.'+type+' = true;');
                    eval('d_column.'+type+' = true;');*/
                }
            }
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