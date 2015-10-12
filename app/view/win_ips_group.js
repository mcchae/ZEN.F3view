
Ext.define('NFW2.view.win_ips_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_group',

    requires: [
        'NFW2.view.win_ips_groupViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ips_group'
    },
    cls: 'zen_win',
    resizable: false,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_group',
            bodyPadding: 10,
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value !== true){
                            if(!CheckNotNull(value)){ return get_msg(err_null); }
                        }

                        return true;
                    },
                    id: 'group_name',
                    margin: '8 0 8 10',
                    width: 350,
                    labelCls: 'lb_req',
                    labelSeparator: ' ',
                    labelWidth: 140,
                    msgTarget: 'none',
                    enforceMaxLength: true,
                    maxLength: 15,
                    minLength: 1,
                    bind: {
                        fieldLabel: '{sig_group_name}'
                    },
                    listeners: {
                        errorchange: 'onGroup_idErrorChange',
                        blur: 'onGroup_nameBlur'
                    }
                }
            ],
            listeners: {
                afterrender: 'onFm_groupAfterRender'
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
                    id: 'btn_Group3',
                    itemId: 'fld_msg1'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'btn_submit4',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_submit2Click1',
                        blur: 'onBtn_submit4Blur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_reset4',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_reset2Click1'
                    }
                }
            ]
        }
    ],

    onGroup_idErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update("");
        }
    },

    onGroup_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onFm_groupAfterRender: function(component, eOpts) {
        var me = this;
        me.set_btn = false;
        chk_zenauth(null);
        if(me.edit === "edit"){
            showLoadMask();
            var _params = {

                basename : Ext.encode('ips_group'),
                cond : Ext.encode({'@id':me.obj_id})

            };

            me.setTitle(__zen('edit_user_group') + " - " + me.obj_id);

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getObjects',
                _params,

                function(response){
                    hideLoadMask();
                    //console.log(response.list);

                    if(response.retval !== null){

                        Ext.getCmp('group_name').setValue(response.list[0].group_name);
                    }
                }
            );

        }else{
            me.setTitle(__zen('add_user_group'));

        }
    },

    onBtn_submit2Click1: function(button, e, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ips_user_group');

        if(Ext.getCmp('group_name').isValid() === false){ Ext.getCmp('group_name').focus(); return false; }

        for(var i in _store.data.items){
            if(_store.data.items[i].data.group_name === Ext.getCmp('group_name').getValue()){
                me.set_btn = true;
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_configdob'));
                Ext.getCmp('group_name').focus();
                return false;
            }
        }

        var update = (me.edit === "edit")? true:false;

        var obj = {};
        if(update){ obj['@id'] = me.obj_id; }
        obj['group_name'] = Ext.getCmp('group_name').getValue();

        showLoadMask();
        var _params = {

            basename : Ext.encode('ips_group'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'setIPSGroup',
            _params,

            function(response){
                hideLoadMask();
                var main = Ext.getCmp('NFW2_ips_signature');
                main.init_ips_group();

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
                        fn: me.set_WinState2,
                        icon: Ext.window.MessageBox.INFO
                    });

                }
                Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
                //_store.currentPage = 1;
                //_store.load();
                var main = Ext.getCmp('NFW2_ips_signature');
                main.tbl_fsid = [];
                //main.me.sel = [0];
                Ext.getCmp('tab_con1').destroy();
                Ext.getCmp('tab_con2').destroy();

                Ext.getCmp('NFW2_ips_signature').make_group_filter();
            }

        );
    },

    onBtn_submit4Blur: function(component, event, eOpts) {

    },

    onBtn_reset2Click1: function(button, e, eOpts) {
        this.close();
    },

    set_WinState2: function(btn) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ips_user_group');

        var _params = {
            basename : Ext.encode('ips_group')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getIPSGroup',
            _params,

            function(response){
                var records = [];
                for(var i = 8;i<response.list.length;i++){
                    records.push({
                        "@id" : response.list[i]['@id'],
                        "group_name" : response.list[i].group_name
                    });
                }

                var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
                _store.loadData(records);

            }
        );

        var win = Ext.WindowManager.getActive();

        if(btn === "no"){

            if(win){ win.close(); }

        }else{

            var _params = {

                filename: Ext.encode('/proc/ferret/datasheet/ips_group_num')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){
                    var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
                    // 시그너처 전체 그룹 최대 개수(16개), 사용자 정의 그룹 최대 개수(8개)라서 -8을 했음
                    var Maxcnt = (_store.getCount() >= (Number(response[0])-8))? false:true;

                    if(Maxcnt === false){

                        Ext.Msg.alert("",ValidMaxCnt(response[0]-8));
                        win.close();
                        return false;

                    }else{

                        //var cnt = Ext.data.StoreManager.lookup("store_ips_group").last().data['@id'];
                        //cnt = (cnt <= 0)? 8:cnt;

                        Ext.getCmp("fm_group").getForm().reset();
                    }

                }
            );
        }
    }

});