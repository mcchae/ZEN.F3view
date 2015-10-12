
Ext.define('NFW2.view.win_antivirus_profile', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antivirus_profile',

    requires: [
        'NFW2.view.win_antivirus_profileViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.Label',
        'Ext.form.field.Radio',
        'Ext.form.FieldSet',
        'Ext.Img',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'win_antivirus_profile'
    },
    cls: 'zen_win',
    id: 'win_antivirus_profile',
    maxHeight: 630,
    resizable: false,
    scrollable: {
        x: false,
        y: true
    },
    width: 680,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_antivirus',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    width: 615,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp('win_antivirus_profile');
                                var store = Ext.data.StoreManager.lookup('store_antivirus_list');

                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(me.set_btn === true){
                                    if(me.edit === "edit"){
                                        var chk_num = 0;
                                        for(var i in store.data.items){
                                            if(store.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){

                                                if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                                            }
                                        }
                                        if(chk_num > 0){ return get_msg('err_objname'); }
                                    }
                                    else{
                                        for(var i in store.data.items){
                                            if(store.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){ return get_msg('err_objname'); }
                                        }
                                    }
                                    me.set_btn = false;
                                }

                                return true;
                            },
                            fieldInfo: {
                                txt: __zen('character_tip')
                            },
                            id: 'win_profile_name',
                            width: 300,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z-_!@\#$%^&*()<>\/`~+,.:;\'\"?\[\]\{\}\\\|=]/,
                            maxLength: 20,
                            bind: {
                                fieldLabel: '{profile_name}'
                            },
                            listeners: {
                                errorchange: 'onWin_profile_nameErrorChange',
                                blur: 'onWin_profile_nameBlur',
                                keydown: 'onWin_profile_nameKeydown',
                                focus: 'onWin_profile_nameFocus'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    cls: 'zen_tab',
                    id: 'antivirus_tab',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            bind: {
                                title: '{smtp}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 615,
                                    items: [
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
                                                    width: 170,
                                                    bind: {
                                                        text: '{search_method}'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_smtp_11',
                                                    listeners: {
                                                        change: 'onRadio_smtp_11Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{inactive}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_smtp_12',
                                                    listeners: {
                                                        change: 'onRadio_smtp_12Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{stream}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender1'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_smtp_13',
                                                    labelSeparator: ' ',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onRadio_smtp_13Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{file}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender2'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'smtp_con',
                                            margin: '8 0 0 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 170,
                                                    bind: {
                                                        text: '{handling_method}'
                                                    }
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
                                                            id: 'smtp_con_1',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'radio_smtp_21',
                                                                    listeners: {
                                                                        change: 'onRadio_smtp_21Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    flex: 1,
                                                                    margin: '3 0 0 5',
                                                                    width: 160,
                                                                    bind: {
                                                                        text: '{deny_receive}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender3'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(value !== true){
                                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                            if(!ValidEmail(value)){ return get_msg('err_email'); }
                                                                        }
                                                                        return true;
                                                                    },
                                                                    disabled: true,
                                                                    id: 'sp_block_email',
                                                                    width: 230,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        blur: 'onSp_block_emailBlur',
                                                                        errorchange: 'onSp_block_emailErrorChange',
                                                                        keydown: 'onSp_block_emailKeydown'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'smtp_con_2',
                                                            margin: '8 0 0 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'radio_smtp_22',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onRadio_smtp_22Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    flex: 1,
                                                                    margin: '3 0 0 5',
                                                                    width: 160,
                                                                    bind: {
                                                                        text: '{detect_head}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender4'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: __zen('character_tip')
                                                                    },
                                                                    id: 'sp_addtitle',
                                                                    width: 230,
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 120,
                                                                    msgTarget: 'none',
                                                                    value: '[VIRUS]',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9a-zA-Z-_!@\#$%^&*()<>\/`~+,.:;\'\"?\[\]\{\}\\\|=]/,
                                                                    maxLength: 20,
                                                                    listeners: {
                                                                        errorchange: 'onSp_addtitleErrorChange',
                                                                        blur: 'onSp_addtitleBlur',
                                                                        keydown: 'onSp_addtitleKeydown',
                                                                        focus: 'onSp_addtitleFocus'
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
                                            hidden: true,
                                            margin: '8 0 0 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 129,
                                                    text: '알람 메일'
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
                                                            id: 'radio_smtp_al1',
                                                            width: 100,
                                                            boxLabel: '차단',
                                                            checked: true,
                                                            listeners: {
                                                                change: 'onRadio_mstp_al1Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'radio_smtp_al2',
                                                            width: 80,
                                                            boxLabel: '탐지',
                                                            listeners: {
                                                                change: 'onRadio_mstp_al2Change'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    if(value !== ""){
                                                                        if(!ValidEmail(value)){ return get_msg('err_email'); }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            id: 'smtp_email',
                                                            width: 250,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                blur: 'onSmtp_emailBlur',
                                                                errorchange: 'onSmtp_emailErrorChange',
                                                                keydown: 'onSmtp_emailKeydown'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'smtp_file_scan_con',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    id: 'smtp_filescan',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            margin: '8 0 3 -10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'image',
                                                                    margin: '0 1 0 10',
                                                                    maxHeight: 6,
                                                                    width: 8,
                                                                    src: '../images/bul_req.png'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    width: 200,
                                                                    bind: {
                                                                        text: '{max_search_file}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                        if(!LengthCheck(value, 1, 20)){ return ValidLimit(1, 20); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length(1,
                                                                        20,
                                                                        null)
                                                                    },
                                                                    cls: 'inp_unit',
                                                                    id: 'smtp_filescan_size',
                                                                    margin: '0 0 0 -10',
                                                                    width: 110,
                                                                    afterBodyEl: [
                                                                        '<div class="inp_after">{[__zen("mbyte")]}</div>'
                                                                    ],
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 130,
                                                                    msgTarget: 'none',
                                                                    value: '10',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    maxLength: 2,
                                                                    listeners: {
                                                                        errorchange: 'onTextfieldErrorChange2',
                                                                        keydown: 'onTextfieldKeydown2',
                                                                        blur: 'onFilescan_sizeBlur2',
                                                                        focus: 'onFilescan_sizeFocus2'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'smtp_radio_filescan1',
                                                                    margin: '0 0 0 10',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onFtp_radio_filescan1Change1'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{deny}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender5'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'smtp_radio_filescan2',
                                                                    listeners: {
                                                                        change: 'onFtp_radio_filescan2Change1'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{allow}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender6'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '8 0 10 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    width: 190,
                                                                    bind: {
                                                                        text: '{search_compress}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'smtp_radio_file1',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onRadiofieldChange3'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{search2}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender7'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'smtp_radio_file2',
                                                                    listeners: {
                                                                        change: 'onRadiofieldChange12'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{unsearch}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender8'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            width: 570,
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '5 0 5 0',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            id: 'win_btn_add2',
                                                                            iconCls: 'icb_add',
                                                                            bind: {
                                                                                text: '{add}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onWin_btn_addClick2',
                                                                                blur: 'onWin_btn_addBlur2'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            componentCls: 'btn_auth',
                                                                            id: 'win_btn_del2',
                                                                            margin: '0 0 0 5',
                                                                            iconCls: 'icb_del',
                                                                            bind: {
                                                                                text: '{del}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onWin_btn_delClick2',
                                                                                blur: 'onWin_btn_del2Blur'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            flex: 1,
                                                                            cls: 'zen_toolbar',
                                                                            hidden: true
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    cls: 'in_grid',
                                                                    id: 'grid_smtp_filefilter',
                                                                    margin: '0 0 10 0',
                                                                    maxHeight: 120,
                                                                    scrollable: {
                                                                        x: false,
                                                                        y: true
                                                                    },
                                                                    header: false,
                                                                    title: 'My Grid Panel',
                                                                    titleCollapse: true,
                                                                    columnLines: true,
                                                                    sortableColumns: false,
                                                                    store: 'store_antivirus_smtp_filter',
                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            width: 60,
                                                                            align: 'center',
                                                                            dataIndex: '@num',
                                                                            menuDisabled: true,
                                                                            bind: {
                                                                                text: '{rank}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            id: 'test_id4',
                                                                            dataIndex: 'item',
                                                                            menuDisabled: true,
                                                                            flex: 1,
                                                                            bind: {
                                                                                text: '{file}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                if(value === "on"){ return "검사"; }
                                                                                else{ return "미 검사"; }
                                                                            },
                                                                            id: 'test_id5',
                                                                            dataIndex: 'chk',
                                                                            menuDisabled: true,
                                                                            flex: 0.5,
                                                                            bind: {
                                                                                text: '{action}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'actioncolumn',
                                                                            hidden: true,
                                                                            width: 45,
                                                                            align: 'center',
                                                                            menuDisabled: true,
                                                                            items: [
                                                                                {
                                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                        // var tbl = Ext.getCmp("grid_filefilter");
                                                                                        // var tbl_sel = tbl.getSelectionModel().getSelection();

                                                                                        var store = Ext.data.StoreManager.lookup('store_antivirus_filter');
                                                                                        store.removeAt(rowIndex);

                                                                                        // var records = [];
                                                                                        // var chk = false;

                                                                                        // if(tbl_sel.length === 0){
                                                                                        //     Ext.Msg.alert("",get_msg("sel_del"));
                                                                                        //     return false;

                                                                                        // }else{
                                                                                        //     for(var i in store.data.items){
                                                                                        //         chk = false;
                                                                                        //         for(var j in tbl_sel){
                                                                                        //             if(store.data.items[i].data['@num'] === tbl_sel[j].data['@num']){
                                                                                        //                 chk = true;
                                                                                        //             }
                                                                                        //         }
                                                                                        //         if(chk === false){records.push(store.data.items[i]);}
                                                                                        //     }

                                                                                        //     for(var i in records){
                                                                                        //         records[i].data['@num'] = Number(i)+1;
                                                                                        //     }
                                                                                        // }
                                                                                        // store.loadData(records);
                                                                                    },
                                                                                    iconCls: 'icr_del'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    viewConfig: {
                                                                        markDirty: false
                                                                    },
                                                                    listeners: {
                                                                        celldblclick: 'onGrid_filefilterCellDblClick2'
                                                                    },
                                                                    selModel: {
                                                                        selType: 'checkboxmodel'
                                                                    }
                                                                }
                                                            ],
                                                            listeners: {
                                                                render: 'onFieldsetRender'
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        render: 'onSmtp_filescanRender'
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
                            cls: 'zen_tab_body',
                            bind: {
                                title: '{http}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 615,
                                    items: [
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
                                                    width: 170,
                                                    bind: {
                                                        text: '{search_method}'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_http_11',
                                                    listeners: {
                                                        change: 'onRadio_http_11Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{inactive}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender9'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_http_12',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onRadio_http_12Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{stream}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender10'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'http_action',
                                            margin: '8 0 0 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 170,
                                                    bind: {
                                                        text: '{handling_method}'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_http_21',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onRadio_http_21Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{deny}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender11'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_http_22',
                                                    listeners: {
                                                        change: 'onRadio_http_22Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{detect}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender12'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            hidden: true,
                                            margin: '8 0 0 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 129,
                                                    text: '알람 메일'
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
                                                            id: 'radio_http_al1',
                                                            width: 100,
                                                            boxLabel: '차단',
                                                            checked: true,
                                                            listeners: {
                                                                change: 'onRadio_mstp_al1Change1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'radio_http_al2',
                                                            width: 80,
                                                            boxLabel: '탐지',
                                                            listeners: {
                                                                change: 'onRadio_mstp_al2Change1'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    if(value !== ""){
                                                                        if(!ValidEmail(value)){ return get_msg('err_email'); }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            id: 'http_email',
                                                            width: 250,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                errorchange: 'onHttp_emailErrorChange',
                                                                blur: 'onHttp_emailBlur',
                                                                keydown: 'onHttp_emailKeydown'
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
                            bind: {
                                title: '{ftp}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 615,
                                    items: [
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
                                                    width: 170,
                                                    bind: {
                                                        text: '{search_method}'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_ftp_11',
                                                    listeners: {
                                                        change: 'onRadio_ftp_11Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{inactive}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender13'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_ftp_12',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onRadio_ftp_12Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{stream}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender14'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_ftp_13',
                                                    listeners: {
                                                        change: 'onRadio_ftp_13Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{file}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender15'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'ftp_action',
                                            margin: '8 0 10 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 170,
                                                    bind: {
                                                        text: '{handling_method}'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_ftp_21',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onRadio_ftp_21Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{deny}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender16'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'radio_ftp_22',
                                                    listeners: {
                                                        change: 'onRadio_ftp_22Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{detect}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender17'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            hidden: true,
                                            margin: '8 0 0 10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 129,
                                                    text: '알람 메일'
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
                                                            id: 'radio_ftp_al1',
                                                            width: 100,
                                                            boxLabel: '차단',
                                                            checked: true,
                                                            listeners: {
                                                                change: 'onRadio_mstp_al1Change11'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'radio_ftp_al2',
                                                            width: 80,
                                                            boxLabel: '탐지',
                                                            listeners: {
                                                                change: 'onRadio_mstp_al2Change11'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    if(value !== ""){
                                                                        if(!ValidEmail(value)){ return get_msg('err_email'); }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            id: 'ftp_email',
                                                            width: 250,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                errorchange: 'onFtp_emailErrorChange',
                                                                blur: 'onFtp_emailBlur',
                                                                keydown: 'onFtp_emailKeydown'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            disabled: true,
                                            id: 'ftp_file_scan_con',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    id: 'ftp_filescan',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            margin: '8 0 3 -10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'image',
                                                                    margin: '0 1 0 10',
                                                                    maxHeight: 6,
                                                                    width: 8,
                                                                    src: '../images/bul_req.png'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    width: 200,
                                                                    bind: {
                                                                        text: '{max_search_file}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                        if(!LengthCheck(value, 1, 20)){ return ValidLimit(1, 20); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length(1,
                                                                        20,
                                                                        null)
                                                                    },
                                                                    cls: 'inp_unit',
                                                                    id: 'ftp_filescan_size',
                                                                    margin: '0 0 0 -10',
                                                                    width: 110,
                                                                    afterBodyEl: [
                                                                        '<div class="inp_after">{[__zen("mbyte")]}</div>'
                                                                    ],
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 130,
                                                                    msgTarget: 'none',
                                                                    value: '10',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    maxLength: 2,
                                                                    listeners: {
                                                                        errorchange: 'onTextfieldErrorChange1',
                                                                        keydown: 'onTextfieldKeydown1',
                                                                        blur: 'onFilescan_sizeBlur1',
                                                                        focus: 'onFilescan_sizeFocus1'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'ftp_radio_filescan1',
                                                                    margin: '0 0 0 10',
                                                                    listeners: {
                                                                        change: 'onFtp_radio_filescan1Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{deny}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender18'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'ftp_radio_filescan2',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onFtp_radio_filescan2Change'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    bind: {
                                                                        text: '{allow}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender19'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 0 5 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    width: 190,
                                                                    bind: {
                                                                        text: '{search_compress}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'ftp_radio_file1',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: 'onRadiofieldChange2'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    width: 100,
                                                                    bind: {
                                                                        text: '{search2}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender20'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'ftp_radio_file2',
                                                                    listeners: {
                                                                        change: 'onRadiofieldChange11'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 5',
                                                                    bind: {
                                                                        text: '{unsearch}'
                                                                    },
                                                                    listeners: {
                                                                        render: 'onLabelRender21'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            width: 570,
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '5 0 5 0',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            id: 'win_btn_add1',
                                                                            iconCls: 'icb_add',
                                                                            bind: {
                                                                                text: '{add}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onWin_btn_addClick1',
                                                                                blur: 'onWin_btn_addBlur1'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            componentCls: 'btn_auth',
                                                                            id: 'win_btn_del1',
                                                                            margin: '0 0 0 5',
                                                                            iconCls: 'icb_del',
                                                                            bind: {
                                                                                text: '{del}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onWin_btn_delClick1',
                                                                                blur: 'onWin_btn_del1Blur'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            flex: 1,
                                                                            cls: 'zen_toolbar',
                                                                            hidden: true
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    cls: 'in_grid',
                                                                    id: 'grid_ftp_filefilter',
                                                                    margin: '0 0 10 0',
                                                                    maxHeight: 120,
                                                                    scrollable: {
                                                                        x: false,
                                                                        y: true
                                                                    },
                                                                    header: false,
                                                                    title: 'My Grid Panel',
                                                                    titleCollapse: true,
                                                                    columnLines: true,
                                                                    sortableColumns: false,
                                                                    store: 'store_antivirus_ftp_filter',
                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            width: 60,
                                                                            align: 'center',
                                                                            dataIndex: '@num',
                                                                            menuDisabled: true,
                                                                            bind: {
                                                                                text: '{rank}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            id: 'test_id1',
                                                                            dataIndex: 'item',
                                                                            menuDisabled: true,
                                                                            flex: 1,
                                                                            bind: {
                                                                                text: '{file}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                if(value === "on"){ return "검사"; }
                                                                                else{ return "미 검사"; }
                                                                            },
                                                                            id: 'test_id3',
                                                                            dataIndex: 'chk',
                                                                            menuDisabled: true,
                                                                            flex: 0.5,
                                                                            bind: {
                                                                                text: '{action}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'actioncolumn',
                                                                            hidden: true,
                                                                            width: 45,
                                                                            align: 'center',
                                                                            menuDisabled: true,
                                                                            items: [
                                                                                {
                                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                        // var tbl = Ext.getCmp("grid_filefilter");
                                                                                        // var tbl_sel = tbl.getSelectionModel().getSelection();

                                                                                        var store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter');
                                                                                        store.removeAt(rowIndex,1);
                                                                                        // var records = [];
                                                                                        // var chk = false;

                                                                                        // if(tbl_sel.length === 0){
                                                                                        //     Ext.Msg.alert("",get_msg("sel_del"));
                                                                                        //     return false;

                                                                                        // }else{
                                                                                        //     for(var i in store.data.items){
                                                                                        //         chk = false;
                                                                                        //         for(var j in tbl_sel){
                                                                                        //             if(store.data.items[i].data['@num'] === tbl_sel[j].data['@num']){
                                                                                        //                 chk = true;
                                                                                        //             }
                                                                                        //         }
                                                                                        //         if(chk === false){records.push(store.data.items[i]);}
                                                                                        //     }

                                                                                        //     for(var i in records){
                                                                                        //         records[i].data['@num'] = Number(i)+1;
                                                                                        //     }
                                                                                        // }
                                                                                        // store.loadData(records);
                                                                                    },
                                                                                    iconCls: 'icr_del'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    viewConfig: {
                                                                        markDirty: false
                                                                    },
                                                                    listeners: {
                                                                        celldblclick: 'onGrid_filefilterCellDblClick1'
                                                                    },
                                                                    selModel: {
                                                                        selType: 'checkboxmodel'
                                                                    }
                                                                }
                                                            ],
                                                            listeners: {
                                                                render: 'onFieldsetRender1'
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        render: 'onFtp_filescanRender'
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
                afterrender: 'onFormAfterRender'
            }
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
                    id: 'win_btn_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onWin_btn_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onWin_btn_cancelClick'
                    }
                }
            ]
        }
    ],

    onWin_profile_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_profile_nameBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_profile_name').validateValue(true);
    },

    onWin_profile_nameKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_profile_nameFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onRadio_smtp_11Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('radio_smtp_12').setValue(false);
            Ext.getCmp('radio_smtp_13').setValue(false);
            Ext.getCmp('smtp_con').setDisabled(true);
            Ext.getCmp('smtp_file_scan_con').setDisabled(true);
        }
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_smtp_11').getValue()){ Ext.getCmp('radio_smtp_11').setValue(true); }
        }, component);
    },

    onRadio_smtp_12Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('radio_smtp_11').setValue(false);
            Ext.getCmp('radio_smtp_13').setValue(false);
            Ext.getCmp('smtp_con').enable();
            Ext.getCmp('smtp_file_scan_con').setDisabled(true);
        }
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_smtp_12').getValue()){ Ext.getCmp('radio_smtp_12').setValue(true); }
        }, component);
    },

    onRadio_smtp_13Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('radio_smtp_11').setValue(false);
            Ext.getCmp('radio_smtp_12').setValue(false);
            Ext.getCmp('smtp_con').setDisabled(false);
            Ext.getCmp('smtp_file_scan_con').setDisabled(false);
        }
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_smtp_13').getValue()){ Ext.getCmp('radio_smtp_13').setValue(true); }
        }, component);
    },

    onRadio_smtp_21Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_smtp_22').setValue(false);
            Ext.getCmp('sp_addtitle').setDisabled(true);
            Ext.getCmp('sp_block_email').enable(true);
        }
    },

    onLabelRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_smtp_21').getValue()){ Ext.getCmp('radio_smtp_21').setValue(true); }
        }, component);
    },

    onSp_block_emailBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onSp_block_emailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSp_block_emailKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onRadio_smtp_22Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_smtp_21').setValue(false);
            Ext.getCmp('sp_addtitle').setDisabled(false);
            Ext.getCmp('sp_block_email').disable(true);
        }
    },

    onLabelRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_smtp_22').getValue()){ Ext.getCmp('radio_smtp_22').setValue(true); }
        }, component);
    },

    onSp_addtitleErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSp_addtitleBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('sp_addtitle').validateValue(true);
    },

    onSp_addtitleKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onSp_addtitleFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onRadio_mstp_al1Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
        }
        else{
            if(Ext.getCmp('radio_smtp_al2').getValue() === false){
                Ext.getCmp('radio_smtp_al2').setValue(true);
            }
        }
    },

    onRadio_mstp_al2Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
        }
        else{
            if(Ext.getCmp('radio_smtp_al1').getValue() === false){
                Ext.getCmp('radio_smtp_al1').setValue(true);
            }
        }
    },

    onSmtp_emailBlur: function(component, event, eOpts) {
        Ext.getCmp('smtp_email').validateValue(true);
    },

    onSmtp_emailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSmtp_emailKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown2: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFilescan_sizeBlur2: function(component, event, eOpts) {
        Ext.getCmp('smtp_filescan_size').validateValue(true);
        setTipBlur(this,component);
    },

    onFilescan_sizeFocus2: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFtp_radio_filescan1Change1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('smtp_radio_filescan2').setValue(false);
        }
    },

    onLabelRender5: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('smtp_radio_filescan1').getValue()){ Ext.getCmp('smtp_radio_filescan1').setValue(true); }
        }, component);
    },

    onFtp_radio_filescan2Change1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('smtp_radio_filescan1').setValue(false);
        }
    },

    onLabelRender6: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('smtp_radio_filescan2').getValue()){ Ext.getCmp('smtp_radio_filescan2').setValue(true); }
        }, component);
    },

    onRadiofieldChange3: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('smtp_radio_file2').setValue(false);
            Ext.getCmp('smtp_radio_file1').setValue(true);
        }
    },

    onLabelRender7: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('smtp_radio_file1').getValue()){ Ext.getCmp('smtp_radio_file1').setValue(true); }
        }, component);
    },

    onRadiofieldChange12: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('smtp_radio_file1').setValue(false);
            Ext.getCmp('smtp_radio_file2').setValue(true);
        }
    },

    onLabelRender8: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('smtp_radio_file2').getValue()){ Ext.getCmp('smtp_radio_file2').setValue(true); }
        }, component);
    },

    onWin_btn_addClick2: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter');

        if(store.getCount() > 29){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(30));

            return false;
        }
        else{
            var win = Ext.create('NFW2.view.win_antivirus_filefilter',{
                modal : true,
                mode : 'smtp'
            });

            win.show();
        }
    },

    onWin_btn_addBlur2: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_delClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_smtp_filefilter");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter');

        var records = [];
        var chk = false;

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{
            for(var i in store.data.items){
                chk = false;
                for(var j in tbl_sel){
                    if(tbl_sel[j].data['@num'] === 30){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(__zen('basic_setting_del'));
                        return false;
                    }
                    if(store.data.items[i].data['@num'] === tbl_sel[j].data['@num']){
                        chk = true;
                    }
                }
                if(chk === false){records.push(store.data.items[i]);}
            }

            for(var i in records){
                if(records[i].data['@num'] !== 30){
                    records[i].data['@num'] = Number(i)+1;
                }
            }
        }
        store.loadData(records);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_del2Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onGrid_filefilterCellDblClick2: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_antivirus_filefilter',{
            edit : "edit",
            num : record.data['@num'],
            modal : true,
            mode : 'smtp'
        });

        win.show();
    },

    onFieldsetRender: function(component, eOpts) {
        component.setTitle(__zen('file_filter'));
    },

    onSmtp_filescanRender: function(component, eOpts) {
        component.setTitle(__zen('file_setting'));
    },

    onRadio_http_11Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_http_12').setValue(false);
            Ext.getCmp('http_action').setDisabled(true);
        }
    },

    onLabelRender9: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_http_11').getValue()){ Ext.getCmp('radio_http_11').setValue(true); }
        }, component);
    },

    onRadio_http_12Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_http_11').setValue(false);
            Ext.getCmp('http_action').setDisabled(false);
        }
    },

    onLabelRender10: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_http_12').getValue()){ Ext.getCmp('radio_http_12').setValue(true); }
        }, component);
    },

    onRadio_http_21Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_http_22').setValue(false);
        }
    },

    onLabelRender11: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_http_21').getValue()){ Ext.getCmp('radio_http_21').setValue(true); }
        }, component);
    },

    onRadio_http_22Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_http_21').setValue(false);
        }
    },

    onLabelRender12: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_http_22').getValue()){ Ext.getCmp('radio_http_22').setValue(true); }
        }, component);
    },

    onRadio_mstp_al1Change1: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
        }
        else{
            if(Ext.getCmp('radio_http_al2').getValue() === false){
                Ext.getCmp('radio_http_al2').setValue(true);
            }
        }
    },

    onRadio_mstp_al2Change1: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
        }
        else{
            if(Ext.getCmp('radio_http_al1').getValue() === false){
                Ext.getCmp('radio_http_al1').setValue(true);
            }
        }
    },

    onHttp_emailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onHttp_emailBlur: function(component, event, eOpts) {
        Ext.getCmp('http_email').validateValue(true);
    },

    onHttp_emailKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onRadio_ftp_11Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_ftp_12').setValue(false);
            Ext.getCmp('radio_ftp_13').setValue(false);
            Ext.getCmp('ftp_action').disable(true);
            Ext.getCmp('ftp_file_scan_con').setDisabled(true);
        }
    },

    onLabelRender13: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_ftp_11').getValue()){ Ext.getCmp('radio_ftp_11').setValue(true); }
        }, component);
    },

    onRadio_ftp_12Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_ftp_11').setValue(false);
            Ext.getCmp('radio_ftp_13').setValue(false);
            Ext.getCmp('ftp_action').enable(true);
            Ext.getCmp('ftp_file_scan_con').setDisabled(true);
        }
    },

    onLabelRender14: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_ftp_12').getValue()){ Ext.getCmp('radio_ftp_12').setValue(true); }
        }, component);
    },

    onRadio_ftp_13Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_ftp_11').setValue(false);
            Ext.getCmp('radio_ftp_12').setValue(false);
            Ext.getCmp('ftp_action').disable(false);
            Ext.getCmp('ftp_file_scan_con').setDisabled(false);
        }
    },

    onLabelRender15: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_ftp_13').getValue()){ Ext.getCmp('radio_ftp_13').setValue(true); }
        }, component);
    },

    onRadio_ftp_21Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_ftp_22').setValue(false);
        }
    },

    onLabelRender16: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_ftp_21').getValue()){ Ext.getCmp('radio_ftp_21').setValue(true); }
        }, component);
    },

    onRadio_ftp_22Change: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('radio_ftp_21').setValue(false);
        }
    },

    onLabelRender17: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('radio_ftp_22').getValue()){ Ext.getCmp('radio_ftp_22').setValue(true); }
        }, component);
    },

    onRadio_mstp_al1Change11: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
        }
        else{
            if(Ext.getCmp('radio_ftp_al2').getValue() === false){
                Ext.getCmp('radio_ftp_al2').setValue(true);
            }
        }
    },

    onRadio_mstp_al2Change11: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
        }
        else{
            if(Ext.getCmp('radio_ftp_al1').getValue() === false){
                Ext.getCmp('radio_ftp_al1').setValue(true);
            }
        }
    },

    onFtp_emailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFtp_emailBlur: function(component, event, eOpts) {
        Ext.getCmp('ftp_email').validateValue(true);
    },

    onFtp_emailKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFilescan_sizeBlur1: function(component, event, eOpts) {
        Ext.getCmp('ftp_filescan_size').validateValue(true);
        setTipBlur(this,component);
    },

    onFilescan_sizeFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFtp_radio_filescan1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ftp_radio_filescan2').setValue(false);
        }
    },

    onLabelRender18: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('ftp_radio_filescan1').getValue()){ Ext.getCmp('ftp_radio_filescan1').setValue(true); }
        }, component);
    },

    onFtp_radio_filescan2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ftp_radio_filescan1').setValue(false);
        }
    },

    onLabelRender19: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
                    if(!Ext.getCmp('ftp_radio_filescan2').getValue()){ Ext.getCmp('ftp_radio_filescan2').setValue(true); }
                }, component);
    },

    onRadiofieldChange2: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('ftp_radio_file2').setValue(false);
        }
    },

    onLabelRender20: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
                    if(!Ext.getCmp('ftp_radio_file1').getValue()){ Ext.getCmp('ftp_radio_file1').setValue(true); }
                }, component);
    },

    onRadiofieldChange11: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.scroll_pst = me.body.dom.scrollTop;
        if(newValue){
            Ext.getCmp('ftp_radio_file1').setValue(false);
        }
    },

    onLabelRender21: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('ftp_radio_file2').getValue()){ Ext.getCmp('ftp_radio_file2').setValue(true); }
        }, component);
    },

    onWin_btn_addClick1: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter');

        if(store.getCount() > 29){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(30));
            //     Ext.Msg.show({
            //         title: 'WeGuardia™ DMC',
            //         msg: ValidMaxCnt(30),
            //         width: 300,
            //         buttons: Ext.Msg.OK,
            //         icon: Ext.window.MessageBox.INFO
            //     });

            return false;
        }
        else{
            //     var record = {
            //         'item' : '',
            //         'chk' : 'on'
            //     };

            //     store.add(record);

            var win = Ext.create('NFW2.view.win_antivirus_filefilter',{
                modal : true,
                mode : 'ftp'
            });

            win.show();
        }
    },

    onWin_btn_addBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_delClick1: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_ftp_filefilter");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter');

        var records = [];
        var chk = false;

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{
            for(var i in store.data.items){
                chk = false;
                for(var j in tbl_sel){
                    if(tbl_sel[j].data['@num'] === 30){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(__zen('basic_setting_del'));
                        return false;
                    }
                    if(store.data.items[i].data['@num'] === tbl_sel[j].data['@num']){
                        chk = true;
                    }
                }
                if(chk === false){records.push(store.data.items[i]);}
            }

            for(var i in records){
                if(records[i].data['@num'] !== 30){
                    records[i].data['@num'] = Number(i)+1;
                }
            }
        }

        store.loadData(records);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_del1Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onGrid_filefilterCellDblClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_antivirus_filefilter',{
            edit : "edit",
            num : record.data['@num'],
            modal : true,
            mode : 'ftp'
        });

        win.show();
    },

    onFieldsetRender1: function(component, eOpts) {
        component.setTitle(__zen('file_filter'));
    },

    onFtp_filescanRender: function(component, eOpts) {
        component.setTitle(__zen('file_setting'));
    },

    onFormAfterRender: function(component, eOpts) {
        var me = this;
        me.set_btn = false;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.scroll_pst = 3000;

        me.body.on('scroll', function(){
            if(me.scroll_pst !== 3000){
                me.body.dom.scrollTop = me.scroll_pst;
                me.scroll_pst = 3000;
            }
        });

        var smtp_store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter');
        var ftp_store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter');

        smtp_store.sort('sort_num','ASC');
        ftp_store.sort('sort_num','ASC');

        smtp_store.removeAll();
        ftp_store.removeAll();

        if(this.edit === "edit"){

            me.setTitle(__zen('edit_antivirus'));

            var smtp_record = [];
            var ftp_record = [];


            Ext.getCmp('win_profile_name').setValue(me.record.data.name);
            Ext.getCmp('smtp_filescan_size').setValue(me.record.data.mail.filescanopt.maxsize);
            Ext.getCmp('sp_addtitle').setValue(me.record.data.mail.addtitle);

            if(me.record.data.mail.scantype === "0"){ Ext.getCmp('radio_smtp_11').setValue(true); }
            else if(me.record.data.mail.scantype === "1"){ Ext.getCmp('radio_smtp_12').setValue(true); }
            else if(me.record.data.mail.scantype === "2"){ Ext.getCmp('radio_smtp_13').setValue(true); }
            if(me.record.data.mail.action === "0"){ Ext.getCmp('radio_smtp_21').setValue(true); }
            else if(me.record.data.mail.action === "1"){ Ext.getCmp('radio_smtp_22').setValue(true); }
            if(me.record.data.mail.ChangeReceiver !== ""){
                Ext.getCmp('sp_block_email').setValue(me.record.data.mail.ChangeReceiver);
            }
            if(me.record.data.mail.AlarmEvent === "0"){ Ext.getCmp('radio_smtp_al1').setValue(true); }
            else if(me.record.data.mail.AlarmEvent === "1"){ Ext.getCmp('radio_smtp_al2').setValue(true); }
            else if(me.record.data.mail.AlarmEvent === "2"){ Ext.getCmp('radio_smtp_al1').setValue(true); Ext.getCmp('radio_smtp_al2').setValue(true); }
            if(me.record.data.mail.AlarmReceiver !== ""){ Ext.getCmp('smtp_email').setValue(me.record.data.mail.AlarmReceiver); }
            if(me.record.data.mail.filescanopt.scanarchive === "on"){ Ext.getCmp('smtp_radio_file1').setValue(true); }
            else{ Ext.getCmp('smtp_radio_file2').setValue(true); }
            if(me.record.data.mail.filescanopt.action === "0"){ Ext.getCmp('smtp_radio_filescan1').setValue(true); }
            else{ Ext.getCmp('smtp_radio_filescan2').setValue(true); }

            if(me.record.data.http.scantype === "0"){ Ext.getCmp('radio_http_11').setValue(true); }
            else if(me.record.data.http.scantype === "1"){ Ext.getCmp('radio_http_12').setValue(true); }
            else if(me.record.data.http.scantype === "2"){ Ext.getCmp('radio_http_13').setValue(true); }
            if(me.record.data.http.action === "0"){ Ext.getCmp('radio_http_21').setValue(true); }
            else if(me.record.data.http.action === "1"){ Ext.getCmp('radio_http_22').setValue(true); }
            if(me.record.data.http.AlarmEvent === "0"){ Ext.getCmp('radio_http_al1').setValue(true); }
            else if(me.record.data.http.AlarmEvent === "1"){ Ext.getCmp('radio_http_al2').setValue(true); }
            else if(me.record.data.http.AlarmEvent === "2"){ Ext.getCmp('radio_http_al1').setValue(true); Ext.getCmp('radio_http_al2').setValue(true); }
            if(me.record.data.http.AlarmReceiver !== ""){ Ext.getCmp('http_email').setValue(me.record.data.http.AlarmReceiver); }

            if(me.record.data.ftp.scantype === "0"){ Ext.getCmp('radio_ftp_11').setValue(true); }
            else if(me.record.data.ftp.scantype === "1"){ Ext.getCmp('radio_ftp_12').setValue(true); }
            else if(me.record.data.ftp.scantype === "2"){ Ext.getCmp('radio_ftp_13').setValue(true); }
            if(me.record.data.ftp.action === "0"){ Ext.getCmp('radio_ftp_21').setValue(true); }
            else if(me.record.data.ftp.action === "1"){ Ext.getCmp('radio_ftp_22').setValue(true); }
            if(me.record.data.ftp.AlarmEvent === "0"){ Ext.getCmp('radio_ftp_al1').setValue(true); Ext.getCmp('radio_ftp_al2').setValue(false); }
            else if(me.record.data.ftp.AlarmEvent === "1"){ Ext.getCmp('radio_ftp_al2').setValue(true); Ext.getCmp('radio_ftp_al1').setValue(false); }
            else if(me.record.data.ftp.AlarmEvent === "2"){ Ext.getCmp('radio_ftp_al1').setValue(true); Ext.getCmp('radio_ftp_al2').setValue(true); }
            if(me.record.data.ftp.AlarmReceiver !== ""){ Ext.getCmp('ftp_email').setValue(me.record.data.ftp.AlarmReceiver); }
            if(me.record.data.ftp.filescanopt.scanarchive === "on"){ Ext.getCmp('ftp_radio_file1').setValue(true); }
            else{ Ext.getCmp('ftp_radio_file2').setValue(true); }
            if(me.record.data.ftp.filescanopt.action === "0"){ Ext.getCmp('ftp_radio_filescan1').setValue(true); }
            else{ Ext.getCmp('ftp_radio_filescan2').setValue(true); }
            Ext.getCmp('ftp_filescan_size').setValue(me.record.data.ftp.filescanopt.maxsize);

            for(var i in me.record.data.mail.filter){
                smtp_record.push({
                    '@num' : me.record.data.mail.filter[i].num,
                    'chk' : me.record.data.mail.filter[i].chk,
                    'item' : me.record.data.mail.filter[i].item
                });
            }

            for(var j in me.record.data.ftp.filter){
                ftp_record.push({
                    '@num' : me.record.data.ftp.filter[j].num,
                    'chk' : me.record.data.ftp.filter[j].chk,
                    'item' : me.record.data.ftp.filter[j].item
                });
            }

            smtp_store.loadData(smtp_record);
            ftp_store.loadData(ftp_record);

        }
        else{
            me.setTitle(__zen('add_antivirus'));
            var record = [];

            record.push({
                '@num' : 30,
                'chk' : "on",
                'item' : "*"
            });

            smtp_store.add(record);
            ftp_store.add(record);

            var _params = {

                basename: Ext.encode('mgtable_users')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getObjects',
                _params,

                function(response){
                    Ext.getCmp('sp_block_email').setValue(response.list[0].email);
                    Ext.getCmp('smtp_email').setValue(response.list[0].email);
                    Ext.getCmp('http_email').setValue(response.list[0].email);
                    Ext.getCmp('ftp_email').setValue(response.list[0].email);

                }
            );
        }
    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var obj = {};
        var sp_scantype;
        var sp_action;
        var sp_alarm;
        var sp_scanchk;
        var http_scantype;
        var http_action;
        var http_alarm;
        var ftp_scantype;
        var ftp_scanchk;
        var ftp_action;
        var ftp_alarm;
        var file_scan;
        var ftp_file_scan;
        var store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter');
        var ftp_store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter');
        var store2 = Ext.data.StoreManager.lookup('store_antivirus_list');
        var filter = [];
        var ftp_filter = [];
        var chk;

        if(Ext.getCmp('win_profile_name').isValid() === false){ Ext.getCmp('win_profile_name').isValid(); Ext.getCmp('win_profile_name').focus(); return false; }
        if(Ext.getCmp('radio_smtp_21').getValue()){ if(Ext.getCmp('sp_block_email').isValid() === false){ Ext.getCmp('sp_block_email').focus(); return false; } }
        if(Ext.getCmp('radio_smtp_22').getValue()){ if(Ext.getCmp('sp_addtitle').isValid() === false){ Ext.getCmp('sp_addtitle').focus(); return false; } }
        if(Ext.getCmp('smtp_email').isValid() === false){ Ext.getCmp('smtp_email').focus(); return false; }
        if(Ext.getCmp('http_email').isValid() === false){ Ext.getCmp('http_email').focus(); return false; }
        if(Ext.getCmp('ftp_email').isValid() === false){ Ext.getCmp('ftp_email').focus(); return false; }

        if(me.edit === "edit"){
            var chk_num = 0;
            for(var i in store2.data.items){
                if(store2.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){

                    if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                }
            }
            if(chk_num > 0){ chk = true; }
        }
        else{
            for(var i in store2.data.items){
                if(store2.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){ chk = true; }
            }
        }

        if(chk){
            me.set_btn = true;
            Ext.getCmp('win_profile_name').isValid();
            return false;
        }

        if(Ext.getCmp('sp_addtitle').isValid() === false){ Ext.getCmp('sp_addtitle').isValid(); Ext.getCmp('sp_addtitle').focus(); return false; }
        if(Ext.getCmp('sp_block_email').isValid() === false){ Ext.getCmp('sp_addtitle').isValid(); Ext.getCmp('sp_block_email').focus(); return false; }
        if(Ext.getCmp('smtp_filescan_size').isValid() === false){ Ext.getCmp('smtp_filescan').expand(); Ext.getCmp('smtp_filescan_size').focus(); return false; }
        if(Ext.getCmp('ftp_filescan_size').isValid() === false){ Ext.getCmp('ftp_filescan').expand(); Ext.getCmp('ftp_filescan_size').focus(); return false; }

        for(var i in store.data.items){
            filter.push({
                'num' : Number(store.data.items[i].data['@num']),
                'chk' : store.data.items[i].data.chk,
                'item' : store.data.items[i].data.item
            });
        }

        for(var j in ftp_store.data.items){
            ftp_filter.push({
                'num' : Number(ftp_store.data.items[j].data['@num']),
                'chk' : ftp_store.data.items[j].data.chk,
                'item' : ftp_store.data.items[j].data.item
            });
        }

        if(Ext.getCmp('radio_smtp_11').getValue()){ sp_scantype = "0"; }
        else if(Ext.getCmp('radio_smtp_12').getValue()){ sp_scantype = "1"; }
        else if(Ext.getCmp('radio_smtp_13').getValue()){ sp_scantype = "2"; }

        if(Ext.getCmp('radio_smtp_21').getValue()){ sp_action = "0"; }
        else if(Ext.getCmp('radio_smtp_22').getValue()){ sp_action = "1"; }

        if(Ext.getCmp('radio_http_11').getValue()){ http_scantype = "0"; }
        else if(Ext.getCmp('radio_http_12').getValue()){ http_scantype = "1"; }

        if(Ext.getCmp('radio_http_21').getValue()){ http_action = "0"; }
        else if(Ext.getCmp('radio_http_22').getValue()){ http_action = "1"; }

        if(Ext.getCmp('radio_ftp_11').getValue()){ ftp_scantype = "0"; }
        else if(Ext.getCmp('radio_ftp_12').getValue()){ ftp_scantype = "1"; }
        else if(Ext.getCmp('radio_ftp_13').getValue()){ ftp_scantype = "2"; }

        if(Ext.getCmp('radio_ftp_21').getValue()){ ftp_action = "0"; }
        else if(Ext.getCmp('radio_ftp_22').getValue()){ ftp_action = "1"; }

        if(Ext.getCmp('smtp_radio_file1').getValue()){ file_scan = "on"; }
        else if(Ext.getCmp('smtp_radio_file2').getValue()){ file_scan = "off"; }

        if(Ext.getCmp('smtp_radio_filescan1').getValue()){ sp_scanchk = "0"; }
        else if(Ext.getCmp('smtp_radio_filescan2').getValue()){ sp_scanchk = "1"; }

        if(Ext.getCmp('ftp_radio_file1').getValue()){ ftp_file_scan = "on"; }
        else if(Ext.getCmp('ftp_radio_file2').getValue()){ ftp_file_scan = "off"; }
        if(Ext.getCmp('ftp_radio_filescan1').getValue()){ ftp_scanchk = "0"; }
        else if(Ext.getCmp('ftp_radio_filescan2').getValue()){ ftp_scanchk = "1"; }

        if(Ext.getCmp('radio_http_al1').getValue() && Ext.getCmp('radio_http_al2').getValue()){ http_alarm = "2"; }
        else if(Ext.getCmp('radio_http_al1').getValue()){ http_alarm = "0"; }
        else if(Ext.getCmp('radio_http_al2').getValue()){ http_alarm = "1"; }

        if(Ext.getCmp('radio_smtp_al1').getValue() && Ext.getCmp('radio_smtp_al2').getValue()){ sp_alarm = "2"; }
        else if(Ext.getCmp('radio_smtp_al1').getValue()){ sp_alarm = "0"; }
        else if(Ext.getCmp('radio_smtp_al2').getValue()){ sp_alarm = "1"; }

        if(Ext.getCmp('radio_ftp_al1').getValue() && Ext.getCmp('radio_ftp_al2').getValue()){ ftp_alarm = "2"; }
        else if(Ext.getCmp('radio_ftp_al1').getValue()){ ftp_alarm = "0"; }
        else if(Ext.getCmp('radio_ftp_al2').getValue()){ ftp_alarm = "1"; }

        obj = {
            'name' : Ext.getCmp('win_profile_name').getValue(),
            'mail' : {
                'scantype' : sp_scantype,
                'action' : sp_action,
                'addtitle' : Ext.getCmp('sp_addtitle').getValue(),
                'ChangeReceiver' : Ext.getCmp('sp_block_email').getValue(),
                'filescanopt' : {
                    'maxsize' : Ext.getCmp('smtp_filescan_size').getValue(),
                    'action' : sp_scanchk,
                    'scanarchive' : file_scan
                },
                'filter' : filter
            },
            'http' : {
                'scantype' : http_scantype,
                'action' : http_action
            },
            'ftp' : {
                'scantype' : ftp_scantype,
                'action' : ftp_action,
                'filescanopt' : {
                    'maxsize' : Ext.getCmp('ftp_filescan_size').getValue(),
                    'action' : ftp_scanchk,
                    'scanarchive' : ftp_file_scan
                },
                'filter' : ftp_filter
            }
        };
        console.log(obj);
        if(me.edit === "edit"){
            obj['@cid'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;

        showLoadMask();

        var _params = {
            basename : Ext.encode('anti_virus'),
            obj : Ext.encode(obj),
            id_info : Ext.encode({'fieldname':'@cid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update)
        };
        console.log(obj);
        if(me.edit === "edit"){
            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){
                    hideLoadMask();
                    store2.load();
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            );
        }
        else{
            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){
                    hideLoadMask();
                    store2.load();
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: __zen('add_plus'),
                            no: __zen('close')
                        },
                        fn: me.set_window,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            );

        }

    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    set_window: function(btn) {
        if(btn==="no"){
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }else{
            Ext.getCmp("fm_antivirus").getForm().reset();
            Ext.getCmp('antivirus_tab').setActiveTab(0);
            var record = {
                'chk' : 'on',
                'item' : '*',
                '@num' : 30
            };
            Ext.data.StoreManager.lookup('store_antivirus_smtp_filter').removeAll();
            Ext.data.StoreManager.lookup('store_antivirus_smtp_filter').add(record);
            Ext.data.StoreManager.lookup('store_antivirus_ftp_filter').removeAll();
            Ext.data.StoreManager.lookup('store_antivirus_ftp_filter').add(record);
            //     Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
        }
    },

    validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }

        return true;
    }

});