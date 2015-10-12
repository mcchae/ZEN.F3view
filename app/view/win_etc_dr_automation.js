
Ext.define('NFW2.view.win_etc_dr_automation', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_etc_dr_automation',

    requires: [
        'NFW2.view.win_etc_dr_automationViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.form.field.Text',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_etc_dr_automation'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 540,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_dr',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 300,
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: [
                                                'lb_req',
                                                'x-field x-form-item-label x-form-item-label-default'
                                            ],
                                            width: 145,
                                            bind: {
                                                text: '{tunnel_ip}/{dr_tunnel_ip}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick4'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    cls: 'in_grid',
                                    id: 'grid_tunnel',
                                    margin: '5 0 5 145',
                                    width: 300,
                                    disableSelection: true,
                                    hideHeaders: true,
                                    store: 'store_etc_tunnel',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = 'cell_text';
                                                return value;
                                            },
                                            dataIndex: 'tunnel_ip',
                                            flex: 1,
                                            editor: {
                                                xtype: 'textfield',
                                                baseCls: 'cell_text',
                                                listeners: {
                                                    focus: 'onTextfieldFocus',
                                                    blur: 'onTextfieldBlur'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = 'cell_text';
                                                return value;
                                            },
                                            dataIndex: 'dr_tunnel_ip',
                                            flex: 1,
                                            editor: {
                                                xtype: 'textfield',
                                                baseCls: 'cell_text',
                                                listeners: {
                                                    focus: 'onTextfieldFocus1',
                                                    blur: 'onTextfieldBlur1'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            items: [
                                                {
                                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                        return "icr_del";
                                                    },
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.getCmp("grid_tunnel").getStore().removeAt(rowIndex);
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    viewConfig: {
                                        markDirty: false
                                    },
                                    plugins: [
                                        {
                                            ptype: 'cellediting',
                                            pluginId: 'tunnel_celledit',
                                            clicksToEdit: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!LengthCheck(removeComma(value), 10, 65535)){ return ValidLimit(10, '65,535'); }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: [
                                        'lb_req',
                                        'inp_unit'
                                    ],
                                    id: 'dr_timeout',
                                    afterBodyEl: [
                                        '<div class="inp_after">초</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 130,
                                    msgTarget: 'none',
                                    value: '600',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 6,
                                    bind: {
                                        fieldLabel: '{dr_con_timeout}'
                                    },
                                    listeners: {
                                        errorchange: 'onDr_timeoutErrorChange',
                                        keydown: 'onDr_timeoutKeydown',
                                        focus: 'onDr_timeoutFocus',
                                        blur: 'onDr_timeoutBlur',
                                        change: 'onDr_timeoutChange'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        close: 'onWindowClose',
        afterrender: 'onWindowAfterRender'
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
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                }
            ]
        }
    ],

    onButtonClick4: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_etc_tunnel");

        if(store.data.length >= 4){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(4));
            return false;
        }

        store.add({'tunnel_ip':'','dr_tunnel_ip':''});
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        prt_errMsg(null,'fld_msg2');
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        prt_errMsg(null,'fld_msg2');
    },

    onDr_timeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onDr_timeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onDr_timeoutFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'10 ~ 65,535';
        setTipFocus(this,component);
    },

    onDr_timeoutBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onDr_timeoutChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));
    },

    onWindowClose: function(panel, eOpts) {
        Ext.data.StoreManager.lookup("store_etc_tunnel").removeAll();
        Ext.data.StoreManager.lookup("store_etc_dr_tunnel").removeAll();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        if(me.edit === "edit"){

            me.setTitle(__zen('dr_auto_edit')+" - "+me.record.num);

            var store_tunnel = Ext.data.StoreManager.lookup("store_etc_tunnel");

            for(var i=0; i<me.record.count; i++){
                var _i = i+1;
                eval('var _ip = me.record.tunnel_ip'+_i+';');
                eval('var dr_ip = me.record.dr_tunnel_ip'+_i+';');

                store_tunnel.add({
                    'tunnel_ip': _ip,
                    'dr_tunnel_ip': dr_ip
                });
            }

            Ext.getCmp("dr_timeout").setValue(addComma(me.record.dr_timeout));
        }else{
            me.setTitle(__zen('dr_auto_add'));

            Ext.data.StoreManager.lookup("store_etc_tunnel").add({'tunnel_ip':'','dr_tunnel_ip':''});
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;

        var grid_tunnel = Ext.getCmp("grid_tunnel");
        var grid_dr_tunnel = Ext.getCmp("grid_dr_tunnel");
        var dr_timeout = Ext.getCmp("dr_timeout");

        var _test = Ext.data.StoreManager.lookup("store_etc_tunnel");
        var _store = Ext.data.StoreManager.lookup("store_etc_dr_list");

        var tunnel = [];
        var dr_tunnel = [];

        if(grid_tunnel.getStore().data.length < 1){
            prt_errMsg(get_msg('err_null'), "fld_msg2");
            return false;
        }else{

            for(var i in grid_tunnel.getStore().data.items){
                var ip = grid_tunnel.getStore().data.items[i].data.tunnel_ip;
                var dr_ip = grid_tunnel.getStore().data.items[i].data.dr_tunnel_ip;

                if(!CheckNotNull(ip)){
                    prt_errMsg(get_msg('err_null'),'fld_msg2');
                    grid_tunnel.getPlugin('tunnel_celledit').startEdit(Number(i),0);
                    return false;
                }
                if(!ValidIPAddress(ip)){
                    prt_errMsg(get_msg('err_form'),'fld_msg2');
                    grid_tunnel.getPlugin('tunnel_celledit').startEdit(Number(i),0);
                    return false;
                }

                if(!CheckNotNull(dr_ip)){
                    prt_errMsg(get_msg('err_null'),'fld_msg2');
                    grid_tunnel.getPlugin('tunnel_celledit').startEdit(Number(i),1);
                    return false;
                }
                if(!ValidIPAddress(dr_ip)){
                    prt_errMsg(get_msg('err_form'),'fld_msg2');
                    grid_tunnel.getPlugin('tunnel_celledit').startEdit(Number(i),1);
                    return false;
                }
                tunnel.push(ip);
                dr_tunnel.push(dr_ip);
            }
        }

        if(dr_timeout.isValid()===false){
            prt_errMsg(get_msg('err_null'), "fld_msg2");
            dr_timeout.focus();
            return false;
        }

        _store.sorters.clear();

        var obj = {
            'num': (me.edit==="edit")?me.record.num:_store.data.length+1,
            'dr_timeout': removeComma(dr_timeout.getValue()),
            'count':tunnel.length,
            'tunnel_ip1':(tunnel[0])?tunnel[0]:'',
            'tunnel_ip2':(tunnel[1])?tunnel[1]:'',
            'tunnel_ip3':(tunnel[2])?tunnel[2]:'',
            'tunnel_ip4':(tunnel[3])?tunnel[3]:'',
            'dr_tunnel_ip1':(dr_tunnel[0])?dr_tunnel[0]:'',
            'dr_tunnel_ip2':(dr_tunnel[1])?dr_tunnel[1]:'',
            'dr_tunnel_ip3':(dr_tunnel[2])?dr_tunnel[2]:'',
            'dr_tunnel_ip4':(dr_tunnel[3])?dr_tunnel[3]:''
        };

        if(me.edit === "edit"){
            var n = Number(me.num)-1;
            _store.removeAt(n);
            _store.insert(n,obj);
        }else{
            _store.add(obj);
        }

        this.close();
    },

    onButtonClick2: function(button, e, eOpts) {
        this.close();
    }

});