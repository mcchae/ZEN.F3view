
Ext.define('NFW2.view.win_profile_http', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_profile_http',

    requires: [
        'NFW2.view.win_profile_httpViewModel',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Separator',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.grid.Panel',
        'Ext.selection.CheckboxModel',
        'Ext.form.field.TextArea',
        'Ext.form.field.ComboBox',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.Column'
    ],

    viewModel: {
        type: 'win_profile_http'
    },
    cls: 'zen_win',
    id: 'win_profile_http',
    minWidth: 800,
    scrollable: true,
    width: 800,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            minWidth: 795,
            scrollable: true,
            width: 795,
            bodyPadding: 20,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'name',
                            width: 500,
                            labelSeparator: ' ',
                            labelWidth: 140,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 255,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{profile_name}'
                            },
                            listeners: {
                                errorchange: 'onNameErrorChange',
                                blur: 'onNameBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'desc',
                            width: 500,
                            labelSeparator: ' ',
                            labelWidth: 140,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 255,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'radiogroup',
                            width: 350,
                            labelCls: 'x-field x-form-item-label x-form-item-label-default',
                            labelSeparator: ' ',
                            labelWidth: 140,
                            bind: {
                                fieldLabel: '{reassigen_webpage}'
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 're_url',
                                    name: 're_mode',
                                    checked: true,
                                    listeners: {
                                        beforerender: 'onRe_urlBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 're_image',
                                    name: 're_mode',
                                    listeners: {
                                        beforerender: 'onRe_imageBeforeRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            id: 'redirection',
                            width: 220,
                            fieldLabel: '',
                            value: 'http://',
                            enforceMaxLength: true,
                            maxLength: 255,
                            minLength: 1
                        }
                    ]
                },
                {
                    xtype: 'label',
                    flex: 1,
                    cls: 'mt_info',
                    margin: '0 0 0 20',
                    bind: {
                        text: '{web_filter_info2}'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    items: [
                        {
                            xtype: 'tabpanel',
                            cls: 'zen_tab',
                            activeTab: 0,
                            plain: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: 'tab_1',
                                    bind: {
                                        title: '{deny_url}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'zen_tab_body',
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'zen_toolbar',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'ic_add',
                                                            bind: {
                                                                text: '{add}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick21'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'ic_del',
                                                            bind: {
                                                                text: '{del}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick41'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'tbseparator'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_d_exp',
                                                            iconCls: 'ic_export',
                                                            listeners: {
                                                                click: 'onButtonClick51'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'b_upfile1',
                                                            enableToggle: true,
                                                            iconCls: 'ic_import',
                                                            listeners: {
                                                                toggle: 'onB_upfileToggle1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'form',
                                                            hidden: true,
                                                            id: 'upform_deny',
                                                            margin: 0,
                                                            bodyPadding: 0,
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    cls: 'dv_pop_inner',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'filefield',
                                                                            id: 'upload_deny',
                                                                            margin: '2 0 0 0',
                                                                            width: 200,
                                                                            name: 'uploadFile',
                                                                            buttonConfig: {
                                                                                xtype: 'filebutton',
                                                                                cls: 'btn_b',
                                                                                bind: {
                                                                                    text: '{file_find}'
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            height: 26,
                                                                            margin: '2 0 0 5',
                                                                            iconCls: 'ft_confirm_icl',
                                                                            bind: {
                                                                                text: '{confirm}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick11'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'tbseparator'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: 's_url1',
                                                            listeners: {
                                                                render: 'onS_urlRender1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'ic_ser',
                                                            listeners: {
                                                                click: 'onButtonClick31'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'tbseparator'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'ic_reset',
                                                            hidden: true,
                                                            id: 's_reset1',
                                                            listeners: {
                                                                click: 'onS_resetClick1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            height: 28,
                                                            padding: '0 10 0 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'deny_total'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 283,
                                                    id: 'grid_deny',
                                                    margin: '5 0 0 0',
                                                    scrollable: true,
                                                    columnLines: true,
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return rowIndex+1;
                                                            },
                                                            width: 60,
                                                            align: 'center',
                                                            dataIndex: 'num',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'url',
                                                            flex: 1,
                                                            bind: {
                                                                text: '{url}'
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
                                                        selType: 'checkboxmodel'
                                                    },
                                                    listeners: {
                                                        celldblclick: 'onGrid_accCellDblClick1'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: 'tab_0',
                                    bind: {
                                        title: '{deny_exp}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'zen_tab_body',
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'zen_toolbar',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'ic_add',
                                                            bind: {
                                                                text: '{add}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'ic_del',
                                                            bind: {
                                                                text: '{del}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick4'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'tbseparator'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_a_exp',
                                                            iconCls: 'ic_export',
                                                            listeners: {
                                                                click: 'onButtonClick5'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'b_upfile',
                                                            enableToggle: true,
                                                            iconCls: 'ic_import',
                                                            listeners: {
                                                                toggle: 'onB_upfileToggle'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'form',
                                                            hidden: true,
                                                            id: 'upform_accept',
                                                            margin: 0,
                                                            bodyPadding: 0,
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    cls: 'dv_pop_inner',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'filefield',
                                                                            id: 'upload_acc',
                                                                            margin: '2 0 0 0',
                                                                            width: 200,
                                                                            name: 'uploadFile',
                                                                            buttonConfig: {
                                                                                xtype: 'filebutton',
                                                                                cls: 'btn_b',
                                                                                bind: {
                                                                                    text: '{file_find}'
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'btn_b',
                                                                            height: 26,
                                                                            margin: '2 0 0 5',
                                                                            iconCls: 'ft_confirm_icl',
                                                                            bind: {
                                                                                text: '{confirm}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick1'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'tbseparator'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: 's_url',
                                                            listeners: {
                                                                render: 'onS_urlRender'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'ic_ser',
                                                            listeners: {
                                                                click: 'onButtonClick3'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'tbseparator'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            hidden: true,
                                                            id: 's_reset',
                                                            iconCls: 'ic_reset',
                                                            listeners: {
                                                                click: 'onS_resetClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            height: 28,
                                                            padding: '0 10 0 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'acc_total'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 283,
                                                    id: 'grid_acc',
                                                    margin: '5 0 0 0',
                                                    scrollable: true,
                                                    columnLines: true,
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return rowIndex+1;
                                                            },
                                                            width: 60,
                                                            align: 'center',
                                                            dataIndex: 'num',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'url',
                                                            flex: 1,
                                                            bind: {
                                                                text: '{url}'
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
                                                        selType: 'checkboxmodel'
                                                    },
                                                    listeners: {
                                                        celldblclick: 'onGrid_accCellDblClick'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    id: 'tab_11',
                                    bind: {
                                        title: '{deny_url}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'zen_tab_body',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!ValidNotKor(value)){ return get_msg('err_form'); }

                                                                var ar = [];
                                                                var ar_val = value.split('\n');
                                                                for(var i=0; i<ar_val.length; i++){
                                                                    var str = ar_val[i].split(';');
                                                                    for(var l=0; l<str.length; l++){
                                                                        if(str[l] !== ""){ ar.push(str[l]); }
                                                                    }
                                                                }

                                                                for(var i=0; i<ar.length; i++){
                                                                    if(chk_byte(ar[i]) > 64){
                                                                        return ValidByte(64);
                                                                    }
                                                                }

                                                                return true;

                                                                function chk_byte(value){
                                                                    var len = 0;

                                                                    var arg = arguments[0] === undefined ? this.toString() : arguments[0];

                                                                    for(var i=0; i<arg.length; i++){
                                                                        var _ch = arg[i].charCodeAt();
                                                                        if(_ch >= 44032 && _ch <= 55176){ len += 2; } //가 - 히
                                                                        else{ len++; }
                                                                    }
                                                                    return len;
                                                                }
                                                            },
                                                            id: 'accept_matching1',
                                                            fieldLabel: '허용 리스트',
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                errorchange: 'onAccept_matchingErrorChange1',
                                                                blur: 'onAccept_matchingBlur1',
                                                                keydown: 'onAccept_matchingKeydown1'
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
                                                            xtype: 'textareafield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!ValidNotKor(value)){ return get_msg('err_form'); }

                                                                var ar = [];
                                                                var ar_val = value.split('\n');
                                                                for(var i=0; i<ar_val.length; i++){
                                                                    var str = ar_val[i].split(';');
                                                                    for(var l=0; l<str.length; l++){
                                                                        if(str[l] !== ""){ ar.push(str[l]); }
                                                                    }
                                                                }

                                                                for(var i=0; i<ar.length; i++){
                                                                    if(chk_byte(ar[i]) > 64){
                                                                        return ValidByte(64);
                                                                    }
                                                                }

                                                                return true;

                                                                function chk_byte(value){
                                                                    var len = 0;

                                                                    var arg = arguments[0] === undefined ? this.toString() : arguments[0];

                                                                    for(var i=0; i<arg.length; i++){
                                                                        var _ch = arg[i].charCodeAt();
                                                                        if(_ch >= 44032 && _ch <= 55176){ len += 2; } //가 - 히
                                                                        else{ len++; }
                                                                    }
                                                                    return len;
                                                                }
                                                            },
                                                            id: 'deny_matching1',
                                                            fieldLabel: '차단 리스트',
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                errorchange: 'onDeny_matchingErrorChange1',
                                                                blur: 'onDeny_matchingBlur1',
                                                                keydown: 'onDeny_matchingKeydown1'
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
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    margin: '0 0 0 135',
                                                                    text: 'ex) *future.co.kr*;*weguardia.com* (리스트별 URL 최대 개수 1000, URL 최대 사이즈 20byte)'
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
                                    hidden: true,
                                    id: 'tab_2',
                                    title: '응답 패킷 필터링',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'zen_tab_body',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxgroup',
                                                    width: 755,
                                                    fieldLabel: '',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            id: 'chk_textarea',
                                                            boxLabel: 'TextArea'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            id: 'chk_text',
                                                            boxLabel: 'Text'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            id: 'chk_file',
                                                            fieldLabel: '',
                                                            boxLabel: 'File Browsing'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            id: 'chk_multipart',
                                                            fieldLabel: '',
                                                            boxLabel: 'Multipart'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: 'tab_3',
                                    bind: {
                                        title: '{deny_harmful_site}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'zen_tab_body',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            width: 755,
                                                            fieldLabel: '',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1.5,
                                                                    id: 'chk_kiscom',
                                                                    listeners: {
                                                                        beforerender: 'onChk_kiscomBeforeRender'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    id: 'chk_safenet',
                                                                    listeners: {
                                                                        beforerender: 'onChk_safenetBeforeRender'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    id: 'chk_youth',
                                                                    listeners: {
                                                                        beforerender: 'onChk_youthBeforeRender'
                                                                    }
                                                                }
                                                            ],
                                                            listeners: {
                                                                change: 'onCheckboxgroupChange'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    disabled: true,
                                                    id: 'c_kdb',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'nNude',
                                                                    width: 350,
                                                                    labelSeparator: ' ',
                                                                    value: 'n4',
                                                                    editable: false,
                                                                    displayField: 'txt',
                                                                    store: 'store_http_nude',
                                                                    valueField: 'val',
                                                                    bind: {
                                                                        fieldLabel: '{nude}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'nSex',
                                                                    width: 350,
                                                                    labelSeparator: ' ',
                                                                    value: 's4',
                                                                    editable: false,
                                                                    displayField: 'txt',
                                                                    store: 'store_http_sex',
                                                                    valueField: 'val',
                                                                    bind: {
                                                                        fieldLabel: '{sex}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'nViolence',
                                                                    width: 350,
                                                                    labelSeparator: ' ',
                                                                    value: 'v4',
                                                                    editable: false,
                                                                    displayField: 'txt',
                                                                    store: 'store_http_violence',
                                                                    valueField: 'val',
                                                                    bind: {
                                                                        fieldLabel: '{violence}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'nLanguage',
                                                                    width: 350,
                                                                    labelSeparator: ' ',
                                                                    value: 'l4',
                                                                    editable: false,
                                                                    displayField: 'txt',
                                                                    store: 'store_http_language',
                                                                    valueField: 'val',
                                                                    bind: {
                                                                        fieldLabel: '{language}'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'con_safe',
                                                            margin: '5 0 0 0',
                                                            layout: 'table',
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'safeEtc1',
                                                                    inputValue: 'i1',
                                                                    uncheckedValue: 'i0',
                                                                    listeners: {
                                                                        beforerender: 'onSafeEtc1BeforeRender'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'safeEtc2',
                                                                    margin: '0 0 0 10',
                                                                    inputValue: 'h1',
                                                                    uncheckedValue: 'h0',
                                                                    listeners: {
                                                                        beforerender: 'onSafeEtc2BeforeRender'
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
                                    id: 'tab_4',
                                    scrollable: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    bind: {
                                        title: '{url_gmatch}'
                                    },
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            flex: 1,
                                            height: 200,
                                            id: 'tree_list',
                                            bufferedRenderer: false,
                                            enableColumnHide: false,
                                            rowLines: true,
                                            sortableColumns: false,
                                            store: 'store_http_url_tree',
                                            animate: true,
                                            viewConfig: {
                                                markDirty: false,
                                                rootVisible: false
                                            },
                                            columns: [
                                                {
                                                    xtype: 'treecolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return value;
                                                    },
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{category}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var chk = Ext.getCmp("win_profile_http").chk_acc;

                                                        if(rowIndex===0 || record.data.idex==="0.1" || record.data.idex==="0" || record.data.idex==="1.1" || record.data.idex=="119.1"){

                                                            return "";
                                                        }

                                                        var checked = "";
                                                        var parent = "";

                                                        if(chk){
                                                            checked = (chk[record.data.idex])?"chk_on":"chk_off";//"checked":"";
                                                            if(record.data.idex.indexOf('-')!==-1){
                                                                var _idex = record.data.idex.split('-');
                                                                var n = 0, _n = 0;
                                                                for(var i=Number(_idex[0]); i<=Number(_idex[1]); i++){
                                                                    if(chk[i]){
                                                                        _n++;
                                                                    }
                                                                    n++;
                                                                }

                                                                if(n === _n){
                                                                    checked = "chk_on";//"checked";
                                                                }else{
                                                                    if(_n > 0){
                                                                        checked = "chk_mid";
                                                                    }else{
                                                                        checked = "chk_off";
                                                                    }
                                                                }
                                                            }else{
                                                                parent = record.parentNode.data.idex;
                                                            }
                                                        }

                                                        return '<input type="button" class="'+checked+' accept" id="acc_'+record.data.idex+'" onclick=chk_category(this,"'+parent+'\") />';//<input type="checkbox" id="acc_'+record.data.idex+'" '+checked+' onclick=chk_category(this,"'+parent+'\") class="accept" />';
                                                    },
                                                    align: 'center',
                                                    dataIndex: 'idex',
                                                    flex: 0.1,
                                                    bind: {
                                                        text: '{allow}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var chk = Ext.getCmp("win_profile_http").chk_deny;

                                                        if(rowIndex===0 || record.data.idex==="0.1" || record.data.idex==="1.1" || record.data.idex=="119.1"){
                                                            return "";
                                                        }

                                                        var checked = "checked";
                                                        var parent = "";

                                                        if(chk){
                                                            checked = (chk[record.data.idex])?"chk_on":"chk_off";
                                                            if(record.data.idex.indexOf('-')!==-1){
                                                                var _idex = record.data.idex.split('-');
                                                                var n = 0, _n = 0;
                                                                for(var i=Number(_idex[0]); i<=Number(_idex[1]); i++){
                                                                    if(chk[i]){
                                                                        _n++;
                                                                    }
                                                                    n++;
                                                                }
                                                                if(n === _n){
                                                                    checked = "chk_on";
                                                                }else{
                                                                    if(_n > 0){
                                                                        checked = "chk_mid";
                                                                    }else{
                                                                        checked = "chk_off";
                                                                    }
                                                                }
                                                            }else{
                                                                parent = record.parentNode.data.idex;
                                                            }
                                                        }

                                                        return '<input type="button" class="'+checked+' deny" id="deny_'+record.data.idex+'" onclick=chk_category(this,"'+parent+'\") />';//'<input type="checkbox" id="deny_'+value+'" '+checked+' onclick=chk_category(this,"'+parent+'\") class="deny" />';
                                                    },
                                                    align: 'center',
                                                    dataIndex: 'idex',
                                                    flex: 0.1,
                                                    bind: {
                                                        text: '{deny}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '5 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    enableToggle: true,
                                                    bind: {
                                                        text: '{web_filter_info9}'
                                                    },
                                                    listeners: {
                                                        toggle: 'onB_isolToggle'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_noti',
                                                    style: 'float:right',
                                                    bind: {
                                                        text: '{web_filter_info3}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'checkboxgroup',
                                            width: 400,
                                            labelCls: 'x-field x-form-item-label x-form-item-label-default',
                                            labelSeparator: ' ',
                                            labelWidth: 280,
                                            bind: {
                                                fieldLabel: '{web_filter_info5}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'approve',
                                                    listeners: {
                                                        change: 'onCheckboxfieldChange1',
                                                        beforerender: 'onApproveBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            disabled: true,
                                            id: 'c_approve',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                            width: 290,
                                                            bind: {
                                                                text: '{web_filter_info6}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'bypass',
                                                            listeners: {
                                                                beforerender: 'onBypassBeforeRender'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'req',
                                                            width: 500,
                                                            labelSeparator: ' ',
                                                            labelWidth: 280,
                                                            msgTarget: 'none',
                                                            value: 'http://',
                                                            enforceMaxLength: true,
                                                            maxLength: 127,
                                                            minLength: 1,
                                                            bind: {
                                                                fieldLabel: '{web_filter_info7}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            cls: 'mt_info',
                                                            margin: '0 0 0 20',
                                                            bind: {
                                                                text: '{web_filter_info4}'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'rep',
                                                            width: 500,
                                                            labelSeparator: ' ',
                                                            labelWidth: 280,
                                                            msgTarget: 'none',
                                                            value: 'http://',
                                                            enforceMaxLength: true,
                                                            maxLength: 127,
                                                            minLength: 1,
                                                            bind: {
                                                                fieldLabel: '{web_filter_info8}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            cls: 'mt_info',
                                                            margin: '0 0 0 20',
                                                            bind: {
                                                                text: '{web_filter_info4}'
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
                        click: 'onB_addClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWinAfterRender'
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onRe_urlBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('url');
    },

    onRe_imageBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('images');
    },

    onButtonClick21: function(button, e, eOpts) {
        var me = this;

        if(me.d_record.length >= me.deny_count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.deny_count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_profile_config',{
            mode: 2
        });
        win.show();
    },

    onButtonClick41: function(button, e, eOpts) {
        var me = this;
        var record = me.d_record;
        var obj = me.d_obj;
        var _store = Ext.getCmp("grid_deny").getStore();

        var grid_chk = Ext.getCmp("grid_deny").getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "yes"){

                for(var i=0; i<grid_chk.length; i++){
                    delete obj[grid_chk[i].data.url];
                }

                for(var i=0; i<record.length; i++){
                    for(var l=0; l<grid_chk.length; l++){
                        if(record[i].url === grid_chk[l].data.url){
                            record.splice(i,1);
                        }
                    }
                }
                _store.remove(grid_chk);
                _store.sync();

                Ext.getCmp("deny_total").update(__zen('total')+' : '+record.length);
                me.d_record = record;
                me.d_obj = obj;
            }
        });
    },

    onButtonClick51: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var record = me.record;
        var obj = me.d_obj;
        var r_obj = me.rd_obj;

        if(!me.edit){ exportlist(); return false; }

        var _n = 0;
        for(var i in r_obj){
            if(!obj[r_obj[i].url]){ _n++; }
        }

        var _r = 0;
        for(var i in obj){
            if(!r_obj[obj[i].url]){ _r++; }
        }

        if(_n > 0 || _r > 0){
            Ext.MessageBox.confirm(__weguardia,get_msg('conf_web_list'),function(btn){
                if(btn === "yes"){

                    var d_record = [];
                    for(var l=0; l<me.d_record.length; l++){
                        d_record.push({'url':me.d_record[l].url,'desc':me.d_record[l].desc});
                    }
                    var _in = 0;
                    for(var i=0; i<record.element.length; i++){
                        if(record.element[i].action.type === "REDIRECTION" && record.element[i].match.type === "url_pattern"){
                            record.element[i].match.new_val = d_record;
                            _in++;
                        }
                    }

                    if(_in === 0){

                        var re_v = (Ext.getCmp('redirection').getValue()==="http://")?"http://rnd.future.co.kr/redir.html":Ext.getCmp('redirection').getValue();

                        var re_opt = (Ext.getCmp('re_url').getValue())?re_v+";":";"+re_v;

                        record.element.push({
                            action : {
                                type: "REDIRECTION",
                                options: re_opt
                            },
                            match: {
                                type: 'url_pattern',
                                new_val: d_record,
                                options: 'request'
                            }
                        });
                    }

                    var _params = {
                        basename: Ext.encode("fw_profile_web"),
                        obj: Ext.encode(record),
                        id_info: Ext.encode({'fieldname':'@cid'}),
                        num_info: Ext.encode({'fieldname':'@num'}),
                        update: Ext.encode(true)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftuctrl',
                        'setObjectWithCid',
                        _params,
                        function(response){

                            exportlist();
                        }
                    );
                }
            });
        }else{
            exportlist();
        }

        function exportlist(){
            var path = '/ferret/tmp/';
            var fileName = 'WeGuardia_Webfilter_import.xlsx';
            var _params = {
                basename: Ext.encode('fw_profile_web'),
                filename: Ext.encode(path+fileName),
                cond: Ext.encode({'url_type':'ACCEPT','@cid':me.cid}),
                sort_list: Ext.encode(null)
            };

            me.mask('Loading...');

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'exportList',
                _params,
                function(response){

                    me.unmask();
                    document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
                }
            );
        }
    },

    onB_upfileToggle1: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("upform_deny").show();
        }else{
            Ext.getCmp("upform_deny").hide();
        }
    },

    onButtonClick11: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var form = Ext.getCmp('upform_deny').getForm();

        if(Ext.getCmp('upload_deny').getValue() === '') return false;
        var path = '/ferret/tmp/';

        if(form.isValid()){

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('false')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    me.mask('Loading...');

                    var _data = Ext.decode(o.response.responseText);
                    var _param = {
                        filename: Ext.encode(path+_data.data[0])
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'import_webfilter_list',
                        _param,
                        function(response){

                            me.unmask();

                            Ext.getCmp("b_upfile1").toggle(false);
                            var record = me.d_record;
                            var obj = me.d_obj;

                            if(record.length+response.length > me.deny_count){
                                Ext.Msg.alert(__weguardia,ValidMaxCnt(me.deny_count));
                                return false;
                            }

                            var _byte = [];
                            var _dup = [];
                            var _re = [];
                            for(var i=0; i<response.length; i++){
                                if(byteCheck(response[i].url) > 64){ _byte.push(response[i].url); }
                                if(obj[response[i].url]){ _dup.push(response[i].url); }
                            }
                            if(_byte.length > 0 || _dup.length > 0){
                                var win = Ext.create('NFW2.view.win_profile_http_result',{
                                    mode: 2,
                                    _byte: _byte,
                                    _dup: _dup
                                });
                                win.show();
                                return false;
                            }
                            for(var i=0; i<response.length; i++){
                                obj[response[i].url] = {'url':response[i].url,'desc':response[i].desc};
                            }
                            record = response.concat(record);
                            Ext.getCmp("grid_deny").getStore().loadData(record);
                            me.d_record = record;
                            me.d_obj = obj;
                            Ext.getCmp("deny_total").update(__zen('total')+' : '+record.length);

                        }
                    );

                }
            });
        };
    },

    onS_urlRender1: function(component, eOpts) {
        component.emptyText = __zen('url');
        component.applyEmptyText();
    },

    onButtonClick31: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var url = Ext.getCmp("s_url1");

        if(url.getValue() === ""){ return false; }

        var d_record = me.d_record;

        var _record = [];
        for(var i=0; i<d_record.length; i++){

            if(d_record[i].url.indexOf(url.getValue())!==-1){
                _record.push(d_record[i]);
            }
        }

        Ext.getCmp("grid_deny").getStore().loadData(_record);

        Ext.getCmp("s_reset1").show();
    },

    onS_resetClick1: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var a_record = me.a_record;

        Ext.getCmp("grid_deny").getStore().loadData(a_record);

        Ext.getCmp("s_url1").reset();
        button.hide();
    },

    onGrid_accCellDblClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_profile_config',{
            mode: 2,
            edit: 'edit',
            _record: record,
            _index: rowIndex
        });
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        if(me.a_record.length >= me.acc_count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.acc_count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_profile_config',{
            mode: 1
        });
        win.show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;
        var record = me.a_record;
        var obj = me.a_obj;
        var _store = Ext.getCmp("grid_acc").getStore();

        var grid_chk = Ext.getCmp("grid_acc").getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "yes"){

                for(var i=0; i<grid_chk.length; i++){
                    delete obj[grid_chk[i].data.url];
                }

                for(var i=0; i<record.length; i++){
                    for(var l=0; l<grid_chk.length; l++){
                        if(record[i].url === grid_chk[l].data.url){
                            record.splice(i,1);
                        }
                    }
                }
                _store.remove(grid_chk);
                _store.sync();

                Ext.getCmp("acc_total").update(__zen('total')+' : '+record.length);
                me.a_record = record;
                me.a_obj = obj;
            }
        });
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var record = me.record;
        var obj = me.a_obj;
        var r_obj = me.ra_obj;

        if(!me.edit){ exportlist(); return false; }

        var _n = 0;
        for(var i in r_obj){
            if(!obj[r_obj[i].url]){ _n++; }
        }

        var _r = 0;
        for(var i in obj){
            if(!r_obj[obj[i].url]){ _r++; }
        }

        if(_n > 0 || _r > 0){
            Ext.MessageBox.confirm(__weguardia,get_msg('conf_web_list'),function(btn){
                if(btn === "yes"){

                    var a_record = [];
                    for(var l=0; l<me.a_record.length; l++){
                        a_record.push({'url':me.a_record[l].url,'desc':me.a_record[l].desc});
                    }
                    var _in = 0;
                    for(var i=0; i<record.element.length; i++){
                        if(record.element[i].action.type === "ACCEPT" && record.element[i].match.type === "url_pattern"){
                            record.element[i].match.new_val = a_record;
                            _in++;
                        }
                    }

                    if(_in === 0){
                        record.element.push({
                            action: {
                                type: "ACCEPT",
                                options: ''
                            },
                            match: {
                                type: 'url_pattern',
                                new_val: a_record,
                                options: 'request'
                            }
                        });
                    }

                    var _params = {
                        basename: Ext.encode("fw_profile_web"),
                        obj: Ext.encode(record),
                        id_info: Ext.encode({'fieldname':'@cid'}),
                        num_info: Ext.encode({'fieldname':'@num'}),
                        update: Ext.encode(true)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftuctrl',
                        'setObjectWithCid',
                        _params,
                        function(response){

                            exportlist();
                        }
                    );
                }
            });
        }else{
            exportlist();
        }

        function exportlist(){

            var path = '/ferret/tmp/';
            var fileName = 'WeGuardia_Webfilter_import.xlsx';
            var _params = {
                basename: Ext.encode('fw_profile_web'),
                filename: Ext.encode(path+fileName),
                cond: Ext.encode({'url_type':'ACCEPT','@cid':me.cid}),
                sort_list: Ext.encode(null)
            };

            me.mask('Loading...');

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'exportList',
                _params,
                function(response){

                    me.unmask();
                    document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
                }
            );
        }
    },

    onB_upfileToggle: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("upform_accept").show();
        }else{
            Ext.getCmp("upform_accept").hide();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var form = Ext.getCmp('upform_accept').getForm();

        if(Ext.getCmp('upload_acc').getValue() === '') return false;
        var path = '/ferret/tmp/';

        if(form.isValid()){

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('false')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    me.mask('Loading...');

                    var _data = Ext.decode(o.response.responseText);
                    var _param = {
                        filename: Ext.encode(path+_data.data[0])
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'import_webfilter_list',
                        _param,
                        function(response){

                            me.unmask();

                            Ext.getCmp("b_upfile").toggle(false);
                            var record = me.a_record;
                            var obj = me.a_obj;

                            if(record.length+response.length > me.acc_count){
                                Ext.Msg.alert(__weguardia,ValidMaxCnt(me.acc_count));
                                return false;
                            }

                            var _byte = [];
                            var _dup = [];
                            var _re = [];
                            for(var i=0; i<response.length; i++){
                                if(byteCheck(response[i].url) > 64){ _byte.push(response[i].url); }
                                if(obj[response[i].url]){ _dup.push(response[i].url); }
                            }
                            if(_byte.length > 0 || _dup.length > 0){
                                var win = Ext.create('NFW2.view.win_profile_http_result',{
                                    mode: 1,
                                    _byte: _byte,
                                    _dup: _dup
                                });
                                win.show();
                                return false;
                            }
                            for(var i=0; i<response.length; i++){
                                obj[response[i].url] = {'url':response[i].url,'desc':response[i].desc};
                            }
                            record = response.concat(record);
                            Ext.getCmp("grid_acc").getStore().loadData(record);
                            me.a_record = record;
                            me.a_obj = obj;
                            Ext.getCmp("acc_total").update(__zen('total')+' : '+record.length);

                        }
                    );

                }
            });
        };
    },

    onS_urlRender: function(component, eOpts) {
        component.emptyText = __zen('url');
        component.applyEmptyText();
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var url = Ext.getCmp("s_url");

        if(url.getValue() === ""){ return false; }

        var record = me.a_record;

        var _record = [];
        for(var i=0; i<record.length; i++){

            if(record[i].url.indexOf(url.getValue())!==-1){
                _record.push({
                    'url':record[i].url,
                    'desc':record[i].desc
                });
            }
        }

        Ext.getCmp("grid_acc").getStore().loadData(_record);

        Ext.getCmp("s_reset").show();
    },

    onS_resetClick: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var a_record = me.a_record;

        Ext.getCmp("grid_acc").getStore().loadData(a_record);

        Ext.getCmp("s_url").reset();
        button.hide();
    },

    onGrid_accCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_profile_config',{
            mode: 1,
            edit: 'edit',
            _record: record,
            _index: rowIndex
        });
        win.show();
    },

    onAccept_matchingErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAccept_matchingBlur1: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAccept_matchingKeydown1: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var str = textfield.getValue().split('\n');
            var list = [];
            for(var i=0; i<str.length; i++){

                if(str[i].charAt(str[i].length-1) !== ';'){
                    list.push(str[i]+';');
                }else{
                    list.push(str[i]);
                }
            }
            var text = list.join('\n');
            textfield.setValue(text);
        }
    },

    onDeny_matchingErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDeny_matchingBlur1: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onDeny_matchingKeydown1: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var str = textfield.getValue().split('\n');
            var list = [];
            for(var i=0; i<str.length; i++){

                if(str[i].charAt(str[i].length-1) !== ';'){
                    list.push(str[i]+';');
                }else{
                    list.push(str[i]);
                }
            }
            var text = list.join('\n');
            textfield.setValue(text);
        }
    },

    onChk_kiscomBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('web_harmful_label1');
    },

    onChk_safenetBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('web_harmful_label2');
    },

    onChk_youthBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('web_harmful_label1');
    },

    onCheckboxgroupChange: function(field, newValue, oldValue, eOpts) {
        var kis = Ext.getCmp("chk_kiscom");
        var safe = Ext.getCmp("chk_safenet");
        var c_safe = Ext.getCmp("con_safe");

        var c_kdb = Ext.getCmp("c_kdb");

        if(kis.getValue() || safe.getValue()){
            c_kdb.enable();
            c_safe.enable();
        }else{
            c_kdb.disable();
            c_safe.disable();
        }
    },

    onSafeEtc1BeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('web_harmful_label4');
    },

    onSafeEtc2BeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('web_harmful_label5');
    },

    onB_isolToggle: function(button, pressed, eOpts) {
        //허용 체크 목록 이외, 모두 차단  (해제)
        var me = this;
        var chk_acc = me.chk_acc;
        var chk_deny = me.chk_deny;

        if(pressed){
            button.setText(__zen('web_filter_info10'));

            for(var i=0; i<140; i++){
                eval('if(!chk_acc['+i+']){ chk_deny['+i+'] = true; }');
            }

            for(var l=201; l<251; l++){
                eval('if(!chk_acc['+l+']){ chk_deny['+l+'] = true; }');
            }

            me.chk_deny = chk_deny;
            me.get_category_db();
        }else{
            button.setText(__zen('web_filter_info9'));

            me.chk_deny = [];
            me.get_category_db();
        }
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        var c_approve = Ext.getCmp("c_approve");

        if(newValue === true){
            c_approve.enable();
        }else{
            c_approve.disable();
        }
    },

    onApproveBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('use');
    },

    onBypassBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('use');
    },

    onB_addClick: function(button, e, eOpts) {
        var me = this;

        var chk_acc = me.chk_acc;
        var chk_deny = me.chk_deny;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");

        var re_url = Ext.getCmp("re_url");
        var re_image = Ext.getCmp("re_image");
        var redirection = Ext.getCmp("redirection");

        var accept_matching = Ext.getCmp("accept_matching");
        var deny_matching = Ext.getCmp("deny_matching");

        var chk_textarea = Ext.getCmp("chk_textarea");
        var chk_text = Ext.getCmp("chk_text");
        var chk_file = Ext.getCmp("chk_file");
        var chk_multipart = Ext.getCmp("chk_multipart");

        var chk_kiscom = Ext.getCmp("chk_kiscom");
        var chk_safenet = Ext.getCmp("chk_safenet");
        var chk_youth = Ext.getCmp("chk_youth");

        var nNude = Ext.getCmp("nNude");
        var nSex = Ext.getCmp("nSex");
        var nViolence = Ext.getCmp("nViolence");
        var nLanguage = Ext.getCmp("nLanguage");

        var safeEtc1 = Ext.getCmp("safeEtc1");
        var safeEtc2 = Ext.getCmp("safeEtc2");

        var approve = Ext.getCmp("approve");
        var bypass = Ext.getCmp("bypass");
        var req = Ext.getCmp("req");
        var rep = Ext.getCmp("rep");

        var profile = new Object();

        if(name.isValid()===false){ Ext.getCmp("tab_1").show(); name.focus(); return false; }
        profile.name = name.getValue();
        profile.description = desc.getValue();

        if(nNude.getValue() === null){ Ext.getCmp("tab_3").show(); nNude.focus(); prt_errMsg(get_msg('err_null'), null); return false; }
        if(nSex.getValue() === null){ Ext.getCmp("tab_3").show(); nSex.focus(); prt_errMsg(get_msg('err_null'), null); return false; }
        if(nViolence.getValue() === null){ Ext.getCmp("tab_3").show(); nViolence.focus(); prt_errMsg(get_msg('err_null'), null); return false; }
        if(nLanguage.getValue() === null){ Ext.getCmp("tab_3").show(); nLanguage.focus(); prt_errMsg(get_msg('err_null'), null); return false; }

        var update = (me.edit === "edit")?true:false;

        var re_v = (redirection.getValue()==="http://")?"http://rnd.future.co.kr/redir.html":redirection.getValue();

        var re_opt = (re_url.getValue())?re_v+";":";"+re_v;

        var a_packet = [];

        if(chk_textarea.getValue()){
            a_packet.push("textarea");
        }
        if(chk_text.getValue()){
            a_packet.push("text");
        }
        if(chk_file.getValue()){
            a_packet.push("file");
        }
        if(chk_multipart.getValue()){
            a_packet.push("multipart");
        }
        var packet = a_packet.join(";");

        var ks_val = new Array();

        if(chk_kiscom.getValue() || chk_safenet.getValue()){
            ks_val.push(nNude.getValue());
            ks_val.push(nSex.getValue());
            ks_val.push(nViolence.getValue());
            ks_val.push(nLanguage.getValue());

            var s1 = (safeEtc1.getValue())?"i1":"i0";
            ks_val.push(s1);
            var s2 = (safeEtc2.getValue())?"h1":"h0";
            ks_val.push(s2);
        }
        var ks = ks_val.join("");

        var aurl_acc = [];
        var aurl_deny = [];
        var aurl_non = [];

        for(var i=0; i<=139; i++){

            if(chk_acc[i]){
                aurl_acc.push(i);
            }else if(chk_deny[i]){
                aurl_deny.push(i);
            }else{
                aurl_non.push(i);
            }
        }
        for(var i=201; i<=250; i++){

            if(chk_acc[i]){
                aurl_acc.push(i);
            }else if(chk_deny[i]){
                aurl_deny.push(i);
            }else{
                aurl_non.push(i);
            }
        }

        var url_acc = aurl_acc.join(";");
        var url_deny = aurl_deny.join(";");
        var url_non = aurl_non.join(";");

        if(approve.getValue()){
            var a_app = [];
            var by = (bypass.getValue())?"bypass_log":"";
            a_app.push(by);
            var rq = (req.getValue() !== "http://")?req.getValue():"";
            a_app.push(rq);
            var rp = (rep.getValue() !== "http://")?rep.getValue():"";
            a_app.push(rp);
        }

        profile.element = [];

        if(me.a_record.length > 0){
            var a_record = [];
            for(var i=0; i<me.a_record.length; i++){
                a_record.push({'url':me.a_record[i].url,'desc':me.a_record[i].desc});
            }
            var url_pattern = {
                action : {
                    type : "ACCEPT",
                    options : ""
                },
                match : {
                    type : "url_pattern",
                    new_val: a_record,
                    options : "request"
                }
            };
            profile.element.push(url_pattern);
        }

        if(me.d_record.length > 0){
            var d_record = [];
            for(var i=0; i<me.d_record.length; i++){
                d_record.push({'url':me.d_record[i].url,'desc':me.d_record[i].desc});
            }
            var url_pattern = {
                action : {
                    type : "REDIRECTION",
                    options : re_opt
                },
                match : {
                    type : "url_pattern",
                    new_val : d_record,
                    options : "request"
                }
            };
            profile.element.push(url_pattern);
        }

        if(packet !== ""){
            var e_packet = {
                action : {
                    type : "BLOCK",
                    options : ""
                },
                match : {
                    type : "packet_filter",
                    val : packet,
                    options : ""
                }
            };
            profile.element.push(e_packet);
        }

        if(chk_kiscom.getValue()){
            var e_kis = {
                action : {
                    type : "REDIRECTION",
                    options : re_opt
                },
                match : {
                    type : "kocsc_db",
                    val : ks,
                    options : ""
                }
            };
            profile.element.push(e_kis);
        }

        if(chk_safenet.getValue()){
            var e_sa = {
                action : {
                    type : "REDIRECTION",
                    options : re_opt
                },
                match : {
                    type : "self_rate",
                    val : ks,
                    options : ""
                }
            };
            profile.element.push(e_sa);
        }

        if(chk_youth.getValue()){
            var e_you = {
                action : {
                    type : "REDIRECTION",
                    options : re_opt
                },
                match : {
                    type : "youth_harmful",
                    val : "",
                    options : ""
                }
            };
            profile.element.push(e_you);
        }

        if(url_acc !== ""){
            var e_url = {
                action : {
                    type : "ACCEPT",
                    options : ""
                },
                match : {
                    type : "url_index",
                    val : url_acc,
                    options : ""
                }
            };
            profile.element.push(e_url);
        }

        if(url_deny !== ""){
            var e_url = {
                action : {
                    type : "REDIRECTION",
                    options : re_opt
                },
                match : {
                    type : "url_index",
                    val : url_deny,
                    options : ""
                }
            };
            profile.element.push(e_url);
        }

        if(approve.getValue()){
            var e_url = {
                action : {
                    type : "APPROVE",
                    options : a_app.join(";")
                },
                match : {
                    type : "url_index",
                    val : url_non,
                    options : ""
                }
            };
            profile.element.push(e_url);
        }

        profile['@cid'] = me.cid;

        var _params = {
            basename: Ext.encode("fw_profile_web"),
            obj: Ext.encode(profile),
            id_info: Ext.encode({'fieldname':'@cid'}),
            num_info: Ext.encode({'fieldname':'@num'}),
            update: Ext.encode(update)
        };


        var key = {
            'name': Ext.getCmp("name").getValue(),
            '_kind': 'fw_profile_web'
        };

        if(update){
            key['@cid'] = {
                '$ne': me.cid
            };
        }

        var _param = {
            basename: Ext.encode("with_cid"),
            key: Ext.encode(key)
        };
        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_proname'), null); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );

        }else{
            fn_set();
        }

        function fn_set(){

            request_helper.xmlrpc_call_Ajax_Post(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){

                    Ext.data.StoreManager.lookup("store_fw_profile_web_list").load();

                    if(update === true){

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_edit"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }else{

                        me.chk_acc = [];
                        me.chk_deny = [];
                        me.get_category_db();
                        Ext.getCmp("tab_1").show();

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
                }
            );
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp("win_profile_http");
        var record = me.record;
        var a_obj = me.a_obj;
        var ra_obj = me.ra_obj;
        var d_obj = me.d_obj;
        var rd_obj = me.rd_obj;

        var _n = 0;
        for(var i in ra_obj){
            if(!a_obj[ra_obj[i].url]){ _n++; }
        }

        var __n = 0;
        for(var i in rd_obj){
            if(!d_obj[rd_obj[i].url]){ __n++; }
        }

        var _r = 0;
        for(var i in a_obj){
            if(!ra_obj[a_obj[i].url]){ _r++; }
        }

        var __r = 0;
        for(var i in d_obj){
            if(!rd_obj[d_obj[i].url]){ __r++; }
        }

        if(_n > 0 || _r > 0 || __n > 0 || __r > 0){
            Ext.MessageBox.confirm(__weguardia,get_msg('conf_web_cancel'),function(btn){
                if(btn === "yes"){
                    me.close();
                }
            });
        }else{

            this.close();
        }
    },

    onWinAfterRender: function(component, eOpts) {
        var me = this;
        me.a_record = [];
        me.a_obj = {};
        me.ra_obj = {};
        me.d_record = [];
        me.d_obj = {};
        me.rd_obj = {};

        chk_zenauth(null);

        var a_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['num','url','desc']
        });

        Ext.getCmp("grid_acc").bindStore(a_record);

        var d_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['num','url','desc']
        });

        Ext.getCmp("grid_deny").bindStore(d_record);

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/http_allow_url_cnt')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.acc_count = response[0];
            }
        );

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/http_deny_url_cnt')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.deny_count = response[0];
            }
        );
        Ext.getCmp("acc_total").update(__zen('total')+' : 0');
        Ext.getCmp("deny_total").update(__zen('total')+' : 0');

        if(me.edit === "edit"){

            me.setTitle(__zen('web_filter_edit')+" - "+me.num);
            me.init_fw_profile();
        }else{

            me.setTitle(__zen('web_filter_add'));
            var chk_acc = [];
            var chk_deny = [];

            me.chk_acc = chk_acc;
            me.chk_deny = chk_deny;
            me.get_category_db();
        }
    },

    init_fw_profile: function() {
        var me = Ext.getCmp("win_profile_http");
        var record = me.record;

        var _params = {
            basename: Ext.encode('with_cid'),
            key: Ext.encode({'_kind':'fw_profile_web','@cid':me.cid})
        };

        request_helper.xmlrpc_call_Ajax_Post(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                var record = response;

                Ext.getCmp("name").setValue(record.name);
                Ext.getCmp("desc").setValue(record.description);

                var ele = record.element;
                var chk_acc = [];
                var chk_deny = [];

                for(var i=0; i<ele.length; i++){
                    if(ele[i].action.type === "ACCEPT"){
                        if(ele[i].match.type === "url_pattern"){
                            me.a_record = ele[i].match.new_val;
                            Ext.getCmp("acc_total").update(__zen('total')+' : '+ele[i].match.new_val.length);
                            var a_obj = {};
                            var ra_obj = {};
                            var a_record = [];
                            for(var l=0; l<ele[i].match.new_val.length; l++){
                                a_record.push({'url':ele[i].match.new_val[l].url,'desc':ele[i].match.new_val[l].desc});
                                a_obj[ele[i].match.new_val[l].url] = ele[i].match.new_val[l];
                                ra_obj[ele[i].match.new_val[l].url] = ele[i].match.new_val[l];
                            }
                            Ext.getCmp("grid_acc").getStore().loadData(a_record);
                            me.a_obj = a_obj;
                            me.ra_obj = ra_obj;
                        }else if(ele[i].match.type === "url_index"){
                            Ext.getCmp('tab_4').show();

                            var acc = ele[i].match.val.split(';');

                            for(var l=0; l<acc.length; l++){

                                chk_acc[acc[l]] = true;
                            }

                        }
                    }else if(ele[i].action.type === "REDIRECTION"){
                        var re = ele[i].action.options.split(";");
                        if(re[0] !== ""){
                            Ext.getCmp("re_url").setValue(true);
                            Ext.getCmp("redirection").setValue(re[0]);
                        }else{
                            Ext.getCmp("re_image").setValue(true);
                            Ext.getCmp("redirection").setValue(re[1]);
                        }

                        if(ele[i].match.type === "url_pattern"){
                            me.d_record = ele[i].match.new_val;
                            Ext.getCmp("deny_total").update(__zen('total')+' : '+ele[i].match.new_val.length);
                            var d_obj = {};
                            var rd_obj = {};
                            var d_record = [];
                            for(var l=0; l<ele[i].match.new_val.length; l++){
                                d_record.push({'url':ele[i].match.new_val[l].url,'desc':ele[i].match.new_val[l].desc});
                                d_obj[ele[i].match.new_val[l].url] = ele[i].match.new_val[l];
                                rd_obj[ele[i].match.new_val[l].url] = ele[i].match.new_val[l];
                            }
                            Ext.getCmp("grid_deny").getStore().loadData(ele[i].match.new_val);
                            me.d_obj = d_obj;
                            me.rd_obj = rd_obj;
                        }else if(ele[i].match.type === "kocsc_db"){
                            Ext.getCmp("chk_kiscom").setValue(true);
                        }else if(ele[i].match.type === "self_rate"){
                            Ext.getCmp("chk_safenet").setValue(true);
                        }else if(ele[i].match.type === "youth_harmful"){
                            Ext.getCmp("chk_youth").setValue(true);
                        }else if(ele[i].match.type === "url_index"){

                        }

                        if(ele[i].match.type === "kocsc_db" || ele[i].match.type === "self_rate"){
                            Ext.getCmp('tab_3').show();
                            var n_val = ele[i].match.val;

                            var nude = n_val.substring(0,2);
                            var sex = n_val.substring(2,4);
                            var vio = n_val.substring(4,6);
                            var lan = n_val.substring(6,8);
                            var s1 = n_val.substring(8,10);
                            var s2 = n_val.substring(10);

                            Ext.getCmp("nNude").setValue(nude);
                            Ext.getCmp("nSex").setValue(sex);
                            Ext.getCmp("nViolence").setValue(vio);
                            Ext.getCmp("nLanguage").setValue(lan);

                            if(s1 === "i1"){
                                Ext.getCmp("safeEtc1").setValue(true);
                            }
                            if(s2 === "h1"){
                                Ext.getCmp("safeEtc2").setValue(true);
                            }
                        }

                        if(ele[i].match.type === "url_index"){
                            Ext.getCmp('tab_4').show();

                            var deny = ele[i].match.val.split(";");

                            for(var l=0; l<deny.length; l++){

                                chk_deny[deny[l]] = true;
                            }

                        }
                    }else if(ele[i].action.type === "BLOCK"){
                        var packet = ele[i].match.val.split(";");
                        for(var l=0; l<packet.length; l++){
                            Ext.getCmp("chk_"+packet[l]).setValue(true);
                        }
                    }else if(ele[i].action.type === "APPROVE"){
                        Ext.getCmp("approve").setValue(true);

                        var opt = ele[i].action.options.split(";");
                        if(opt[0] === "bypass_log"){
                            Ext.getCmp("bypass").setValue(true);
                        }
                        if(opt[1] !== ""){ Ext.getCmp("req").setValue(opt[1]); }
                        if(opt[2] !== ""){ Ext.getCmp("rep").setValue(opt[2]); }
                    }

                }

                me.chk_acc = chk_acc;
                me.chk_deny = chk_deny;

                Ext.getCmp("tab_1").show();
                me.get_category_db();
            }
        );
    },

    get_category_db: function() {
        var me = Ext.getCmp("win_profile_http");
        var _params = {
            name: Ext.encode("category_db")
        };

        var list = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_fw_profile_web_db',
            _params,
            function(response){

                for(var i in response){

                    var submenu = [];
                    var f = "";

                    for(var l in response[i].list){

                        if(f===""){ f = l; }

                        var _name = (__zen_locale==='ko')?response[i].list[l].name[0]:(__zen_locale==="en")?response[i].list[l].name[1]:(__zen_locale==="jp")?response[i].list[l].name[2]:'';

                        if(Number(l) > 200 && Number(l) <= 250){
                            _name = response[i].list[l].name;
                        }
                        submenu.push({
                            text: l+". "+_name,
                            leaf: true,
                            idex: l
                        });
                    }

                    var g_name = (__zen_locale==='ko')?response[i].group_name[0]:(__zen_locale==="en")?response[i].group_name[1]:(__zen_locale==="jp")?response[i].group_name[2]:'';
                    list.push({
                        text: g_name,
                        expanded: true,
                        leaf: false,
                        children: submenu,
                        idex: (i==="1")?"0.1":(i==="2")?"1.1":(i==="13")?"119.1":f+"-"+l
                    });
                }

                var root = {
                    text: __zen('all'),
                    expanded: true,
                    children: list,
                    idex: "all"
                };

                var store = Ext.data.StoreManager.lookup("store_http_url_tree");
                store.setRootNode(root);
            }
        );
    },

    chk_url: function(t, p) {
        var me = Ext.getCmp("win_profile_http");
        var index = t.id.split("_");
        idx = index[1];

        if(idx==="all" || idx==="0.1" || idx==="1.1" || idx=="119.1"){ return false; }

        var chk_acc = me.chk_acc;
        var chk_deny = me.chk_deny;

        if(index[0] === 'acc'){

            if(idx==="0"){ return false; }

            var _cls = $("#acc_"+idx).attr("class");

            var chk = (_cls.indexOf('on')===-1)?'chk_on':'chk_off';

            $("#acc_"+idx).removeClass("chk_on chk_mid chk_off").addClass(chk);
            $("#deny_"+idx).removeClass("chk_on chk_mid").addClass("chk_off");

            if(idx.indexOf("-")!==-1){
                var str = idx.split("-");

                for(var i=Number(str[0]); i<=Number(str[1]); i++){

                    if(chk === 'chk_on'){

                        chk_acc[i] = true;
                        if(document.getElementById("deny_"+i)){
                            $("#deny_"+i).removeClass("chk_on chk_mid").addClass("chk_off");
                        }
                        if(chk_deny[i]){ delete chk_deny[i]; }
                    }else{
                        delete chk_acc[i];
                    }

                    if(document.getElementById("acc_"+i)){
                        $("#acc_"+i).removeClass("chk_on chk_mid chk_off").addClass(chk);
                    }
                }
            }else{

                if(chk === 'chk_on'){
                    chk_acc[idx] = true;

                    if(chk_deny[idx]){
                        delete chk_deny[idx];
                    }
                }else{
                    delete chk_acc[idx];
                }

                var str = p.split("-");
                var n = 0, _a = 0, _d = 0;
                for(var i=Number(str[0]); i<=Number(str[1]); i++){
                    if(chk_acc[i]){ _a++; }
                    if(chk_deny[i]){ _d++; }
                    n++;
                }

                var _chk = (n===_a)?"chk_on":(_a>0)?"chk_mid":"chk_off";
                var __chk = (n===_d)?"chk_on":(_d>0)?"chk_mid":"chk_off";

                $("#acc_"+p).removeClass("chk_on chk_mid chk_off").addClass(_chk);
                $("#deny_"+p).removeClass("chk_on chk_mid chk_off").addClass(__chk);
            }


        }else{

            var _cls = $("#deny_"+idx).attr("class");

            var chk = (_cls.indexOf('on')===-1)?'chk_on':'chk_off';
            $("#deny_"+idx).removeClass("chk_on chk_mid chk_off").addClass(chk);

            if(document.getElementById("acc_"+idx)){
                $("#acc_"+idx).removeClass("chk_on chk_mid").addClass("chk_off");
            }

            if(idx.indexOf("-")!==-1){
                var str = idx.split("-");
                for(var i=Number(str[0]); i<=Number(str[1]); i++){

                    if(chk === 'chk_on'){

                        chk_deny[i] = true;
                        if(document.getElementById("acc_"+i)){
                            $("#acc_"+i).removeClass("chk_on chk_mid").addClass("chk_off");
                        }
                        if(chk_acc[i]){ delete chk_acc[i]; }
                    }else{
                        delete chk_deny[i];
                    }

                    if(document.getElementById("deny_"+i)){
                        $("#deny_"+i).removeClass("chk_on chk_mid").addClass(chk);
                    }
                }
            }else{

                if(chk === 'chk_on'){
                    chk_deny[idx] = true;

                    if(chk_acc[idx]){
                        delete chk_acc[idx];
                    }
                }else{
                    delete chk_deny[idx];
                }

                var str = p.split("-");
                var n = 0, _a = 0, _d = 0;
                for(var i=Number(str[0]); i<=Number(str[1]); i++){
                    if(chk_acc[i]){ _a++; }
                    if(chk_deny[i]){ _d++; }
                    n++;
                }

                var _chk = (n===_a)?"chk_on":(_a>0)?"chk_mid":"chk_off";
                var __chk = (n===_d)?"chk_on":(_d>0)?"chk_mid":"chk_off";

                $("#acc_"+p).removeClass("chk_on chk_mid chk_off").addClass(_chk);
                $("#deny_"+p).removeClass("chk_on chk_mid chk_off").addClass(__chk);
            }
        }

        me.chk_acc = chk_acc;
        me.chk_deny = chk_deny;
    }

});