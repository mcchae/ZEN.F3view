
Ext.define('NFW2.view.win_nat64_move', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_nat64_move',

    requires: [
        'NFW2.view.win_nat64_moveViewModel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_nat64_move'
    },
    cls: 'zen_win',
    height: 150,
    id: 'win_nat64_move',
    width: 400,
    bodyPadding: 20,
    defaultListenerScope: true,

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
                    id: 'lb_start'
                },
                {
                    xtype: 'textfield',
                    id: 'ft_num',
                    margin: '0 5',
                    width: 100,
                    labelSeparator: ' '
                },
                {
                    xtype: 'label',
                    id: 'lb_end'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_nat_moveAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    margin: '0 5 0 100',
                    bind: {
                        text: '{rule_move}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    bind: {
                        text: '{rule_copy}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],

    onWin_nat_moveAfterRender: function(component, eOpts) {
        var me = this;

        Ext.getCmp('lb_start').setText(me.num+__zen('rule_move_info1'));

        Ext.getCmp('lb_end').setText('(1~'+me.total+')'+__zen('rule_move_info2'));

        Ext.getCmp('ft_num').setValue(me.num);

        chk_zenauth(null); 
    },

    onButtonClick: function(button, e, eOpts) {
         var me = this;

                var _params = {
                    basename : Ext.encode('firewall_nat64'),
                    obj : Ext.encode({'@uid': me.uid,'@num':parseInt(Ext.getCmp('ft_num').getValue())}),
                    id_info : Ext.encode({'fieldname':'@uid'}),
                    num_info : Ext.encode({'fieldname':'@num'}),
                    update : Ext.encode(true)
                };



                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'setPolicy',
                    _params,
                    function(response){

                         var _store = Ext.data.StoreManager.lookup('store_nat64_list');
                         _store.load();

                         me.close();

                    }
                );
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var _params = {
            basename : Ext.encode('firewall_nat64'),
            id_info : Ext.encode({'fieldname':'@uid', 'value':me.uid}),
            num_info : Ext.encode({'fieldname':'@num', 'value':parseInt(Ext.getCmp('ft_num').getValue())}),
            update : Ext.encode(true)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'copyPolicy',
            _params,
            function(response){

                var _store = Ext.data.StoreManager.lookup('store_nat64_list');
                _store.load();

                me.close();

            }
        );

    }

});