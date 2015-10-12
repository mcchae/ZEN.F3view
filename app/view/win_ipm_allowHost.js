
Ext.define('NFW2.view.win_ipm_allowHost', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipm_allowhost',

    requires: [
        'NFW2.view.win_ipm_allowHostViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Date',
        'Ext.grid.column.Action',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_ipm_allowhost'
    },
    cls: 'zen_win',
    id: 'win_ipm_allowHost',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'ipm_host_inter',
                                    width: 390,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_ipm_host_manager_list',
                                    valueField: 'name',
                                    bind: {
                                        fieldLabel: '{manage_network}'
                                    },
                                    listeners: {
                                        focus: 'onIpm_host_interFocus',
                                        blur: 'onIpm_host_interBlur',
                                        select: 'onIpm_host_interSelect'
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
                                    xtype: 'label',
                                    margin: '0 0 0 10',
                                    width: 155,
                                    text: '주소 입력'
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            hidden: true,
                                            margin: '0 0 0 5',
                                            width: 155,
                                            bind: {
                                                text: '{ip}'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            title: 'IP 주소',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'ipm_host_ip_grid',
                                                    margin: '8 0 0 0',
                                                    width: 205,
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    allowDeselect: true,
                                                    disableSelection: true,
                                                    hideHeaders: true,
                                                    rowLines: false,
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_text_ipm";
                                                                return value;
                                                            },
                                                            width: 205,
                                                            dataIndex: 'ip',
                                                            editor: {
                                                                xtype: 'textfield',
                                                                baseCls: 'cell_text_ipm',
                                                                padding: '0 0 -2 0',
                                                                maskRe: /[0-9.]/,
                                                                listeners: {
                                                                    change: 'onTextfieldChange1',
                                                                    blur: 'onTextfieldBlur1',
                                                                    focus: 'onTextfieldFocus'
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        overItemCls: ' ',
                                                        markDirty: false
                                                    },
                                                    plugins: [
                                                        {
                                                            ptype: 'cellediting',
                                                            pluginId: 'ipm_host_ip_plug',
                                                            clicksToEdit: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            hidden: true,
                                            margin: '0 0 0 5',
                                            maxHeight: 26,
                                            iconCls: 'icb_add',
                                            text: '추가',
                                            listeners: {
                                                click: 'onButtonClick5',
                                                blur: 'onButtonBlur2'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 15',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            hidden: true,
                                            width: 155,
                                            bind: {
                                                text: '{mac}'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'MAC',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'ipm_host_mac_grid',
                                                    margin: '8 0 8 0',
                                                    width: 205,
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    allowDeselect: true,
                                                    disableSelection: true,
                                                    hideHeaders: true,
                                                    rowLines: false,
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_text_ipm";
                                                                return value;
                                                            },
                                                            width: 205,
                                                            dataIndex: 'mac',
                                                            editor: {
                                                                xtype: 'textfield',
                                                                baseCls: 'cell_text_ipm',
                                                                padding: '0 0 -2 0',
                                                                maskRe: /[0-9a-fA-F:]/,
                                                                listeners: {
                                                                    blur: 'onTextfieldBlur',
                                                                    change: 'onTextfieldChange'
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        overItemCls: ' ',
                                                        markDirty: false
                                                    },
                                                    plugins: [
                                                        {
                                                            ptype: 'cellediting',
                                                            pluginId: 'ipm_host_mac_plug',
                                                            clicksToEdit: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            hidden: true,
                                            margin: '0 0 0 5',
                                            maxHeight: 26,
                                            iconCls: 'icb_add',
                                            text: '추가',
                                            listeners: {
                                                click: 'onButtonClick4',
                                                blur: 'onButtonClick6'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 10 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '5 0 0 0',
                                    width: 155,
                                    bind: {
                                        text: '{term_use}'
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
                                                    hidden: true,
                                                    iconCls: 'icb_add',
                                                    text: '추가',
                                                    listeners: {
                                                        click: 'onButtonClick3',
                                                        blur: 'onButtonBlur1'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            id: 'ipm_sel_hour_grid',
                                            margin: '8 0 0 0',
                                            width: 470,
                                            header: false,
                                            title: 'My Grid Panel',
                                            allowDeselect: true,
                                            disableSelection: true,
                                            sortableColumns: false,
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 150,
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{start}'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_date";
                                                                return Ext.Date.format(value, 'Y-m-d');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 120,
                                                            dataIndex: 'src_date',
                                                            menuDisabled: true,
                                                            editor: {
                                                                xtype: 'datefield',
                                                                baseCls: 'cell_date',
                                                                msgTarget: 'none',
                                                                allowBlank: false,
                                                                editable: false,
                                                                format: 'Y-m-d',
                                                                submitFormat: 'Y-m-d',
                                                                listeners: {
                                                                    focus: 'onDatefieldFocus',
                                                                    collapse: 'onDatefieldCollapse'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_combo";
                                                                return value;
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 55,
                                                            dataIndex: 'src_h',
                                                            editor: {
                                                                xtype: 'combobox',
                                                                baseCls: 'cell_combo',
                                                                editable: false,
                                                                displayField: 'name',
                                                                queryMode: 'local',
                                                                store: {
                                                                    data: [
                                                                        {
                                                                            name: '00'
                                                                        },
                                                                        {
                                                                            name: '01'
                                                                        },
                                                                        {
                                                                            name: '02'
                                                                        },
                                                                        {
                                                                            name: '03'
                                                                        },
                                                                        {
                                                                            name: '04'
                                                                        },
                                                                        {
                                                                            name: '05'
                                                                        },
                                                                        {
                                                                            name: '06'
                                                                        },
                                                                        {
                                                                            name: '07'
                                                                        },
                                                                        {
                                                                            name: '08'
                                                                        },
                                                                        {
                                                                            name: '09'
                                                                        },
                                                                        {
                                                                            name: '10'
                                                                        },
                                                                        {
                                                                            name: '11'
                                                                        },
                                                                        {
                                                                            name: '12'
                                                                        },
                                                                        {
                                                                            name: '13'
                                                                        },
                                                                        {
                                                                            name: '14'
                                                                        },
                                                                        {
                                                                            name: '15'
                                                                        },
                                                                        {
                                                                            name: '16'
                                                                        },
                                                                        {
                                                                            name: '17'
                                                                        },
                                                                        {
                                                                            name: '18'
                                                                        },
                                                                        {
                                                                            name: '19'
                                                                        },
                                                                        {
                                                                            name: '20'
                                                                        },
                                                                        {
                                                                            name: '21'
                                                                        },
                                                                        {
                                                                            name: '22'
                                                                        },
                                                                        {
                                                                            name: '23'
                                                                        }
                                                                    ],
                                                                    fields: [
                                                                        {
                                                                            name: 'name'
                                                                        }
                                                                    ]
                                                                },
                                                                valueField: 'name',
                                                                listeners: {
                                                                    focus: 'onComboboxFocus3',
                                                                    collapse: 'onComboboxCollapse3'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return __zen('hour');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 45
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_combo";
                                                                return value;
                                                            },
                                                            height: 0,
                                                            hidden: true,
                                                            style: 'border:none',
                                                            width: 55,
                                                            dataIndex: 'src_m',
                                                            editor: {
                                                                xtype: 'combobox',
                                                                baseCls: 'cell_combo',
                                                                editable: false,
                                                                displayField: 'name',
                                                                queryMode: 'local',
                                                                store: {
                                                                    data: [
                                                                        {
                                                                            name: '00'
                                                                        },
                                                                        {
                                                                            name: '01'
                                                                        },
                                                                        {
                                                                            name: '02'
                                                                        },
                                                                        {
                                                                            name: '03'
                                                                        },
                                                                        {
                                                                            name: '04'
                                                                        },
                                                                        {
                                                                            name: '05'
                                                                        },
                                                                        {
                                                                            name: '06'
                                                                        },
                                                                        {
                                                                            name: '07'
                                                                        },
                                                                        {
                                                                            name: '08'
                                                                        },
                                                                        {
                                                                            name: '09'
                                                                        },
                                                                        {
                                                                            name: '10'
                                                                        },
                                                                        {
                                                                            name: '11'
                                                                        },
                                                                        {
                                                                            name: '12'
                                                                        },
                                                                        {
                                                                            name: '13'
                                                                        },
                                                                        {
                                                                            name: '14'
                                                                        },
                                                                        {
                                                                            name: '15'
                                                                        },
                                                                        {
                                                                            name: '16'
                                                                        },
                                                                        {
                                                                            name: '17'
                                                                        },
                                                                        {
                                                                            name: '18'
                                                                        },
                                                                        {
                                                                            name: '19'
                                                                        },
                                                                        {
                                                                            name: '20'
                                                                        },
                                                                        {
                                                                            name: '21'
                                                                        },
                                                                        {
                                                                            name: '22'
                                                                        },
                                                                        {
                                                                            name: '23'
                                                                        },
                                                                        {
                                                                            name: '24'
                                                                        },
                                                                        {
                                                                            name: '25'
                                                                        },
                                                                        {
                                                                            name: '26'
                                                                        },
                                                                        {
                                                                            name: '28'
                                                                        },
                                                                        {
                                                                            name: '29'
                                                                        },
                                                                        {
                                                                            name: '30'
                                                                        },
                                                                        {
                                                                            name: '31'
                                                                        },
                                                                        {
                                                                            name: '32'
                                                                        },
                                                                        {
                                                                            name: '33'
                                                                        },
                                                                        {
                                                                            name: '34'
                                                                        },
                                                                        {
                                                                            name: '35'
                                                                        },
                                                                        {
                                                                            name: '36'
                                                                        },
                                                                        {
                                                                            name: '37'
                                                                        },
                                                                        {
                                                                            name: '38'
                                                                        },
                                                                        {
                                                                            name: '39'
                                                                        },
                                                                        {
                                                                            name: '40'
                                                                        },
                                                                        {
                                                                            name: '41'
                                                                        },
                                                                        {
                                                                            name: '42'
                                                                        },
                                                                        {
                                                                            name: '43'
                                                                        },
                                                                        {
                                                                            name: '44'
                                                                        },
                                                                        {
                                                                            name: '45'
                                                                        },
                                                                        {
                                                                            name: '46'
                                                                        },
                                                                        {
                                                                            name: '47'
                                                                        },
                                                                        {
                                                                            name: '48'
                                                                        },
                                                                        {
                                                                            name: '49'
                                                                        },
                                                                        {
                                                                            name: '50'
                                                                        },
                                                                        {
                                                                            name: '51'
                                                                        },
                                                                        {
                                                                            name: '52'
                                                                        },
                                                                        {
                                                                            name: '53'
                                                                        },
                                                                        {
                                                                            name: '54'
                                                                        },
                                                                        {
                                                                            name: '55'
                                                                        },
                                                                        {
                                                                            name: '56'
                                                                        },
                                                                        {
                                                                            name: '57'
                                                                        },
                                                                        {
                                                                            name: '58'
                                                                        },
                                                                        {
                                                                            name: '59'
                                                                        }
                                                                    ],
                                                                    fields: [
                                                                        {
                                                                            name: 'name'
                                                                        }
                                                                    ]
                                                                },
                                                                valueField: 'name',
                                                                listeners: {
                                                                    focus: 'onComboboxFocus2',
                                                                    collapse: 'onComboboxCollapse2'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return "분";
                                                            },
                                                            height: 0,
                                                            hidden: true,
                                                            style: 'border:none',
                                                            width: 35
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return "-";
                                                    },
                                                    height: 32,
                                                    width: 30,
                                                    menuDisabled: true
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 150,
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{end}'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_date";
                                                                return Ext.Date.format(value, 'Y-m-d');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 120,
                                                            dataIndex: 'dst_date',
                                                            menuDisabled: true,
                                                            editor: {
                                                                xtype: 'datefield',
                                                                baseCls: 'cell_date',
                                                                msgTarget: 'none',
                                                                allowBlank: false,
                                                                editable: false,
                                                                format: 'Y-m-d',
                                                                submitFormat: 'Y-m-d',
                                                                listeners: {
                                                                    focus: 'onDatefieldFocus1',
                                                                    collapse: 'onDatefieldCollapse1'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_combo";
                                                                return value;
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 55,
                                                            dataIndex: 'dst_h',
                                                            editor: {
                                                                xtype: 'combobox',
                                                                baseCls: 'cell_combo',
                                                                editable: false,
                                                                displayField: 'name',
                                                                queryMode: 'local',
                                                                store: {
                                                                    data: [
                                                                        {
                                                                            name: '00'
                                                                        },
                                                                        {
                                                                            name: '01'
                                                                        },
                                                                        {
                                                                            name: '02'
                                                                        },
                                                                        {
                                                                            name: '03'
                                                                        },
                                                                        {
                                                                            name: '04'
                                                                        },
                                                                        {
                                                                            name: '05'
                                                                        },
                                                                        {
                                                                            name: '06'
                                                                        },
                                                                        {
                                                                            name: '07'
                                                                        },
                                                                        {
                                                                            name: '08'
                                                                        },
                                                                        {
                                                                            name: '09'
                                                                        },
                                                                        {
                                                                            name: '10'
                                                                        },
                                                                        {
                                                                            name: '11'
                                                                        },
                                                                        {
                                                                            name: '12'
                                                                        },
                                                                        {
                                                                            name: '13'
                                                                        },
                                                                        {
                                                                            name: '14'
                                                                        },
                                                                        {
                                                                            name: '15'
                                                                        },
                                                                        {
                                                                            name: '16'
                                                                        },
                                                                        {
                                                                            name: '17'
                                                                        },
                                                                        {
                                                                            name: '18'
                                                                        },
                                                                        {
                                                                            name: '19'
                                                                        },
                                                                        {
                                                                            name: '20'
                                                                        },
                                                                        {
                                                                            name: '21'
                                                                        },
                                                                        {
                                                                            name: '22'
                                                                        },
                                                                        {
                                                                            name: '23'
                                                                        }
                                                                    ],
                                                                    fields: [
                                                                        {
                                                                            name: 'name'
                                                                        }
                                                                    ]
                                                                },
                                                                valueField: 'name',
                                                                listeners: {
                                                                    focus: 'onComboboxFocus1',
                                                                    collapse: 'onComboboxCollapse1'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return __zen('hour');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 45
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_combo";
                                                                return value;
                                                            },
                                                            height: 0,
                                                            hidden: true,
                                                            style: 'border:none',
                                                            width: 55,
                                                            dataIndex: 'dst_m',
                                                            editor: {
                                                                xtype: 'combobox',
                                                                baseCls: 'cell_combo',
                                                                editable: false,
                                                                displayField: 'name',
                                                                queryMode: 'local',
                                                                store: {
                                                                    data: [
                                                                        {
                                                                            name: '00'
                                                                        },
                                                                        {
                                                                            name: '01'
                                                                        },
                                                                        {
                                                                            name: '02'
                                                                        },
                                                                        {
                                                                            name: '03'
                                                                        },
                                                                        {
                                                                            name: '04'
                                                                        },
                                                                        {
                                                                            name: '05'
                                                                        },
                                                                        {
                                                                            name: '06'
                                                                        },
                                                                        {
                                                                            name: '07'
                                                                        },
                                                                        {
                                                                            name: '08'
                                                                        },
                                                                        {
                                                                            name: '09'
                                                                        },
                                                                        {
                                                                            name: '10'
                                                                        },
                                                                        {
                                                                            name: '11'
                                                                        },
                                                                        {
                                                                            name: '12'
                                                                        },
                                                                        {
                                                                            name: '13'
                                                                        },
                                                                        {
                                                                            name: '14'
                                                                        },
                                                                        {
                                                                            name: '15'
                                                                        },
                                                                        {
                                                                            name: '16'
                                                                        },
                                                                        {
                                                                            name: '17'
                                                                        },
                                                                        {
                                                                            name: '18'
                                                                        },
                                                                        {
                                                                            name: '19'
                                                                        },
                                                                        {
                                                                            name: '20'
                                                                        },
                                                                        {
                                                                            name: '21'
                                                                        },
                                                                        {
                                                                            name: '22'
                                                                        },
                                                                        {
                                                                            name: '23'
                                                                        },
                                                                        {
                                                                            name: '24'
                                                                        },
                                                                        {
                                                                            name: '25'
                                                                        },
                                                                        {
                                                                            name: '26'
                                                                        },
                                                                        {
                                                                            name: '28'
                                                                        },
                                                                        {
                                                                            name: '29'
                                                                        },
                                                                        {
                                                                            name: '30'
                                                                        },
                                                                        {
                                                                            name: '31'
                                                                        },
                                                                        {
                                                                            name: '32'
                                                                        },
                                                                        {
                                                                            name: '33'
                                                                        },
                                                                        {
                                                                            name: '34'
                                                                        },
                                                                        {
                                                                            name: '35'
                                                                        },
                                                                        {
                                                                            name: '36'
                                                                        },
                                                                        {
                                                                            name: '37'
                                                                        },
                                                                        {
                                                                            name: '38'
                                                                        },
                                                                        {
                                                                            name: '39'
                                                                        },
                                                                        {
                                                                            name: '40'
                                                                        },
                                                                        {
                                                                            name: '41'
                                                                        },
                                                                        {
                                                                            name: '42'
                                                                        },
                                                                        {
                                                                            name: '43'
                                                                        },
                                                                        {
                                                                            name: '44'
                                                                        },
                                                                        {
                                                                            name: '45'
                                                                        },
                                                                        {
                                                                            name: '46'
                                                                        },
                                                                        {
                                                                            name: '47'
                                                                        },
                                                                        {
                                                                            name: '48'
                                                                        },
                                                                        {
                                                                            name: '49'
                                                                        },
                                                                        {
                                                                            name: '50'
                                                                        },
                                                                        {
                                                                            name: '51'
                                                                        },
                                                                        {
                                                                            name: '52'
                                                                        },
                                                                        {
                                                                            name: '53'
                                                                        },
                                                                        {
                                                                            name: '54'
                                                                        },
                                                                        {
                                                                            name: '55'
                                                                        },
                                                                        {
                                                                            name: '56'
                                                                        },
                                                                        {
                                                                            name: '57'
                                                                        },
                                                                        {
                                                                            name: '58'
                                                                        },
                                                                        {
                                                                            name: '59'
                                                                        }
                                                                    ],
                                                                    fields: [
                                                                        {
                                                                            name: 'name'
                                                                        }
                                                                    ]
                                                                },
                                                                valueField: 'name',
                                                                listeners: {
                                                                    focus: 'onComboboxFocus',
                                                                    collapse: 'onComboboxCollapse'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return "분";
                                                            },
                                                            height: 0,
                                                            hidden: true,
                                                            style: 'border:none',
                                                            width: 35
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    height: 32,
                                                    hidden: true,
                                                    id: 'sel_hour_actioncol',
                                                    width: 30,
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                                                                err_fl.removeCls('ic_msg_err');
                                                                err_fl.update('');

                                                                var grid =Ext.getCmp('ipm_sel_hour_grid');
                                                                grid.getPlugin('ipm_sel_hour_plug').completeEdit();

                                                                var store = grid.getStore();

                                                                store.removeAt(rowIndex);
                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            plugins: [
                                                {
                                                    ptype: 'cellediting',
                                                    pluginId: 'ipm_sel_hour_plug',
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
                            margin: '0 20 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'ipm_host_desc',
                                    width: 635,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    enforceMaxLength: true,
                                    maxLength: 160,
                                    maxLengthText: ' ',
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    cls: 'zen_tab',
                    hidden: true,
                    id: 'ipm_host_tab',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            title: '기본 설정'
                        },
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            hidden: true,
                            title: '스케쥴',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '8 0 0 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 110,
                                                    text: '기간'
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
                                                                    text: '추가',
                                                                    listeners: {
                                                                        click: 'onButtonClick2',
                                                                        blur: 'onButtonBlur'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            flex: 1,
                                                            id: 'ipm_sel_date_grid',
                                                            margin: '8 0 0 0',
                                                            width: 420,
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            allowDeselect: true,
                                                            disableSelection: true,
                                                            sortableColumns: false,
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return "~";
                                                                    },
                                                                    width: 30,
                                                                    menuDisabled: true
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    id: 'sel_date_actioncol',
                                                                    width: 30,
                                                                    align: 'center',
                                                                    menuDisabled: true,
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var grid =Ext.getCmp('ipm_sel_date_grid');
                                                                                grid.getPlugin('ipm_sel_date_plug').completeEdit();

                                                                                var store = grid.getStore();

                                                                                store.removeAt(rowIndex);
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            plugins: [
                                                                {
                                                                    ptype: 'cellediting',
                                                                    pluginId: 'ipm_sel_date_plug',
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
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'ipm_host_m_chk',
                                                    fieldLabel: '매년',
                                                    labelSeparator: ' ',
                                                    labelWidth: 80,
                                                    listeners: {
                                                        change: 'onCheckboxfieldChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'segmentedbutton',
                                                    cls: 'zen_seg',
                                                    id: 'ipm_host_month',
                                                    margin: '0 0 0 10',
                                                    allowMultiple: true
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
                                                    xtype: 'checkboxfield',
                                                    id: 'ipm_host_date_chk',
                                                    fieldLabel: '매월',
                                                    labelSeparator: ' ',
                                                    labelWidth: 80,
                                                    listeners: {
                                                        change: 'onCheckboxfieldChange2'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'ipm_host_date_con',
                                                    margin: '0 0 0 10'
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
                                                    xtype: 'checkboxfield',
                                                    id: 'ipm_host_d_chk',
                                                    fieldLabel: '매주',
                                                    labelSeparator: ' ',
                                                    labelWidth: 80,
                                                    listeners: {
                                                        change: 'onCheckboxfieldChange1'
                                                    }
                                                },
                                                {
                                                    xtype: 'segmentedbutton',
                                                    flex: 1,
                                                    cls: 'zen_seg',
                                                    id: 'ipm_host_day',
                                                    margin: '0 0 0 10',
                                                    allowMultiple: true
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
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender',
        render: 'onWindowRender'
    },

    onIpm_host_interFocus: function(component, event, eOpts) {
        var store = component.getStore();

        if(store.getCount() === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ipm_inter'));
        }
    },

    onIpm_host_interBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onIpm_host_interSelect: function(combo, record, eOpts) {
        // var value = combo.getValue();

        // if(record.data.action === "accept"){
        //     combo.setFieldStyle('background:#aaddff');
        // }
        // else{
        //     combo.setFieldStyle('background:#ffaaaa');
        // }
    },

    onTextfieldChange1: function(field, newValue, oldValue, eOpts) {
        if(!ValidIPAddress(newValue)){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ip'));
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        setTipBlur(this,component);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onButtonClick5: function(button, e, eOpts) {
        var grid =Ext.getCmp('ipm_host_ip_grid');
        grid.getPlugin('ipm_host_ip_plug').completeEdit();

        var store = grid.getStore();

        if(4 <= store.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(4));

            return false;
        }

        var record = [];

        record.push({
            'ip' : ''
        });

        store.add(record);

        if(store.data.items.length < 2){ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = false; }
        grid.getView().refresh();
    },

    onButtonBlur2: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

    },

    onTextfieldBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        if(!ValidMAC(newValue)){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_form'));
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var grid =Ext.getCmp('ipm_host_mac_grid');
        grid.getPlugin('ipm_host_mac_plug').completeEdit();

        var store = grid.getStore();

        if(4 <= store.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(4));

            return false;
        }

        var record = [];

        record.push({
            'mac' : ''
        });

        store.add(record);

        if(store.data.items.length < 2){ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = false; }
        grid.getView().refresh();
    },

    onButtonClick6: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onButtonClick3: function(button, e, eOpts) {
        var grid =Ext.getCmp('ipm_sel_hour_grid');
        grid.getPlugin('ipm_sel_hour_plug').completeEdit();

        var store = grid.getStore();

        if(5 <= store.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(5));

            return false;
        }

        var record = [];

        record.push({
            'src_h' : '',
            'src_m' : '',
            'dst_h' : '',
            'dst_m' : ''
        });

        store.add(record);
    },

    onButtonBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onDatefieldFocus: function(component, event, eOpts) {
        component.expand();
    },

    onDatefieldCollapse: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onComboboxFocus3: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse3: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onComboboxFocus2: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse2: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onDatefieldFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onDatefieldCollapse1: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onComboboxFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse1: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onComboboxFocus: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onButtonClick2: function(button, e, eOpts) {
        var grid =Ext.getCmp('ipm_sel_date_grid');
        grid.getPlugin('ipm_sel_date_plug').completeEdit();

        var store = grid.getStore();

        if(5 <= store.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(5));

            return false;
        }

        var record = [];

        record.push({
            'src' : '',
            'dst' : ''
        });

        store.add(record);
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            field.btn_c = false;
            for(var i = 1;i < 13;i++){
                Ext.getCmp('ipm_m_btn'+i).toggle(true);
            }
        }
        else{
            if(!field.btn_c){
                for(var i = 1;i < 13;i++){
                    Ext.getCmp('ipm_m_btn'+i).toggle(false);
                }
            }
            else{ field.btn_c = false; }
        }
    },

    onCheckboxfieldChange2: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            field.btn_c = false;
            for(var i = 1;i < 32;i++){
                Ext.getCmp('ipm_date_btn'+i).toggle(true);
            }
        }
        else{
            if(!field.btn_c){
                for(var i = 1;i < 32;i++){
                    Ext.getCmp('ipm_date_btn'+i).toggle(false);
                }
            }
            else{ field.btn_c = false; }
        }
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            field.btn_c = false;
            for(var i = 0;i < 7;i++){
                Ext.getCmp('ipm_d_btn'+i).toggle(true);
            }
        }
        else{
            if(!field.btn_c){
                for(var i = 0;i < 7;i++){
                    Ext.getCmp('ipm_d_btn'+i).toggle(false);
                }
            }
            else{ field.btn_c = false; }
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var ip_store = Ext.getCmp('ipm_host_ip_grid').getStore();
        var mac_store = Ext.getCmp('ipm_host_mac_grid').getStore();
        var date_store = Ext.getCmp('ipm_sel_date_grid').getStore();
        var hour_store = Ext.getCmp('ipm_sel_hour_grid').getStore();
        var obj = {};
        var obj_schedule = {};
        var inter;
        var net_manager;
        var action;
        var name;

        var update = (me.edit==="edit")?true:false;
        if(me.edit === "edit"){ obj._id = me._id; }

        var inter_store = Ext.getCmp('ipm_host_inter').getStore();

        if(inter_store.getCount() === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ipm_inter'));
            Ext.getCmp('ipm_host_inter').focus();
            return false;
        }

        for(var i in inter_store.data.items){
            if(inter_store.data.items[i].data.name === Ext.getCmp('ipm_host_inter').getValue()){
                inter = inter_store.data.items[i].data.interface;
                net_manager = inter_store.data.items[i].data.ip;
                action = inter_store.data.items[i].data.action;
                name = inter_store.data.items[i].data.name;
            }
        }

        var ip_null_chk = false;
        var mac_null_chk = false;

        var ip_in_chk = false;
        for(var i in ip_store.data.items){
            if(ip_store.data.items[i].data.ip !== "" && ip_store.data.items[i].data.ip !== undefined){
                ip_in_chk = true;
            }
        }
        if(ip_in_chk === false){ ip_null_chk = true; }

        var mac_in_chk = false;
        for(var i in mac_store.data.items){
            if(mac_store.data.items[i].data.mac !== "" && mac_store.data.items[i].data.mac !== undefined){
                mac_in_chk = true;
            }
        }
        if(mac_in_chk === false){ mac_null_chk = true; }

        if(ip_null_chk === true && mac_null_chk === true){
            Ext.getCmp('ipm_host_tab').setActiveTab(0);
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ipm_ipmac'));

            Ext.getCmp('ipm_host_ip_grid').getPlugin('ipm_host_ip_plug').startEdit(Number(0), 0);
            return false;
        }

        if(mac_null_chk === true){
            for(var i in ip_store.data.items){
                if(!ValidIPAddress(ip_store.data.items[i].data.ip) && ip_null_chk === true){
                    Ext.getCmp('ipm_host_tab').setActiveTab(0);
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_ip'));

                    Ext.getCmp('ipm_host_ip_grid').getPlugin('ipm_host_ip_plug').startEdit(Number(i), 0);
                    return false;
                }
            }
        }

        if(ip_null_chk === true){
            for(var i in mac_store.data.items){
                if(!ValidMAC(mac_store.data.items[i].data.mac) && mac_null_chk === true){
                    Ext.getCmp('ipm_host_tab').setActiveTab(0);
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_form'));

                    Ext.getCmp('ipm_host_mac_grid').getPlugin('ipm_host_mac_plug').startEdit(Number(i), 0);
                    return false;
                }
            }
        }

        obj.ip1 = null;
        obj.ip2 = null;
        obj.ip3 = null;
        obj.ip4 = null;
        obj.mac1 = null;
        obj.mac2 = null;
        obj.mac3 = null;
        obj.mac4 = null;

        var address_cnt = 0;
        for(var i in ip_store.data.items){
            if(ip_store.data.items[i].data.ip !== ""){ address_cnt++; obj['ip'+address_cnt] = ip_store.data.items[i].data.ip; }
        }
        address_cnt = 0;
        for(var i in mac_store.data.items){
            if(mac_store.data.items[i].data.mac !== ""){ address_cnt++; obj['mac'+address_cnt] = mac_store.data.items[i].data.mac; }
        }

        obj['@chk_use'] = "on";
        obj.network_manager = net_manager;
        obj.interface = inter;
        obj.name = name;
        obj.action = action;
        obj.desc = Ext.getCmp('ipm_host_desc').getValue();
        obj.schedule = [];

        obj_schedule.month = [];
        obj_schedule.week_list = [];
        obj_schedule.day = [];
        obj_schedule.period = [];
        obj_schedule.time = [];

        var sel_hour_store = Ext.getCmp('ipm_sel_hour_grid').getStore();

        for(var j in sel_hour_store.data.items){
            var src_date = Ext.Date.format(sel_hour_store.data.items[j].data.src_date, 'Y-m-d');
            var src_h = sel_hour_store.data.items[j].data.src_h;
            var dst_date = Ext.Date.format(sel_hour_store.data.items[j].data.dst_date, 'Y-m-d');
            var dst_h = sel_hour_store.data.items[j].data.dst_h;

            if(src_date === "" && src_h === "" && dst_date === "" && dst_h === ""){}
            else if(src_date === "" || src_h === "" || dst_date === "" || dst_h === ""){
                var chk = 0;
                if(src_date === ""){ chk = 0; }
                else if(src_h === ""){ chk = 1; }
                else if(dst_date === ""){ chk = 4; }
                else if(dst_h === ""){ chk = 5; }

                //         Ext.getCmp('ipm_host_tab').setActiveTab(1);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_null'));

                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(Number(j), chk);
                return false;
            }

            if(src_date > dst_date){
                //         Ext.getCmp('ipm_host_tab').setActiveTab(1);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_than'));

                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(Number(j), 0);
                return false;
            }
            else if(src_date === dst_date){
                if(src_h > dst_h){
                    //             Ext.getCmp('ipm_host_tab').setActiveTab(1);
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_than'));

                    Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(Number(j), 0);
                    return false;
                }
            }

            if(src_date !== "" && src_h !== "" && dst_date !== "" && dst_h !== ""){
                var src_temp = src_date.split('-');
                var dst_temp = dst_date.split('-');

                var src_time_unix = new Date(src_temp[0],src_temp[1]-1,src_temp[2],src_h).getTime()/1000;
                var dst_time_unix = new Date(dst_temp[0],dst_temp[1]-1,dst_temp[2],dst_h).getTime()/1000;

                obj_schedule.time.push({
                    's_date' : src_time_unix,
                    'e_date' : dst_time_unix
                });
            }
        }

        if(obj_schedule.day.length === 0 && obj_schedule.month.length === 0 && obj_schedule.period.length === 0 && obj_schedule.time.length === 0){
            var _params = {
                basename : Ext.encode('network_ipm_host'),
                obj : Ext.encode(obj),
                update : Ext.encode(update)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'setListTypeObj',
                _params,

                function(response){
                    if(me.mode !== "monitor"){
                        Ext.getCmp('NFW2_ipm_allowHost').get_ipm_host();
                    }
                    else{
                        var _params2 = {
                            func_name : Ext.encode('mod_network_ipmac_apply'),
                            args : Ext.encode('null')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _params2,

                            function(response){
                                Ext.getCmp('NFW2_monitor_ipm_table').get_ipm_table();
                            }
                        );
                    }

                    if(me.edit !== "edit"){
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.YESNO,
                            buttonText:{
                                yes: __zen('add_plus'),
                                no: __zen('close')
                            },
                            fn: me.set_win,
                            icon: Ext.window.MessageBox.INFO
                        });

                    }
                    else{
                        Ext.Msg.show({
                            title: __weguardia,
                            width: 300,
                            msg: get_msg('msg_ok_edit'),
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                }
            );
        }
        else{
            //     var _params = {
            //         basename : Ext.encode('ipm_schedule'),
            //         obj : Ext.encode(obj_schedule),
            //         id_info : Ext.encode({'fieldname':'@cid'}),
            //         num_info : Ext.encode({'fieldname':'@num'}),
            //         update : Ext.encode(false),
            //         return_cid : Ext.encode(true)
            //     };

            //     request_helper.xmlrpc_call_JsonP(

            //         'ftuctrl',
            //         'setObjectWithCid',
            //         _params,

            //         function(response){

            obj.schedule = obj_schedule.time[0];

            var _params = {
                basename : Ext.encode('network_ipm_host'),
                obj : Ext.encode(obj),
                update : Ext.encode(update)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'setListTypeObj',
                _params,

                function(response){
                    if(me.mode !== "monitor"){
                        Ext.getCmp('NFW2_ipm_allowHost').get_ipm_host();
                    }
                    else{
                        var _params2 = {
                            func_name : Ext.encode('mod_network_ipmac_apply'),
                            args : Ext.encode('null')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _params2,

                            function(response){
                                Ext.getCmp('NFW2_monitor_ipm_table').get_ipm_table();
                            }
                        );
                    }

                    if(me.edit !== "edit"){
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.YESNO,
                            buttonText:{
                                yes: __zen('add_plus'),
                                no: __zen('close')
                            },
                            fn: me.set_win,
                            icon: Ext.window.MessageBox.INFO
                        });

                    }
                    else{
                        Ext.Msg.show({
                            title: __weguardia,
                            width: 300,
                            msg: get_msg('msg_ok_edit'),
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                }
            );

            //         }
            //     );
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.setTitle(__zen('add_allowhost'));
        if(me.edit === "edit"){
            me.setTitle(__zen('edit_allowhost'));
        }

        var _params = {
            option : Ext.encode('all')
        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){
                if(response.retcode){
                    var _params = {
                        basename : Ext.encode("network_ipm_manager")
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'getObjects',
                        _params,

                        function(data){
                            var record = [];
                            for(var i in data.list){
                                record.push({
                                    'name' : data.list[i].name,
                                    'interface' : data.list[i].interface,
                                    'ip' : data.list[i].ip,
                                    'action' : data.list[i].action
                                });
                            }
                            var store = Ext.data.StoreManager.lookup('store_ipm_host_manager_list');
                            store.loadData(record);

                            if(data.list !== null){
                                if(store.data.items.length !==0){
                                    Ext.getCmp('ipm_host_inter').setValue(store.data.items[0].data.name);
                                }
                                else{
                                    if(me.record){
                                        Ext.getCmp('ipm_host_inter').setValue(me.record.data.name);
                                    }
                                }
                            }

                            if(me.mode === "monitor"){
                                var ip_record = [];
                                var mac_record = [];

                                ip_record.push({'ip':me.record.data.ip});
                                mac_record.push({'mac':me.record.data.mac});

                                if(ip_record.length === 0){
                                    ip_record.push({'ip':''});
                                    ip_record.push({'ip':''});
                                    ip_record.push({'ip':''});
                                    ip_record.push({'ip':''});
                                }
                                else if(ip_record.length === 1){
                                    ip_record.push({'ip':''});
                                    ip_record.push({'ip':''});
                                    ip_record.push({'ip':''});
                                }
                                else if(ip_record.length === 2){
                                    ip_record.push({'ip':''});
                                    ip_record.push({'ip':''});
                                }
                                else if(ip_record.length === 3){
                                    ip_record.push({'ip':''});
                                }

                                if(mac_record.length === 0){
                                    mac_record.push({'mac':''});
                                    mac_record.push({'mac':''});
                                    mac_record.push({'mac':''});
                                    mac_record.push({'mac':''});
                                }
                                else if(mac_record.length === 1){
                                    mac_record.push({'mac':''});
                                    mac_record.push({'mac':''});
                                    mac_record.push({'mac':''});
                                }
                                else if(mac_record.length === 2){
                                    mac_record.push({'mac':''});
                                    mac_record.push({'mac':''});
                                }
                                else if(mac_record.length === 3){
                                    mac_record.push({'mac':''});
                                }

                                Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
                                Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);
                            }
                            else if(me.edit === "edit"){
                                //                         Ext.suspendLayouts();
                                //                         me.setTitle('허용 호스트 수정');
                                var inter_value;

                                for(var i in store.data.items){
                                    if(me.record.data.interface === store.data.items[i].data.interface && me.record.data.name === store.data.items[i].data.name && me.record.data.network_manager === store.data.items[i].data.ip && me.record.data.action === store.data.items[i].data.action){
                                        inter_value = store.data.items[i].data.name;
                                    }
                                }

                                Ext.getCmp('ipm_host_inter').setValue(inter_value);
                                Ext.getCmp('ipm_host_desc').setValue(me.record.data.desc);

                                var ip_record = [];
                                var mac_record = [];
                                var period_record = [];
                                var time_record = [];

                                for(var k in me.record.data.ip){
                                    if(me.record.data.ip[k] !== null){
                                        ip_record.push({'ip':me.record.data.ip[k]});
                                    }
                                    else{ ip_record.push({'ip':''}); }
                                }
                                for(var l in me.record.data.mac){
                                    if(me.record.data.mac[l] !== null){
                                        mac_record.push({'mac':me.record.data.mac[l]});
                                    }
                                    else{ mac_record.push({'mac':''}); }
                                }
                                ip_record.sort(function(a,b){
                                    if(a.ip > b.ip){ return -1; }
                                    else{ return 1; }
                                });
                                mac_record.sort(function(a,b){
                                    if(a.mac > b.mac){ return -1; }
                                    else{ return 1; }
                                });
                                //                         if(ip_record.length === 0){ ip_record.push({'ip':''}); }
                                Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
                                Ext.getCmp('ipm_host_ip_grid').getView().refresh();
                                //                         if(mac_record.length === 0){ mac_record.push({'mac':''}); }
                                Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);
                                Ext.getCmp('ipm_host_mac_grid').getView().refresh();
                                Ext.getCmp('ipm_host_tab').setActiveTab(1);

                                if(me.record.data.schedule.length !== 0){
                                    var month_cnt = 0;
                                    var day_cnt = 0;
                                    var week_cnt = 0;

                                    var s_unix = unixTimeConvert(me.record.data.schedule.s_date,"YMDHM","GMT");
                                    var d_unix = unixTimeConvert(me.record.data.schedule.e_date,"YMDHM","GMT");
                                    var s_time = s_unix.split(':');
                                    var d_time = d_unix.split(':');
                                    var src_time = s_time[0].split(' ');
                                    var dst_time = d_time[0].split(' ');
                                    time_record.push({ 'src_date' : src_time[0], 'src_h' : src_time[1], 'dst_date' : dst_time[0], 'dst_h' : dst_time[1] });

                                    console.log(time_record);
                                    //                             if(time_record.length === 0){ time_record.push({ 'src_h' : '', 'src_m' : '', 'dst_h' : '', 'dst_m' : '' }); }
                                    Ext.getCmp('ipm_sel_hour_grid').getStore().loadData(time_record);
                                    Ext.getCmp('ipm_sel_hour_grid').getView().refresh();
                                    Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(0, 0);
                                    Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(0, 4);
                                    Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').completeEdit();
                                }

                                //                         Ext.getCmp('ipm_host_tab').setActiveTab(0);
                                //                         Ext.resumeLayouts();
                            }
                        }
                    );

                }
            }
        });
    },

    onWindowRender: function(component, eOpts) {
        var ip_store = {
            data:[
                { 'ip' : '' },
                { 'ip' : '' },
                { 'ip' : '' },
                { 'ip' : '' }
            ],
            fields:[
                { name: 'ip' }
            ]
        };

        var mac_store = {
            data:[
                { 'mac' : '' },
                { 'mac' : '' },
                { 'mac' : '' },
                { 'mac' : '' }
            ],
            fields:[
                { name: 'mac' }
            ]
        };

        var date_store = {
            data:[
                {
                    'src' : '',
                    'dst' : ''
                }
            ],
            fields:[
                { name: 'src' },
                { name: 'dst' }
            ]
        };

        var hour_store = {
            data:[
                {
                    'src_date' : '',
                    'src_h' : '',
                    'dst_date' : '',
                    'dst_h' : ''
                }
            ],
            fields:[
                { name: 'src_h' },
                { name: 'src_m' },
                { name: 'dst_h' },
                { name: 'dst_m' }
            ]
        };

        Ext.getCmp('ipm_host_ip_grid').reconfigure(ip_store);
        Ext.getCmp('ipm_host_mac_grid').reconfigure(mac_store);
        Ext.getCmp('ipm_sel_date_grid').reconfigure(date_store);
        Ext.getCmp('ipm_sel_hour_grid').reconfigure(hour_store);

        for(var i = 1; i<13; i++){
            var month_btn = Ext.create('Ext.Button',{
                text : i,
                id : 'ipm_m_btn'+i,
                width : 30,
                listeners : {
                    click : function(){
                        var m_btn_chk = 0;
                        for(var i = 1; i<13; i++){
                            if(Ext.getCmp('ipm_m_btn'+i).pressed){ m_btn_chk++; }
                        }

                        if(m_btn_chk === 12){ Ext.getCmp('ipm_host_m_chk').setValue(true); }
                        else{ Ext.getCmp('ipm_host_m_chk').btn_c = true; Ext.getCmp('ipm_host_m_chk').setValue(false); }
                    }
                }
            });

            Ext.getCmp('ipm_host_month').add(month_btn);
        }

        var day = ['일', '월', '화', '수', '목', '금', '토'];

        for(var j = 0; j<day.length ;j++){
            var day_btn = Ext.create('Ext.Button',{
                text : day[j],
                id : 'ipm_d_btn'+j,
                width : 40,
                listeners : {
                    click : function(){
                        var m_btn_chk = 0;
                        for(var i = 0; i<7; i++){
                            if(Ext.getCmp('ipm_d_btn'+i).pressed){ m_btn_chk++; }
                        }

                        if(m_btn_chk === 7){ Ext.getCmp('ipm_host_d_chk').setValue(true); }
                        else{ Ext.getCmp('ipm_host_d_chk').btn_c = true; Ext.getCmp('ipm_host_d_chk').setValue(false); }
                    }
                }
            });

            Ext.getCmp('ipm_host_day').add(day_btn);
        }

        for(var k = 0; k<5; k++){
            var margin = '';

            if(k === 0){ margin = '0 0 0 0'; }
            else{ margin = '-1 0 0 0'; }
            var date_seg = Ext.create('Ext.button.Segmented', {
                id : 'ipm_host_date'+k,
                cls : 'zen_seg',
                margin : margin,
                allowMultiple: true,
            });

            for(var l = 1; l<8; l++){
                var date = (k*7)+l;
                if(date > 31){ break; }
                var date_btn = Ext.create('Ext.Button',{
                    text : date,
                    id : 'ipm_date_btn'+date,
                    width : 40,
                    listeners : {
                        click : function(){
                            var m_btn_chk = 0;
                            for(var i = 1; i<32; i++){
                                if(Ext.getCmp('ipm_date_btn'+i).pressed){ m_btn_chk++; }
                            }

                            if(m_btn_chk === 31){ Ext.getCmp('ipm_host_d_chk').setValue(true); }
                            else{ Ext.getCmp('ipm_host_date_chk').btn_c = true; Ext.getCmp('ipm_host_date_chk').setValue(false); }
                        }
                    }
                });

                date_seg.add(date_btn);
            }

            Ext.getCmp('ipm_host_date_con').add(date_seg);
        }
    },

    set_win: function(btn) {
        if(btn==="no"){
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }else{
            Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
            Ext.getCmp('ipm_host_desc').reset();

            var store = Ext.getCmp('ipm_host_inter').getStore();

            if(store.getCount() > 0){ Ext.getCmp('ipm_host_inter').setValue(store.data.items[0].data.name); }

            Ext.getCmp('ipm_host_ip_grid').getStore().removeAll();
            Ext.getCmp('ipm_host_mac_grid').getStore().removeAll();
            Ext.getCmp('ipm_sel_date_grid').getStore().removeAll();
            Ext.getCmp('ipm_sel_hour_grid').getStore().removeAll();

            var ip_record = [{ 'ip' : '' },{ 'ip' : '' },{ 'ip' : '' },{ 'ip' : '' }];
            var mac_record = [{ 'mac' : '' },{ 'mac' : '' },{ 'mac' : '' },{ 'mac' : '' }];
            var date_record = [{ 'src' : '', 'dst' : '' }];
            var hour_record = [{ 'src_h' : '', 'src_m' : '', 'dst_h' : '', 'dst_m' : '' }];

            Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
            Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);
            Ext.getCmp('ipm_sel_date_grid').getStore().loadData(date_record);
            Ext.getCmp('ipm_sel_hour_grid').getStore().loadData(hour_record);

            for(var i=1;i<13;i++){ Ext.getCmp('ipm_m_btn'+i).toggle(false); }
            for(var i=0;i<7;i++){ Ext.getCmp('ipm_d_btn'+i).toggle(false); }
            for(var i=1;i<32;i++){ Ext.getCmp('ipm_date_btn'+i).toggle(false); }

            Ext.getCmp('ipm_host_tab').setActiveTab(0);
        }
    }

});