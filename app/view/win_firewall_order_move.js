
Ext.define('NFW2.view.win_firewall_order_move', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_firewall_order_move',

    requires: [
        'NFW2.view.win_firewall_order_moveViewModel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_firewall_order_move'
    },
    cls: 'zen_win',
    height: 150,
    width: 450,
    bodyPadding: 20,
    modal: true,
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
                    width: 100
                },
                {
                    xtype: 'label',
                    id: 'lb_end',
                    bind: {
                        text: '{dashboard_msg2}'
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
                    itemId: 'fld_msg_move',
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{move}'
                    },
                    listeners: {
                        click: 'onButtonClick4'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick12'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;

        var _record = me._record;
        var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy_set");
        var ft_num = Ext.getCmp("ft_num").getValue();

        var _num = [];
        var _in = '';
        for(var i=0; i<_store_policy.data.items.length; i++){

            var _data = _store_policy.data.items[i].data;
            _num.push(_data['@num']);
            if(_data['@uid'] === Number(ft_num)){ _in = 'in'; }
        }
        if(_in === ''){
            prt_errMsg(__zen('dashboard_msg3'),'fld_msg_move');
            return false;
        }
        prt_errMsg(null,'fld_msg_move');

        var _tmp = _store_policy.find("@uid",_record['@uid']);

        var _n_tmp = _store_policy.find("@uid",Number(ft_num));

        _store_policy.insert(_n_tmp,_record);

        var _n_record = [];
        for(var i=0; i<_store_policy.data.items.length; i++){
            _store_policy.data.items[i].data['@num'] = _num[i];
            _n_record.push(_store_policy.data.items[i].data);
        }

        _store_policy.loadData(_n_record);

        me.close();
    },

    onButtonClick12: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        var _record = me._record;

        Ext.getCmp("lb_start").setText(_record['@uid']+__zen('dashboard_msg4'));
        Ext.getCmp("ft_num").setValue(_record['@uid']);
    }

});