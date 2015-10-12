
Ext.define('NFW2.view.win_profile_move', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_profile_move',

    requires: [
        'NFW2.view.win_profile_moveViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_profile_move'
    },
    cls: 'zen_win',
    height: 150,
    scrollable: true,
    width: 400,
    title: '',
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
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 350,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'label',
                            id: 'l_num',
                            text: ''
                        },
                        {
                            xtype: 'label',
                            text: '번 프로파일을 '
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNum(value)){ return get_msg('err_form'); }

                                var _grid = Ext.getCmp("grid_application").getStore();

                                if(!LengthCheck(value, 1, _grid.getCount())){ return ValidLimit(1, _grid.getCount()); }

                                return true;
                            },
                            id: 't_num',
                            margin: '0 5 0 5',
                            width: 120,
                            fieldLabel: '',
                            msgTarget: 'none',
                            maskRe: /[0-9.]/,
                            listeners: {
                                errorchange: 'onT_numErrorChange',
                                keydown: 'onT_numKeydown'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'l_min_max',
                            margin: '0 0 0 15',
                            text: ''
                        },
                        {
                            xtype: 'label',
                            text: '번 프로파일의 위로'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
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
                    text: '이동',
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    text: '취소',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],

    onT_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onT_numKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8 && code !== 9){
            e.stopEvent();
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        Ext.getCmp("l_num").setText(me.num);
        Ext.getCmp("t_num").setValue(me.num);

        var _grid = Ext.getCmp("grid_application").getStore();

        Ext.getCmp("l_min_max").setText("(1~"+_grid.getCount()+")");
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_application");
        var t_num = Ext.getCmp("t_num");

        if(t_num.isValid()===false){ t_num.focus(); return false; }

        var record = grid.getStore().data.items[me.num-1].data;

        grid.getStore().removeAt(me.num-1);
        grid.getStore().insert(Number(t_num.getValue())-1,record);

        Ext.getCmp("win_awareness").renumbering();

        me.close();
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    }

});