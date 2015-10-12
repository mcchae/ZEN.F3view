
Ext.define('NFW2.view.win_profile_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_profile_group',

    requires: [
        'NFW2.view.win_profile_groupViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_profile_group'
    },
    cls: 'zen_win',
    height: 150,
    width: 400,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    id: 'name',
                    labelSeparator: ' ',
                    msgTarget: 'none',
                    bind: {
                        fieldLabel: '{user_define_name}'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
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
        afterrender: 'onWindowAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _params = {
            category_num: Ext.encode(Number(me.idex)),
            category_name: Ext.encode(Ext.getCmp("name").getValue())
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setFwProfileCateDB',
            _params,
            function(response){

                var _param = {
                    name: Ext.encode('category_db')
                };
                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'get_fw_profile_web_db',
                    _param,
                    function(response){

                        Ext.getCmp("urlGroup").web_db = response;

                        var menu = [];
                        var id = 1;
                        for(var i in response){

                            var submenu = [];
                            for(var l in response[i].list){
                                submenu.push({
                                    text: l+". "+response[i].list[l].name,
                                    idex: l,
                                    _id: id,
                                    leaf: true
                                });
                            }

                            menu.push({
                                text: response[i].group_name,
                                children: submenu,
                                expanded: (id===15)?true:false
                            });
                            id++;
                        }

                        var root = {
                            text: "전체",
                            expanded: true,
                            children: menu,
                            idex: "all"
                        };

                        var _store = Ext.data.StoreManager.lookup("store_profile_group");
                        _store.setRootNode(root);
                        Ext.getCmp("group_p").setTitle(me.idex+". "+Ext.getCmp("name").getValue());

                        me.close();
                    }
                );
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        chk_zenauth(null);

        if(me.name !== ''){
            var name = me.name.split(me.idex+'. ');

            Ext.getCmp("name").setValue(name[1]);
            me.setTitle(__zen('user_define_name_edit')+" - "+this.idex);
        }else{
            me.setTitle(__zen('user_define_name_set')+" - "+this.idex);
        }
    }

});