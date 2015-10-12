
Ext.define('NFW2.view.win_ips_all_edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_all_edit',

    requires: [
        'NFW2.view.win_ips_all_editViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ips_all_edit'
    },
    cls: 'zen_win',
    resizable: false,
    width: 400,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_all',
            bodyPadding: 10,
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    id: 'all_select',
                    margin: '8 0 8 10',
                    labelSeparator: ' ',
                    labelWidth: 120,
                    uncheckedValue: 'off',
                    bind: {
                        fieldLabel: '{all}'
                    }
                },
                {
                    xtype: 'combobox',
                    id: 'action1',
                    maxWidth: 280,
                    labelCls: 'lb_req',
                    labelSeparator: ' ',
                    editable: false,
                    store: 'store_action',
                    valueField: 'value',
                    bind: {
                        fieldLabel: '{action}'
                    },
                    listeners: {
                        change: 'onAction1Change'
                    }
                },
                {
                    xtype: 'combobox',
                    id: 'block_type1',
                    margin: '0 0 10 10',
                    width: 300,
                    labelSeparator: ' ',
                    labelWidth: 120,
                    editable: false,
                    store: 'store_block_type',
                    valueField: 'value',
                    bind: {
                        fieldLabel: '{deny_type}'
                    }
                }
            ],
            listeners: {
                afterrender: 'onFm_allAfterRender'
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
                    id: 'btn_Group2',
                    itemId: 'fld_msg2'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'btn_submit3',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_submit2Click1',
                        blur: 'onBtn_submit3Blur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_reset3',
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
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onAction1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'drop'){

            Ext.getCmp('block_type1').enable(true);

        }else{

            Ext.getCmp('block_type1').disable(true);
        }
    },

    onFm_allAfterRender: function(component, eOpts) {
        Ext.getCmp('action1').setValue('alert');
        Ext.getCmp('block_type1').setValue(1);
        Ext.getCmp('block_type1').disable(true);
    },

    onBtn_submit2Click1: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var errUI = Ext.getCmp('errorBox3');

        if(tbl_sel.length === 0 && Ext.getCmp("all_select").checked === false && me.tbl.length === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg("sel_ips"));

            return false;

        }else{

            var _editList = [];
            var obj = {};

            if(Ext.getCmp("all_select").checked === true){

                _editList.push();

            }else{

                for(var i=0; i<me.tbl.length; i++){

                    _editList.push(me.tbl[i]['@fsid']);
                }
            }

            //console.log(tbl_sel);
            //console.log(_editList);

            obj['action'] = Ext.getCmp('action1').getValue();

            if(obj['action'] === 'drop'){

                obj['block_type'] = Ext.getCmp('block_type1').getValue();
            }
            else{
                obj['block_type'] = 1;
            }

            showLoadMask();

            var _params = {

                basename : Ext.encode('signature_list'),
                id_info : Ext.encode({'ids':_editList}),
                setting_obj : Ext.encode(obj)
            };

            //console.log(_params);

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'setListTypeObjs',
                _params,

                function(response){
                    hideLoadMask();
                    var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');
                    Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                    _store.currentPage = 1;
                    _store.load();
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

            var main = Ext.getCmp('NFW2_ips_signature');
            main.tbl_fsid = [];
            //main.me.sel = [0];
        }


    },

    onBtn_submit3Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onBtn_reset2Click1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        chk_zenauth(null);
        me.setTitle(__zen('edit2'));
    }

});