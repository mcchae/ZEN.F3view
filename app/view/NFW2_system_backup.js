
Ext.define('NFW2.view.NFW2_system_backup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_backup',

    requires: [
        'NFW2.view.NFW2_system_backupViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.tab.Panel',
        'Ext.form.field.Display',
        'Ext.tab.Tab'
    ],

    config: {
        obj_d: {
            integrity: '',
            restore: ''
        }
    },

    viewModel: {
        type: 'nfw2_system_backup'
    },
    cls: 'zen_body',
    id: 'NFW2_system_backup',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_system_backupAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'panel',
                        bodyPadding: 10,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                get_set_backup: function() {
                                    var me = Ext.getCmp('system_backup_set');

                                    me.obj_d = [];

                                    var _params = {
                                        basename : Ext.encode('system_restore')
                                    };

                                    request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'getObject',
                                    _params,
                                    function(response){

                                        //         Ext.suspendLayouts();

                                        me.obj_d.restore = response;

                                        if(response.passwd !== ""){
                                            Ext.getCmp('ft_backup_passwd').setValue(changePass(response.passwd));
                                        }
                                        else{ Ext.getCmp('ft_backup_passwd').reset(); }

                                        if(response.use === "on"){

                                            Ext.getCmp('rg_backup').setValue({'backup' : 'periodic'});

                                        }else{

                                            Ext.getCmp('rg_backup').setValue({'backup' : 'straight'});
                                        }

                                        if(response.type === "every"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("매일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "mon"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("월요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "tue"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("화요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "wed"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("수요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "thu"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("목요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "fri"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("금요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "sat"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("토요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }else if(response.type === "sun"){

                                            Ext.getCmp('cb_backupWeeks').setRawValue("일요일");
                                            Ext.getCmp('cb_backupWeeks').setValue(response.type);
                                        }

                                        if(response.ftp === "on"){

                                            //             Ext.getCmp('chk_periodic').setValue(true);
                                            Ext.getCmp("chk_periodic").state = true;
                                            Ext.getCmp("chk_periodic").moveHandle(true);

                                        }else{
                                            Ext.getCmp("chk_periodic").state = false;
                                            Ext.getCmp("chk_periodic").moveHandle(false);
                                            //             Ext.getCmp('chk_periodic').setValue(false);
                                        }

                                        //         Ext.getCmp('ft_backup_passwd').setValue(response.passwd);

                                        var _hour, _time;

                                        if(response.hour === undefined){

                                            _hour = '00';

                                        }else{

                                            _hour = response.hour;
                                        }

                                        if(response.time === undefined){

                                            _time = '00';

                                        }else{

                                            _time = response.time;
                                        }

                                        if(_hour === ''){
                                            _hour = '00';
                                        }

                                        if(_time === ''){
                                            _time = '00';
                                        }

                                        Ext.getCmp('ft_backup_time1').setValue(_hour);
                                        Ext.getCmp('ft_backup_time2').setValue(_time);

                                        //         Ext.resumeLayouts(true);


                                    }



                                    );


                                    // if(Ext.getCmp('NFW2_client').isCC === true){

                                    //     Ext.getCmp('chk_periodic').setBoxLabel('주기적 백업 파일의 SFTP 전송 기능 지원');

                                    //     Ext.getCmp('lb_periodic').setText('로그 -> 설정 -> 로그백 업용 SFTP서버설정이 필요합니다.');



                                    // }else{

                                    //     Ext.getCmp('chk_periodic').setBoxLabel('주기적 백업 파일의 (s)FTP 전송 기능 지원');

                                    Ext.getCmp('lb_periodic').setText('로그 -> 설정 -> 로그 백업용 (s)FTP 서버 설정이 필요합니다.');
                                    // }
                                },
                                flex: 1,
                                cls: 'zen_win',
                                id: 'system_backup_set',
                                margin: '-10 0 0 0',
                                layout: 'anchor',
                                bind: {
                                    title: '{setting_backup}'
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        id: 'rg_backup',
                                        margin: '0 0 8 0',
                                        width: 350,
                                        items: [
                                            me.processBackup({
                                                xtype: 'radiofield',
                                                name: 'backup',
                                                checked: true,
                                                inputValue: 'straight',
                                                bind: {
                                                    boxLabel: '{immediate_backup}'
                                                }
                                            }),
                                            me.processBackup1({
                                                xtype: 'radiofield',
                                                name: 'backup',
                                                inputValue: 'periodic',
                                                bind: {
                                                    boxLabel: '{period_backup}'
                                                }
                                            })
                                        ],
                                        listeners: {
                                            change: 'onRg_backupChange1'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        hidden: true,
                                        id: 'cb_backupWeeks',
                                        margin: '0 0 0 10',
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        msgTarget: 'none',
                                        value: 'mon',
                                        editable: false,
                                        displayField: 'name',
                                        store: 'store_backup_weeks',
                                        valueField: 'value',
                                        bind: {
                                            fieldLabel: '{backup_period}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'ft_backup_con',
                                        margin: '8 0 0 20',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 115,
                                                bind: {
                                                    text: '{backup_time}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'ft_backup_time1',
                                                width: 80,
                                                value: '00',
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
                                                        
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'name'
                                                        }
                                                    ]
                                                },
                                                valueField: 'name'
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '5 0 0 5',
                                                bind: {
                                                    text: '{hour}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'ft_backup_time2',
                                                margin: '0 0 0 5',
                                                width: 80,
                                                value: '00',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            name: '00'
                                                        },
                                                        {
                                                            name: '10'
                                                        },
                                                        {
                                                            name: '20'
                                                        },
                                                        {
                                                            name: '30'
                                                        },
                                                        {
                                                            name: '40'
                                                        },
                                                        {
                                                            name: '50'
                                                        }
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'name'
                                                        }
                                                    ]
                                                },
                                                valueField: 'name'
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '5 0 0 5',
                                                bind: {
                                                    text: '{min}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'timefield',
                                        hidden: true,
                                        id: 'ft_backup_time',
                                        margin: '8 0 0 10',
                                        fieldLabel: '백업 시간',
                                        labelSeparator: ' ',
                                        value: '00:00',
                                        editable: false,
                                        format: 'H:i',
                                        increment: 10
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 10 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    }
                                                    return true;
                                                },
                                                id: 'ft_backup_passwd',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 120,
                                                msgTarget: 'none',
                                                inputType: 'password',
                                                bind: {
                                                    fieldLabel: '{pwd}'
                                                },
                                                listeners: {
                                                    change: 'onTextfieldChange',
                                                    blur: 'onFt_backup_passwdBlur',
                                                    errorchange: 'onFt_backup_passwdBlur1'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                componentCls: 'btn_auth',
                                                id: 'btn_straight',
                                                margin: '0 0 0 5',
                                                bind: {
                                                    text: '{immediate_backup}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'chk_periodic_con',
                                        margin: '8 8 8 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                margin: '0 0 0 20',
                                                bind: {
                                                    text: '{support_ftp}'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                html: '<div id="periodic"/>',
                                                margin: '0 0 0 20',
                                                listeners: {
                                                    render: 'onContainerRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        hidden: true,
                                        id: 'chk_periodic1',
                                        boxLabel: '주기적 백업 파일의 (S)FTP 전송 기능 지원'
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'mt_noti',
                                        hidden: true,
                                        id: 'lb_periodic',
                                        margin: '0 0 10 20',
                                        bind: {
                                            text: '{ftp_server_set}'
                                        }
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onPanelAfterRender1'
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
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'ft_cancel',
                                                bind: {
                                                    text: '{cancel}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick7'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'form',
                                get_setting_back: function() {
                                    var me= Ext.getCmp('system_setting_back');

                                    var _params = {
                                        basename : Ext.encode('network_interface')
                                    };

                                    request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'get_backup_list',
                                    {},
                                    function(response){

                                        Ext.suspendLayouts();

                                        var records = [];

                                        for(var i in response){

                                            records.push({

                                                value : response[i],
                                                name : response[i]

                                            });

                                        }

                                        var store = Ext.data.StoreManager.lookup('store_backup_list');

                                        store.loadData(records);

                                        if(records.length > 0){

                                            Ext.getCmp('cb_backupSelect').setValue(records[0].name);

                                        }else{


                                            //             Ext.getCmp('cb_backupSelect').setValue('선택');
                                        }

                                        Ext.resumeLayouts(true);

                                    }
                                    );

                                },
                                flex: 1,
                                id: 'system_setting_back',
                                margin: '8 0 0 0',
                                bind: {
                                    title: '{setting_restore}'
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        id: 'rg_rollback',
                                        margin: '8 0 8 0',
                                        width: 350,
                                        items: [
                                            me.processRollback1({
                                                xtype: 'radiofield',
                                                id: 'rollback1',
                                                width: 175,
                                                name: 'rollback',
                                                checked: true,
                                                inputValue: 'self',
                                                bind: {
                                                    boxLabel: '{sel_menually}'
                                                }
                                            }),
                                            me.processRollback2({
                                                xtype: 'radiofield',
                                                id: 'rollback2',
                                                width: 200,
                                                name: 'rollback',
                                                inputValue: 'select',
                                                bind: {
                                                    boxLabel: '{sel_backup_list}'
                                                }
                                            })
                                        ],
                                        listeners: {
                                            change: 'onRg_backupChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_self',
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        cls: 'lb_req',
                                                        margin: '0 0 0 10',
                                                        width: 105,
                                                        bind: {
                                                            text: '{file_location}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'filefield',
                                                        validator: function(value) {
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                            return true;
                                                        },
                                                        id: 'ff_uploadFile',
                                                        width: 350,
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        name: 'uploadFile',
                                                        buttonText: '파일찾기',
                                                        buttonConfig: {
                                                            xtype: 'filebutton',
                                                            cls: 'btn_b',
                                                            margin: '0 0 0 5',
                                                            bind: {
                                                                text: '{file_find}'
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    }
                                                    return true;
                                                },
                                                id: 'ft_rollback_passwd',
                                                margin: '8 0 0 0',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                inputType: 'password',
                                                bind: {
                                                    fieldLabel: '{pwd}'
                                                },
                                                listeners: {
                                                    blur: 'onFt_rollback_passwdBlur',
                                                    errorchange: 'onFt_rollback_passwdErrorChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'cont_select',
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                id: 'cb_backupSelect',
                                                margin: '0 0 0 10',
                                                labelSeparator: ' ',
                                                labelWidth: 170,
                                                msgTarget: 'none',
                                                editable: false,
                                                emptyText: 'Select',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_backup_list',
                                                valueField: 'value',
                                                bind: {
                                                    fieldLabel: '{file_backup}'
                                                },
                                                listeners: {
                                                    blur: 'onCb_backupSelectBlur',
                                                    errorchange: 'onCb_backupSelectErrorChange'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ft_rollback_passwd2',
                                                margin: '8 0 0 0',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 170,
                                                msgTarget: 'none',
                                                inputType: 'password',
                                                bind: {
                                                    fieldLabel: '{pwd}'
                                                },
                                                listeners: {
                                                    blur: 'onFt_rollback_passwd2Blur',
                                                    errorchange: 'onFt_rollback_passwd2ErrorChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        handler: function(button, e) {
                                            Ext.MessageBox.confirm(__weguardia,"설정 복원 시 장비가 재시작됩니다. 진행하시겠습니까?",function(btn){

                                                if(btn === "yes"){

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'exec_ferret_init_start',
                                                    {},
                                                    function(response){


                                                    }
                                                    );

                                                }else{

                                                    return false;
                                                }
                                            });


                                        },
                                        cls: 'btn_b',
                                        margin: '8 0 10 10',
                                        bind: {
                                            text: '{restore_previous}'
                                        }
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onFormAfterRender'
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
                                                itemId: 'fld_msg1'
                                            },
                                            {
                                                xtype: 'button',
                                                handler: function(button, e) {
                                                    var me = this;
                                                    var userid = Ext.getCmp('NFW2_client').clientInfo.userId;

                                                    var passwd = Ext.getCmp('ft_rollback_passwd').getValue();

                                                    var form = this.up('form').getForm();

                                                    //설정 복원 직접선택일 경우
                                                    if(Ext.getCmp('rg_rollback').getValue().rollback === 'self'){
                                                        if(Ext.getCmp('ff_uploadFile').isValid() === false){
                                                            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                                                            err_fl.addCls('ic_msg_err');
                                                            err_fl.update(get_msg('err_null'));
                                                            Ext.getCmp('NFW2_system_backup').set_btn = true;
                                                            Ext.get('ff_uploadFile-inputEl').setStyle('border-color','red');
                                                            return false;
                                                        }

                                                        if(Ext.getCmp('ft_rollback_passwd').isValid() === false){ Ext.getCmp('ft_rollback_passwd').focus(); return false; }
                                                        if(Ext.getCmp('ff_uploadFile').getValue() === '') return false;

                                                        var passwd = Ext.getCmp('ft_rollback_passwd').getValue();

                                                        //     if(passwd === '') Ext.Msg.alert('WeGuardia™ ZEN', '비밀번호를 입력해주세요.');

                                                        //     var _params = {
                                                        //         userid : Ext.encode(userid),
                                                        //         credential : Ext.encode(passwd),
                                                        //         credentail_type : Ext.encode(1)
                                                        //     };

                                                        //     request_helper.xmlrpc_call_JsonP(
                                                        //         'ftuctrl',
                                                        //         'canLogIn',
                                                        //         _params,
                                                        //         function(response){

                                                        if(form.isValid()){
                                                            Ext.getCmp('ft_rollback_passwd2').hide();
                                                            //파일업로드중입니다 메세지창 표시 success
                                                            var win = Ext.create('NFW2.view.NFW2_upgradeWaitMsg');

                                                            win.show();

                                                            form.submit({
                                                                url: '/fileUploadCommon',
                                                                params: {
                                                                    filePath: Ext.encode('/ferret/system/upgrade/backup_policy/'),
                                                                    delFlag: Ext.encode('true')
                                                                },
                                                                //waitMsg: 'Uploading...',
                                                                success: function(fp, o) {
                                                                    Ext.getCmp('ft_rollback_passwd2').reset();
                                                                    Ext.getCmp('ft_rollback_passwd2').show();
                                                                    win.close();

                                                                    var _params = {
                                                                        file_name : Ext.encode(o.result.data[0]),
                                                                        //                                     userid : Ext.encode(userid),
                                                                        passwd : Ext.encode(passwd)
                                                                    };
                                                                    showLoadMask();

                                                                    request_helper.xmlrpc_call_JsonP(
                                                                    'ftuctrl',
                                                                    'execBackupPublic',
                                                                    _params,
                                                                    function(response){
                                                                        console.log(response);
                                                                        hideLoadMask();
                                                                        Ext.Msg.show({
                                                                            title: __weguardia,
                                                                            msg: get_msg('msg_ok_restore'),
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                        //                                 Ext.Msg.alert('WeGuardia™ ZEN', '설정 복원이 정상적으로 완료되었습니다.');
                                                                    }

                                                                    );
                                                                },
                                                                failure : function(fb, o) {
                                                                    Ext.getCmp('ft_rollback_passwd2').reset();
                                                                    Ext.getCmp('ft_rollback_passwd2').show();
                                                                    win.close();
                                                                    Ext.Msg.show({
                                                                        title: __weguardia,
                                                                        msg: __zen('restore_setting_fail'),
                                                                        width: 300,
                                                                        buttons: Ext.Msg.OK,
                                                                        icon: Ext.window.MessageBox.INFO
                                                                    });
                                                                    //                         Ext.Msg.alert('WeGuardia™ ZEN', '설정 복원이 실패하였습니다.');
                                                                }
                                                            });
                                                        }
                                                        //         }

                                                        //     );


                                                    }else{

                                                        var passwd = Ext.getCmp('ft_rollback_passwd2').getValue();
                                                        if(Ext.getCmp('cb_backupSelect').getValue() === null){
                                                            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                                                            err_fl.addCls('ic_msg_err');
                                                            err_fl.update(get_msg('err_null'));
                                                            Ext.getCmp('cb_backupSelect').focus();
                                                            return false;
                                                        }
                                                        if(Ext.getCmp('ft_rollback_passwd2').getValue() === ""){
                                                            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                                                            err_fl.addCls('ic_msg_err');
                                                            err_fl.update(get_msg('err_null'));
                                                            Ext.getCmp('ft_rollback_passwd2').focus();
                                                            return false;
                                                        }
                                                        //     if(passwd === '') Ext.Msg.alert('WeGuardia™ ZEN', '비밀번호를 입력해주세요.');

                                                        //     var _params = {
                                                        //         userid : Ext.encode(userid),
                                                        //         credential : Ext.encode(passwd),
                                                        //         credentail_type : Ext.encode(1)
                                                        //     };

                                                        //     request_helper.xmlrpc_call_JsonP(
                                                        //         'ftuctrl',
                                                        //         'canLogIn',
                                                        //         _params,
                                                        //         function(response){

                                                        var _fileName = Ext.getCmp('cb_backupSelect').getValue();

                                                        if(_fileName === '선택') return false;

                                                        var _params = {

                                                            file_name : Ext.encode(_fileName),
                                                            //         userid : Ext.encode(userid),
                                                            passwd : Ext.encode(passwd)
                                                        };

                                                        request_helper.xmlrpc_call_JsonP(
                                                        'ftuctrl',
                                                        'execBackupList',
                                                        _params,
                                                        function(response){

                                                            console.log(response);
                                                            Ext.Msg.show({
                                                                title: __weguardia,
                                                                msg: __zen('restore_setting_done'),
                                                                width: 300,
                                                                buttons: Ext.Msg.OK,
                                                                icon: Ext.window.MessageBox.INFO
                                                            });
                                                            //                     Ext.Msg.alert('WeGuardia™ ZEN', '설정 복원이 정상적으로 완료되었습니다.');

                                                        }
                                                        );
                                                        //         }

                                                        //     );
                                                    }
                                                },
                                                cls: 'ft_confirm',
                                                iconCls: 'ft_confirm_icl',
                                                bind: {
                                                    text: '{confirm}'
                                                },
                                                listeners: {
                                                    blur: 'onButtonBlur'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'ft_cancel',
                                                bind: {
                                                    text: '{cancel}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick8'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'tabpanel',
                                get_rollback: function() {
                                    var me= Ext.getCmp('tabgroup');

                                    var _params = {
                                        roll_type : Ext.encode('firm')
                                    };

                                    request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'get_rollback_version',
                                    _params,
                                    function(response){

                                        var records = [];

                                        for(var i in response){

                                            records.push({

                                                value : response[i],
                                                name : response[i]

                                            });


                                        }

                                        var store = Ext.data.StoreManager.lookup('store_rollback_firm');

                                        store.loadData(records);

                                        if(records.length > 0){

                                            Ext.getCmp('cb_firm').setValue(records[0].name);

                                            Ext.getCmp('fd_firm').setValue(records[0].name);

                                        }else{


                                            //             Ext.getCmp('cb_firm').setValue('선택');
                                        }
                                        var _params = {
                                            roll_type : Ext.encode('ramd')
                                        };

                                        request_helper.xmlrpc_call_JsonP(
                                        'ftuctrl',
                                        'get_rollback_version',
                                        _params,
                                        function(response){

                                            var records = [];

                                            for(var i in response){

                                                records.push({

                                                    value : response[i],
                                                    name : response[i]

                                                });


                                            }

                                            var store = Ext.data.StoreManager.lookup('store_rollback_ramd');

                                            store.loadData(records);

                                            if(records.length > 0){

                                                Ext.getCmp('cb_ramd').setValue(records[0].name);

                                                Ext.getCmp('fd_ramd').setValue(records[0].name);

                                            }else{

                                                //                     Ext.getCmp('cb_ramd').setValue('선택');
                                            }
                                            var _params = {
                                                roll_type : Ext.encode('appimg')
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'get_rollback_version',
                                            _params,
                                            function(response){

                                                var records = [];

                                                for(var i in response){

                                                    records.push({

                                                        value : response[i],
                                                        name : response[i]

                                                    });


                                                }

                                                var store = Ext.data.StoreManager.lookup('store_rollback_appimg');

                                                store.loadData(records);

                                                if(records.length > 0){

                                                    Ext.getCmp('cb_appimg').setValue(records[0].name);

                                                    Ext.getCmp('fd_appimg').setValue(records[0].name);

                                                }else{

                                                    //                             Ext.getCmp('cb_appimg').setValue('선택');
                                                }
                                                var _params = {
                                                    roll_type : Ext.encode('do')
                                                };

                                                request_helper.xmlrpc_call_JsonP(
                                                'ftuctrl',
                                                'get_rollback_version',
                                                _params,
                                                function(response){
                                                    var records = [];

                                                    for(var i in response){

                                                        records.push({

                                                            value : response[i],
                                                            name : response[i]

                                                        });


                                                    }
                                                    console.log(records);
                                                    var store = Ext.data.StoreManager.lookup('store_rollback_do');

                                                    store.loadData(records);

                                                    if(records.length > 0){

                                                        Ext.getCmp('cb_do').setValue(records[0].name);

                                                        Ext.getCmp('fd_do').setValue(records[0].name);

                                                    }else{

                                                        //                             Ext.getCmp('cb_appimg').setValue('선택');
                                                    }
                                                    var _params = {
                                                        basename : Ext.encode('system_rollback')
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'getObject',
                                                    _params,
                                                    function(response){
                                                        console.log(response);
                                                        if(response !== null){
                                                            if(response.version.firmware !== "none"){
                                                                var firm_trans = response.version.firmware.substring(0,4) + "-" + response.version.firmware.substring(5,7) + "-" + response.version.firmware.substring(8,10) + " " + response.version.firmware.substring(11,13) + ":" +response.version.firmware.substring(14,16);
                                                                Ext.getCmp('fd_firm').setValue(firm_trans);
                                                            }
                                                            else{
                                                                var firm_store = Ext.data.StoreManager.lookup('store_rollback_firm');
                                                                if(firm_store.getCount() === 0){ Ext.getCmp('fd_firm').setValue(''); }
                                                                else{
                                                                    var firm_trans2 = firm_store.data.items[0].data.value.substring(0,4) + "-" + firm_store.data.items[0].data.value.substring(5,7) + "-" + firm_store.data.items[0].data.value.substring(8,10) + " " + firm_store.data.items[0].data.value.substring(11,13) + ":" +firm_store.data.items[0].data.value.substring(14,16);
                                                                    Ext.getCmp('fd_firm').setValue(firm_trans2);
                                                                }
                                                            }
                                                            if(response.version.ramdisk !== "none"){
                                                                var ramd_trans = response.version.ramdisk.substring(0,4) + "-" + response.version.ramdisk.substring(5,7) + "-" + response.version.ramdisk.substring(8,10) + " " + response.version.ramdisk.substring(11,13) + ":" +response.version.ramdisk.substring(14,16);
                                                                Ext.getCmp('fd_ramd').setValue(ramd_trans);
                                                            }
                                                            else{
                                                                var ramd_store = Ext.data.StoreManager.lookup('store_rollback_ramd');
                                                                if(ramd_store.getCount() === 0){ Ext.getCmp('fd_ramd').setValue(''); }
                                                                else{
                                                                    var ramd_trans2 = ramd_store.data.items[0].data.value.substring(0,4) + "-" + ramd_store.data.items[0].data.value.substring(5,7) + "-" + ramd_store.data.items[0].data.value.substring(8,10) + " " + ramd_store.data.items[0].data.value.substring(11,13) + ":" +ramd_store.data.items[0].data.value.substring(14,16);
                                                                    Ext.getCmp('fd_ramd').setValue(ramd_trans2);
                                                                }
                                                            }
                                                            if(response.version.image !== "none"){
                                                                var img_trans = response.version.image.substring(0,4) + "-" + response.version.image.substring(5,7) + "-" + response.version.image.substring(8,10) + " " + response.version.image.substring(11,13) + ":" +response.version.image.substring(14,16);
                                                                Ext.getCmp('fd_appimg').setValue(img_trans);
                                                            }
                                                            else{
                                                                var img_store = Ext.data.StoreManager.lookup('store_rollback_appimg');
                                                                if(img_store.getCount() === 0){ Ext.getCmp('fd_appimg').setValue(''); }
                                                                else{
                                                                    var img_trans2 = img_store.data.items[0].data.value.substring(0,4) + "-" + img_store.data.items[0].data.value.substring(5,7) + "-" + img_store.data.items[0].data.value.substring(8,10) + " " + img_store.data.items[0].data.value.substring(11,13) + ":" +img_store.data.items[0].data.value.substring(14,16);
                                                                    Ext.getCmp('fd_appimg').setValue(img_trans2);
                                                                }
                                                            }
                                                            if(response.version.f3 !== "none"){
                                                                var do_trans = response.version.f3.substring(0,4) + "-" + response.version.f3.substring(5,7) + "-" + response.version.f3.substring(8,10) + " " + response.version.f3.substring(11,13) + ":" +response.version.f3.substring(14,16);
                                                                Ext.getCmp('fd_do').setValue(do_trans);
                                                            }
                                                            else{
                                                                var do_store = Ext.data.StoreManager.lookup('store_rollback_do');
                                                                if(do_store.getCount() === 0){ Ext.getCmp('fd_do').setValue(''); }
                                                                else{
                                                                    var do_trans2 = do_store.data.items[0].data.value.substring(0,4) + "-" + do_store.data.items[0].data.value.substring(5,7) + "-" + do_store.data.items[0].data.value.substring(8,10) + " " + do_store.data.items[0].data.value.substring(11,13) + ":" +do_store.data.items[0].data.value.substring(14,16);
                                                                    Ext.getCmp('fd_do').setValue(do_trans2);
                                                                }
                                                            }
                                                        }
                                                        else{
                                                            var firm_store = Ext.data.StoreManager.lookup('store_rollback_firm');
                                                            var ramd_store = Ext.data.StoreManager.lookup('store_rollback_ramd');
                                                            var img_store = Ext.data.StoreManager.lookup('store_rollback_appimg');
                                                            var do_store = Ext.data.StoreManager.lookup('store_rollback_do');

                                                            if(firm_store.getCount() === 0){ Ext.getCmp('fd_firm').setValue(''); }
                                                            else{
                                                                var firm_trans3 = firm_store.data.items[0].data.value.substring(0,4) + "-" + firm_store.data.items[0].data.value.substring(5,7) + "-" + firm_store.data.items[0].data.value.substring(8,10) + " " + firm_store.data.items[0].data.value.substring(11,13) + ":" +firm_store.data.items[0].data.value.substring(14,16);
                                                                Ext.getCmp('fd_firm').setValue(firm_trans3);
                                                            }
                                                            if(ramd_store.getCount() === 0){ Ext.getCmp('fd_ramd').setValue(''); }
                                                            else{
                                                                var ramd_trans3 = ramd_store.data.items[0].data.value.substring(0,4) + "-" + ramd_store.data.items[0].data.value.substring(5,7) + "-" + ramd_store.data.items[0].data.value.substring(8,10) + " " + ramd_store.data.items[0].data.value.substring(11,13) + ":" +ramd_store.data.items[0].data.value.substring(14,16);
                                                                Ext.getCmp('fd_ramd').setValue(ramd_trans3);
                                                            }
                                                            if(img_store.getCount() === 0){ Ext.getCmp('fd_appimg').setValue(''); }
                                                            else{
                                                                var img_trans3 = img_store.data.items[0].data.value.substring(0,4) + "-" + img_store.data.items[0].data.value.substring(5,7) + "-" + img_store.data.items[0].data.value.substring(8,10) + " " + img_store.data.items[0].data.value.substring(11,13) + ":" +img_store.data.items[0].data.value.substring(14,16);
                                                                Ext.getCmp('fd_appimg').setValue(img_trans3);
                                                            }
                                                            if(do_store.getCount() === 0){ Ext.getCmp('fd_do').setValue(''); }
                                                            else{
                                                                var do_trans3 = do_store.data.items[0].data.value.substring(0,4) + "-" + do_store.data.items[0].data.value.substring(5,7) + "-" + do_store.data.items[0].data.value.substring(8,10) + " " + do_store.data.items[0].data.value.substring(11,13) + ":" +do_store.data.items[0].data.value.substring(14,16);
                                                                Ext.getCmp('fd_do').setValue(do_trans3);
                                                            }
                                                        }
                                                    }
                                                    );
                                                }
                                                );
                                            }
                                            );
                                        }
                                        );
                                    }
                                    );
                                },
                                flex: 1,
                                cls: 'zen_tab',
                                id: 'tabgroup',
                                margin: '8 0 0 0',
                                activeTab: 0,
                                bind: {
                                    title: '{backup}'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{firmware}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'zen_tab_body',
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        id: 'fd_firm',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 180,
                                                        bind: {
                                                            fieldLabel: '{apply_date_firmware}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'cb_firm',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 175,
                                                        editable: false,
                                                        emptyText: 'Select',
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: 'store_rollback_firm',
                                                        valueField: 'value',
                                                        bind: {
                                                            fieldLabel: '{restore_firmware}'
                                                        },
                                                        listeners: {
                                                            blur: 'onCb_firmBlur',
                                                            errorchange: 'onCb_firmErrorChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        cls: 'mt_noti',
                                                        margin: '8 0 10 10',
                                                        bind: {
                                                            text: '{restore_process_restart}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                hidden: true,
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        bind: {
                                                            text: '{confirm}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick4'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        bind: {
                                                            text: '{cancel}'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{ramdisk}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'zen_tab_body',
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        id: 'fd_ramd',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 180,
                                                        bind: {
                                                            fieldLabel: '{apply_date_ramdisk}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'cb_ramd',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 175,
                                                        editable: false,
                                                        emptyText: 'Select',
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: 'store_rollback_ramd',
                                                        valueField: 'value',
                                                        bind: {
                                                            fieldLabel: '{restore_ramdisk}'
                                                        },
                                                        listeners: {
                                                            blur: 'onCb_ramdBlur',
                                                            errorchange: 'onCb_ramdErrorChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        cls: 'mt_noti',
                                                        margin: '8 0 10 10',
                                                        bind: {
                                                            text: '{restore_process_restart}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                hidden: true,
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        bind: {
                                                            text: '{confirm}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick5'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        bind: {
                                                            text: '{cancel}'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{image}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'zen_tab_body',
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        id: 'fd_appimg',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 180,
                                                        bind: {
                                                            fieldLabel: '{apply_date_image}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'cb_appimg',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 175,
                                                        editable: false,
                                                        emptyText: 'Select',
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: 'store_rollback_appimg',
                                                        valueField: 'value',
                                                        bind: {
                                                            fieldLabel: '{restore_image}'
                                                        },
                                                        listeners: {
                                                            blur: 'onCb_appimgBlur',
                                                            errorchange: 'onCb_appimgErrorChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        cls: 'mt_noti',
                                                        margin: '8 0 10 10',
                                                        bind: {
                                                            text: '{restore_process_restart}'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{do_f3}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'zen_tab_body',
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        id: 'fd_do',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 180,
                                                        bind: {
                                                            fieldLabel: '{apply_date_do}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'cb_do',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 175,
                                                        editable: false,
                                                        emptyText: 'Select',
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: 'store_rollback_do',
                                                        valueField: 'value',
                                                        bind: {
                                                            fieldLabel: '{restore_do}'
                                                        },
                                                        listeners: {
                                                            blur: 'onCb_doBlur',
                                                            errorchange: 'onCb_doErrorChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        cls: 'mt_noti',
                                                        margin: '8 0 10 10',
                                                        bind: {
                                                            text: '{restore_process_restart}'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onTabpanelAfterRender'
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
                                                itemId: 'fld_msg3'
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'ft_confirm',
                                                iconCls: 'ft_confirm_icl',
                                                bind: {
                                                    text: '{confirm}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick6'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'ft_cancel',
                                                bind: {
                                                    text: '{cancel}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick10'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                get_integrity: function() {
                                    var me = Ext.getCmp('system_integrity');

                                    me.obj_d = [];

                                    var _params = {
                                        basename : Ext.encode('system_integrity')
                                    };

                                    request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'getObject',
                                    _params,
                                    function(response){

                                        Ext.suspendLayouts();

                                        me.obj_d.integrity = response;

                                        if(response.use === "on"){

                                            //             Ext.getCmp('chk_integrity').setValue(true);
                                            Ext.getCmp("chk_integrity").state = true;
                                            Ext.getCmp("chk_integrity").moveHandle(true);
                                            Ext.getCmp('cb_type').enable();
                                            Ext.getCmp('ft_backup_con1').enable();
                                        }
                                        else{
                                            Ext.getCmp("chk_integrity").state = false;
                                            Ext.getCmp("chk_integrity").moveHandle(false);
                                            Ext.getCmp('cb_type').disable();
                                            Ext.getCmp('ft_backup_con1').disable();
                                        }


                                        if(response.type === "every"){

                                            Ext.getCmp('cb_type').setRawValue("매일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "mon"){

                                            Ext.getCmp('cb_type').setRawValue("월요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "tue"){

                                            Ext.getCmp('cb_type').setRawValue("화요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "wed"){

                                            Ext.getCmp('cb_type').setRawValue("수요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "thu"){

                                            Ext.getCmp('cb_type').setRawValue("목요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "fri"){

                                            Ext.getCmp('cb_type').setRawValue("금요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "sat"){

                                            Ext.getCmp('cb_type').setRawValue("토요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }else if(response.type === "sun"){

                                            Ext.getCmp('cb_type').setRawValue("일요일");
                                            Ext.getCmp('cb_type').setValue(response.type);
                                        }

                                        var _time = response.time;

                                        console.log('_time=',_time);

                                        if(_time === '' || _time === 0){
                                            _time = '00';
                                        }

                                        //         if(parseInt(_time) < 10 && parseInt(_time) > 0){

                                        //             _time ="0"+_time+"00";

                                        //         }else{

                                        //             _time = _time+"00";
                                        //         }

                                        //         var hours = _time.substr(0,2);

                                        //         var minutes = _time.substr(2,4);

                                        //         Ext.getCmp('ft_time').setRawValue(_time);
                                        Ext.getCmp('ft_time1').setValue(_time);

                                        Ext.resumeLayouts(true);

                                    }



                                    );
                                },
                                flex: 1,
                                id: 'system_integrity',
                                margin: '8 0 0 0 ',
                                bind: {
                                    title: '{integrity_chk}'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 20',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 120,
                                                bind: {
                                                    text: '{monitor_device}'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                componentCls: 'btn_auth',
                                                bind: {
                                                    text: '{immediate_execute}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick11'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                margin: '5 0 0 35',
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        cls: 'lb_info',
                                                        bind: {
                                                            text: '{result_manufacturer}'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 20',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 120,
                                                bind: {
                                                    text: '{integrity_chk}'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                componentCls: 'btn_auth',
                                                bind: {
                                                    text: '{immediate_execute}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 20',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 110,
                                                bind: {
                                                    text: '{period_chk}'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                html: '<div id="integrity"/>',
                                                listeners: {
                                                    render: 'onContainerRender1'
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
                                                xtype: 'checkboxfield',
                                                hidden: true,
                                                id: 'chk_integrity1',
                                                fieldLabel: '주기적 검사',
                                                labelCls: 'lb_sq',
                                                boxLabel: '사용'
                                            },
                                            {
                                                xtype: 'combobox',
                                                disabled: true,
                                                id: 'cb_type',
                                                value: '월요일',
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_backup_weeks',
                                                valueField: 'value'
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'ft_backup_con1',
                                                margin: '0 0 0 5',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        id: 'ft_time1',
                                                        width: 100,
                                                        value: '00',
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
                                                                
                                                            ],
                                                            fields: [
                                                                {
                                                                    name: 'name'
                                                                }
                                                            ]
                                                        },
                                                        valueField: 'name'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        flex: 1,
                                                        margin: '5 0 0 5',
                                                        bind: {
                                                            text: '{hour}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        hidden: true,
                                                        id: 'ft_time2',
                                                        margin: '0 0 0 5',
                                                        width: 80,
                                                        value: '00',
                                                        editable: false,
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: {
                                                            data: [
                                                                {
                                                                    name: '00'
                                                                },
                                                                {
                                                                    name: '10'
                                                                },
                                                                {
                                                                    name: '20'
                                                                },
                                                                {
                                                                    name: '30'
                                                                },
                                                                {
                                                                    name: '40'
                                                                },
                                                                {
                                                                    name: '50'
                                                                }
                                                            ],
                                                            fields: [
                                                                {
                                                                    name: 'name'
                                                                }
                                                            ]
                                                        },
                                                        valueField: 'name'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'timefield',
                                                disabled: true,
                                                hidden: true,
                                                id: 'ft_time',
                                                value: '00:00',
                                                editable: false,
                                                format: 'H:i',
                                                increment: 60
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onPanelAfterRender'
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
                                                itemId: 'fld_msg2'
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
                                                    click: 'onButtonClick9'
                                                }
                                            }
                                        ]
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

    processBackup: function(config) {
        config.boxLabel = true;

        return config;
    },

    processBackup1: function(config) {
        config.boxLabel = true;

        return config;
    },

    processRollback1: function(config) {
        config.boxLabel = true;

        return config;
    },

    processRollback2: function(config) {
        config.boxLabel = true;

        return config;
    },

    onRg_backupChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue.backup === 'straight'){

            Ext.getCmp('cb_backupWeeks').hide();

            Ext.getCmp('ft_backup_con').hide();

            Ext.getCmp('chk_periodic_con').hide();

            Ext.getCmp('lb_periodic').hide();

            Ext.getCmp('btn_straight').show();


        }else{

            Ext.getCmp('cb_backupWeeks').show();

            Ext.getCmp('ft_backup_con').show();

            Ext.getCmp('chk_periodic_con').show();

            Ext.getCmp('lb_periodic').show();

            Ext.getCmp('btn_straight').hide();
        }
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {

    },

    onFt_backup_passwdBlur: function(component, event, eOpts) {
        Ext.getCmp('ft_backup_passwd').validateValue(true);
    },

    onFt_backup_passwdBlur1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick1: function(button, e, eOpts) {
        var userid = Ext.getCmp('NFW2_client').clientInfo.userId;

        var passwd = Ext.getCmp('ft_backup_passwd').getValue().replace(/ /gi,'');

        // if(passwd === '') Ext.Msg.alert('WeGuardia™ DMC', '비밀번호를 입력해주세요.');

        // var _params = {
        //     userid : Ext.encode(userid),
        //     credential : Ext.encode(passwd),
        //     credentail_type : Ext.encode(1)
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'canLogIn',
        //     _params,
        //     function(response){

        //         if(response){
        showLoadMask();
        var _params = {
            passwd : Ext.encode(passwd)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execBackup',
            _params,
            function(response){
                console.log(response);

                if(response){

                    var fileName = "backup.gat";

                    var path = "/ferret/system/upgrade/backup_policy";

                    document.location.href = '/backupFileDownload?filename='+ Ext.encode(fileName)+"&path="+Ext.encode(path);
                }
                Ext.getCmp('ft_backup_passwd').reset();
                hideLoadMask();
            }
        );

        //         }else{

        //             Ext.Msg.show({
        //                     title: 'WeGuardia™ ZEN',
        //                     msg: '비밀번호를 확인해주세요.',
        //                     width: 300,
        //                     buttons: Ext.Msg.OK,
        //                     icon: Ext.window.MessageBox.INFO
        //                 });
        //         }
        //     }

        // );


    },

    onContainerRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_periodic',
            renderTo: 'periodic',
            style:'margin-left:0px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onPanelAfterRender1: function(component, eOpts) {
        Ext.getCmp('system_backup_set').get_set_backup();
        // var me = this;

        // var _params = {
        //     basename : Ext.encode('system_restore')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'getObject',
        //     _params,
        //     function(response){

        //         Ext.suspendLayouts();

        //         me.obj_d.restore = response;

        //         if(response.use === "on"){

        //             Ext.getCmp('rg_backup').setValue({'backup' : 'periodic'});

        //         }else{

        //             Ext.getCmp('rg_backup').setValue({'backup' : 'straight'});
        //         }

        //         if(response.type === "every"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("매일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "mon"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("월요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "tue"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("화요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "wed"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("수요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "thu"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("목요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "fri"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("금요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "sat"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("토요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }else if(response.type === "sun"){

        //             Ext.getCmp('cb_backupWeeks').setRawValue("일요일");
        //             Ext.getCmp('cb_backupWeeks').setValue(response.type);
        //         }

        //         if(response.ftp === "on"){

        // //             Ext.getCmp('chk_periodic').setValue(true);
        //             Ext.getCmp("chk_periodic").state = true;
        //             Ext.getCmp("chk_periodic").moveHandle(true);

        //         }else{
        //             Ext.getCmp("chk_periodic").state = false;
        //             Ext.getCmp("chk_periodic").moveHandle(false);
        // //             Ext.getCmp('chk_periodic').setValue(false);
        //         }

        //         Ext.getCmp('ft_backup_passwd').setValue(response.passwd);

        //         var _hour, _time;

        //         if(response.hour === undefined){

        //             _hour = '00';

        //         }else{

        //             _hour = response.hour;
        //         }

        //         if(response.time === undefined){

        //             _time = '00';

        //         }else{

        //             _time = response.time;
        //         }

        //         if(_hour === ''){
        //             _hour = '00';
        //         }

        //         if(_time === ''){
        //             _time = '00';
        //         }

        //         Ext.getCmp('ft_backup_time').setRawValue(_hour+_time);
        //         Ext.getCmp('ft_backup_time').setValue(_hour+":"+_time);

        //         Ext.resumeLayouts(true);


        //     }



        // );


        // // if(Ext.getCmp('NFW2_client').isCC === true){

        // //     Ext.getCmp('chk_periodic').setBoxLabel('주기적 백업 파일의 SFTP 전송 기능 지원');

        // //     Ext.getCmp('lb_periodic').setText('로그 -> 설정 -> 로그백 업용 SFTP서버설정이 필요합니다.');



        // // }else{

        // //     Ext.getCmp('chk_periodic').setBoxLabel('주기적 백업 파일의 (s)FTP 전송 기능 지원');

        //     Ext.getCmp('lb_periodic').setText('로그 -> 설정 -> 로그 백업용 (s)FTP 서버 설정이 필요합니다.');
        // // }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('system_backup_set');

        var _use = "on";

        if(Ext.getCmp('ft_backup_passwd').isValid() === false){ Ext.getCmp('ft_backup_passwd').focus(); return false; }

        if(Ext.getCmp('rg_backup').getValue().backup === "straight"){

            _use = "off";

            me.obj_d.restore.type = '';

            me.obj_d.restore.ftp = '';

            me.obj_d.restore.passwd = '';

            me.obj_d.restore.time = '';

            me.obj_d.restore.hour = '';

        }else{

            var _type = Ext.getCmp('cb_backupWeeks').getValue();

            var _ftp = Ext.getCmp('chk_periodic').getValue() === true ? "on" : "off";

            var _passwd = Ext.getCmp('ft_backup_passwd').getValue().replace(/ /gi,'');

            var _hours = Ext.getCmp('ft_backup_time1').getValue();

            var _minutes = Ext.getCmp('ft_backup_time2').getValue();

        //     if(_hours < 10) _hours = "0" + _hours;

        //     if(_minutes < 10) _minutes = "0" + _minutes;

            me.obj_d.restore.type = _type;

            me.obj_d.restore.ftp = _ftp;

            me.obj_d.restore.passwd = _passwd;

            me.obj_d.restore.hour = _hours.toString();

            me.obj_d.restore.time = _minutes.toString();

        }
        console.log(_passwd);
        me.obj_d.restore.use = _use;

        var userid = Ext.getCmp('NFW2_client').clientInfo.userId;

        var passwd = Ext.getCmp('ft_backup_passwd').getValue();

        var _params = {
            basename : Ext.encode('system_restore'),
            obj : Ext.encode(me.obj_d.restore)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                Ext.getCmp('ft_backup_passwd').setValue(changePass(Ext.getCmp('ft_backup_passwd').getValue()));
                Ext.Msg.show({
                    title: __weguardia,
                    msg: __zen('restore_setting_done'),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                //                     Ext.Msg.alert('WeGuardia™ ZEN', '설정 백업이 정상적으로 저장되었습니다.');
        //         Ext.getCmp('ft_backup_passwd').reset();
            }
        );
    },

    onButtonClick7: function(button, e, eOpts) {
        Ext.getCmp('system_backup_set').get_set_backup();
    },

    onRg_backupChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.rollback === 'self'){

            Ext.getCmp('cont_self').show();

            Ext.getCmp('cont_select').hide();

        }else{

            Ext.getCmp('cont_self').hide();

            Ext.getCmp('cont_select').show();
        }
    },

    onFt_rollback_passwdBlur: function(component, event, eOpts) {
        Ext.getCmp('ft_rollback_passwd').validateValue(true);
    },

    onFt_rollback_passwdErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onCb_backupSelectBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onCb_backupSelectErrorChange: function(labelable, error, eOpts) {
        // if(error){
        //     var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        //     err_fl.addCls('ic_msg_err');
        //     err_fl.update(labelable.activeErrors[0]);
        // }
        // else{
        //     var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        //     err_fl.removeCls('ic_msg_err');
        //     err_fl.update('');
        // }
    },

    onFt_rollback_passwd2Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onFt_rollback_passwd2ErrorChange: function(labelable, error, eOpts) {
        // if(error){
        //     var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        //     err_fl.addCls('ic_msg_err');
        //     err_fl.update(labelable.activeErrors[0]);
        // }
        // else{
        //     var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        //     err_fl.removeCls('ic_msg_err');
        //     err_fl.update('');
        // }
    },

    onFormAfterRender: function(component, eOpts) {
        var me= this;
        me.set_btn = false;
        Ext.getCmp('system_setting_back').get_setting_back();
        // var _params = {
        //     basename : Ext.encode('network_interface')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_backup_list',
        //     {},
        //     function(response){

        //         Ext.suspendLayouts();

        //         var records = [];

        //         for(var i in response){

        //             records.push({

        //                 value : response[i],
        //                 name : response[i]

        //             });

        //         }

        //         var store = Ext.data.StoreManager.lookup('store_backup_list');

        //         store.loadData(records);

        //         if(records.length > 0){

        //             Ext.getCmp('cb_backupSelect').setValue(records[0].name);

        //         }else{


        //             Ext.getCmp('cb_backupSelect').setValue('선택');
        //         }

        //         Ext.resumeLayouts(true);

        //     }
        // );


    },

    onButtonBlur: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_system_backup');

        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            Ext.get('ff_uploadFile-inputEl').setStyle('border-color','');
            me.set_btn = false;
        }
    },

    onButtonClick8: function(button, e, eOpts) {
        Ext.getCmp('rollback1').setValue(true);
        Ext.getCmp('rollback2').setValue(false);
        Ext.getCmp('ff_uploadFile').reset();
        Ext.getCmp('ft_rollback_passwd').reset();
        Ext.getCmp('cb_backupSelect').reset();
        Ext.getCmp('ft_rollback_passwd2').reset();
    },

    onCb_firmBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onCb_firmErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var _version = Ext.getCmp('cb_firm').getValue();

        if(_version === '선택') return false;

        Ext.MessageBox.confirm(__weguardia,_version + '버전으로 펌웨어를 복원하시겠습니까?',function(btn){

            if(btn == 'yes'){

                var _params = {
                    upgrade_type : Ext.encode('firm'),
                    version : Ext.encode(_version)

                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execRollback',
                    _params,
                    function(response){

                        Ext.Msg.alert(__weguardia, '복원 펌웨어가 등록되었습니다.');

                    }
                );
            }
        });
    },

    onCb_ramdBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onCb_ramdErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onButtonClick5: function(button, e, eOpts) {
        var _version = Ext.getCmp('cb_ramd').getValue();

        if(_version === '선택') return false;

        Ext.MessageBox.confirm(__weguardia,_version + '버전으로 램디스크를 복원하시겠습니까?',function(btn){

            if(btn == 'yes'){

                var _params = {
                    upgrade_type : Ext.encode('ramd'),
                    version : Ext.encode(_version)

                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execRollback',
                    _params,
                    function(response){

                        Ext.Msg.alert(__weguardia, '복원 램디스크가 등록되었습니다.');

                    }
                );
            }
        });
    },

    onCb_appimgBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onCb_appimgErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onCb_doBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onCb_doErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTabpanelAfterRender: function(component, eOpts) {
        Ext.getCmp('tabgroup').get_rollback();
        // var me= this;

        // var _params = {
        //     roll_type : Ext.encode('firm')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_rollback_version',
        //     _params,
        //     function(response){

        //         var records = [];

        //         for(var i in response){

        //             records.push({

        //                 value : response[i],
        //                 name : response[i]

        //             });


        //         }

        //         var store = Ext.data.StoreManager.lookup('store_rollback_firm');

        //         store.loadData(records);

        //         if(records.length > 0){

        //             Ext.getCmp('cb_firm').setValue(records[0].name);

        //             Ext.getCmp('fd_firm').setValue(records[0].name);

        //         }else{


        //             Ext.getCmp('cb_firm').setValue('선택');
        //         }
        //         var _params = {
        //             roll_type : Ext.encode('ramd')
        //         };

        //         request_helper.xmlrpc_call_JsonP(
        //             'ftuctrl',
        //             'get_rollback_version',
        //             _params,
        //             function(response){

        //                 var records = [];

        //                 for(var i in response){

        //                     records.push({

        //                         value : response[i],
        //                         name : response[i]

        //                     });


        //                 }

        //                 var store = Ext.data.StoreManager.lookup('store_rollback_ramd');

        //                 store.loadData(records);

        //                 if(records.length > 0){

        //                     Ext.getCmp('cb_ramd').setValue(records[0].name);

        //                     Ext.getCmp('fd_ramd').setValue(records[0].name);

        //                 }else{

        //                     Ext.getCmp('cb_ramd').setValue('선택');
        //                 }
        //                 var _params = {
        //                     roll_type : Ext.encode('appimg')
        //                 };

        //                 request_helper.xmlrpc_call_JsonP(
        //                     'ftuctrl',
        //                     'get_rollback_version',
        //                     _params,
        //                     function(response){

        //                         var records = [];

        //                         for(var i in response){

        //                             records.push({

        //                                 value : response[i],
        //                                 name : response[i]

        //                             });


        //                         }

        //                         var store = Ext.data.StoreManager.lookup('store_rollback_appimg');

        //                         store.loadData(records);

        //                         if(records.length > 0){

        //                             Ext.getCmp('cb_appimg').setValue(records[0].name);

        //                             Ext.getCmp('fd_appimg').setValue(records[0].name);

        //                         }else{

        //                             Ext.getCmp('cb_appimg').setValue('선택');
        //                         }
        //                         var _params = {
        //                             basename : Ext.encode('system_rollback')
        //                         };

        //                         request_helper.xmlrpc_call_JsonP(
        //                             'ftuctrl',
        //                             'getObject',
        //                             _params,
        //                             function(response){
        //                                 if(response !== null){
        //                                     Ext.getCmp('fd_firm').setValue(response.rollback.firmware);
        //                                     Ext.getCmp('fd_ramd').setValue(response.rollback.ramdisk);
        //                                     Ext.getCmp('fd_appimg').setValue(response.rollback.image);
        //                                 }
        //                                 else{
        //                                     var firm_store = Ext.data.StoreManager.lookup('store_rollback_firm');
        //                                     var ramd_store = Ext.data.StoreManager.lookup('store_rollback_ramd');
        //                                     var img_store = Ext.data.StoreManager.lookup('store_rollback_appimg');

        //                                     if(firm_store.getCount() === 0){ Ext.getCmp('fd_firm').setValue(''); }
        //                                     else{ Ext.getCmp('fd_firm').setValue(firm_store.data.items[0].data.value); }
        //                                     if(ramd_store.getCount() === 0){ Ext.getCmp('fd_ramd').setValue(''); }
        //                                     else{ Ext.getCmp('fd_ramd').setValue(ramd_store.data.items[0].data.value); }
        //                                     if(img_store.getCount() === 0){ Ext.getCmp('fd_appimg').setValue(''); }
        //                                     else{ Ext.getCmp('fd_appimg').setValue(img_store.data.items[0].data.value); }
        //                                 }
        //                             }
        //                         );
        //                     }
        //                 );
        //             }
        //         );
        //     }
        // );
    },

    onButtonClick6: function(button, e, eOpts) {
        var activeTab = Ext.getCmp('tabgroup').getActiveTab();
        var activeTabIndex = Ext.getCmp('tabgroup').items.findIndex('id', activeTab.id);
        var win = Ext.create('NFW2.view.NFW2_upgradeWaitMsg');
        if(activeTabIndex === 0){
            if(Ext.getCmp('cb_firm').isValid() === false){ Ext.getCmp('cb_firm').focus(); return false; }
            var _version = Ext.getCmp('cb_firm').getValue();

            if(_version === '선택') return false;

            Ext.MessageBox.confirm(__weguardia,_version + __zen('restore_ver_firmware'),function(btn){

                if(btn == 'yes'){

                    if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 7){
                        win.items.items[0].items.items[0].setText(__zen('file_process'));
                        win.show();
                    }

                    var _params = {
                        upgrade_type : Ext.encode('firm'),
                        version : Ext.encode(_version)

                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execRollback',
                        _params,
                        function(response){
                            win.close();
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: __zen('register_firemware'),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     Ext.Msg.alert('WeGuardia™ DMC', '롤백 펌웨어가 등록되었습니다.');

                        }
                    );
                }
            });
        }
        else if(activeTabIndex === 1){
            if(Ext.getCmp('cb_ramd').isValid() === false){ Ext.getCmp('cb_ramd').focus(); return false; }
            var _version = Ext.getCmp('cb_ramd').getValue();

            if(_version === '선택') return false;

            Ext.MessageBox.confirm(__weguardia,_version + __zen('restore_ver_ramdisk'),function(btn){

                if(btn == 'yes'){
                    if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 7){
                        win.items.items[0].items.items[0].setText(__zen('file_process'));
                        win.show();
                    }

                    var _params = {
                        upgrade_type : Ext.encode('ramd'),
                        version : Ext.encode(_version)

                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execRollback',
                        _params,
                        function(response){
                            win.close();
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: __zen('register_ramdisk'),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     Ext.Msg.alert('WeGuardia™ DMC', '롤백 램디스트가 등록되었습니다.');

                        }
                    );
                }
            });
        }
        else if(activeTabIndex === 2){
            if(Ext.getCmp('cb_appimg').isValid() === false){ Ext.getCmp('cb_appimg').focus(); return false; }
            var _version = Ext.getCmp('cb_appimg').getValue();

            if(_version === '선택') return false;

            Ext.MessageBox.confirm(__weguardia,_version + __zen('restore_ver_image'),function(btn){

                if(btn == 'yes'){

                    if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 7){
                        win.items.items[0].items.items[0].setText(__zen('file_process'));
                        win.show();
                    }

                    var _params = {
                        upgrade_type : Ext.encode('appimg'),
                        version : Ext.encode(_version)

                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execRollback',
                        _params,
                        function(response){
                            win.close();
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: __zen('register_image'),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     Ext.Msg.alert('WeGuardia™ DMC', '롤백 이미지가 등록되었습니다.');

                        }
                    );
                }
            });
        }
        else if(activeTabIndex === 3){
            if(Ext.getCmp('cb_do').isValid() === false){ Ext.getCmp('cb_do').focus(); return false; }
            var _version = Ext.getCmp('cb_do').getValue();

            if(_version === '선택') return false;

            Ext.MessageBox.confirm(__weguardia,_version + __zen('restore_ver_do'),function(btn){

                if(btn == 'yes'){

                    if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 7){
                        win.items.items[0].items.items[0].setText(__zen('file_process'));
                        win.show();
                    }

                    var _params = {
                        upgrade_type : Ext.encode('do'),
                        version : Ext.encode(_version)

                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execRollback',
                        _params,
                        function(response){
                            win.close();
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: __zen('register_do'),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     Ext.Msg.alert('WeGuardia™ DMC', '롤백 이미지가 등록되었습니다.');

                        }
                    );
                }
            });
        }

    },

    onButtonClick10: function(button, e, eOpts) {
        Ext.getCmp('tabgroup').get_rollback();
    },

    onButtonClick11: function(button, e, eOpts) {
        showLoadMask();
        var _params = {
            func_name : Ext.encode("check_device_info")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,

            function(response){
                if(response){
                    var name = response[1].split('/');
                    var fileName = name[5];

                    var path = "/ferret/system/log/device_check";

                    document.location.href = '/backupFileDownload?filename='+ Ext.encode(fileName)+"&path="+Ext.encode(path);
                }
                hideLoadMask();
            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'integrity_start',
            {},
            function(response){

                if(response){

                    Ext.Msg.alert(__weguardia, __zen('integrity_chk_success'));

                }else{
                    Ext.Msg.alert(__weguardia, __zen('integrity_chk_fail'));
                    //             Ext.Msg.alert('WeGuardia™ ZEN', response.toString());
                }

            }
        );
    },

    onContainerRender1: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen("toggle_on"),
            offText: __zen('toggle_off'),
            id:'chk_integrity',
            renderTo: 'integrity',
            style:'margin-left:10px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('cb_type').enable();
                        Ext.getCmp('ft_backup_con1').enable();
                    }
                    else{
                        Ext.getCmp('cb_type').disable();
                        Ext.getCmp('ft_backup_con1').disable();
                    }
                }
            }
        });
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.getCmp('system_integrity').get_integrity();
        // var me = this;

        // var _params = {
        //     basename : Ext.encode('system_integrity')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'getObject',
        //     _params,
        //     function(response){

        //         Ext.suspendLayouts();

        //         me.obj_d.integrity = response;

        //         if(response.use === "on"){

        // //             Ext.getCmp('chk_integrity').setValue(true);
        //             Ext.getCmp("chk_integrity").state = true;
        //             Ext.getCmp("chk_integrity").moveHandle(true);
        //         }
        //         else{
        //             Ext.getCmp("chk_integrity").state = false;
        //             Ext.getCmp("chk_integrity").moveHandle(false);
        //         }


        //         if(response.type === "every"){

        //             Ext.getCmp('cb_type').setRawValue("매일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "mon"){

        //             Ext.getCmp('cb_type').setRawValue("월요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "tue"){

        //             Ext.getCmp('cb_type').setRawValue("화요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "wed"){

        //             Ext.getCmp('cb_type').setRawValue("수요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "thu"){

        //             Ext.getCmp('cb_type').setRawValue("목요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "fri"){

        //             Ext.getCmp('cb_type').setRawValue("금요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "sat"){

        //             Ext.getCmp('cb_type').setRawValue("토요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }else if(response.type === "sun"){

        //             Ext.getCmp('cb_type').setRawValue("일요일");
        //             Ext.getCmp('cb_type').setValue(response.type);
        //         }

        //         var _time = response.time;

        //         console.log('_time=',_time);

        //         if(_time === '' || _time === 0){
        //             _time = '00';
        //         }

        //         if(parseInt(_time) < 10 && parseInt(_time) > 0){

        //             _time ="0"+_time+"00";

        //         }else{

        //             _time = _time+"00";
        //         }

        //         var hours = _time.substr(0,2);

        //         var minutes = _time.substr(2,4);

        //         Ext.getCmp('ft_time').setRawValue(_time);
        //         Ext.getCmp('ft_time').setValue(hours+":"+minutes);

        //         Ext.resumeLayouts(true);

        //     }



        // );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('system_integrity');

        var _use = Ext.getCmp('chk_integrity').state === true ? "on" : "off";

        var _type = Ext.getCmp('cb_type').getValue();

        var hours = Ext.getCmp('ft_time1').getValue();

        me.obj_d.integrity.use = _use;

        if(_use === "on"){

            me.obj_d.integrity.type = _type;

            me.obj_d.integrity.time = hours;

        }else{

            me.obj_d.integrity.type = "";

            me.obj_d.integrity.time = "";

        }

        var _params = {
            basename : Ext.encode('system_integrity'),
            obj : Ext.encode(me.obj_d.integrity)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg('msg_ok_add'),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                //         Ext.Msg.alert('WeGuardia™ DMC', '정상적으로 설정되었습니다.');

            }
        );

    },

    onButtonClick9: function(button, e, eOpts) {
        Ext.getCmp('system_integrity').get_integrity();
    },

    onNFW2_system_backupAfterRender: function(component, eOpts) {
        var me = this;

        hideLoadMask();
    }

});