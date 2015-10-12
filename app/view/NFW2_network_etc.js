
Ext.define('NFW2.view.NFW2_network_etc', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_etc',

    requires: [
        'NFW2.view.NFW2_network_etcViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Tag',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_etc'
    },
    cls: 'zen_body',
    id: 'NFW2_network_etc',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
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
                    flex: 1,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: '회선 대역폭 측정 기능',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 0 0 10',
                                            width: 150,
                                            text: '서버 기능 사용'
                                        },
                                        {
                                            xtype: 'toggleslide',
                                            state: false,
                                            resizeHandle: false,
                                            id: 'band_chk',
                                            listeners: {
                                                afterrender: 'onBand_chkAfterRender',
                                                change: 'onBand_chkChange'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'mt_noti',
                                            margin: '3 0 0 5',
                                            bind: {
                                                text: '{require_port}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    disabled: true,
                                    id: 'band_schedule_con',
                                    margin: '8 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 0 0 10',
                                            width: 150,
                                            text: '스케쥴 사용'
                                        },
                                        {
                                            xtype: 'toggleslide',
                                            state: false,
                                            resizeHandle: false,
                                            id: 'band_schedule_chk',
                                            listeners: {
                                                afterrender: 'onBand_schedule_chkAfterRender',
                                                change: 'onBand_schedule_chkChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    disabled: true,
                                    id: 'band_time_con',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 150,
                                                    text: '서버 IP'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(!ValidIPAddress(value)){
                                                                if(!ValidIPv6(value)){
                                                                    return get_msg('err_ip');
                                                                }
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'band_chk_ip',
                                                    width: 250,
                                                    labelSeparator: ' ',
                                                    labelWidth: 145,
                                                    msgTarget: 'none',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.:]/,
                                                    maxLength: 39,
                                                    listeners: {
                                                        errorchange: 'onBand_chk_ipErrorChange',
                                                        focus: 'onBand_chk_ipFocus',
                                                        blur: 'onBand_chk_ipBlur'
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
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 150,
                                                    text: '인터페이스'
                                                },
                                                {
                                                    xtype: 'tagfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(value.length === 0){ return get_msg('err_null'); }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'band_chk_inter',
                                                    width: 350,
                                                    labelSeparator: ' ',
                                                    labelWidth: 145,
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_interface',
                                                    valueField: 'name',
                                                    listeners: {
                                                        errorchange: 'onBand_chk_interErrorChange',
                                                        blur: 'onBand_chk_interBlur'
                                                    }
                                                }
                                            ]
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
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 130,
                                                    text: '측정 시각'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'band_time_total',
                                                    listeners: {
                                                        change: 'onBand_time_totalChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'segmentedbutton',
                                                    cls: 'zen_seg',
                                                    hidden: true,
                                                    maxHeight: 24,
                                                    width: 50,
                                                    allowDepress: true,
                                                    items: [
                                                        {
                                                            id: 'band_time_total1',
                                                            maxHeight: 24,
                                                            allowDepress: false,
                                                            text: '전체'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'band_chk_time',
                                                    margin: '0 0 0 5'
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
                    xtype: 'container',
                    flex: 1,
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            hidden: true,
                            id: 'band_chk_use1',
                            fieldLabel: '회선 대역폭 측정 기능 사용',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            boxLabelCls: 'mt_info'
                        },
                        {
                            xtype: 'label',
                            width: 200,
                            bind: {
                                text: '{measure_band}'
                            }
                        },
                        {
                            xtype: 'container',
                            html: '<div id="band_chk_use"/>'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    iconCls: 'icb_add',
                                    bind: {
                                        text: '{add_mirroring}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick',
                                        blur: 'onButtonBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_sq',
                                    width: 185,
                                    text: '대상 인터페이스'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_sq',
                                    width: 105,
                                    text: '수신 패킷'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_sq',
                                    width: 105,
                                    text: '송신 패킷'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_sq',
                                    width: 180,
                                    text: '미러링 인터페이스'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        return true;
                                    },
                                    id: 'mirror_m_inter',
                                    width: 180,
                                    labelAlign: 'top',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    editable: false,
                                    emptyText: 'select',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    listeners: {
                                        change: 'onMirror_m_interChange',
                                        errorchange: 'onMirror_m_interErrorChange',
                                        blur: 'onMirror_m_interBlur'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'mirror_tran',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    labelAlign: 'top',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    checked: true,
                                    listeners: {
                                        change: 'onMirror_tranChange'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'mirror_reci',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    labelAlign: 'top',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    listeners: {
                                        change: 'onMirror_reciChange'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        return true;
                                    },
                                    id: 'mirror_s_inter',
                                    margin: '0 0 0 5',
                                    width: 180,
                                    labelAlign: 'top',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    editable: false,
                                    emptyText: 'select',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    listeners: {
                                        errorchange: 'onMirror_tranErrorChange',
                                        change: 'onMirror_s_interChange',
                                        blur: 'onMirror_s_interBlur'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    id: 'mirror_btn_con',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'mirror_btn_add',
                                            margin: '2 0 0 5',
                                            src: '../images/b_insert.gif',
                                            listeners: {
                                                render: 'onImageRender'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'interface_error',
                                    margin: '3 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'mirror_grid_con',
                            margin: '8 0 10 0 ',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    cls: 'in_grid',
                                    id: 'mirror_grid',
                                    maxHeight: 300,
                                    scrollable: {
                                        x: false,
                                        y: true
                                    },
                                    header: false,
                                    title: 'My Grid Panel',
                                    allowDeselect: true,
                                    disableSelection: true,
                                    store: 'store_network_etc',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = 'cell_combo';

                                                if(value === ""){ return 'Select'; }

                                                return value;
                                            },
                                            id: 'org_iface',
                                            dataIndex: 'org_iface',
                                            flex: 2,
                                            bind: {
                                                text: '{target_inter}'
                                            },
                                            editor: {
                                                xtype: 'combobox',
                                                baseCls: 'cell_combo',
                                                editable: false,
                                                emptyText: 'Select',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_interface',
                                                valueField: 'name',
                                                listeners: {
                                                    focus: 'onComboboxFocus',
                                                    collapse: 'onComboboxCollapse',
                                                    blur: 'onComboboxBlur'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== true){
                                                    metaData.tdCls = 'cell_check_false';
                                                }
                                                else{
                                                    metaData.tdCls = 'cell_check_true';
                                                }

                                                // if(value === "rx"){ return "RX"; }
                                                // else{ return ""; }
                                            },
                                            id: 'part1',
                                            dataIndex: 'part1',
                                            flex: 1,
                                            bind: {
                                                text: '{receive_packet}'
                                            },
                                            editor: {
                                                xtype: 'checkboxfield',
                                                baseCls: 'cell_check_false',
                                                margin: '0 0 -2 0',
                                                checked: true,
                                                listeners: {
                                                    focus: 'onCheckboxfieldFocus'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== true){
                                                    metaData.tdCls = 'cell_check_false';
                                                }
                                                else{
                                                    metaData.tdCls = 'cell_check_true';
                                                }
                                            },
                                            id: 'part2',
                                            dataIndex: 'part2',
                                            flex: 1,
                                            bind: {
                                                text: '{trans_packet}'
                                            },
                                            editor: {
                                                xtype: 'checkboxfield',
                                                baseCls: 'cell_check_false',
                                                margin: '0 0 -2 0',
                                                listeners: {
                                                    focus: 'onCheckboxfieldFocus1'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = 'cell_combo';

                                                if(value === ""){ return 'Select'; }

                                                return value;
                                            },
                                            id: 'mirror_iface',
                                            dataIndex: 'mirror_iface',
                                            flex: 2,
                                            bind: {
                                                text: '{mirror_inter}'
                                            },
                                            editor: {
                                                xtype: 'combobox',
                                                baseCls: 'cell_combo',
                                                emptyText: 'Select',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_interface',
                                                valueField: 'name',
                                                listeners: {
                                                    focus: 'onComboboxFocus1',
                                                    collapse: 'onComboboxCollapse1',
                                                    blur: 'onComboboxBlur1'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 45,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.getCmp("mirror_grid").getStore().removeAt(rowIndex);

                                                        var inter = Ext.getCmp('mirror_m_inter').getStore().data;
                                                        var k = inter.length-1;
                                                        var leng = k*(k+1)/2;

                                                        // if(Ext.getCmp("mirror_grid").getStore().data.length === 0){
                                                        //     Ext.getCmp("mirror_grid_con").hide();
                                                        // }

                                                        if(Ext.getCmp("mirror_grid").getStore().data.length < leng){
                                                            Ext.getCmp('mirror_btn_con').enable();
                                                        }

                                                        Ext.getCmp('interface_error').hide();
                                                    },
                                                    iconCls: 'icr_del'
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
                                            pluginId: 'mirror_plug',
                                            clicksToEdit: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: 'onFieldsetAfterRender'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_mirroringAfterRender',
        render: 'onNFW2_network_etcRender'
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
                    id: 'mirror_btn_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onMirror_btn_okClick',
                        blur: 'onMirror_btn_okBlur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'mirror_btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onMirror_btn_cancelClick'
                    }
                }
            ]
        }
    ],

    onBand_chkAfterRender: function(component, eOpts) {
        component.onText = __zen('toggle_on');
        component.offText = __zen('toggle_off');
    },

    onBand_chkChange: function(button) {
        if(button.state){
            Ext.getCmp('band_schedule_con').enable();
            if(Ext.getCmp('band_schedule_chk').state){
                Ext.getCmp('band_time_con').enable();
                for(var i =1;i<25;i++){
                    Ext.getCmp('band_time_btn'+i).setStyle('background-color','');
                }
            }
            else{
                Ext.getCmp('band_time_con').disable();
                for(var i =1;i<25;i++){
                    Ext.getCmp('band_time_btn'+i).setStyle('background-color','transparent');
                }
            }
        }
        else{
            Ext.getCmp("band_schedule_chk").state = false;
            Ext.getCmp("band_schedule_chk").moveHandle(false);
            Ext.getCmp('band_schedule_con').disable();
            Ext.getCmp('band_time_con').disable();
            for(var i =1;i<25;i++){
                Ext.getCmp('band_time_btn'+i).setStyle('background-color','transparent');
            }
        }
    },

    onBand_schedule_chkAfterRender: function(component, eOpts) {
        component.onText = __zen('toggle_on');
        component.offText = __zen('toggle_off');
    },

    onBand_schedule_chkChange: function(button) {
        if(button.state){
            Ext.getCmp('band_time_con').enable();
            for(var i =1;i<25;i++){
                Ext.getCmp('band_time_btn'+i).setStyle('background-color','');
            }
        }
        else{
            Ext.getCmp('band_time_con').disable();
            for(var i =1;i<25;i++){
                Ext.getCmp('band_time_btn'+i).setStyle('background-color','transparent');
            }
        }
    },

    onBand_chk_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBand_chk_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onBand_chk_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onBand_chk_interErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBand_chk_interBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onBand_time_totalChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            for(var i = 1;i< 25 ;i++){
                Ext.getCmp('band_time_btn'+i).toggle(true);
            }
        }
        else{
            var chk_num = 0;
            for(var i = 1;i< 25 ;i++){
                if(Ext.getCmp('band_time_btn'+i).pressed){
                    chk_num++;
                }
            }

            if(chk_num === 24){
                for(var i = 1;i< 25 ;i++){
                    Ext.getCmp('band_time_btn'+i).toggle(false);
                }
            }
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var _store = Ext.getCmp('mirror_grid').getStore().data;
        var inter = Ext.data.StoreManager.lookup('store_interface').data;
        var k = inter.length;

        var sum = parseInt(k/2);
        var leng = sum*(k-sum);

        if(_store.items.length > Number(leng-1)){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(leng));
        }
        else{
            var store = Ext.getCmp('mirror_grid').getStore();

            var record = {
                'org_iface' : '',
                'mirror_iface' : '',
                'part1' : true,
                'part2' : ''
            };

            store.add(record);
        }
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onMirror_m_interChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('interface_error').hide();
        Ext.getCmp('mirror_m_inter').validateValue(true);
    },

    onMirror_m_interErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "interface_error");
    },

    onMirror_m_interBlur: function(component, event, eOpts) {
        Ext.getCmp('mirror_m_inter').validateValue(true);
    },

    onMirror_tranChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === false && Ext.getCmp('mirror_reci').checked === false){
            Ext.getCmp('interface_error').setText(get_msg('err_select'));
            Ext.getCmp('interface_error').show();
        }
        else{
            Ext.getCmp('interface_error').hide();
        }

        return true;
    },

    onMirror_reciChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === false && Ext.getCmp('mirror_tran').checked === false){
            Ext.getCmp('interface_error').setText(get_msg('err_select'));
            Ext.getCmp('interface_error').show();
        }
        else{
            Ext.getCmp('interface_error').hide();
        }

        return true;
    },

    onMirror_tranErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "interface_error");
    },

    onMirror_s_interChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('interface_error').hide();
        Ext.getCmp('mirror_s_inter').validateValue(true);
    },

    onMirror_s_interBlur: function(component, event, eOpts) {
        Ext.getCmp('mirror_s_inter').validateValue(true);
    },

    onImageRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            var me = this;
            var m_inter = Ext.getCmp("mirror_m_inter");
            var s_inter = Ext.getCmp("mirror_s_inter");
            var tran = Ext.getCmp("mirror_tran");
            var reci = Ext.getCmp("mirror_reci");
            var tran_val;
            var reci_val;

            m_inter.validator(m_inter.getValue());
            s_inter.validator(s_inter.getValue());
            if(m_inter.validateValue() === false){ m_inter.focus(); return false; }
            if(s_inter.validateValue() === false){ s_inter.focus(); return false; }
            if(m_inter.getValue() === s_inter.getValue()){
                Ext.getCmp('mirror_m_inter').reset();
                Ext.getCmp('mirror_s_inter').reset();
                Ext.getCmp('interface_error').setText(get_msg('err_mirrordob'));
                Ext.getCmp('interface_error').show();
                return false;
            }
            if(tran.checked === false && reci.checked === false){
                Ext.getCmp('interface_error').setText(get_msg('err_select'));
                Ext.getCmp('interface_error').show();
                return false;
            }
            if(m_inter.validateValue() === false){ s_inter.focus(); return false; }

            var name = m_inter.getValue();

            if(tran.checked){ tran_val = "rx";}
            else{ tran_val = null;}
            if(reci.checked){ reci_val = "tx";}
            else{ reci_val = null;}

            if(name === null){
                m_inter.validateValue(false);
                prt_errMsg(get_msg('err_null'), "interface_error");
                m_inter.focus();
                return false;
            }

            Ext.getCmp('mirror_grid_con').show();

            var grid = Ext.getCmp("mirror_grid").getStore().data;

            for(var i=0; i<grid.length; i++){
                if(grid.items[i].data.org_iface === s_inter.getValue()){
                    Ext.getCmp('mirror_m_inter').reset();
                    Ext.getCmp('mirror_s_inter').reset();
                    Ext.getCmp('mirror_tran').reset();
                    Ext.getCmp('mirror_reci').reset();
                    Ext.getCmp('interface_error').setText(get_msg('err_mirrordob'));
                    Ext.getCmp('interface_error').show();
                    Ext.getCmp('mirror_s_inter').focus();
                    return false;
                }
            }

            for(var i=0; i<grid.length; i++){
                if(grid.items[i].data.mirror_iface === m_inter.getValue()){
                    Ext.getCmp('mirror_m_inter').reset();
                    Ext.getCmp('mirror_s_inter').reset();
                    Ext.getCmp('mirror_tran').reset();
                    Ext.getCmp('mirror_reci').reset();
                    Ext.getCmp('interface_error').setText(get_msg('err_mirrordob'));
                    Ext.getCmp('interface_error').show();
                    Ext.getCmp('mirror_s_inter').focus();
                    return false;
                }
            }

            for(var i=0; i<grid.length; i++){
                if(grid.items[i].data.org_iface === m_inter.getValue() && grid.items[i].data.mirror_iface === s_inter.getValue()){
                    Ext.getCmp('mirror_m_inter').reset();
                    Ext.getCmp('mirror_s_inter').reset();
                    Ext.getCmp('mirror_tran').reset();
                    Ext.getCmp('mirror_reci').reset();
                    Ext.getCmp('interface_error').setText(get_msg('err_configdob'));
                    Ext.getCmp('interface_error').show();
                    Ext.getCmp('mirror_m_inter').focus();
                    return false;
                }
            }

            var obj = {
                'org_iface': name,
                'mirror_iface' : s_inter.getValue(),
                'part1' : tran_val,
                'part2' : reci_val
            };

            var _store = Ext.data.StoreManager.lookup("store_network_etc");
            _store.add(obj);

            var store = Ext.getCmp('mirror_grid').getStore().data;
            var inter = Ext.getCmp('mirror_m_inter').getStore().data;
            var k = inter.length;
            var leng_chk = [];
            var chk_num = 0;

            for(var i in store.items){
                var checker = 0;
                if(leng_chk.length === 0){
                    leng_chk.push({
                        chk : store.items[i].data['org_iface']
                    });
                    chk_num++;
                }
                else{
                    for(var j in leng_chk){
                        if(leng_chk[j].chk !== store.items[i].data['org_iface'] && checker !== "a"){
                            checker = i;
                        }
                        else{ checker = "a"; }
                    }

                    if(checker !== "a"){
                        leng_chk.push({
                            chk : store.items[checker].data['org_iface']
                        });
                        chk_num++;
                    }
                }
            }

            var leng = chk_num*(k-chk_num);
            if(store.length === leng){ Ext.getCmp('mirror_btn_con').setDisabled(true); }
            Ext.getCmp('mirror_m_inter').reset();
            Ext.getCmp('mirror_s_inter').reset();
            Ext.getCmp('mirror_tran').reset();
            Ext.getCmp('mirror_reci').reset();


        }, component);
    },

    onComboboxFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_etc');

        if(me.set_btn !== true){
            component.expand();
        }
        else{ me.set_btn = false; }
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
    },

    onComboboxBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onCheckboxfieldFocus: function(component, event, eOpts) {
        if(component.value === true){
            component.setValue(false);
        }
        else{
            component.setValue(true);
        }
    },

    onCheckboxfieldFocus1: function(component, event, eOpts) {
        if(component.value === true){
            component.setValue(false);
        }
        else{
            component.setValue(true);
        }
    },

    onComboboxFocus1: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_etc');

        if(me.set_btn !== true){
            component.expand();
        }
        else{ me.set_btn = false; }
    },

    onComboboxCollapse1: function(field, eOpts) {
        field.blur();
    },

    onComboboxBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onFieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('mirroring'));
    },

    onNFW2_network_mirroringAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        me.set_btn = false;
        me.set_chk = false;
        var records = [];

        showLoadMask();

        var _params = {
            option : Ext.encode('all')
        };

        Ext.data.JsonP.request({
            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){
                hideLoadMask();
                if(response.retcode){
                    for(var i in response.retval){
                        records.push({
                            name: response.retval[i].name
                        });
                    }
                    var _store = Ext.data.StoreManager.lookup('store_interface');
                    _store.loadData(records);
                }
            },
            failure : function(response){
                hideLoadMask();
                Ext.Msg.show({
                    title : 'Error message',
                    msg : 'Error Message',
                    width : 300,
                    buttons : Ext.Msg.OK,
                    icon:Ext.window.MessageBox.INFO
                });
            }
        });

        me.get_mirroring();
    },

    onMirror_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var chk;
        var store = Ext.data.StoreManager.lookup('store_network_etc');

        var obj = { };

        if(Ext.getCmp('band_schedule_chk').state){
            if(Ext.getCmp('band_chk_ip').isValid() === false){ Ext.getCmp('band_chk_ip').focus(); return false; }
            if(Ext.getCmp('band_chk_inter').isValid() === false){ Ext.getCmp('band_chk_inter').focus(); return false; }
            var timer = [];
            var in_inter = [];
            in_inter = Ext.getCmp("band_chk_inter").getValue();

            for(var i = 1;i <25;i++){
                if(Ext.getCmp('band_time_btn'+i).pressed){ timer.push(i); }
            }

            if(timer.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_select_time'));
                me.set_chk = true;
                return false;
            }

            obj['bandwidth_schedule'] = "on";
            obj['bandwidth_server_ip'] = Ext.getCmp('band_chk_ip').getValue();
            obj['bandwidth_interface'] = in_inter.join(',');
            obj['bandwidth_timer'] = timer.join(',');
        }
        else{
            obj['bandwidth_schedule'] = "off";
            obj['bandwidth_server_ip'] = "";
            obj['bandwidth_interface'] = "";
            obj['bandwidth_timer'] = "";
        }

        if(me.edit === "edit"){
            obj['_id'] = me.cid;
        }

        if(Ext.getCmp('band_chk').state){ chk = "on"; }
        else{ chk = "off"; }

        obj['bandwidth_chk'] = chk;


        for(var i in store.data.items){
            if(store.data.items[i].data.part1 === false && store.data.items[i].data.part2 === false){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_select'));
                me.set_chk = true;
                return false;
            }

            if(this.validation(store.data.items[i].data.org_iface, store.data.items[i].data.mirror_iface, i) !== true){
                var type = this.validation(store.data.items[i].data.org_iface, store.data.items[i].data.mirror_iface, i)[1];
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(this.validation(store.data.items[i].data.org_iface, store.data.items[i].data.mirror_iface, i)[0]);
                me.set_btn = true;

                if(type === 'org'){
                    Ext.getCmp('mirror_grid').getPlugin('mirror_plug').startEdit(Number(i), 0);
                }
                else{
                    Ext.getCmp('mirror_grid').getPlugin('mirror_plug').startEdit(Number(i), 3);
                }

                return false;
            }
        }

        var _params = {
            basename : Ext.encode('network_etc'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                if(chk === "on"){
                    var _params = {
                        func_name: Ext.encode('mod_monitor_bandwidth_server')
                    };
                    //             showLoadMask();
                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'execKctrlFunc',
                        _params,

                        function(response){
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: get_msg("msg_ok_add"),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    );
                }
                else{
                    var _params2 = {
                        func_name: Ext.encode('mod_disable_monitor_bandwidth'),
                        args: Ext.encode('')
                    };
                    //             showLoadMask();
                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'execKctrlFunc',
                        _params2,

                        function(response){
                        }
                    );
                }
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

            }
        );

        var ids = [];
        for(var i in me.back_up){
            ids.push(me.back_up[i]._id);
        }

        var _params = {
            basename : Ext.encode('network_etc_mirror'),
            ids : Ext.encode(ids)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'delListTypeObj',
            _params,
            function(response){

            }
        );

        var store = Ext.getCmp('mirror_grid').getStore().data;

        if(store.items.length !== 0){
            showLoadMask();
        }

        for(var i in store.items){
            var part1 = "";
            var part2 = "";

            if(store.items[i].data.part1 === true){ part1 = "rx"; }
            if(store.items[i].data.part2 === true){ part2 = "tx"; }

            obj = {
                'org_iface' : store.items[i].data.org_iface,
                'mirror_iface' : store.items[i].data.mirror_iface,
                'part1' : part1,
                'part2' : part2
            };


            var _params = {
                basename : Ext.encode('network_etc_mirror'),
                obj : Ext.encode(obj),
                update : false
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setListTypeObj',
                _params,
                function(response){
                    hideLoadMask();
                    me.get_mirroring();
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            );
        }

    },

    onMirror_btn_okBlur: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_etc');
        if(me.set_chk === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');

            me.set_chk = false;
        }
    },

    onMirror_btn_cancelClick: function(button, e, eOpts) {
        var me = this;
        Ext.getCmp('mirror_m_inter').validateValue(true);
        Ext.getCmp('mirror_s_inter').validateValue(true);
        Ext.getCmp('interface_error').hide();
        me.get_mirroring();
    },

    onNFW2_network_etcRender: function(component, eOpts) {
        for(var j = 1;j<25;j++){
            if(j === 1 || j === 13){
                var time_seg = Ext.create('Ext.button.Segmented', {
                    id : 'band_seg'+j,
                    cls : 'zen_seg',
                    allowMultiple: true,
                });

                Ext.getCmp('band_chk_time').add(time_seg);
            }

            //     if(j < 13){
            var time_btn = Ext.create('Ext.Button',{
                text : j,
                id : 'band_time_btn'+j,
                width : 40,
                listeners : {
                    click : function(){
                        var m_btn_chk = 0;
                        for(var i = 1; i<25; i++){
                            if(Ext.getCmp('band_time_btn'+i).pressed){ m_btn_chk++; }
                        }

                        if(m_btn_chk === 24){ Ext.getCmp('band_time_total').setValue(true); }
                        else{ Ext.getCmp('band_time_total').setValue(false); }
                    }
                }
            });

            time_seg.add(time_btn);
        }

    },

    get_mirroring: function() {
        var me = this;

        showLoadMask();

        var _params = {
            basename : Ext.encode("network_etc")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                if(response !== null){
                    if(response.bandwidth_chk === "on"){
                        Ext.getCmp("band_chk").state = true;
                        Ext.getCmp("band_chk").moveHandle(true);

                        Ext.getCmp('band_schedule_con').enable();
                    }
                    else{
                        Ext.getCmp("band_chk").state = false;
                        Ext.getCmp("band_chk").moveHandle(false);

                        Ext.getCmp('band_schedule_con').disable();
                    }

                    if(response.bandwidth_schedule === "on"){
                        Ext.getCmp("band_schedule_chk").state = true;
                        Ext.getCmp("band_schedule_chk").moveHandle(true);

                        Ext.getCmp('band_time_con').enable();
                        Ext.getCmp('band_chk_ip').setValue(response.bandwidth_server_ip);


                        var temp_timer = response.bandwidth_timer.split(',');
                        if(response.bandwidth_timer !== ""){
                            for(var i in temp_timer){
                                Ext.getCmp('band_time_btn'+temp_timer[i]).toggle(true);
                            }
                        }

                        var temp_inter = response.bandwidth_interface.split(',');
                        setTimeout(function(){Ext.getCmp('band_chk_inter').setValue(temp_inter);},100);
                    }
                    else{
                        Ext.getCmp("band_schedule_chk").state = false;
                        Ext.getCmp("band_schedule_chk").moveHandle(false);

                        Ext.getCmp('band_time_con').disable();

                        for(var i =1;i<25;i++){
                            Ext.getCmp('band_time_btn'+i).setStyle('background-color','transparent');
                        }
                    }
                }
            }
        );

        var _params = {
            basename : Ext.encode("network_etc_mirror")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                hideLoadMask();
                me.back_up = response.list;
                if(response !== null){
                    var records = [];
                    var store = Ext.data.StoreManager.lookup('store_network_etc');
                    for(var i in response.list){
                        var part1 = false;
                        var part2 = false;

                        if(response.list[i].part1 === "rx"){ part1 = true; }
                        if(response.list[i].part2 === "tx"){ part2 = true; }

                        records.push({
                            'org_iface' : response.list[i].org_iface,
                            'mirror_iface' : response.list[i].mirror_iface,
                            'part1' : part1,
                            'part2' : part2
                        });
                    }

                    store.loadData(records);
                    if(response.list.length > 0){ Ext.getCmp("mirror_grid_con").show(); }
                }
            }
        );

    },

    validation: function(value_o, value_m, index) {
        var store = Ext.data.StoreManager.lookup('store_network_etc');

        if(!CheckNotNull(value_o)){ return [get_msg('err_null'),'org']; }
        if(!CheckNotNull(value_m)){ return [get_msg('err_null'),'mir']; }
        if(value_m === value_o){
            return [get_msg('err_mirrordob'),'org'];
        }

        for(var i in store.data.items){
            if(i !==index){
                if(store.data.items[i].data.org_iface === value_m){
                    return [get_msg('err_mirrordob'),'mir'];
                }

                if(store.data.items[i].data.mirror_iface === value_o){
                    return [get_msg('err_mirrordob'),'org'];
                }

                if(store.data.items[i].data.org_iface === value_o && store.data.items[i].data.mirror_iface === value_m){
                    return [get_msg('err_configdob'),'org'];
                }
            }
        }
        return true;
    }

});