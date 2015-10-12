
Ext.define('NFW2.view.win_network_alg_ftp', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_alg_ftp',

    requires: [
        'NFW2.view.win_network_alg_ftpViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.FieldSet',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.plugin.CellEditing',
        'Ext.view.Table',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'win_network_alg_ftp'
    },
    defaultListenerScope: true,
    cls: 'zen_win',
    id: 'win_network_alg_ftp',
    width: 950,
    modal: true,

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: '',
                        itemId: 'fm',
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
                                items: [
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_publicServer');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        id: 'win_publicServer',
                                        margin: '11 0 0 0',
                                        width: 350,
                                        fieldLabel: 'Public FTP Server IP',
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        enableKeyEvents: true,
                                        maskRe: /[0-9.\/]/,
                                        listeners: {
                                            focus: 'onWin_publicServerFocus',
                                            blur: 'onWin_publicServerBlur',
                                            errorchange: 'onWin_publicServerErrorChange',
                                            keydown: 'onWin_publicServerKeydown'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_realServer');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        id: 'win_realServer',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        fieldLabel: 'Real FTP Server IP',
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        enableKeyEvents: true,
                                        maskRe: /[0-9.\/]/,
                                        listeners: {
                                            focus: 'onWin_realServerFocus',
                                            blur: 'onWin_realServerBlur',
                                            errorchange: 'onWin_realServerErrorChange',
                                            keydown: 'onWin_realServerKeydown'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'win_interface',
                                        margin: '8 0 0 8',
                                        width: 343,
                                        labelSeparator: ' ',
                                        labelWidth: 157,
                                        msgTarget: 'none',
                                        editable: false,
                                        enableKeyEvents: true,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'store_interface',
                                        valueField: 'name',
                                        bind: {
                                            fieldLabel: '{inter}'
                                        },
                                        listeners: {
                                            afterrender: 'afterrender'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = this;

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535);}
                                                }else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        fieldInfo: {
                                            txt: msg_tip_length_port(1,
                                            65535,
                                            null)
                                        },
                                        id: 'win_port',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        value: 21,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true,
                                        maxLength: 5,
                                        bind: {
                                            fieldLabel: '{port_num}'
                                        },
                                        listeners: {
                                            focus: 'onWin_portFocus',
                                            blur: 'onWin_portBlur',
                                            errorchange: 'onWin_portErrorChange',
                                            keydown: 'onWin_portKeydown'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_maxSess');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 20)){ return ValidLimit(1, 20);}
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        fieldInfo: {
                                            txt: msg_tip_length(1,
                                            20,
                                            null)
                                        },
                                        id: 'win_maxSess',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        value: 10,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        bind: {
                                            fieldLabel: '{max_connect}'
                                        },
                                        listeners: {
                                            focus: 'onWin_maxSessFocus',
                                            blur: 'onWin_maxSessBlur',
                                            errorchange: 'onWin_maxSessErrorChange',
                                            keydown: 'onWin_maxSessKeydown'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 18',
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                id: 'win_action',
                                                width: 420,
                                                labelSeparator: ' ',
                                                labelWidth: 143,
                                                bind: {
                                                    fieldLabel: '{operating_method}'
                                                },
                                                items: [
                                                    me.processMaxConnect_nomal({
                                                        xtype: 'radiofield',
                                                        id: 'win_action_accept',
                                                        name: 'action',
                                                        checked: true,
                                                        bind: {
                                                            boxLabel: '{nomal_gate}'
                                                        }
                                                    }),
                                                    me.processMaxConnect_blank({
                                                        xtype: 'radiofield',
                                                        id: 'win_action_deny',
                                                        name: 'action',
                                                        bind: {
                                                            boxLabel: '{blank_gate}'
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                margins: '0 0 10 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        flex: 0.65,
                                        margin: '0 0 0 0',
                                        title: 'OPTION',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        margin: '0 0 0 10',
                                                        items: [
                                                            {
                                                                xtype: 'radiogroup',
                                                                id: 'win_upload',
                                                                width: 400,
                                                                labelSeparator: ' ',
                                                                bind: {
                                                                    fieldLabel: '{upload}'
                                                                },
                                                                items: [
                                                                    me.processUpload_accept({
                                                                        xtype: 'radiofield',
                                                                        id: 'win_upload_accept',
                                                                        name: 'upload',
                                                                        checked: true,
                                                                        bind: {
                                                                            boxLabel: '{accept}'
                                                                        }
                                                                    }),
                                                                    me.processUpload_deny({
                                                                        xtype: 'radiofield',
                                                                        id: 'win_upload_deny',
                                                                        name: 'upload',
                                                                        bind: {
                                                                            boxLabel: '{deny}'
                                                                        }
                                                                    })
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        margin: '0 0 0 10',
                                                        items: [
                                                            {
                                                                xtype: 'radiogroup',
                                                                id: 'win_download',
                                                                width: 400,
                                                                labelSeparator: ' ',
                                                                bind: {
                                                                    fieldLabel: '{download}'
                                                                },
                                                                items: [
                                                                    me.processDownload_accept({
                                                                        xtype: 'radiofield',
                                                                        id: 'win_download_accept',
                                                                        name: 'download',
                                                                        checked: true,
                                                                        bind: {
                                                                            boxLabel: '{accept}'
                                                                        }
                                                                    }),
                                                                    me.processDownload_deny({
                                                                        xtype: 'radiofield',
                                                                        id: 'win_download_deny',
                                                                        name: 'download',
                                                                        bind: {
                                                                            boxLabel: '{deny}'
                                                                        }
                                                                    })
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
                                                            me.processWin_limitFile_state({
                                                                xtype: 'checkboxfield',
                                                                id: 'win_limitFile_state',
                                                                style: 'color:#666;',
                                                                bind: {
                                                                    boxLabel: '{limit_fileExtension}'
                                                                },
                                                                listeners: {
                                                                    change: 'onWin_limitFile_stateChange'
                                                                }
                                                            }),
                                                            {
                                                                xtype: 'textfield',
                                                                validator: function(value) {
                                                                    var me = this;
                                                                    var limitFile_state = Ext.getCmp('win_limitFile_state');

                                                                    if(limitFile_state.getValue()){
                                                                        if(value !== true){
                                                                            if(value !== ""){
                                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                            }
                                                                            else{
                                                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                                            }
                                                                        }
                                                                    }
                                                                    return true;
                                                                },
                                                                disabled: true,
                                                                id: 'win_limitFile',
                                                                labelSeparator: ' ',
                                                                msgTarget: 'none',
                                                                enableKeyEvents: true,
                                                                maskRe: /[\S\/]/,
                                                                listeners: {
                                                                    blur: 'onWin_limitFileBlur',
                                                                    errorchange: 'onWin_limitFileErrorChange',
                                                                    keydown: 'onWin_limitFileKeydown'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                margin: '0 0 0 10',
                                                                style: 'color:red;',
                                                                bind: {
                                                                    data: '{limit_fileExtension_text}'
                                                                }
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
                                                            me.processWin_limitCommand_state({
                                                                xtype: 'checkboxfield',
                                                                id: 'win_limitCommand_state',
                                                                style: 'color:#666;',
                                                                bind: {
                                                                    boxLabel: '{limit_commandArgu}'
                                                                },
                                                                listeners: {
                                                                    change: 'onWin_limitCommand_stateChange'
                                                                }
                                                            }),
                                                            {
                                                                xtype: 'textfield',
                                                                validator: function(value) {
                                                                    var me = this;
                                                                    var limitFile_state = Ext.getCmp('win_limitCommand_state');

                                                                    if(limitFile_state.getValue()){
                                                                        if(value !== true){
                                                                            if(value !== ""){
                                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                            }
                                                                            else{
                                                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                                            }
                                                                        }
                                                                    }
                                                                    return true;
                                                                },
                                                                disabled: true,
                                                                id: 'win_limitCommand',
                                                                margin: '0 0 0 9',
                                                                labelSeparator: ' ',
                                                                msgTarget: 'none',
                                                                enableKeyEvents: true,
                                                                maskRe: /[\S\/]/,
                                                                listeners: {
                                                                    blur: 'onWin_limitCommandBlur',
                                                                    errorchange: 'onWin_limitCommandErrorChange',
                                                                    keydown: 'onWin_limitCommandKeydown'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                margin: '0 0 0 10',
                                                                style: 'color:red;',
                                                                bind: {
                                                                    data: '{limit_commandArgu_text}'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        margin: '8 0 0 0',
                                                        layout: 'table',
                                                        toggleOnTitleClick: false,
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                id: 'win_command',
                                                                items: [
                                                                    {
                                                                        xtype: 'toolbar',
                                                                        cls: 'zen_toolbar',
                                                                        disabled: true,
                                                                        height: 46,
                                                                        id: 'command_bar',
                                                                        margin: '10 0 0 0',
                                                                        minHeight: 46,
                                                                        items: [
                                                                            {
                                                                                xtype: 'container',
                                                                                flex: 1,
                                                                                id: 'command_msg',
                                                                                itemId: 'command_msg',
                                                                                style: 'color:#3892d3;'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'checkboxgroup',
                                                                        id: 'command_chk_use',
                                                                        margin: '0 0 0 -12',
                                                                        layout: 'column',
                                                                        labelSeparator: ' ',
                                                                        vertical: true,
                                                                        items: [
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk1',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'ABOR',
                                                                                inputValue: 'ABOR',
                                                                                listeners: {
                                                                                    render: 'text_abor'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk2',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'ACCT',
                                                                                inputValue: 'ACCT',
                                                                                listeners: {
                                                                                    render: 'text_acct'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk3',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'ALLO',
                                                                                inputValue: 'ALLO',
                                                                                listeners: {
                                                                                    render: 'text_allo'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk4',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'APPE',
                                                                                inputValue: 'APPE',
                                                                                listeners: {
                                                                                    render: 'text_appe'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk5',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'CDUP',
                                                                                inputValue: 'CDUP',
                                                                                listeners: {
                                                                                    render: 'text_cdup'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk6',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'CWD',
                                                                                inputValue: 'CWD',
                                                                                listeners: {
                                                                                    render: 'text_cwd'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk7',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'DELE',
                                                                                inputValue: 'DELE',
                                                                                listeners: {
                                                                                    render: 'text_dele'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk8',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'HELP',
                                                                                inputValue: 'HELP',
                                                                                listeners: {
                                                                                    render: 'text_help'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk9',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'LIST',
                                                                                inputValue: 'LIST',
                                                                                listeners: {
                                                                                    render: 'text_list'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk10',
                                                                                width: 70,
                                                                                labelSeparator: ' ',
                                                                                name: 'command',
                                                                                boxLabel: 'MAIL',
                                                                                inputValue: 'MAIL',
                                                                                listeners: {
                                                                                    render: 'text_mail'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk11',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'MKD',
                                                                                inputValue: 'MDK',
                                                                                listeners: {
                                                                                    render: 'text_acct1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk12',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'MLFL',
                                                                                inputValue: 'MLFL',
                                                                                listeners: {
                                                                                    render: 'text_allo1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk13',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'MODE',
                                                                                inputValue: 'MODE',
                                                                                listeners: {
                                                                                    render: 'text_appe1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk14',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'NLST',
                                                                                inputValue: 'NSLT',
                                                                                listeners: {
                                                                                    render: 'text_cdup1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk15',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'NOOP',
                                                                                inputValue: 'NOOP',
                                                                                listeners: {
                                                                                    render: 'text_cwd1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk16',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'PASS',
                                                                                inputValue: 'PASS',
                                                                                listeners: {
                                                                                    render: 'text_dele1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk17',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'PASV',
                                                                                inputValue: 'PASV',
                                                                                listeners: {
                                                                                    render: 'text_help1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk18',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'PORT',
                                                                                inputValue: 'PORT',
                                                                                listeners: {
                                                                                    render: 'text_list1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk19',
                                                                                width: 70,
                                                                                labelSeparator: ' ',
                                                                                name: 'command',
                                                                                boxLabel: 'PWD',
                                                                                inputValue: 'PWD',
                                                                                listeners: {
                                                                                    render: 'text_mail1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk20',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'MDTM',
                                                                                inputValue: 'MDTM',
                                                                                listeners: {
                                                                                    render: 'text_abor1'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk21',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'QUIT',
                                                                                inputValue: 'QUIT',
                                                                                listeners: {
                                                                                    render: 'text_abor11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk22',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'REIN',
                                                                                inputValue: 'REIN',
                                                                                listeners: {
                                                                                    render: 'text_acct11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk23',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'REST',
                                                                                inputValue: 'REST',
                                                                                listeners: {
                                                                                    render: 'text_allo11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk24',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'RETR',
                                                                                inputValue: 'RETR',
                                                                                listeners: {
                                                                                    render: 'text_appe11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk25',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'RMD',
                                                                                inputValue: 'RMD',
                                                                                listeners: {
                                                                                    render: 'text_cdup11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk26',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'RNFR',
                                                                                inputValue: 'RNFR',
                                                                                listeners: {
                                                                                    render: 'text_cwd11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk27',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'RNTO',
                                                                                inputValue: 'RNTO',
                                                                                listeners: {
                                                                                    render: 'text_dele11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk28',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'SITE',
                                                                                inputValue: 'SITE',
                                                                                listeners: {
                                                                                    render: 'text_help11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk29',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'SIZE',
                                                                                inputValue: 'SIZE',
                                                                                listeners: {
                                                                                    render: 'text_list11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk30',
                                                                                width: 70,
                                                                                labelSeparator: ' ',
                                                                                name: 'command',
                                                                                boxLabel: 'SMNT',
                                                                                inputValue: 'SMNT',
                                                                                listeners: {
                                                                                    render: 'text_mail11'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk31',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'STAT',
                                                                                inputValue: 'STAT',
                                                                                listeners: {
                                                                                    render: 'text_abor111'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk32',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'STOR',
                                                                                inputValue: 'STOR',
                                                                                listeners: {
                                                                                    render: 'text_acct111'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk33',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'STOU',
                                                                                inputValue: 'STOU',
                                                                                listeners: {
                                                                                    render: 'text_allo111'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk34',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'STRU',
                                                                                inputValue: 'STRU',
                                                                                listeners: {
                                                                                    render: 'text_appe111'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk35',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'SYST',
                                                                                inputValue: 'SYST',
                                                                                listeners: {
                                                                                    render: 'text_cdup111'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk36',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'TYPE',
                                                                                inputValue: 'TYPE',
                                                                                listeners: {
                                                                                    render: 'text_cwd111'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                disabled: true,
                                                                                id: 'command_chk37',
                                                                                width: 70,
                                                                                name: 'command',
                                                                                boxLabel: 'USER',
                                                                                inputValue: 'USER',
                                                                                listeners: {
                                                                                    render: 'text_dele111'
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
                                    },
                                    {
                                        xtype: 'fieldset',
                                        flex: 0.35,
                                        margin: '0 0 0 8',
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
                                                fixed: true,
                                                cls: 'in_grid',
                                                height: 320,
                                                id: 'grid_user',
                                                margin: '5 0 0 0',
                                                header: false,
                                                title: 'My Grid Panel',
                                                disableSelection: true,
                                                enableColumnHide: false,
                                                enableColumnMove: false,
                                                enableColumnResize: false,
                                                sortableColumns: false,
                                                store: 'store_user_setting_list',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = 'cell_combo';

                                                            if(value==='id'){
                                                                return 'ID';
                                                            }else{
                                                                return 'IP';
                                                            }
                                                        },
                                                        id: 'column_type',
                                                        dataIndex: 'type',
                                                        flex: 0.3,
                                                        bind: {
                                                            text: '{type2}'
                                                        },
                                                        editor: {
                                                            xtype: 'combobox',
                                                            baseCls: 'cell_combo',
                                                            editable: false,
                                                            displayField: 'type',
                                                            queryMode: 'local',
                                                            store: 'store_type_list',
                                                            valueField: 'type_value',
                                                            listeners: {
                                                                focus: 'onComboboxFocus',
                                                                collapse: 'onComboboxCollapse'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = 'cell_text';
                                                            return value;
                                                        },
                                                        dataIndex: 'value',
                                                        text: 'ID/IP',
                                                        flex: 0.4,
                                                        editor: {
                                                            xtype: 'textfield',
                                                            baseCls: 'cell_text',
                                                            labelSeparator: ' ',
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            maskRe: /[\S\/]/,
                                                            listeners: {
                                                                blur: 'onWin_valueBlur',
                                                                errorchange: 'onWin_portErrorChange1',
                                                                keydown: 'onWin_valueKeydown',
                                                                focus: 'onWin_portFocus1'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = 'cell_combo';
                                                            if(value==='Allow'){
                                                                return __zen('always_allow');
                                                            }else{
                                                                return __zen('deny');
                                                            }
                                                        },
                                                        dataIndex: 'action_type',
                                                        flex: 0.3,
                                                        bind: {
                                                            text: '{action}'
                                                        },
                                                        editor: {
                                                            xtype: 'combobox',
                                                            baseCls: 'cell_combo',
                                                            labelSeparator: ' ',
                                                            editable: false,
                                                            displayField: 'action',
                                                            queryMode: 'local',
                                                            store: 'store_action_list',
                                                            valueField: 'action_value',
                                                            listeners: {
                                                                focus: 'onComboboxFocus1',
                                                                collapse: 'onComboboxCollapse1'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            var me = Ext.getCmp('win_network_alg_ftp');
                                                            var grid =Ext.getCmp('grid_user');
                                                            var store = grid.getStore();
                                                            grid.getPlugin('cell_text').completeEdit();
                                                            store.removeAt(rowIndex, 1);
                                                            Ext.getCmp('grid_user').getView().refresh();
                                                        },
                                                        width: 40,
                                                        align: 'center',
                                                        iconCls: 'icr_del',
                                                        items: [
                                                            {

                                                            }
                                                        ]
                                                    }
                                                ],
                                                plugins: [
                                                    {
                                                        ptype: 'cellediting',
                                                        pluginId: 'cell_text',
                                                        clicksToEdit: 1
                                                    }
                                                ],
                                                viewConfig: {
                                                    markDirty: false
                                                },
                                                listeners: {
                                                    cellclick: 'onGrid_userCellClick'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender1'
                                        }
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
                                        id: 'win_btn_ok',
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onWin_btn_okClick',
                                            blur: 'onWin_btn_okBlur'
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
                        listeners: {
                            afterrender: 'onNFW2_network_alg_ftpAfterRender'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processMaxConnect_nomal: function(config) {
        config.boxLabel = true;

        return config;
    },

    processMaxConnect_blank: function(config) {
        config.boxLabel = true;

        return config;
    },

    processUpload_accept: function(config) {
        config.boxLabel = true;

        return config;
    },

    processUpload_deny: function(config) {
        config.boxLabel = true;

        return config;
    },

    processDownload_accept: function(config) {
        config.boxLabel = true;

        return config;
    },

    processDownload_deny: function(config) {
        config.boxLabel = true;

        return config;
    },

    processWin_limitFile_state: function(config) {
        config.boxLabel = true;

        return config;
    },

    processWin_limitCommand_state: function(config) {
        config.boxLabel = true;

        return config;
    },

    onWin_publicServerFocus: function(component, event, eOpts) {
        var me = this;

        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_publicServerBlur: function(component, event, eOpts) {
        var me = this;

        setTipBlur(this,component);
        Ext.getCmp('win_publicServer').validateValue(true);
    },

    onWin_publicServerErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_publicServerKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_realServerFocus: function(component, event, eOpts) {
        var me = this;

        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_realServerBlur: function(component, event, eOpts) {
        var me = this;

        setTipBlur(this,component);
        Ext.getCmp('win_realServer').validateValue(true);
    },

    onWin_realServerErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_realServerKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    afterrender: function(component, eOpts) {
        var inter = Ext.getCmp('win_interface').getStore().data;
        if(inter.length > 0){
            Ext.getCmp("win_interface").setValue(inter.items[0].data['name']);
        }
    },

    onWin_portFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_port').getValue()==="21"){
                Ext.getCmp('win_port').setValue("");
                Ext.getCmp('win_port').validateValue(true);
            }
        }

        setTipFocus(this,component);
    },

    onWin_portBlur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_port').getValue() === ""){
                Ext.getCmp('win_port').setValue("21");
            }
        }

        setTipBlur(this,component);
        Ext.getCmp('win_port').validateValue(true);
    },

    onWin_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_portKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_maxSessFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_maxSess').getValue()==="10"){
                Ext.getCmp('win_maxSess').setValue("");
                Ext.getCmp('win_maxSess').validateValue(true);
            }
        }

        setTipFocus(this,component);
    },

    onWin_maxSessBlur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_maxSess').getValue() === ""){
                Ext.getCmp('win_maxSess').setValue("10");
            }
        }

        setTipBlur(this,component);
        Ext.getCmp('win_maxSess').validateValue(true);
    },

    onWin_maxSessErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_maxSessKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_limitFile_stateChange: function(field, newValue, oldValue, eOpts) {
        var file = field.up('container').getComponent('win_limitFile');

        if(newValue){
                    file.enable();
                }else{
                    file.disable();
                }
    },

    onWin_limitFileBlur: function(component, event, eOpts) {
        Ext.getCmp('win_limitFile').validateValue(true);
    },

    onWin_limitFileErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_limitFileKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_limitCommand_stateChange: function(field, newValue, oldValue, eOpts) {
        var timeout = field.up('container').getComponent('win_limitCommand');

        if(newValue){
                    timeout.enable();
                }else{
                    timeout.disable();
                }
    },

    onWin_limitCommandBlur: function(component, event, eOpts) {
        Ext.getCmp('win_limitCommand').validateValue(true);
    },

    onWin_limitCommandErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_limitCommandKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    text_abor: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('ABOR : Abort');
        }, component);
    },

    text_acct: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('ACCT : User Account');
        }, component);
    },

    text_allo: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('ALLO : Allocate, used by some servers to allocate enough space on the disk before transfer');
        }, component);
    },

    text_appe: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('APPE : Append');
        }, component);
    },

    text_cdup: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('CDUP : Change to Parent Directory');
        }, component);
    },

    text_cwd: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('CWD : Change Working Directory');
        }, component);
    },

    text_dele: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('DELE : Delete followed by the filename');
        }, component);
    },

    text_help: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('HELP : gets the server to send helpful information regarding its parameters before file transfer perhaps');
        }, component);
    },

    text_list: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('LIST : List the files in the specified directory on the server, or if none is specified then the default is the directory being current worked on.');
        }, component);
    },

    text_mail: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('MAIL : Allows a user to send mail via the TELNET connection');
        }, component);
    },

    text_acct1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('MKD - Make Directory');
        }, component);
    },

    text_allo1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('MLFL - Allows a user to send mail via the dta connection');
        }, component);
    },

    text_appe1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('MDTM - Return the modification time of a file');
        }, component);
    },

    text_cdup1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('NLST - Name List');
        }, component);
    },

    text_cwd1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('NOOP - No Operation results in an OK from the server.');
        }, component);
    },

    text_dele1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('PASS - Password');
        }, component);
    },

    text_help1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('PASV - tells the Server-DTP to pick and listen on a data port which is different from the default.');
        }, component);
    },

    text_list1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('PORT - changes from the default User data port number');
        }, component);
    },

    text_mail1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('PWD - Print Working Directory');
        }, component);
    },

    text_abor1: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('MDTM : Return the modification time of a file');
        }, component);
    },

    text_abor11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('QUIT - Request asks the server to close the connection');
        }, component);
    },

    text_acct11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('REIN - Reinitialise flushes all account information just leaving the control connection and allowing current file transfers to complete.');
        }, component);
    },

    text_allo11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('REST - Restart plus the marker used to indicate the position from which restart should take place.');
        }, component);
    },

    text_appe11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('RETR - Retrieve');
        }, component);
    },

    text_cdup11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('RMD - Remove Directory');
        }, component);
    },

    text_cwd11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('RNFR - Rename From');
        }, component);
    },

    text_dele11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('RNTO - Rename To');
        }, component);
    },

    text_help11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('SITE - Site Parameters');
        }, component);
    },

    text_list11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('SIZE - Return the size of a file');
        }, component);
    },

    text_mail11: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('SMNT - Structure Mount i.e. mount a different directory without logging out');
        }, component);
    },

    text_abor111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('STAT - Status');
        }, component);
    },

    text_acct111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('STOR - Store');
        }, component);
    },

    text_allo111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('STOU - Store Unique i.e. as a unique file name in that directory');
        }, component);
    },

    text_appe111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('STRU - File Structure followed by F for File (default), R for Record and P for Page.');
        }, component);
    },

    text_cdup111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('SYST - System parameters e.g. Operating System.');
        }, component);
    },

    text_cwd111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('TYPE - Representation Type followed by A for ASCII, E for EBCDIC, I for Image etc. ');
        }, component);
    },

    text_dele111: function(component, eOpts) {
        component.getEl().on('mouseover', function(eOpts) {
            var err_fl = Ext.ComponentQuery.query('container[itemId="command_msg"]')[0];
            err_fl.update('USER - Username');
        }, component);
    },

    onFieldsetRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText:__zen('toggle_on'),
            offText:__zen('toggle_off'),
            id:'command_state',
            state:false,
            style:'margin-left:480px',
            resizeHandle: false,
            listeners: {
                change: function(el){
                    var _panel = el.up('fieldset');
                    var _state = (el.state===true)?false:true;
                    if(_state){
                        Ext.getCmp("command_bar").disable();
                        for(var i=1; i<=37; i++){
                            Ext.getCmp("command_chk"+i).disable();
                        }
                    }else{
                        Ext.getCmp("command_bar").enable();
                        for(var j=1; j<=37; j++){
                            Ext.getCmp("command_chk"+j).enable();
                        }
                    }
                }
            }
        });
        component.setTitle(__zen('limit_command'));
        component.legend.add(tbutton);
    },

    onButtonClick3: function(button, e, eOpts) {
        var store = Ext.getCmp('grid_user').getStore();
        var num=store.data.items.length;
        var obj = {
            'type':'id',
            'value' :'',
            'action_type' :'Allow'
        };
        store.add(obj);
    },

    onComboboxFocus: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
    },

    onWin_valueBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

        setTipBlur(this,component);
        Ext.getCmp('win_port').validateValue(true);
    },

    onWin_portErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_valueKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_portFocus1: function(component, event, eOpts) {
        var me = Ext.getCmp('win_network_alg_ftp');
        var grid =Ext.getCmp("grid_user");
        var _store = grid.getStore();
        var type= null;
        if(_store.data.items.length!==0){
            var item = _store.data.items[me.rowIndex].data;
            type=item.type;
        }
        var me = this;

        var str = null;
        if(type==='id'){
            str ='String';
        }else{
            str =disp_help_ip('4s');
        }
        component.fieldInfo = str;
        setTipFocus(this,component);

    },

    onComboboxFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse1: function(field, eOpts) {
        field.blur();
    },

    onGrid_userCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        me.rowIndex = rowIndex;
    },

    onFieldsetRender1: function(component, eOpts) {
        component.setTitle(__zen('block_user_list'));
    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_alg_ftp_proxy');
        var main = Ext.getCmp('NFW2_network_alg_ftp');

        var _store = Ext.getCmp("grid_user").getStore();
        var user = [];
        var user_list ={};

        if(Ext.getCmp('win_publicServer').isValid() === false){ Ext.getCmp('win_publicServer').focus(); return false; }
        if(Ext.getCmp('win_realServer').isValid() === false){ Ext.getCmp('win_realServer').focus(); return false; }
        if(Ext.getCmp('win_port').isValid() === false){ Ext.getCmp('win_port').focus(); return false; }
        if(Ext.getCmp('win_maxSess').isValid() === false){ Ext.getCmp('win_maxSess').focus(); return false; }

        if(_store.data.items.length!==0){
            for(var i in _store.data.items){
                var item = _store.data.items[i].data;
                if(this.value_validator(item.value, item.type) === false){
                    Ext.getCmp('grid_user').getPlugin('cell_text').startEdit(Number(i), 1);
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                    err_fl.addCls('ic_msg_err');
                    if(item.type==='ip'){
                        if(item.value===''){err_fl.update(get_msg('err_null'));}else{err_fl.update(get_msg('err_ip'));}
                    }else{
                        err_fl.update(get_msg('err_null'));
                    }
                    return false;
                }
                var user_type =item.type;
                var user_value=item.value;
                var user_action=item.action_type;

                user_list={
                    'type' : user_type,
                    'action_type' : user_action,
                    'value' : user_value
                };

                user.push(user_list);
            }
        }
        var obj = {};
        var limitFile_state ='';
        if(Ext.getCmp('win_limitFile_state').getValue()){
            if(Ext.getCmp('win_limitFile').isValid() === false){ Ext.getCmp('win_limitFile').focus(); return false; }
            limitFile_state='on';
        }else{limitFile_state='off';}
        var extension_chk_use ={
            'status' : limitFile_state,
            'ext_type' : Ext.getCmp('win_limitFile').getValue()
        };
        var limitCommand_state='';
        if(Ext.getCmp('win_limitCommand_state').getValue()){
            limitCommand_state='on';
            if(Ext.getCmp('win_limitCommand').isValid() === false){ Ext.getCmp('win_limitCommand').focus(); return false; }
        }else{limitCommand_state='off';}
        var argument_chk_use ={
            'status' : limitCommand_state,
            'arg_type' : Ext.getCmp('win_limitCommand').getValue()
        };
        var cmd_ext = '';
        for(var i=1; i<=37; i++){
            var cmd_ext_add = '';
            if(Ext.getCmp('command_chk'+i).getValue()===true){
                cmd_ext_add = Ext.getCmp("command_chk"+i).inputValue;
            }
            if(cmd_ext_add!==''){
                if(cmd_ext!==''){
                    cmd_ext=cmd_ext+','+cmd_ext_add;
                }else{
                    cmd_ext=cmd_ext+cmd_ext_add;
                }
            }
        }
        var command_chk_state='';
        if(Ext.getCmp('command_state').getValue()){command_chk_state='on';}else{command_chk_state='off';}
        var command_chk_use ={
            'status' : command_chk_state,
            'cmd_ext' : cmd_ext//Ext.getCmp('command_chk_use').getValue().command
        };
        obj = {
            'advertised_ftp_ip' : Ext.getCmp('win_publicServer').getValue(),
            'real_ftp_ip' : Ext.getCmp('win_realServer').getValue(),
            'interface' : Ext.getCmp('win_interface').getValue(),
            'port' : Ext.getCmp('win_port').getValue(),
            'max_sess' : Ext.getCmp('win_maxSess').getValue(),
            'action' : '',
            'upload' : '',
            'download' : '',
            'extension_chk_use' : extension_chk_use,
            'argument_chk_use' : argument_chk_use,
            'user_list' : user,
            'command_chk_use' :command_chk_use,
            'enable' : 'on'
        };

        if(Ext.getCmp('win_upload_accept').getValue()===true){
            obj['upload'] = 'Accept';
        }else{
            obj['upload'] = 'deny';
        }
        if(Ext.getCmp('win_download_accept').getValue()===true){
            obj['download'] = 'Accept';
        }else{
            obj['download'] = 'deny';
        }
        if(Ext.getCmp('win_action_accept').getValue()===true){
            obj['action'] = '0';
        }else{
            obj['action'] = '1';
        }


        if(me.edit !== "edit"){
            for(var i in store.data.items){
                var store_publicServer = store.data.items[i].data.advertised_ftp_ip;
                var store_portNum = store.data.items[i].data.port;
                var store_action = store.data.items[i].data.action;
                var store_interface = store.data.items[i].data.interface;

                if(store_interface){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                    if(store_interface==='all'){
                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_inteface_add'));
                        me.set_btn = true;
                        return false;
                    }
                    if(obj.interface==='all'){
                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_inteface_all'));
                        me.set_btn = true;
                        return false;
                    }
                }

                if(store_interface===obj.interface){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_inteface_chk'));
                        me.set_btn = true;
                    return false;
                }
                if(store_publicServer===obj.advertised_ftp_ip&&store_portNum===obj.port){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_telnet'));
                    me.set_btn = true;
                    return false;
                }
                if(Ext.getCmp('win_action_accept').getValue()===false){
                    if(store_action==='1'){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_blank_gate'));
                        me.set_btn = true;
                        return false;
                    }
                }
            }
        }else{
            for(var i in store.data.items){
                var store_publicServer = store.data.items[i].data.advertised_ftp_ip;
                var store_portNum = store.data.items[i].data.port;
                var store_action = store.data.items[i].data.action;
                var store_interface = store.data.items[i].data.interface;
                if(store.data.items[i].data.id !== me.record.data.id){
                    if(store_interface){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                    if(store_interface==='all'){
                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_inteface_add'));
                        me.set_btn = true;
                        return false;
                    }
                    if(obj.interface==='all'){
                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_inteface_all'));
                        me.set_btn = true;
                        return false;
                    }
                    }

                    if(store_interface===obj.interface){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_inteface_chk'));
                        me.set_btn = true;
                        return false;
                    }
                    if(store_publicServer===obj.advertised_ftp_ip&&store_portNum===obj.port){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_telnet'));
                        me.set_btn = true;
                        return false;
                    }
                    if(Ext.getCmp('win_action_accept').getValue()===false){
                        if(store_action==='1'){
                            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                            err_fl.addCls('ic_msg_err');
                            err_fl.update(get_msg('err_blank_gate'));
                            me.set_btn = true;
                            return false;
                        }
                    }
                }
            }
        }


        if(me.edit === "edit"){
            obj['_id'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;

        showLoadMask();

        var _params = {
            basename : Ext.encode('alg_ftp_proxy'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                hideLoadMask();
                var _store = Ext.data.StoreManager.lookup('store_alg_ftp_proxy');
                //         main.chk_interface("");
                main.get_store();
            }
        );

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
    },

    onWin_btn_okBlur: function(component, event, eOpts) {
        var me = this;
        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    onNFW2_network_alg_ftpAfterRender: function(component, eOpts) {
        var me = this;
        me.rowIndex = 0;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        var store = Ext.getCmp('grid_user').getStore();
        store.removeAll();

        if(this.edit === "edit"){
            me.edit_fir = true;
            me.setTitle(__zen('edit_alg_ftp') + " - " + me.index);

            showLoadMask();

            var _params = {
                basename : Ext.encode("alg_ftp_proxy"),
                key : Ext.encode({'_id' : me.record.data._id})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _params,

                function(data){
                    hideLoadMask();
                    Ext.getCmp('win_publicServer').setValue(data.advertised_ftp_ip);
                    Ext.getCmp('win_realServer').setValue(data.real_ftp_ip);
                    Ext.getCmp('win_interface').setValue(data.interface);
                    Ext.getCmp('win_port').setValue(data.port);
                    Ext.getCmp('win_maxSess').setValue(data.max_sess);
                    me.cid = data._id;
                    if(data.upload==='accept'){
                        Ext.getCmp('win_upload_accept').setValue(true);
                    }else{
                        Ext.getCmp('win_upload_deny').setValue(true);
                    }
                    if(data.download==='accept'){
                        Ext.getCmp('win_download_accept').setValue(true);
                    }else{
                        Ext.getCmp('win_download_deny').setValue(true);
                    }
                    if(data.action==='0'){
                        Ext.getCmp('win_action_accept').setValue(true);
                    }else{
                        Ext.getCmp('win_action_deny').setValue(true);
                    }
                    if(data.extension_chk_use.status==='on'){
                        Ext.getCmp('win_limitFile_state').setValue(true);
                    }
                    Ext.getCmp('win_limitFile').setValue(data.extension_chk_use.ext_type);
                    if(data.argument_chk_use.status==='on'){
                        Ext.getCmp('win_limitCommand_state').setValue(true);
                    }
                    Ext.getCmp('win_limitCommand').setValue(data.argument_chk_use.arg_type);

                    if(data.command_chk_use.status==='on'){
                        Ext.getCmp('command_state').state=true;
                        Ext.getCmp("command_state").moveHandle(true);
                        Ext.getCmp("command_bar").enable();
                        var arr_cmd = data.command_chk_use.cmd_ext.split(",");
                        for(var l=0; l<arr_cmd.length; l++){
                            for(var i=1; i<=37; i++){
                                Ext.getCmp("command_chk"+i).enable();
                                if(Ext.getCmp("command_chk"+i).inputValue===arr_cmd[l]){
                                    Ext.getCmp("command_chk"+i).setValue(true);
                                }
                            }
                        }
                    }
                    var c_user_list=0;
                    if(data.user_list){
                        c_user_list=data.user_list.length;
                    }
                    for(var j=0; j<c_user_list; j++){
                        var obj = {
                            'type': data.user_list[j].type,
                            'value' :data.user_list[j].value,
                            'action_type' :data.user_list[j].action_type
                        };
                        store.add(obj);
                    }
                }
            );

        }else{
            me.setTitle(__zen('add_alg_ftp'));
        }
    },

    value_validator: function(value, type) {
        if(value !== true){
            if(value !== ""){
                if(!CheckNotNull(value)){ return false;}
                if(type==='ip'){
                    if(!ValidIPAddress(value)){ return false;}
                }
            }
            else{
                if(!CheckNotNull(value)){ return false;}
            }
        }
        return true;
    },

    set_win: function(btn) {
        if(btn === "yes"){
            Ext.ComponentQuery.query('container[itemId="fm"]').forEach(function(fm){ fm.getForm().reset(); });
            Ext.getCmp('win_interface').setValue('all');
            var store = Ext.getCmp('grid_user').getStore();
            store.removeAll();
            Ext.getCmp('command_state').state=false;
            Ext.getCmp("command_state").moveHandle(false);
            Ext.getCmp("command_bar").disable();
            for(var i=1; i<=37; i++){
                Ext.getCmp("command_chk"+i).disable();
            }
            Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
        }
        else{
            Ext.getCmp('win_network_alg_ftp').close();
        }
    }

});